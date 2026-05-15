// 주일예배 담당자 표시 보정
// data.js 구조는 그대로 두고, 상세 화면에서 1부·2부·3부 예배별로 묶어 보여줍니다.
(function () {
  const originalRenderStaff = window.renderStaff;

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function roleSortValue(role) {
    const order = ['설교', '사회', '찬양', '기도', '대표기도', 'PD', '자막', '음향', '반주'];
    const idx = order.indexOf(role);
    return idx === -1 ? 99 : idx;
  }

  function renderSundayGroupedStaff(item) {
    if (!item.staff) {
      return '<div class="detail-sec"><div class="sec-label">예배 담당자</div><div class="s-name" style="text-align:left;color:var(--soft)">담당자 정보가 준비되지 않았습니다.</div></div>';
    }

    const groups = {
      '1부': [],
      '2부': [],
      '3부': []
    };
    const etc = [];

    Object.entries(item.staff).forEach(([key, name]) => {
      const match = key.match(/^(1부|2부|3부)\s*(.+)$/);
      if (match) {
        groups[match[1]].push({ role: match[2].trim(), name });
      } else {
        etc.push({ role: key, name });
      }
    });

    const cards = ['1부', '2부', '3부'].map(service => {
      const rows = groups[service].sort((a, b) => roleSortValue(a.role) - roleSortValue(b.role));
      const rowHtml = rows.length
        ? rows.map(row => `<div class="sun-staff-row"><span class="sun-role">${escapeHtml(row.role)}</span><span class="sun-name">${escapeHtml(row.name)}</span></div>`).join('')
        : '<div class="sun-empty">담당자 정보 없음</div>';

      return `<div class="sun-staff-card"><div class="sun-staff-title">${service} 예배</div>${rowHtml}</div>`;
    }).join('');

    const etcHtml = etc.length
      ? `<div class="sun-staff-etc">${etc.map(row => `<div class="sun-staff-row"><span class="sun-role">${escapeHtml(row.role)}</span><span class="sun-name">${escapeHtml(row.name)}</span></div>`).join('')}</div>`
      : '';

    return `<div class="detail-sec sunday-staff-sec"><div class="sec-label">예배 담당자</div><div class="sun-staff-grid">${cards}</div>${etcHtml}</div>`;
  }

  window.renderStaff = function (section, item, color) {
    if (section === 'sunday') return renderSundayGroupedStaff(item);
    return originalRenderStaff(section, item, color);
  };
})();
