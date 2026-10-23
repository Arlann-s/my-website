/**
 * About & Portfolio Page Scripts (about.html)
 * Controls portfolio project filtering by category
 */

function filterProjects(category, activeBtn) {
  // Toggle button styles
  const buttons = document.querySelectorAll('.project-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-inverse-surface', 'text-inverse-on-surface', 'shadow-sm');
    btn.classList.add('text-on-surface-variant');
  });

  if (activeBtn) {
    activeBtn.classList.remove('text-on-surface-variant');
    activeBtn.classList.add('bg-inverse-surface', 'text-inverse-on-surface', 'shadow-sm');
  }

  // Filter project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const itemCategory = card.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      card.style.display = 'flex';
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease';
        card.style.opacity = '1';
      }, 10);
    } else {
      card.style.display = 'none';
    }
  });
}
