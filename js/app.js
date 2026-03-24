/* ============================================
   VEERA WEAR — Shared App Logic (Supabase)
   ============================================ */

// ---- Toast Notification System ----
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span class="toast__message">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; toast.style.transition = 'all 0.3s ease'; }, 2500);
  setTimeout(() => toast.remove(), 3000);
}

// ---- Newsletter Subscription (Supabase) ----
async function subscribeNewsletter(email) {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email, is_active: true });
      
    if (error) { 
      if (error.code === '23505' || error.message.includes('duplicate')) {
        showToast('You are already subscribed to our newsletter!', 'info');
      } else {
        console.error('Newsletter error:', error); 
        showToast('Subscription failed. Please try again.', 'error'); 
      }
      return; 
    }
    
    showToast('Welcome to the club! Check your inbox for your discount code.', 'success');
    document.querySelector('.footer-newsletter__input').value = '';
  } catch (e) {
    console.error('Newsletter exception:', e);
    showToast('Subscription failed. Please try again.', 'error');
  }
}

// ---- Render Header ----
function renderHeader(activePage) {
  const user = Auth.getCurrentUser();
  const profile = Auth.getProfile();
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="header-logo">VEERA<span>WEAR</span></a>
      <nav class="header-nav" aria-label="Main navigation">
        <a href="products.html?category=men" class="header-nav__link ${activePage==='men'?'active':''}">Men</a>
        <a href="products.html?category=women" class="header-nav__link ${activePage==='women'?'active':''}">Women</a>
        <a href="products.html?category=new" class="header-nav__link ${activePage==='new'?'active':''}">New Arrivals</a>
        <a href="brand-story.html" class="header-nav__link ${activePage==='story'?'active':''}">Our Story</a>
      </nav>
      <div class="header-actions">
        <a href="account.html" class="header-action" title="Account" aria-label="Account">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </a>
        <a href="cart.html" class="header-action" title="Cart" aria-label="Shopping Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="header-action__badge cart-badge">0</span>
        </a>
        <button class="menu-toggle" aria-label="Menu" onclick="toggleMobileNav()">
          <span class="menu-toggle__bar"></span><span class="menu-toggle__bar"></span><span class="menu-toggle__bar"></span>
        </button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
      <a href="products.html?category=men" class="mobile-nav__link">Men</a>
      <a href="products.html?category=women" class="mobile-nav__link">Women</a>
      <a href="products.html?category=new" class="mobile-nav__link">New Arrivals</a>
      <a href="brand-story.html" class="mobile-nav__link">Our Story</a>
      <a href="account.html" class="mobile-nav__link">${user ? (profile?.full_name || 'My Account') : 'Sign In'}</a>
      <a href="cart.html" class="mobile-nav__link">Cart</a>
    </nav>`;
  Cart.updateBadge();
}

function toggleMobileNav() {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mobile-nav');
  btn.classList.toggle('active');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

// ---- Render Footer ----
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brand__logo">VEERA<span>WEAR</span></div>
        <p class="footer-brand__desc">Premium apparel for the modern individual. Crafted with passion, worn with confidence.</p>
        <div class="footer-social">
          <a href="#" class="footer-social__link" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:text-bottom"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></a>
          <a href="#" class="footer-social__link" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:text-bottom"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
          <a href="#" class="footer-social__link" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:text-bottom"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" class="footer-social__link" aria-label="Pinterest"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:text-bottom"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4 class="footer-col__title">Shop</h4>
        <ul class="footer-col__list">
          <li><a href="products.html?category=men">Men</a></li>
          <li><a href="products.html?category=women">Women</a></li>
          <li><a href="products.html?category=new">New Arrivals</a></li>
          <li><a href="products.html">All Products</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-col__title">Company</h4>
        <ul class="footer-col__list">
          <li><a href="brand-story.html">Our Story</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Sustainability</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-col__title">Stay Updated</h4>
        <p style="font-size:var(--fs-sm);color:rgba(245,240,232,0.6);margin-bottom:var(--space-4);">Get 10% off your first order</p>
        <div class="footer-newsletter">
          <form class="footer-newsletter__form" onsubmit="event.preventDefault();subscribeNewsletter(this.querySelector('input').value);">
            <input type="email" class="footer-newsletter__input" placeholder="Your email" required>
            <button type="submit" class="footer-newsletter__btn">→</button>
          </form>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-bottom__text">© 2026 VEERA WEAR. All rights reserved.</p>
      <div class="footer-bottom__payments">
        <span>Secure Payments by Razorpay</span>
      </div>
    </div>`;
}

// ---- Render Product Card ----
function renderProductCard(product) {
  const starsHtml = renderStars(product.rating);
  return `
    <div class="product-card animate-fade-in-up">
      <div class="product-card__image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-card__image" loading="lazy">
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        <div class="product-card__actions">
          <button class="product-card__action-btn" onclick="quickAddToCart(${product.id})" title="Add to Cart"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:text-bottom"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></button>
          <a href="product-detail.html?id=${product.id}" class="product-card__action-btn" title="View Details"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:text-bottom"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>
        </div>
      </div>
      <div class="product-card__info">
        <div class="product-card__category">${product.category}</div>
        <h3 class="product-card__name"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-card__price-row">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="product-card__price--old">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        <div class="product-card__rating">
          <span class="product-card__stars">${starsHtml}</span>
          <span class="product-card__review-count">(${product.reviews})</span>
        </div>
      </div>
    </div>`;
}

function quickAddToCart(productId) {
  const product = getProductById(productId);
  if (product) {
    Cart.addItem(productId, product.sizes[1] || product.sizes[0]);
  }
}

// ---- Scroll Animations (Intersection Observer) ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.observe-scroll').forEach(el => observer.observe(el));
}

// ---- Header Scroll Effect ----
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ---- App Init (async — waits for Supabase auth and data) ----
async function initApp(activePage, callback) {
  // 1. Init Auth
  await Auth.init();

  // 2. Fetch all products from Supabase
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        window.SITE_PRODUCTS = data.map(p => ({
          ...p,
          oldPrice: p.old_price,
          isNew: p.is_new,
          subcategory: p.subcategory || p.sub_category
        }));
      } else {
        window.SITE_PRODUCTS = [...PRODUCTS];
      }
    } else {
      window.SITE_PRODUCTS = [...PRODUCTS];
    }
  } catch (e) {
    console.warn('Failed to load products from Supabase, using fallback', e);
    window.SITE_PRODUCTS = [...PRODUCTS];
  }

  try {
    if (typeof getAllReviewStats === 'function') {
      const stats = await getAllReviewStats();
      window.SITE_PRODUCTS = window.SITE_PRODUCTS.map(p => {
        if (stats[p.id]) {
          return {
            ...p,
            reviews: stats[p.id].count,
            rating: parseFloat((stats[p.id].sum / stats[p.id].count).toFixed(1))
          };
        }
        return p;
      });
    }
  } catch (err) {
    console.error('Failed to compute global review stats', err);
  }

  // 3. Render UI components
  renderHeader(activePage);
  renderFooter();
  initHeaderScroll();
  initScrollAnimations();
  Cart.updateBadge();

  // 4. Call page-specific logic now that data is loaded
  if (callback) await callback();
}
