// 교회 Notion 원자료 → 앱 일정(주일·수요·금요·큐티) 자동 동기화
//
// 지금까지 자동으로 갱신되던 것은 '한 주간 예배 담당자'(leaders-update.js) 하나뿐이었고,
// 주일·수요·금요·큐티 일정은 data.js에 박힌 정적 스냅샷이라 날짜가 지나면 화면이 비었습니다.
// 이 스크립트는 기존 워크플로와 같은 NOTION_TOKEN으로 네 개 원본 페이지를 읽어
// schedules-auto.js 를 만들고, index.html이 data.js 다음에 그 파일을 불러와 최신 일정을 덮어씁니다.
//
// 실행:  NOTION_TOKEN=... node scripts/update-schedules.mjs
// 확인:  NOTION_TOKEN=... node scripts/update-schedules.mjs --inspect
//        (원본 페이지 구조와 표 머리글만 출력하고 파일은 만들지 않습니다. 처음 한 번 수동 실행으로 확인 권장)

import { writeFile } from 'node:fs/promises';
import process from 'node:process';

const token = process.env.NOTION_TOKEN;
if (!token) throw new Error('NOTION_TOKEN secret is missing.');

const OUT_FILE = 'schedules-auto.js';
const INSPECT = process.argv.includes('--inspect');

// 원본 페이지: 기존 update-weekly-schedule-notion.mjs와 같은 페이지입니다.
const SOURCES = {
  sun: { page: '2df5e604d8c6816481c6f31a7070a2d4', label: '주일예배' },
  wed: { page: '2e15e604d8c6802f8284dd7ccc553b4f', label: '수요예배 담당자' },
  fri: { page: '2e35e604d8c681df8d57cdbab62ed6ec', label: '금요성령집회' },
  qt: { page: '2df5e604d8c68153b64dc76accb69102', label: '매일의 향기(큐티)' }
};

// 앱에 넣을 날짜 범위(오늘 기준). 지난 일정은 화면에서 걸러지므로 여유 있게 두고,
// 너무 먼 과거·미래는 파일이 커지지 않도록 자릅니다.
const PAST_DAYS = 120;
const FUTURE_DAYS = 400;

const DOW = ['일', '월', '화', '수', '목', '금', '토'];

// ---------------------------------------------------------------------------
// Notion API
// ---------------------------------------------------------------------------

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function notion(path, options = {}) {
  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (res.ok) {
      if (options.method === 'DELETE') return null;
      return res.json();
    }

    const body = await res.text();
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt === maxAttempts) {
      throw new Error(`Notion API ${res.status} ${path}: ${body}`);
    }
    const retryAfter = Number(res.headers.get('retry-after'));
    const delayMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1500 * attempt;
    console.log(`Notion API ${res.status}; retrying in ${delayMs}ms (${attempt}/${maxAttempts})`);
    await sleep(delayMs);
  }
}

async function getAllChildren(blockId) {
  const all = [];
  let cursor = '';
  do {
    const qs = new URLSearchParams({ page_size: '100' });
    if (cursor) qs.set('start_cursor', cursor);
    const data = await notion(`/blocks/${blockId}/children?${qs}`);
    all.push(...data.results.filter(Boolean));
    cursor = data.has_more ? data.next_cursor : '';
  } while (cursor);
  return all;
}

const cellText = cell => (cell || []).map(t => t.plain_text || '').join('').trim();

function blockText(block) {
  const body = block[block.type];
  if (!body || !body.rich_text) return '';
  return body.rich_text.map(t => t.plain_text || '').join('');
}

// 데이터베이스(표 대신 DB로 만든 경우)의 속성을 표 모양으로 바꿉니다.
function propertyText(property) {
  if (!property) return '';
  const rich = property.title || property.rich_text;
  if (Array.isArray(rich)) return rich.map(t => t.plain_text || '').join('').trim();
  if (property.type === 'date' || property.date) {
    const date = property.date;
    if (!date || !date.start) return '';
    const [year, month, day] = date.start.slice(0, 10).split('-').map(Number);
    return `${month}/${day}(${DOW[new Date(Date.UTC(year, month - 1, day)).getUTCDay()]})`;
  }
  if (property.type === 'select' || property.select) return property.select ? property.select.name : '';
  if (property.type === 'multi_select' || property.multi_select) return (property.multi_select || []).map(v => v.name).join(', ');
  if (property.type === 'number' || typeof property.number === 'number') return property.number === null ? '' : String(property.number);
  return '';
}

async function databaseRows(databaseId) {
  const pages = [];
  let cursor = '';
  do {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const data = await notion(`/databases/${databaseId}/query`, { method: 'POST', body });
    pages.push(...(data.results || []));
    cursor = data.has_more ? data.next_cursor : '';
  } while (cursor);
  if (!pages.length) return [];

  const header = Object.keys(pages[0].properties || {});
  const rows = pages.map(page => header.map(name => propertyText((page.properties || {})[name])));
  return [header, ...rows];
}

// 표(table)를 모두 모읍니다. 컬럼 레이아웃·토글 안에 든 표도 포함하고,
// 큐티 페이지처럼 월별 하위 페이지로 나뉜 경우를 위해 하위 페이지(depth)까지 들어갑니다.
// 어떤 블록 종류가 있는지 세어 두면, 표를 못 찾았을 때 원인을 로그로 바로 알 수 있습니다.
const blockTypeCounts = {};
function countBlockType(type) {
  blockTypeCounts[type] = (blockTypeCounts[type] || 0) + 1;
}

async function collectTables(blockId, { depth = 0, maxDepth = 0, out = [] } = {}) {
  const children = await getAllChildren(blockId);
  for (const block of children) {
    countBlockType(block.type);
    if (block.type === 'table') {
      const rows = await getAllChildren(block.id);
      out.push(rows.filter(r => r.type === 'table_row').map(r => r.table_row.cells.map(cellText)));
      continue;
    }
    if (block.type === 'synced_block') {
      const target = (block.synced_block && block.synced_block.synced_from && block.synced_block.synced_from.block_id) || block.id;
      await collectTables(target, { depth, maxDepth, out });
      continue;
    }
    if (block.type === 'column_list' || block.type === 'column' || block.type === 'toggle') {
      await collectTables(block.id, { depth, maxDepth, out });
      continue;
    }
    if (block.type === 'child_database') {
      const rows = await databaseRows(block.id);
      if (rows.length) out.push(rows);
      continue;
    }
    if (block.type === 'child_page' && depth < maxDepth) {
      await collectTables(block.id, { depth: depth + 1, maxDepth, out });
    }
  }
  return out;
}

async function collectTextLines(blockId, { depth = 0, maxDepth = 0, out = [] } = {}) {
  const children = await getAllChildren(blockId);
  for (const block of children) {
    if (['paragraph', 'bulleted_list_item', 'numbered_list_item', 'quote', 'heading_1', 'heading_2', 'heading_3', 'code'].includes(block.type)) {
      const text = blockText(block).trim();
      if (text) out.push(text);
      continue;
    }
    if (block.type === 'synced_block') {
      const target = (block.synced_block && block.synced_block.synced_from && block.synced_block.synced_from.block_id) || block.id;
      await collectTextLines(target, { depth, maxDepth, out });
      continue;
    }
    if (block.type === 'column_list' || block.type === 'column' || block.type === 'toggle') {
      await collectTextLines(block.id, { depth, maxDepth, out });
      continue;
    }
    if (block.type === 'child_page' && depth < maxDepth) {
      await collectTextLines(block.id, { depth: depth + 1, maxDepth, out });
    }
  }
  return out;
}

async function pageTitle(pageId) {
  try {
    const page = await notion(`/pages/${pageId}`);
    const props = page.properties || {};
    for (const value of Object.values(props)) {
      if (value.type === 'title') return value.title.map(t => t.plain_text || '').join('').trim();
    }
  } catch (error) {
    console.warn(`(페이지 제목을 읽지 못했습니다: ${pageId}) ${error.message}`);
  }
  return '';
}

// ---------------------------------------------------------------------------
// 열 이름표: 실제 노션 표의 머리글을 보고 열 위치를 스스로 찾습니다.
// 머리글이 없는 표는 지금까지 동작하던 열 순서(fallback)로 읽습니다.
// ---------------------------------------------------------------------------

const COLUMN_SPECS = {
  sun: {
    date: ['날짜', '일자', '예배일', '주일'],
    targets: [
      { target: 'staff', key: '1부 사회', aliases: ['1부사회', '1부 사회자', '1부사회자'] },
      { target: 'staff', key: '2부 사회', aliases: ['2부사회', '2부 사회자', '2부사회자'] },
      { target: 'staff', key: '3부 사회', aliases: ['3부사회', '3부 사회자', '3부사회자'] },
      { target: 'staff', key: '1부 PD', aliases: ['1부pd', '1부피디'] },
      { target: 'staff', key: '2부 PD', aliases: ['2부pd', '2부피디'] },
      { target: 'staff', key: '3부 PD', aliases: ['3부pd', '3부피디'] },
      { target: 'staff', key: '1부 자막', aliases: ['1부자막'] },
      { target: 'staff', key: '2부 자막', aliases: ['2부자막'] },
      { target: 'staff', key: '3부 자막', aliases: ['3부자막'] },
      { target: 'staff', key: '1부 찬양', aliases: ['1부찬양'] },
      { target: 'staff', key: '2부 찬양', aliases: ['2부찬양'] }
    ],
    fields: [
      { key: 'passage', aliases: ['본문', '성경본문', '본문말씀'] },
      { key: 'title', aliases: ['제목', '설교제목'] },
      { key: 'preacher', aliases: ['설교', '설교자', '강사'] },
      { key: 'week', aliases: ['주차', '주'] }
    ],
    fallback: {
      // 기존 buildSun()이 쓰던 열 순서: 날짜, 1부사회, 2부사회, 3부사회, (빈칸), 1부PD, 1부자막, (빈칸), 2부PD
      staff: { '1부 사회': 1, '2부 사회': 2, '3부 사회': 3, '1부 PD': 5, '1부 자막': 6, '2부 PD': 8 },
      minColumns: 7,
      // 같은 페이지의 '열방예배' 표 등 다른 표를 잘못 읽지 않도록 거르는 표시
      excludeWords: ['열방', '특순', '송출', '영상']
    }
  },

  wed: {
    date: ['날짜', '일자', '예배일'],
    targets: [
      { target: 'field', key: 'preacher', aliases: ['설교', '설교자'] },
      { target: 'field', key: 'worship', aliases: ['찬양'] },
      { target: 'field', key: 'sound', aliases: ['음향'] },
      { target: 'field', key: 'pd', aliases: ['pd', '피디'] },
      { target: 'field', key: 'subject', aliases: ['본문', '제목', '주제', '강의제목'] },
      { target: 'field', key: 'lec', aliases: ['강', '강의', '회차', '과'] }
    ],
    fallback: {
      // 기존 buildWed()가 쓰던 열 순서: 날짜, 설교, 찬양, 음향, PD
      fields: { preacher: 1, worship: 2, sound: 3, pd: 4 },
      minColumns: 5,
      excludeWords: []
    }
  },

  fri: {
    date: ['날짜', '일자', '집회일'],
    targets: [
      { target: 'field', key: 'worship', aliases: ['찬양'] },
      { target: 'field', key: 'pd', aliases: ['pd', '피디'] },
      { target: 'field', key: 'caption', aliases: ['자막'] },
      { target: 'field', key: 'prayer', aliases: ['기도용사', '기도'] },
      { target: 'field', key: 'passage', aliases: ['본문', '성경본문', '본문말씀'] },
      { target: 'field', key: 'title', aliases: ['제목', '주제'] },
      { target: 'field', key: 'preacher', aliases: ['강사', '설교', '설교자'] }
    ],
    fallback: {
      // 기존 buildFri()가 쓰던 열 순서: 날짜, 찬양, PD, 자막, 기도용사
      fields: { worship: 1, pd: 2, caption: 3, prayer: 4 },
      minColumns: 5,
      excludeWords: []
    }
  },

  qt: {
    date: ['날짜', '일자', '날'],
    targets: [
      { target: 'field', key: 'passage', aliases: ['본문', '말씀', '성경본문', '본문말씀'] },
      { target: 'field', key: 'title', aliases: ['제목', '주제'] }
    ],
    fallback: {
      // 머리글 없는 표: 날짜, 본문, (제목)
      fields: { passage: 1, title: 2 },
      minColumns: 2,
      excludeWords: []
    }
  }
};

function norm(text) {
  return String(text || '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[\s_·.\-–—:：]/g, '')
    .toLowerCase();
}

function mapColumns(headerRow, spec) {
  const mapping = { date: -1, staff: {}, fields: {}, hits: 0 };
  (headerRow || []).forEach((raw, index) => {
    const value = norm(raw);
    if (!value) return;
    if (mapping.date < 0 && spec.date.some(alias => value === norm(alias) || value.includes(norm(alias)))) {
      mapping.date = index;
      mapping.hits++;
      return;
    }
    for (const item of spec.targets) {
      if (!item.aliases.some(alias => value === norm(alias))) continue;
      if (item.target === 'staff') {
        if (mapping.staff[item.key] === undefined) mapping.staff[item.key] = index;
      } else if (mapping.fields[item.key] === undefined) {
        mapping.fields[item.key] = index;
      }
      mapping.hits++;
      return;
    }
  });
  return mapping;
}

function looksExcluded(rows, excludeWords) {
  if (!excludeWords || !excludeWords.length) return false;
  const head = rows.slice(0, 2).flat().join(' ');
  return excludeWords.some(word => head.includes(word));
}

function fallbackMapping(spec) {
  const fallback = spec.fallback;
  const mapping = { date: 0, staff: Object.assign({}, fallback.staff || {}), fields: Object.assign({}, fallback.fields || {}), hits: 0 };
  return mapping;
}

// ---------------------------------------------------------------------------
// 날짜·값 정리
// ---------------------------------------------------------------------------

function kstToday() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 3600 * 1000);
  return new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate()));
}

const TODAY = kstToday();

// "11/30(일)", "11/30", "2026-11-30", "11월 30일" 등을 YYYY-MM-DD로.
// 연도가 없으면 오늘과 가장 가까운 해를 고르되, 요일 표기가 있으면 요일까지 맞는 해를 씁니다.
function parseDateCell(text, ref = TODAY) {
  const raw = String(text || '').trim();
  if (!raw) return null;
  const match = raw.match(/(?:(\d{4})\s*[.\-/년]\s*)?(\d{1,2})\s*[.\-/월]\s*(\d{1,2})/);
  if (!match) return null;

  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const explicitYear = match[1] ? Number(match[1]) : 0;
  const dowMatch = raw.match(/\(\s*([일월화수목금토])\s*\)/);
  const wantDow = dowMatch ? DOW.indexOf(dowMatch[1]) : -1;

  const years = explicitYear ? [explicitYear] : [ref.getUTCFullYear() - 1, ref.getUTCFullYear(), ref.getUTCFullYear() + 1];
  let best = null;
  for (const year of years) {
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) continue;
    const diffDays = Math.round((date.getTime() - ref.getTime()) / 86400000);
    // 요일 표기가 있으면 우선하되, 너무 먼 해를 고르지 않도록 어긋남은 '60일' 정도의 벌점으로만 둡니다.
    const dowOk = wantDow < 0 || date.getUTCDay() === wantDow;
    const score = Math.abs(diffDays) + (dowOk ? 0 : 60);
    if (!best || score < best.score) best = { score, date, diffDays };
  }
  if (!best) return null;
  return { date: best.date.toISOString().slice(0, 10), diffDays: best.diffDays };
}

function cleanName(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/^[-–—·ㆍ,]+|[-–—·ㆍ,]+$/g, '')
    .trim();
}

function prayerList(value) {
  return String(value || '')
    .split(/[,\n/·ㆍ、\s]+/)
    .map(cleanName)
    .filter(name => name && name !== '-' && name !== '·');
}

function positiveInt(value) {
  const match = String(value || '').match(/\d+/);
  return match ? Number(match[0]) : 0;
}

// ---------------------------------------------------------------------------
// 표 → 앱 데이터
// ---------------------------------------------------------------------------

function buildItem(section, mapping, row) {
  const dateText = row[mapping.date];
  const parsed = parseDateCell(dateText);
  if (!parsed) return null;
  if (parsed.diffDays < -PAST_DAYS || parsed.diffDays > FUTURE_DAYS) return null;

  const item = { date: parsed.date };
  let filled = 0;

  for (const [key, index] of Object.entries(mapping.staff || {})) {
    const name = cleanName(row[index]);
    if (!name) continue;
    item.staff = item.staff || {};
    item.staff[key] = name;
    filled++;
  }

  for (const [key, index] of Object.entries(mapping.fields || {})) {
    const raw = cleanName(row[index]);
    if (!raw) continue;
    if (key === 'prayer') {
      const names = prayerList(raw);
      if (names.length) {
        item.prayer = names;
        filled++;
      }
    } else if (key === 'lec' || key === 'week') {
      const number = positiveInt(raw);
      if (number) {
        item[key] = number;
        filled++;
      }
    } else {
      item[key] = raw;
      filled++;
    }
  }

  return filled ? item : null;
}

function itemsFromTables(section, tables) {
  const spec = COLUMN_SPECS[section];
  const items = new Map();

  // 1단계: 머리글이 있는 표를 먼저 찾습니다. (예: 주일 페이지에서 '열방예배' 표와 구분)
  const headerMatches = [];
  for (const rows of tables) {
    if (!rows.length) continue;
    for (let r = 0; r < Math.min(rows.length, 3); r++) {
      const mapping = mapColumns(rows[r], spec);
      const isHeader = (mapping.hits >= 2 && mapping.date >= 0) || mapping.hits >= 3;
      if (!isHeader) continue;
      headerMatches.push({ rows, mapping, headerRow: r });
      break;
    }
  }

  if (headerMatches.length) {
    headerMatches.forEach(({ rows, mapping, headerRow }, index) => {
      const staffKeys = Object.keys(mapping.staff);
      const fieldKeys = Object.keys(mapping.fields);
      console.log(`  · ${section} 표 ${index + 1}: 머리글 ${headerRow + 1}행 · 날짜 ${mapping.date}열 · 담당 [${staffKeys.join(', ')}] · 항목 [${fieldKeys.join(', ')}]`);
      console.log(`    머리글 값: ${JSON.stringify((rows[headerRow] || []).slice(0, 14))}`);
      for (let r = headerRow + 1; r < rows.length; r++) {
        const item = buildItem(section, mapping, rows[r]);
        if (item) items.set(item.date, Object.assign(items.get(item.date) || {}, item));
      }
    });
    return [...items.values()].sort((a, b) => a.date.localeCompare(b.date));
  }

  // 2단계: 머리글이 하나도 없으면 기존에 동작하던 열 순서로 읽습니다.
  // 머리글이 없으면 어느 열이 무엇인지 확인할 수 없으므로, 일정이 나온 첫 표만 사용합니다.
  const { minColumns, excludeWords } = spec.fallback;
  for (const rows of tables) {
    if (!rows.length) continue;
    if ((rows[0] || []).length < minColumns) continue;
    if (looksExcluded(rows, excludeWords)) continue;
    console.log(`  · ${section} 표: 머리글이 없어 기존 열 순서로 읽습니다.`);
    const mapping = fallbackMapping(spec);
    for (const row of rows) {
      const item = buildItem(section, mapping, row);
      if (item) items.set(item.date, Object.assign(items.get(item.date) || {}, item));
    }
    if (items.size) break;
  }
  return [...items.values()].sort((a, b) => a.date.localeCompare(b.date));
}

// 본문 모양(예: 「시 135:1~12」, 「대상 1~3장」, 「고전 11:1~16」)인지 확인하는 규칙
// 장·절 표시(':')나 '장/편/절'이 없으면 본문으로 보지 않습니다.
// ("천성진 11" 같은 인도자 목록 줄을 본문으로 잘못 읽던 문제를 막습니다.)
const PASSAGE_RE = /^(?:[1-3]\s*)?[가-힣]{1,4}\s*\d+(?:\s*[:：]\s*\d+)?(?:\s*[~–—-]\s*\d+(?:\s*[:：]\s*\d+)?)?(?:\s*[장편])?/;

function looksLikePassage(text) {
  const value = String(text || '').trim();
  if (!value) return false;
  if (/[\n\r]/.test(value)) return false;
  if (!/[:：장편절]/.test(value)) return false;
  return PASSAGE_RE.test(value);
}

// 한 줄 텍스트로 적힌 큐티 일정("11/27(금) 시 120:1~7 제목")을 읽습니다.
function itemsFromLines(lines) {
  const items = new Map();
  for (const line of lines) {
    const text = line.trim();
    const datePart = text.match(/^(\d{1,2})\s*[/.월]\s*(\d{1,2})\s*(?:\(([일월화수목금토])\))?/);
    if (!datePart) continue;
    const rest = text.slice(datePart[0].length).replace(/^[\s|,\-–—:：·]+/, '');
    if (!rest) continue;

    const passageMatch = rest.match(PASSAGE_RE);
    const passage = passageMatch && looksLikePassage(passageMatch[0]) ? passageMatch[0].trim() : '';
    const title = passageMatch ? rest.slice(passageMatch[0].length).replace(/^[\s|,\-–—:：·]+/, '').trim() : rest;

    const parsed = parseDateCell(`${datePart[1]}/${datePart[2]}${datePart[3] ? `(${datePart[3]})` : ''}`);
    if (!parsed) continue;
    if (parsed.diffDays < -PAST_DAYS || parsed.diffDays > FUTURE_DAYS) continue;
    // 본문처럼 보이는 부분이 없으면(공지·메모 문장) 큐티 일정으로 보지 않습니다.
    if (!passage) continue;

    const item = { date: parsed.date, passage };
    if (title) item.title = title;
    items.set(item.date, Object.assign(items.get(item.date) || {}, item));
  }
  return [...items.values()].sort((a, b) => a.date.localeCompare(b.date));
}

// "11월: 시편 120–134편" 같은 월 요약 줄
function monthsFromLines(lines) {
  const months = {};
  for (const line of lines) {
    const match = line.trim().match(/^(\d{1,2})\s*월\s*[:：]\s*(.+)$/);
    if (!match) continue;
    const month = Number(match[1]);
    if (month >= 1 && month <= 12) months[month] = match[2].trim();
  }
  return months;
}

// ---------------------------------------------------------------------------
// 출력 파일
// ---------------------------------------------------------------------------

function serialize(value, indent = 2) {
  return JSON.stringify(value, null, indent);
}

function buildFile({ sunday, wednesday, friday, qt, qtMonths }) {
  const generatedAt = new Date().toISOString();
  const counts = `주일 ${sunday.length} · 수요 ${wednesday.length} · 금요 ${friday.length} · 큐티 ${qt.length}`;
  const monthKeys = Object.keys(qtMonths);
  const monthsBlock = monthKeys.length
    ? `  churchData.qt.months = Object.assign({}, churchData.qt.months || {}, ${serialize(qtMonths).replace(/\n/g, '\n  ')});\n`
    : '';

  return `// ⚠️ 자동 생성 파일입니다. 직접 고치지 마세요. (수정은 scripts/update-schedules.mjs 또는 Notion 원본에서)
// 원본: 교회 Notion 「주일예배」 「수요예배 담당자」 「금요성령집회」 「매일의 향기」
// 생성: ${generatedAt} · ${counts}
// GitHub Actions(.github/workflows/update-weekly-leaders.yml)가 매주 금요일 밤·토요일 아침에 다시 만듭니다.
// data.js의 스냅샷 위에 최신 일정만 덮어쓰고, 노션이 준 값이 없는 항목은 기존 값을 그대로 둡니다.

(function () {
  if (typeof churchData === 'undefined') return;

  function mergeByDate(list, incoming) {
    if (!Array.isArray(list) || !Array.isArray(incoming) || !incoming.length) return;
    incoming.forEach(function (item) {
      var found = list.find(function (existing) { return existing.date === item.date; });
      if (!found) {
        list.push(item);
        return;
      }
      Object.keys(item).forEach(function (key) {
        var value = item[key];
        if (value === undefined || value === null) return;
        if (typeof value === 'string' && !value.trim()) return;
        if (Array.isArray(value) && !value.length) return;
        if (key === 'staff') {
          found.staff = Object.assign({}, found.staff || {}, value);
          return;
        }
        found[key] = value;
      });
    });
    list.sort(function (a, b) { return a.date.localeCompare(b.date); });
  }

  mergeByDate(churchData.sunday && churchData.sunday.items, ${serialize(sunday)});

  mergeByDate(churchData.wednesday && churchData.wednesday.items, ${serialize(wednesday)});

  mergeByDate(churchData.friday && churchData.friday.items, ${serialize(friday)});

  mergeByDate(churchData.qt && churchData.qt.items, ${serialize(qt)});

  if (churchData.qt && churchData.qt.items && churchData.qt.items.length) {
${monthsBlock}    var months = churchData.qt.items.map(function (item) { return Number(item.date.slice(5, 7)); });
    var first = Math.min.apply(null, months);
    var last = Math.max.apply(null, months);
    churchData.qt.subtitle = first === last ? first + '월 큐티 일정' : first + '–' + last + '월 큐티 일정';
  }
})();
`;
}

// ---------------------------------------------------------------------------
// 실행
// ---------------------------------------------------------------------------

async function readSource(key) {
  const source = SOURCES[key];
  const maxDepth = key === 'qt' ? 2 : 1;
  const tables = await collectTables(source.page, { maxDepth });
  const lines = await collectTextLines(source.page, { maxDepth });
  return { source, tables, lines };
}

const report = [];
const sources = {};
for (const key of Object.keys(SOURCES)) {
  sources[key] = await readSource(key);
  report.push(`- ${SOURCES[key].label}: 표 ${sources[key].tables.length}개, 텍스트 줄 ${sources[key].lines.length}개`);
}

console.log('원본 읽기 결과');
for (const line of report) console.log(line);
console.log(`  블록 종류: ${Object.entries(blockTypeCounts).map(([type, count]) => `${type} ${count}`).join(', ') || '(없음)'}`);

if (INSPECT) {
  for (const key of Object.keys(SOURCES)) {
    const { source, tables, lines } = sources[key];
    const title = await pageTitle(source.page);
    const spec = COLUMN_SPECS[key];
    console.log(`\n=== ${source.label} (${source.page})${title ? ` · 제목: ${title}` : ''}`);
    tables.forEach((rows, index) => {
      console.log(`  [표 ${index + 1}] 행 ${rows.length} · 열 ${(rows[0] || []).length}`);
      console.log(`    머리글: ${JSON.stringify((rows[0] || []).slice(0, 12))}`);
      if (rows[1]) console.log(`    첫 행  : ${JSON.stringify(rows[1].slice(0, 12))}`);
      const mapping = mapColumns(rows[0], spec);
      console.log(`    인식  : 날짜=${mapping.date} 담당=${JSON.stringify(mapping.staff)} 항목=${JSON.stringify(mapping.fields)} (일치 ${mapping.hits})`);
    });
    if (!tables.length) console.log('  (표가 없습니다)');
    const sample = lines.slice(0, 8);
    if (sample.length) {
      console.log('  텍스트 예시:');
      sample.forEach(text => console.log(`    ${text.slice(0, 100)}`));
    }
  }
  console.log('\n--inspect 모드: 파일을 만들지 않았습니다.');
  process.exit(0);
}

const sunday = itemsFromTables('sun', sources.sun.tables);
const wednesday = itemsFromTables('wed', sources.wed.tables);
const friday = itemsFromTables('fri', sources.fri.tables);
const qtFromTables = itemsFromTables('qt', sources.qt.tables);
const qtFromLines = itemsFromLines(sources.qt.lines);
const qtMerged = new Map();
for (const item of [...qtFromTables, ...qtFromLines]) {
  qtMerged.set(item.date, Object.assign(qtMerged.get(item.date) || {}, item));
}
const qt = [...qtMerged.values()].sort((a, b) => a.date.localeCompare(b.date));
const qtMonths = monthsFromLines(sources.qt.lines);

const upcoming = items => items.filter(item => item.date >= TODAY.toISOString().slice(0, 10)).length;

console.log('\n동기화 결과');
console.log(`  주일예배        ${sunday.length}건 (오늘 이후 ${upcoming(sunday)}건)`);
console.log(`  수요예배        ${wednesday.length}건 (오늘 이후 ${upcoming(wednesday)}건)`);
console.log(`  금요성령집회    ${friday.length}건 (오늘 이후 ${upcoming(friday)}건)`);
console.log(`  큐티 본문       ${qt.length}건 (오늘 이후 ${upcoming(qt)}건)`);

const coreEmpty = !sunday.length && !wednesday.length && !friday.length;
if (coreEmpty) {
  console.error('\n✗ 주일·수요·금요 일정을 하나도 읽지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.');
  console.error('  NOTION_TOKEN=... node scripts/update-schedules.mjs --inspect 로 원본 표 구조를 확인해 주세요.');
  console.error('  기존 schedules-auto.js 는 덮어쓰지 않았습니다.');
  process.exit(1);
}

if (!qt.length) {
  console.warn('\n! 큐티 본문은 읽지 못했습니다. (기존 data.js 큐티 데이터는 그대로 남습니다)');
  console.warn('  --inspect 로 「매일의 향기」 페이지 구조를 확인해 주세요.');
}

// 큐티 페이지는 표 없이 글줄로만 되어 있는 경우가 많아, 읽은 줄을 로그에 남겨 둡니다.
// (결과가 비거나 적을 때 원본 표기를 바로 확인할 수 있게 합니다.)
if (qt.length < 5 && sources.qt.lines.length) {
  console.log('\n큐티 원본 글줄(진단용):');
  sources.qt.lines.slice(0, 20).forEach(text => console.log(`  | ${text.slice(0, 140).replace(/\n/g, ' ⏎ ')}`));
}

await writeFile(OUT_FILE, buildFile({ sunday, wednesday, friday, qt, qtMonths }), 'utf8');
console.log(`\n✅ ${OUT_FILE} 갱신 완료`);
