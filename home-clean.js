function syncHomeHeader(){
  const isHome = document.getElementById('home')?.classList.contains('active');
  document.body.classList.toggle('not-home', !isHome);
  const badge = document.querySelector('[data-section="qt"] .m-badge');
  if (!badge) return;
  const qt = typeof churchData !== 'undefined' ? churchData.qt : null;
  const items = qt && Array.isArray(qt.items) ? qt.items : [];
  if (!items.length) return;
  // 앞으로 남은 큐티 본문의 달만 보여 줍니다. (지난 본문이 범위를 넓히지 않도록)
  const pad = n => (n < 10 ? '0' : '') + n;
  const now = new Date();
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const upcoming = items.filter(item => item.date >= today);
  const basis = (upcoming.length ? upcoming : items).slice().sort((a, b) => a.date.localeCompare(b.date));
  const first = Number(basis[0].date.slice(5, 7));
  const last = Number(basis[basis.length - 1].date.slice(5, 7));
  badge.replaceChildren(first === last ? `${first}월` : `${first}–${last}월`);
}

const homeHeaderObserver = new MutationObserver(syncHomeHeader);
['home','list','detail'].forEach(id => {
  const el = document.getElementById(id);
  if (el) homeHeaderObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
});

window.addEventListener('DOMContentLoaded', syncHomeHeader);
setTimeout(syncHomeHeader, 0);
