// 큐티 본문은 지난 날짜를 숨기지 않고 5~9월 전체를 월별로 보여줍니다.

(function () {
  function groupAllQtItems() {
    const groups = {};
    churchData.qt.items.forEach((item, index) => {
      const month = Number(item.date.slice(5, 7));
      if (!groups[month]) groups[month] = [];
      groups[month].push({ item, index });
    });
    return groups;
  }

  function qtDateInfo(dateStr) {
    const KDOW = ['일','월','화','수','목','금','토'];
    const d = new Date(dateStr + 'T00:00:00');
    return { m: d.getMonth() + 1, day: d.getDate(), dow: KDOW[d.getDay()] };
  }

  // 월 카드의 연도는 데이터에서 가져옵니다. (해가 바뀌어도 표시가 틀리지 않도록)
  function yearOf(rows) {
    const first = rows && rows[0] && rows[0].item;
    return first ? Number(first.date.slice(0, 4)) : new Date().getFullYear();
  }

  function renderQtListAll() {
    currentSection = 'qt';
    const s = churchData.qt;
    setHeader('📖 큐티 본문', s.subtitle || '큐티 일정');

    const groups = groupAllQtItems();
    const months = Object.keys(groups).map(Number).sort((a, b) => a - b);

    const body = months.map(month => {
      const summary = s.months?.[month] || '';
      const count = groups[month].length;
      const year = yearOf(groups[month]);
      return `<div class="svc-item color-qt" data-qt-month-all="${month}">
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
      el.addEventListener('click', () => renderQtMonthAll(Number(el.dataset.qtMonthAll)));
    });

    go('list');
  }

  function renderQtMonthAll(month) {
    const s = churchData.qt;
    const groups = groupAllQtItems();
    const rows = (groups[month] || []).map(({ item }) => {
      const { m, day, dow } = qtDateInfo(item.date);
      const title = item.title || item.passage;
      return `<div class="svc-item color-qt">
        <div class="svc-date"><div class="svc-m">${m}월</div><div class="svc-d">${day}</div><div class="svc-w">${dow}요일</div></div>
        <div class="svc-body"><div class="svc-title">${title}</div><div class="svc-passage">📖 ${item.passage}</div></div>
      </div>`;
    }).join('');

    const summary = s.months?.[month] || '';
    const year = yearOf(groups[month]);
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
