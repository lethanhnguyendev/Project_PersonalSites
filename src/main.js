import './style.css';
import { getHeader, getFooter } from './components.js';

// Set favicon globally so you don't need to repeat it per page
function ensureFavicon() {
  const href = import.meta.env.BASE_URL + 'logo.svg';
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }
  link.href = href;
}

document.addEventListener('DOMContentLoaded', () => {
  ensureFavicon();

  const pageId = document.body.dataset.page || 'home';
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) {
    headerEl.innerHTML = getHeader(pageId);
  }
  if (footerEl) {
    footerEl.innerHTML = getFooter();
  }
});
