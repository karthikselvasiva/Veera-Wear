const fs = require('fs');
const path = require('path');
const files = ['index.html', 'products.html', 'orders.html', 'customers.html'];

const toggleBtnHtml = `<button class="mobile-toggle-btn" onclick="document.querySelector('.admin-sidebar').classList.toggle('open'); document.querySelector('.admin-sidebar-overlay').classList.toggle('active');" aria-label="Toggle Sidebar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>`;
const overlayHtml = `<div class="admin-sidebar-overlay" onclick="document.querySelector('.admin-sidebar').classList.remove('open'); this.classList.remove('active');"></div>`;

files.forEach(file => {
  const filePath = path.join(__dirname, 'admin', file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (!content.includes('mobile-toggle-btn')) {
    content = content.replace(/<div class="admin-topbar__title">([^<]+)<\/div>/, `<div style="display:flex;align-items:center;">\n              ${toggleBtnHtml}\n              <div class="admin-topbar__title">$1</div>\n            </div>`);
    changed = true;
  }

  if (!content.includes('admin-sidebar-overlay')) {
    content = content.replace(/<div class="admin-layout">/, `<div class="admin-layout">\n    ${overlayHtml}`);
    changed = true;
  }

  if(changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched ' + file);
  }
});
