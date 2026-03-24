/* ============================================
   VEERA WEAR — Cart Logic (Supabase + localStorage fallback)
   ============================================ */

const Cart = {
  LOCAL_KEY: 'veerawear_cart',

  // ---- Get Items ----
  async getItems() {
    if (Auth.isLoggedIn()) {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', Auth.getCurrentUser().id)
        .order('created_at', { ascending: true });
      if (error) { console.error('Cart fetch error:', error); return this._getLocal(); }
      return (data || []).map(row => ({
        productId: row.product_id,
        size: row.size,
        qty: row.quantity,
        _dbId: row.id
      }));
    }
    return this._getLocal();
  },

  // ---- Add Item ----
  async addItem(productId, size, qty = 1) {
    if (!Auth.isLoggedIn()) {
      showToast('Please login to add items to cart', 'error');
      // Optional: window.location.href = 'account.html';
      return;
    }

    const userId = Auth.getCurrentUser().id;
    // Check if item already exists
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('size', size)
      .single();

    if (existing) {
      await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + qty, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('cart_items')
        .insert({ user_id: userId, product_id: productId, size, quantity: qty });
    }
    
    this.updateBadge();
    window.dispatchEvent(new Event('cart-updated'));
    showToast('Added to cart!', 'success');
  },

  // ---- Remove Item ----
  async removeItem(productId, size) {
    if (Auth.isLoggedIn()) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', Auth.getCurrentUser().id)
        .eq('product_id', productId)
        .eq('size', size);
    } else {
      const items = this._getLocal().filter(i => !(i.productId === productId && i.size === size));
      this._saveLocal(items);
    }
    this.updateBadge();
    window.dispatchEvent(new Event('cart-updated'));
  },

  // ---- Update Quantity ----
  async updateQty(productId, size, qty) {
    qty = Math.max(1, qty);
    if (Auth.isLoggedIn()) {
      await supabase
        .from('cart_items')
        .update({ quantity: qty, updated_at: new Date().toISOString() })
        .eq('user_id', Auth.getCurrentUser().id)
        .eq('product_id', productId)
        .eq('size', size);
    } else {
      const items = this._getLocal();
      const item = items.find(i => i.productId === productId && i.size === size);
      if (item) { item.qty = qty; this._saveLocal(items); }
    }
    this.updateBadge();
    window.dispatchEvent(new Event('cart-updated'));
  },

  // ---- Clear Cart ----
  async clear() {
    if (Auth.isLoggedIn()) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', Auth.getCurrentUser().id);
    }
    localStorage.removeItem(this.LOCAL_KEY);
    this.updateBadge();
    window.dispatchEvent(new Event('cart-updated'));
  },

  // ---- Count & Total (sync versions using cached items) ----
  async getCount() {
    const items = await this.getItems();
    return items.reduce((sum, i) => sum + i.qty, 0);
  },

  async getTotal() {
    const items = await this.getItems();
    return items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  },

  // ---- Badge Update ----
  async updateBadge() {
    const count = await this.getCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('show', count > 0);
    });
  },

  // ---- Merge localStorage cart into Supabase on login ----
  async mergeLocalCartToSupabase() {
    const localItems = this._getLocal();
    if (localItems.length === 0 || !Auth.isLoggedIn()) return;

    const userId = Auth.getCurrentUser().id;
    for (const item of localItems) {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', userId)
        .eq('product_id', item.productId)
        .eq('size', item.size)
        .single();

      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + item.qty })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('cart_items')
          .insert({ user_id: userId, product_id: item.productId, size: item.size, quantity: item.qty });
      }
    }
    localStorage.removeItem(this.LOCAL_KEY);
    this.updateBadge();
  },

  // ---- localStorage helpers ----
  _getLocal() {
    return JSON.parse(localStorage.getItem(this.LOCAL_KEY) || '[]');
  },

  _saveLocal(items) {
    localStorage.setItem(this.LOCAL_KEY, JSON.stringify(items));
  }
};
