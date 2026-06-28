// 노션 「한 주간 예배 담당자」 페이지 자동 갱신
// 매주 금요일 23:17/23:47 KST에 GitHub Actions가 실행
// 5개 소스 페이지를 읽어 다음 주(월~토) + 다음 주 일요일 데이터를 추출해 타겟 페이지를 교체

import process from 'node:process';

const token = process.env.NOTION_TOKEN;
if (!token) throw new Error('NOTION_TOKEN missing');

const TARGET_PAGE = '35b5e604d8c680aea0c4d47fc08c83f7';
const DAILY_PAGE = process.env.DAILY_PAGE_ID || '2df5e604d8c68153b64dc76accb69102';
const DAILY_SUMMARY_TITLE = '이번 주 예배 담당자';
const SOURCES = {
  dawn:    '2df5e604d8c68142b803c8ada553a6ae',
  wed:     '2e15e604d8c6802f8284dd7ccc553b4f',
  fri:     '2e35e604d8c681df8d57cdbab62ed6ec',
  sun:     '2df5e604d8c6816481c6f31a7070a2d4',
  nations: '2e75e604d8c68020923dd6eeedbdcbcb',
};

const DAYS = ['월','화','수','목','금','토'];
const summaryColors = ['blue_background', 'green_background', 'purple_background', 'yellow_background', 'pink_background'];
const summaryIcons = ['🌅', '💧', '🔥', '⛪', '🌏'];

async function notion(path, options = {}) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`Notion API ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  if (options.method === 'DELETE') return null;
  return res.json();
}

async function getAllChildren(blockId) {
  const all = [];
  let cursor = '';
  do {
    const qs = new URLSearchParams({ page_size: '100' });
    if (cursor) qs.set('start_cursor', cursor);
    const data = await notion(`/blocks/${blockId}/children?${qs}`);
    all.push(...data.results);
    cursor = data.has_more ? data.next_cursor : '';
  } while (cursor);
  return all;
}

async function getTables(pageId) {
  const blocks = await getAllChildren(pageId);
  const tables = [];
  for (const b of blocks) {
    if (b.type !== 'table') continue;
    const rows = await getAllChildren(b.id);
    tables.push(rows.map(r =>
      r.table_row.cells.map(cell => cell.map(t => t.plain_text || '').join('').trim())
    ));
  }
  return tables;
}

function todayKST() {
  const now = new Date();
  const seoul = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  return seoul;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function md(d) { return `${d.getMonth() + 1}/${d.getDate()}`; }

const today = todayKST();
const allowOverride = process.env.OVERRIDE_DOW === '1';
if (![5, 6].includes(today.getDay()) && !allowOverride) {
  console.log(`Today is ${today.toDateString()} (DOW=${today.getDay()}). Not Friday/Saturday. Skipping.`);
  process.exit(0);
}

function blockText(block) {
  const body = block[block.type];
  if (!body?.rich_text) return '';
  return body.rich_text.map(t => t.plain_text || '').join('').trim();
}

function rich(content, options = {}) {
  return {
    type: 'text',
    text: { content },
    annotations: {
      bold: Boolean(options.bold),
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: options.color || 'default',
    },
  };
}

function paragraph(content, options = {}) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [rich(content, options)] },
  };
}

function sectionToSummaryCard(section, index) {
  const [title, ...details] = section.split('\n').map(line => line.trim()).filter(Boolean);
  return {
    object: 'block',
    type: 'callout',
    callout: {
      icon: { type: 'emoji', emoji: summaryIcons[index] || '🗓️' },
      color: summaryColors[index] || 'gray_background',
      rich_text: [rich(title, { bold: true })],
      children: details.map(line => paragraph(line)),
    },
  };
}

function dailySummaryChildren(sections) {
  return [
    {
      object: 'block',
      type: 'column_list',
      column_list: {
        children: sections.map((section, index) => ({
          object: 'block',
          type: 'column',
          column: {
            children: [sectionToSummaryCard(section, index)],
          },
        })),
      },
    },
  ];
}

async function deleteChildren(blockId) {
  const children = await getAllChildren(blockId);
  for (const child of children) {
    await notion(`/blocks/${child.id}`, { method: 'DELETE' });
  }
}

async function findDailySummaryBlock() {
  const children = await getAllChildren(DAILY_PAGE);
  return children.find(block => block.type === 'callout' && blockText(block) === DAILY_SUMMARY_TITLE);
}

async function createDailySummaryBlock(sections) {
  const top = await getAllChildren(DAILY_PAGE);
  const body = {
    children: [{
      object: 'block',
      type: 'callout',
      callout: {
        icon: { type: 'emoji', emoji: '🗓️' },
        color: 'blue_background',
        rich_text: [rich(DAILY_SUMMARY_TITLE, { bold: true })],
        children: dailySummaryChildren(sections),
      },
    }],
  };
  if (top[0]) body.after = top[0].id;
  await notion(`/blocks/${DAILY_PAGE}/children`, { method: 'PATCH', body });
}

async function updateDailySummary(sections) {
  const summary = await findDailySummaryBlock();
  if (!summary) {
    await createDailySummaryBlock(sections);
    console.log('Daily summary block created on 매일의 향기 page.');
    return;
  }

  await deleteChildren(summary.id);
  await notion(`/blocks/${summary.id}/children`, {
    method: 'PATCH',
    body: { children: dailySummaryChildren(sections) },
  });
  console.log('Daily summary block updated on 매일의 향기 page.');
}

const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
const monD = addDays(today, daysUntilMonday);
const tueD = addDays(monD, 1);
const wedD = addDays(monD, 2);
const thuD = addDays(monD, 3);
const friD = addDays(monD, 4);
const satD = addDays(monD, 5);
const sunD = addDays(monD, 6);

const monStr = md(monD), tueStr = md(tueD), wedStr = md(wedD), thuStr = md(thuD), friStr = md(friD), satStr = md(satD), sunStr = md(sunD);

console.log(`[Today] ${today.toDateString()} -> Mon ${monStr}, Wed ${wedStr}, Fri ${friStr}, Sat ${satStr}, Sun ${sunStr}`);

function fmtPreacherCaption(name) {
  const n = String(name || '').trim();
  if (!n) return '미정';
  if (n === '목사님' || n === '담임목사님') return '담임목사님';
  if (n === '초하루') return '초하루';
  return `${n} 목사`;
}
function fmtAccomp(name) {
  const n = String(name || '').trim();
  if (!n) return '미정';
  return n; // 사모님·초하루·이름 모두 직함 없이
}

// 같은 이름이 연속된 요일은 (시작-끝), 불연속이면 (요일,요일,...) 묶음
function groupSpan(items, fmt) {
  const byName = new Map();
  for (let i = 0; i < 6; i++) {
    const name = fmt(items[i]);
    if (!byName.has(name)) byName.set(name, []);
    byName.get(name).push(i);
  }
  const parts = [];
  for (const [name, idxs] of byName) {
    if (idxs.length === 1) {
      parts.push(`${name}(${DAYS[idxs[0]]})`);
    } else {
      const consecutive = idxs.every((v, i) => i === 0 || v === idxs[i - 1] + 1);
      if (consecutive) {
        parts.push(`${name}(${DAYS[idxs[0]]}-${DAYS[idxs[idxs.length - 1]]})`);
      } else {
        parts.push(`${name}(${idxs.map(i => DAYS[i]).join(',')})`);
      }
    }
  }
  return parts.join(', ');
}

async function buildDawn() {
  const tables = await getTables(SOURCES.dawn);
  for (const t of tables) {
    if (t.length < 6) continue;
    const dateRow = t[2];
    if (!dateRow.some(c => c === monStr)) continue;
    const preachers = t[3].slice(1, 7);
    const captions  = t[4].slice(1, 7);
    const accomps   = t[5].slice(1, 7);
    const preacherStr = groupSpan(preachers, fmtPreacherCaption);
    const captionStr  = groupSpan(captions,  fmtPreacherCaption);
    const accompStr   = groupSpan(accomps,   fmtAccomp);
    return `${monStr}-${satD.getDate()} 새벽기도회 담당\n설교: ${preacherStr}\n자막: ${captionStr}\n반주: ${accompStr}`;
  }
  throw new Error(`Dawn week not found for ${monStr}`);
}

function stripTitle(s) {
  return String(s || '').replace(/\s*목사$/, '').replace(/\d+-\d+$/, '').trim();
}

async function buildWed() {
  const tables = await getTables(SOURCES.wed);
  for (const t of tables) {
    for (const row of t) {
      if (row[1] === wedStr) {
        return `${wedStr}(수) 수요예배 담당\n설교: ${stripTitle(row[3])}\n찬양: ${stripTitle(row[4])}\n음향: ${stripTitle(row[5])}\nPD: ${stripTitle(row[6])}`;
      }
    }
  }
  throw new Error(`Wed row not found for ${wedStr}`);
}

async function buildFri() {
  const tables = await getTables(SOURCES.fri);
  for (const t of tables) {
    if (t.length === 0) continue;
    if (!t[0].some(c => c.includes('날짜') || c.includes('찬양') || c.includes('기도용사'))) continue;
    for (let i = 1; i < t.length; i++) {
      const r = t[i];
      const dateCell = String(r[0] || '').replace(/[^0-9/]/g, '');
      if (dateCell === friStr) {
        return `${friStr}(금) 금요성령집회 담당\n찬양: ${r[1]}\nPD: ${r[2]}\n자막: ${r[3]}\n기도용사: ${r[4]}`;
      }
    }
  }
  throw new Error(`Fri row not found for ${friStr}`);
}

async function buildSun() {
  const tables = await getTables(SOURCES.sun);
  for (const t of tables) {
    for (let i = 1; i < t.length; i++) {
      const r = t[i];
      if (r[0] === sunStr) {
        // 컬럼: 날짜, 1부사회, 2부사회, 3부사회, (빈), 1부 pd, 1부 자막, (빈), 2부 pd
        const sec3 = r[3], col5 = r[5], col6 = r[6], col8 = r[8];
        return `${sunStr}(일) 주일예배 담당\n1부 사회: ${r[1]}\n2부 사회: ${r[2]}\n3부 사회: ${sec3}\n1부 PD: ${col5}\n1부 자막: ${col6}\n2부 PD: ${col8}`;
      }
    }
  }
  throw new Error(`Sun row not found for ${sunStr}`);
}

async function buildNations() {
  const tables = await getTables(SOURCES.nations);
  for (const t of tables) {
    for (let i = 1; i < t.length; i++) {
      const r = t[i];
      if (r[0] === sunStr) {
        const f = v => (String(v || '').trim() || '미정');
        return `${sunStr}(일) 열방예배 담당\n사회: ${f(r[1])}\n찬양: ${f(r[2])}\n영상/송출: ${f(r[3])}\n자막: ${f(r[4])}\n특순: ${f(r[5])}\n대표기도: ${f(r[6])}`;
      }
    }
  }
  throw new Error(`Nations row not found for ${sunStr}`);
}

const sections = [];
sections.push(await buildDawn());
sections.push(await buildWed());
sections.push(await buildFri());
sections.push(await buildSun());
sections.push(await buildNations());

console.log('\n----- Generated content -----');
for (const s of sections) console.log(s + '\n---');

const existing = await getAllChildren(TARGET_PAGE);
console.log(`\nDeleting ${existing.length} existing blocks...`);
for (const b of existing) {
  await notion(`/blocks/${b.id}`, { method: 'DELETE' });
}

const newBlocks = sections.map(text => ({
  object: 'block',
  type: 'paragraph',
  paragraph: { rich_text: [{ type: 'text', text: { content: text } }] },
}));

await notion(`/blocks/${TARGET_PAGE}/children`, {
  method: 'PATCH',
  body: { children: newBlocks },
});

console.log('\n✅ Notion 한 주간 예배 담당자 페이지 갱신 완료.');

await updateDailySummary(sections);

console.log('✅ Notion 매일의 향기 상단 예배 담당자 요약 갱신 완료.');
