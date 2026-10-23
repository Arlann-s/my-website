/**
 * Blog & Knowledge Hub Page Scripts (blog.html)
 * Controls reading drawer modal, search shortcut (Cmd+K), and topic filters
 */

function openReadingDrawer() {
  const drawer = document.getElementById('reading-drawer');
  const panel = document.getElementById('drawer-panel');
  if (!drawer || !panel) return;
  
  drawer.classList.remove('opacity-0', 'pointer-events-none');
  drawer.classList.add('opacity-100');
  drawer.setAttribute('aria-hidden', 'false');
  
  panel.classList.remove('translate-x-full');
  panel.classList.add('translate-x-0');
  document.body.style.overflow = 'hidden';
}

function closeReadingDrawer() {
  const drawer = document.getElementById('reading-drawer');
  const panel = document.getElementById('drawer-panel');
  if (!drawer || !panel) return;

  panel.classList.remove('translate-x-0');
  panel.classList.add('translate-x-full');
  
  drawer.classList.remove('opacity-100');
  drawer.classList.add('opacity-0', 'pointer-events-none');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  // Backdrop click dismiss
  const drawer = document.getElementById('reading-drawer');
  if (drawer) {
    drawer.addEventListener('click', function(e) {
      if (e.target === this) {
        closeReadingDrawer();
      }
    });
  }

  // Keyboard shortcut handler (Cmd/Ctrl + K and Escape)
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('article-search');
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    if (e.key === 'Escape') {
      closeReadingDrawer();
    }
  });

  // Category Filter Visual Toggle
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.remove('bg-inverse-surface', 'text-inverse-on-surface', 'shadow-sm');
        b.classList.add('bg-surface-container-low', 'text-on-surface-variant');
      });
      this.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
      this.classList.add('bg-inverse-surface', 'text-inverse-on-surface', 'shadow-sm');
    });
  });
});
