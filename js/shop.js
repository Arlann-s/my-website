document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('productGrid');
  const filters = document.getElementById('shopFilters');
  if (!grid) return;

  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const safeURL = (value = '') => { try { const url = new URL(value, window.location.href); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  let items = [];

  try {
    const response = await fetch('../data/shop-products.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    items = Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Shop data could not be loaded.', error);
  }

  const render = (filter = 'all') => {
    const list = filter === 'all' ? items : items.filter((item) => String(item.category || '').toLowerCase() === filter);
    grid.innerHTML = list.length ? list.map((item) => {
      const url = safeURL(item.url);
      return `<article class="card"><div class="placeholder" aria-label="Product image placeholder"><div><strong>${escapeHTML(item.title || 'Product')}</strong><span>ใส่รูปสินค้าของคุณเองภายหลัง</span></div></div><h3>${escapeHTML(item.title || 'Untitled product')}</h3><p class="muted">${escapeHTML(item.description || '')}</p>${item.price ? `<p><strong>${escapeHTML(item.price)}</strong></p>` : ''}${url ? `<a class="btn btn-dark" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">View / Buy →</a>` : ''}</article>`;
    }).join('') : `<div class="empty-state">ยังไม่มีสินค้า${items.length ? ' ในหมวดนี้' : ''}<br><small>เพิ่มข้อมูลใน <code>data/shop-products.json</code></small></div>`;
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