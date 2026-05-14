function syncHomeHeader(){
  const isHome = document.getElementById('home')?.classList.contains('active');
  document.body.classList.toggle('not-home', !isHome);
}

const homeHeaderObserver = new MutationObserver(syncHomeHeader);
['home','list','detail'].forEach(id => {
  const el = document.getElementById(id);
  if (el) homeHeaderObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
});

window.addEventListener('DOMContentLoaded', syncHomeHeader);
setTimeout(syncHomeHeader, 0);
