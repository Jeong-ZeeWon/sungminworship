function syncHomeHeader(){
  const isHome = document.getElementById('home')?.classList.contains('active');
  document.body.classList.toggle('not-home', !isHome);
  const badge = document.querySelector('[data-section="qt"] .m-badge');
  if (!badge) return;
  const qt = typeof churchData !== 'undefined' ? churchData.qt : null;
  const items = qt && Array.isArray(qt.items) ? qt.items : [];
  if (!items.length) return;
  const months = items.map(item => Number(item.date.slice(5, 7)));
  const first = Math.min(...months);
  const last = Math.max(...months);
  badge.replaceChildren(first === last ? `${first}월` : `${first}–${last}월`);
}

const homeHeaderObserver = new MutationObserver(syncHomeHeader);
['home','list','detail'].forEach(id => {
  const el = document.getElementById(id);
  if (el) homeHeaderObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
});

window.addEventListener('DOMContentLoaded', syncHomeHeader);
setTimeout(syncHomeHeader, 0);
