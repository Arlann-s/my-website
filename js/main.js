document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.page-fade');
  const bar = document.getElementById('page-progress');
  const menu = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobileDrawer');

  requestAnimationFrame(() => main?.classList.add('ready'));

  const setMenuState = (open) => {
    drawer?.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
    menu?.setAttribute('aria-expanded', String(open));
  };

  menu?.addEventListener('click', () => setMenuState(!drawer?.classList.contains('open')));
  drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuState(false);
  }, { passive: true });

  let ticking = false;
  const updateProgress = () => {
    if (!bar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();
});