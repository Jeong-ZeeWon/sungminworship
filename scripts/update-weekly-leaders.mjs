import { writeFile } from 'node:fs/promises';

const token = process.env.NOTION_TOKEN;
const pageId = process.env.NOTION_PAGE_ID || '35b5e604d8c680aea0c4d47fc08c83f7';

if (!token) throw new Error('NOTION_TOKEN secret is missing.');

const dayNames = ['월', '화', '수', '목', '금', '토'];
const dayIndex = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4, 토: 5 };

async function notion(path) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28'
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function textOf(block) {
  const body = block[block.type];
  if (!body?.rich_text) return '';
  return body.rich_text.map(t => t.plain_text || '').join('').trim();
}

async function getLines() {
  const lines = [];
  let cursor = '';
  do {
    const qs = new URLSearchParams({ page_size: '100' });
    if (cursor) qs.set('start_cursor', cursor);
    const data = await notion(`/blocks/${pageId}/children?${qs}`);
    for (const block of data.results) {
      const line = textOf(block).replace(/^\*+|\*+$/g, '').trim();
      if (line && line !== '---') lines.push(line);
    }
    cursor = data.has_more ? data.next_cursor : '';
  } while (cursor);
  return lines;
}

function section(lines, word) {
  const start = lines.findIndex(l => l.includes(word) && l.includes('담당'));
  if (start < 0) throw new Error(`${word} section not found.`);
  const out = [];
  for (let i = start; i < lines.length; i++) {
    if (i > start && /담당/.test(lines[i]) && /(새벽기도회|수요예배|금요성령집회|주일예배|열방예배)/.test(lines[i])) break;
    out.push(lines[i]);
  }
  return out;
}

function after(lines, key) {
  const line = lines.find(l => l.startsWith(`${key}:`));
  return line ? line.slice(line.indexOf(':') + 1).trim() : '';
}

function normalizeName(name) {
  return String(name || '')
    .replace(/담임목사님/g, '목사님')
    .replace(/\s*목사님$/g, '목사님')
    .replace(/\s*목사$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function weekLabel(header) {
  const m = header.match(/(\d{1,2})\/(\d{1,2})\s*[-–—~]\s*(?:(\d{1,2})\/)?(\d{1,2})/);
  if (!m) return '이번 주';
  return `${Number(m[1])}/${Number(m[2])} — ${Number(m[3] || m[1])}/${Number(m[4])}`;
}

function dateLabel(header) {
  const m = header.match(/(\d{1,2})\/(\d{1,2})\(([^)]+)\)/);
  return m ? `${Number(m[1])}/${Number(m[2])}(${m[3]})` : '';
}

function expandDays(spec) {
  const out = [];
  for (const raw of String(spec || '').split(',')) {
    const p = raw.trim();
    const range = p.match(/^([월화수목금토])\s*[-–—~]\s*([월화수목금토])$/);
    if (range) {
      for (let i = dayIndex[range[1]]; i <= dayIndex[range[2]]; i++) out.push(i);
    } else if (dayIndex[p] !== undefined) {
      out.push(dayIndex[p]);
    }
  }
  return out;
}

function distribute(value) {
  const arr = Array(6).fill('');
  const text = String(value || '');
  const matches = text.matchAll(/([^(),]+?)\s*\(([^)]*)\)/g);

  for (const match of matches) {
    const name = normalizeName(match[1]);
    const days = expandDays(match[2]);
    days.forEach(i => { arr[i] = name; });
  }

  return arr;
}

function prayer(value) {
  return String(value || '').split(/[ ,，]+/).map(normalizeName).filter(Boolean);
}

function worshipSection(lines, keys) {
  const out = { date: dateLabel(lines[0]) };
  for (const key of keys) {
    out[key.prop] = normalizeName(after(lines, key.label));
  }
  return out;
}

const lines = await getLines();
const dawn = section(lines, '새벽기도회');
const wed = section(lines, '수요예배');
const fri = section(lines, '금요성령집회');
const sun = section(lines, '주일예배');
const nations = section(lines, '열방예배');

const leaders = {
  title: '한 주간 예배 담당자',
  subtitle: '이번 주 예배 담당자',
  icon: '👥',
  color: 'ldr',
  description: '이번 주 새벽·수요·금요·주일·열방 예배 담당자',
  week: weekLabel(dawn[0]),
  dawn: {
    days: dayNames,
    preacher: distribute(after(dawn, '설교')),
    caption: distribute(after(dawn, '자막')),
    accomp: distribute(after(dawn, '반주'))
  },
  wednesday: {
    date: dateLabel(wed[0]),
    preacher: normalizeName(after(wed, '설교')),
    worship: normalizeName(after(wed, '찬양')),
    sound: normalizeName(after(wed, '음향')),
    pd: normalizeName(after(wed, 'PD'))
  },
  friday: {
    date: dateLabel(fri[0]),
    worship: normalizeName(after(fri, '찬양')),
    pd: normalizeName(after(fri, 'PD')),
    caption: normalizeName(after(fri, '자막')),
    prayer: prayer(after(fri, '기도용사'))
  },
  sunday: worshipSection(sun, [
    { label: '1부 사회', prop: 'firstHost' },
    { label: '2부 사회', prop: 'secondHost' },
    { label: '3부 사회', prop: 'thirdHost' },
    { label: '1부 PD', prop: 'firstPd' },
    { label: '1부 자막', prop: 'firstCaption' },
    { label: '2부 PD', prop: 'secondPd' }
  ]),
  nations: worshipSection(nations, [
    { label: '사회', prop: 'host' },
    { label: '찬양', prop: 'worship' },
    { label: '영상/송출', prop: 'video' },
    { label: '자막', prop: 'caption' },
    { label: '특순', prop: 'special' },
    { label: '대표기도', prop: 'prayer' }
  ])
};

const output = `// 노션 원자료 기준: 한 주간 예배 담당자\n// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.\n\nif (typeof churchData !== 'undefined') {\n  churchData.leaders = ${JSON.stringify(leaders, null, 2)};\n}\n`;

await writeFile('leaders-update.js', output, 'utf8');
console.log(`Updated leaders-update.js: ${leaders.week}`);
