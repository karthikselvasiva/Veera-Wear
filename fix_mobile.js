const fs = require('fs');
const path = require('path');

// 1. Update components.css
let compPath = path.join(__dirname, 'css', 'components.css');
let compCss = fs.readFileSync(compPath, 'utf8');
if (!compCss.includes('.table-responsive')) {
  compCss += `\n
/* ---- Responsive Fixes ---- */
@media (max-width: 768px) {
  .product-card__actions { opacity: 1; transform: translateX(-50%) translateY(0); }
  .category-card__cta { opacity: 1; transform: translateY(0); }
  .category-card__cta::after { transform: translateX(4px); }
  .modal { padding: var(--space-5); }
  .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%; border-radius: var(--radius-md); border: 1px solid var(--color-border); margin-bottom: var(--space-4); }
  .admin-table { min-width: 600px; }
}
`;
  fs.writeFileSync(compPath, compCss, 'utf8');
}

// 2. Update pages.css cart-item mobile layout
let pagesPath = path.join(__dirname, 'css', 'pages.css');
let pagesCss = fs.readFileSync(pagesPath, 'utf8');
pagesCss = pagesCss.replace('.cart-item{grid-template-columns:80px 1fr;gap:var(--space-3);}', `
  .cart-item { display: flex; flex-wrap: wrap; gap: var(--space-3); position: relative; padding: var(--space-4); }
  .cart-item__image { width: 80px; height: 100px; }
  .cart-item > div:nth-child(2) { flex: 1; padding-right: 30px; }
  .cart-item__price { width: 100%; font-size: var(--fs-md); }
  .cart-item .qty-stepper { margin-top: var(--space-2); }
  .cart-item__remove { position: absolute; right: var(--space-4); top: var(--space-4); }
`);
fs.writeFileSync(pagesPath, pagesCss, 'utf8');

// 3. Update account.html
let accountPath = path.join(__dirname, 'account.html');
let accountHtml = fs.readFileSync(accountPath, 'utf8');
if (!accountHtml.includes('class="table-responsive"')) {
  accountHtml = accountHtml.replace('<table class="admin-table">', '<div class="table-responsive">\n                    <table class="admin-table">');
  accountHtml = accountHtml.replace('</table>`}', '</table>\n                  </div>`}');
  fs.writeFileSync(accountPath, accountHtml, 'utf8');
}

// 4. Update admin/admin.css modal padding
let adminCssPath = path.join(__dirname, 'admin', 'admin.css');
let adminCss = fs.readFileSync(adminCssPath, 'utf8');
if (!adminCss.includes('.modal { padding: 20px;')) {
  adminCss = adminCss.replace('.aform-row { grid-template-columns: 1fr; }\n', '.aform-row { grid-template-columns: 1fr; }\n  .modal { padding: 20px; width: 95vw; }\n');
  fs.writeFileSync(adminCssPath, adminCss, 'utf8');
}

console.log('Mobile fixes applied.');
