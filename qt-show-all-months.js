// 큐티 본문은 지난 날짜를 숨기지 않고 월별로 보여줍니다.
// 해가 바뀌는 경우(2027년 1월 등)에도 순서가 맞도록 연-월 단위로 묶습니다.

(function () {
  function groupAllQtItems() {
    const groups = {};
    churchData.qt.items.forEach((item, index) => {
      const key = item.date.slice(0, 7); // YYYY-MM
      if (!groups[key]) groups[key] = [];
      groups[key].push({ item, index });
    });
    return groups;
  }

  function qtDateInfo(dateStr) {
    const KDOW = ['일','월','화','수','목','금','토'];
    const d = new Date(dateStr + 'T00:00:00');
    return { m: d.getMonth() + 1, day: d.getDate(), dow: KDOW[d.getDay()] };
  }

  function parseMonthKey(key) {
    return { year: Number(String(key).slice(0, 4)), month: Number(String(key).slice(5, 7)) };
  }

  function renderQtListAll() {
    currentSection = 'qt';
    const s = churchData.qt;
    setHeader('📖 큐티 본문', s.subtitle || '큐티 일정');

    const groups = groupAllQtItems();
    const keys = Object.keys(groups).sort();

    const body = keys.map(key => {
      const { year, month } = parseMonthKey(key);
      const summary = s.months?.[month] || '';
      const count = groups[key].length;
      return `<div class="svc-item color-qt" data-qt-month-all="${key}">
        <div class="svc-date"><div class="svc-m">${year}</div><div class="svc-d">${month}</div><div class="svc-w">월</div></div>
        <div class="svc-body">
          <div class="svc-title">${year}년 ${month}월 큐티 본문</div>
          <div class="svc-passage">📖 ${summary || '월별 큐티 본문'}</div>
          <div class="svc-extra">전체 ${count}개 본문 보기</div>
        </div>
        <div class="svc-arr">›</div>
      </div>`;
    }).join('');

    screens.list.innerHTML = `<div class="wrap">
      <div class="list-head">
        <span class="list-icon">📖</span>
        <h2 class="list-title color-qt">큐티 본문</h2>
        <div class="list-desc"></div>
      </div>
      ${body || '<div class="theme-box" style="border-color:var(--qt)">표시할 큐티 본문이 없습니다.</div>'}
    </div>`;

    screens.list.querySelectorAll('[data-qt-month-all]').forEach(el => {
      el.addEventListener('click', () => renderQtMonthAll(el.dataset.qtMonthAll));
    });

    go('list');
  }

  function renderQtMonthAll(key) {
    const s = churchData.qt;
    const { year, month } = parseMonthKey(key);
    const groups = groupAllQtItems();
    const rows = (groups[key] || []).map(({ item }) => {
      const { m, day, dow } = qtDateInfo(item.date);
      const title = item.title || item.passage;
      return `<div class="svc-item color-qt">
        <div class="svc-date"><div class="svc-m">${m}월</div><div class="svc-d">${day}</div><div class="svc-w">${dow}요일</div></div>
        <div class="svc-body"><div class="svc-title">${title}</div><div class="svc-passage">📖 ${item.passage}</div></div>
      </div>`;
    }).join('');

    const summary = s.months?.[month] || '';
    setHeader(`📖 ${year}년 ${month}월 큐티`, summary || '월별 큐티 본문');
    screens.detail.innerHTML = `<div class="wrap">
      <div class="list-head">
        <span class="list-icon">📖</span>
        <h2 class="list-title color-qt">${year}년 ${month}월 큐티 본문</h2>
        <div class="list-desc">${summary}</div>
      </div>
      ${rows || '<div class="theme-box" style="border-color:var(--qt)">표시할 큐티 본문이 없습니다.</div>'}
    </div>`;

    go('detail');
  }

  document.addEventListener('click', function (event) {
    const qtButton = event.target.closest('[data-section="qt"]');
    if (!qtButton) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    renderQtListAll();
  }, true);
})();
