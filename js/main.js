/**
 * Main application scripts - Shared across all pages of Arlann Website
 * Features:
 * 1. Silky-smooth page transitions with top progress spine bar
 * 2. Professional responsive Mobile Navigation Drawer
 * 3. Dynamic active tab highlights (both desktop navbar & mobile drawer)
 * 4. Header scroll shadow elevation
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initNavigationHighlight();
  initMobileMenu();
  initHeaderScrollShadow();
});

// Handle browser back/forward cache (bfcache)
window.addEventListener('pageshow', (event) => {
  const main = document.querySelector('main');
  const progressBar = document.getElementById('page-progress-bar');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuIcon = menuBtn ? menuBtn.querySelector('.material-symbols-outlined') : null;

  if (main) {
    main.classList.remove('page-fade-exiting');
    main.classList.add('page-fade-loaded');
  }

  // Ensure mobile drawer is closed on back navigation
  if (drawer && drawer.classList.contains('open')) {
    drawer.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.textContent = 'menu';
    if (backdrop) {
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
    }
  }

  if (progressBar) {
    progressBar.style.width = '100%';
    setTimeout(() => {
      progressBar.style.opacity = '0';
      progressBar.style.width = '0%';
    }, 220);
  }
});

/**
 * 1. Silky-smooth Page Transitions with Top Progress Spine
 */
function initPageTransitions() {
  // Ensure top progress bar exists
  let progressBar = document.getElementById('page-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'page-progress-bar';
    document.body.prepend(progressBar);
  }

  // Ensure main has entrance transition class
  const main = document.querySelector('main');
  if (main) {
    main.classList.add('page-fade-wrapper');
    // Trigger entrance animation smoothly
    requestAnimationFrame(() => {
      main.classList.add('page-fade-loaded');
    });
  }

  // Initial load completion
  progressBar.style.opacity = '1';
  progressBar.style.width = '100%';
  setTimeout(() => {
    progressBar.style.opacity = '0';
    progressBar.style.width = '0%';
  }, 220);

  // Intercept internal link clicks for smooth exit transition
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Ignore new tabs, modifiers, hash anchors or external links
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || anchor.target === '_blank') return;
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    if (href.startsWith('#')) return;

    // Same-page anchor navigation (e.g., page/about.html#contact when already on about.html)
    const currentUrl = window.location.pathname.split('/').pop() || 'index.html';
    const targetFile = href.split('#')[0].split('/').pop();
    if (href.includes('#') && (targetFile === currentUrl || targetFile === '')) {
      // Allow default smooth scroll to anchor
      return;
    }

    // Intercept and animate exit
    e.preventDefault();

    // Animate progress spine bar
    progressBar.style.opacity = '1';
    progressBar.style.width = '75%';

    // Animate main content exit
    if (main) {
      main.classList.remove('page-fade-loaded');
      main.classList.add('page-fade-exiting');
    }

    // Navigate smoothly
    setTimeout(() => {
      window.location.href = href;
    }, 180);
  });
}

/**
 * 2. Professional Mobile Menu Drawer Controller with Backdrop Scrim
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const menuIcon = menuBtn ? menuBtn.querySelector('.material-symbols-outlined') : null;

  if (!menuBtn || !drawer) return;

  // Create or retrieve backdrop scrim overlay for mobile drawer
  let backdrop = document.getElementById('mobile-drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'mobile-drawer-backdrop';
    backdrop.className = 'fixed inset-0 top-16 bg-neutral-900/35 backdrop-blur-[2px] z-40 transition-opacity duration-300 opacity-0 pointer-events-none md:hidden';
    document.body.appendChild(backdrop);
  }

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');

    if (shouldOpen) {
      drawer.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (menuIcon) menuIcon.textContent = 'close';
      document.body.classList.add('overflow-hidden');
      if (backdrop) {
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100', 'pointer-events-auto');
      }
    } else {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      if (menuIcon) menuIcon.textContent = 'menu';
      document.body.classList.remove('overflow-hidden');
      if (backdrop) {
        backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking on backdrop
  backdrop.addEventListener('click', () => {
    toggleMenu(false);
  });

  // Close when clicking on any mobile nav link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Close when tapping outside the drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/**
 * 3. Automatically detects current page and highlights active navigation link
 */
function initNavigationHighlight() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  // Highlight Desktop Navigation
  const desktopLinks = document.querySelectorAll('header nav a[data-path]');
  desktopLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isCurrent = (pageName === 'index.html' && (href === 'index.html' || href === '../index.html' || href === '#' || href === './')) ||
                      (href.includes(pageName) && pageName !== '' && pageName !== 'index.html');

    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
      link.className = 'px-4 py-1.5 rounded-full transition-all bg-primary-container text-on-primary-container font-semibold shadow-sm';
    } else {
      link.removeAttribute('aria-current');
      link.className = 'px-4 py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all';
    }
  });

  // Highlight Mobile Drawer Navigation
  const mobileLinks = document.querySelectorAll('#mobile-drawer a[data-path]');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isCurrent = (pageName === 'index.html' && (href === 'index.html' || href === '../index.html' || href === '#' || href === './')) ||
                      (href.includes(pageName) && pageName !== '' && pageName !== 'index.html');

    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
      link.className = 'flex items-center gap-3.5 px-4 py-3 rounded-xl bg-primary-container text-on-primary-container font-semibold shadow-sm transition-all';
    } else {
      link.removeAttribute('aria-current');
      link.className = 'flex items-center gap-3.5 px-4 py-3 rounded-xl text-on-surface hover:bg-surface-container-high transition-all font-label-md text-label-md';
    }
  });
}

/**
 * 4. Adds slight shadow elevation when scrolling down
 */
function initHeaderScrollShadow() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
  });
}
