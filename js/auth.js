/* ============================================
   VEERA WEAR — Auth Logic (Supabase)
   ============================================ */

const Auth = {
  _user: null,
  _profile: null,
  _initialized: false,
  _listeners: [],

  // Initialize auth state — call once on page load
  async init() {
    if (this._initialized) return;
    this._initialized = true;

    if (!supabase) { console.warn('Supabase not available, running in offline mode'); return; }

    try {
      // Get current session with timeout to prevent hanging
      const sessionPromise = supabase.auth.getSession();
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Session timeout')), 5000));
      const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]);

      if (session?.user) {
        this._user = session.user;
        await this._fetchProfile();
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          this._user = session.user;
          await this._fetchProfile();
          await Cart.mergeLocalCartToSupabase();
        } else if (event === 'SIGNED_OUT') {
          this._user = null;
          this._profile = null;
        }
        this._notifyListeners();
      });
    } catch (err) {
      console.warn('Auth init failed, running in offline mode:', err.message);
    }

    this._notifyListeners();
  },

  onAuthChange(fn) {
    this._listeners.push(fn);
  },

  _notifyListeners() {
    this._listeners.forEach(fn => fn(this._user, this._profile));
  },

  async _fetchProfile() {
    if (!this._user || !supabase) return;
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', this._user.id)
        .single();
      this._profile = data;
    } catch (err) {
      console.warn('Profile fetch error:', err.message);
    }
  },

  getCurrentUser() {
    return this._user;
  },

  getProfile() {
    return this._profile;
  },

  isLoggedIn() {
    return this._user !== null;
  },

  async register(name, email, password) {
    if (!supabase) return { success: false, message: 'Backend not available' };

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        this._user = data.user;
        // Small delay to let the trigger create the profile
        await new Promise(r => setTimeout(r, 500));
        await this._fetchProfile();
      }

      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async login(email, password) {
    if (!supabase) return { success: false, message: 'Backend not available' };

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, message: error.message };
      }

      this._user = data.user;
      await this._fetchProfile();
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async logout() {
    if (supabase) {
      try { await supabase.auth.signOut(); } catch (e) {}
    }
    this._user = null;
    this._profile = null;
    window.location.href = 'account.html';
  },

  async updateProfile(name, email, phone, address, city, zip, country) {
    if (!this._user || !supabase) return { success: false, message: 'Supabase offline or user not logged in' };

    const updates = {
      full_name: name,
      email: email,
      updated_at: new Date().toISOString()
    };
    if (phone !== undefined) updates.phone = phone;
    if (address !== undefined) updates.address = address;
    if (city !== undefined) updates.city = city;
    if (zip !== undefined) updates.zip_code = zip;
    if (country !== undefined) updates.country = country;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', this._user.id);

      if (error) {
        console.error('Profile update error:', error);
        return { success: false, message: error.message };
      }

      // Also try to update Auth email, though it might require confirmation
      if (email && email !== this._user.email) {
        await supabase.auth.updateUser({ email: email });
      }

      await this._fetchProfile();
      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err);
      return { success: false, message: err.message };
    }
  }
};

// ---- Admin Auth (Supabase) ----
const AdminAuth = {
  async isLoggedIn() {
    const profile = Auth.getProfile();
    return profile?.is_admin === true;
  },

  async login(email, password) {
    const result = await Auth.login(email, password);
    if (!result.success) return false;

    const profile = Auth.getProfile();
    if (!profile?.is_admin) {
      if (supabase) {
        try { await supabase.auth.signOut(); } catch (e) {}
      }
      Auth._user = null;
      Auth._profile = null;
      return false;
    }
    return true;
  },

  async logout() {
    if (supabase) {
      try { await supabase.auth.signOut(); } catch (e) {}
    }
    Auth._user = null;
    Auth._profile = null;
    window.location.href = 'index.html';
  }
};
