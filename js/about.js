document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('projectGrid');
  const filters = document.getElementById('projectFilters');
  if (!grid) return;

  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const safeURL = (value = '') => { try { const url = new URL(value, window.location.href); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  let items = [];

  try {
    const response = await fetch('../data/portfolio-projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    items = Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Portfolio data could not be loaded.', error);
  }

  const render = (filter = 'all') => {
    const list = filter === 'all' ? items : items.filter((item) => String(item.category || '').toLowerCase() === filter);
    grid.innerHTML = list.length ? list.map((item) => {
      const url = safeURL(item.url);
      return `<article class="card"><span class="tag">${escapeHTML(item.category || 'Project')}</span><h3>${escapeHTML(item.title || 'Untitled project')}</h3><p class="muted">${escapeHTML(item.description || '')}</p>${url ? `<a class="btn btn-soft" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">View project →</a>` : ''}</article>`;
    }).join('') : `<div class="empty-state">ยังไม่มีผลงาน${items.length ? ' ในหมวดนี้' : ''}<br><small>เพิ่มข้อมูลใน <code>data/portfolio-projects.json</code></small></div>`;
  };

  render();
  filters?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filters.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
    button.classList.add('active');
    render(button.dataset.filter);
  });
});