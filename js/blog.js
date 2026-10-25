document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('articleGrid');
  const search = document.getElementById('articleSearch');
  const filters = document.getElementById('categoryFilters');
  if (!grid) return;

  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const safeURL = (value = '') => { try { const url = new URL(value, window.location.href); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  let items = [];

  try {
    const response = await fetch('../data/blog-articles.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    items = Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Blog data could not be loaded.', error);
  }

  let category = 'all';
  const render = () => {
    const query = (search?.value || '').trim().toLowerCase();
    const list = items.filter((item) => {
      const matchesCategory = category === 'all' || String(item.category || '').toLowerCase() === category;
      const haystack = JSON.stringify(item).toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });

    grid.innerHTML = list.length ? list.map((item) => {
      const url = safeURL(item.url);
      return `<article class="card"><span class="tag">${escapeHTML(item.category || 'Article')}</span><h3>${escapeHTML(item.title || 'Untitled article')}</h3><p class="muted">${escapeHTML(item.excerpt || item.description || '')}</p>${item.date ? `<small class="muted">${escapeHTML(item.date)}</small>` : ''}${url ? `<p><a class="btn btn-soft" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Read →</a></p>` : ''}</article>`;
    }).join('') : `<div class="empty-state">ยังไม่มีบทความที่ตรงกับเงื่อนไข<br><small>เพิ่มข้อมูลใน <code>data/blog-articles.json</code></small></div>`;
  };

  render();
  search?.addEventListener('input', render);
  filters?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    category = button.dataset.category;
    filters.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
    button.classList.add('active');
    render();
  });
});