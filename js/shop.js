/**
 * Curated Shop Page Scripts (shop.html)
 * Controls product category filtering and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update button styling
      buttons.forEach(b => {
        b.classList.remove('bg-inverse-surface', 'text-inverse-on-surface');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
      btn.classList.add('bg-inverse-surface', 'text-inverse-on-surface');

      // Filter cards with smooth opacity and translateY transition
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filter === 'all' || cardCat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
});
