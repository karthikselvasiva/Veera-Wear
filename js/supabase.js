/* ============================================
   VEERA WEAR — Supabase Client
   ============================================ */

const SUPABASE_URL = 'https://ssgiwrkuobcoubgicgke.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZ2l3cmt1b2Jjb3ViZ2ljZ2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNzI4ODEsImV4cCI6MjA4OTY0ODg4MX0.OZoZ224MxYlBIYql6NJjnaQZ5Ui-5rbbSLfnEHYMoGQ';

// Debug: log what the CDN exposed
console.log('[Supabase Debug] window.supabase:', typeof window.supabase, window.supabase);

let supabase = null;
try {
  // The CDN may expose createClient at different levels depending on version
  let createClientFn = null;

  if (window.supabase && typeof window.supabase.createClient === 'function') {
    createClientFn = window.supabase.createClient;
    console.log('[Supabase Debug] Found createClient on window.supabase');
  } else if (typeof window.createClient === 'function') {
    createClientFn = window.createClient;
    console.log('[Supabase Debug] Found createClient on window');
  } else if (window.supabase && window.supabase.supabase && typeof window.supabase.supabase.createClient === 'function') {
    createClientFn = window.supabase.supabase.createClient;
    console.log('[Supabase Debug] Found createClient on window.supabase.supabase');
  }

  if (createClientFn) {
    supabase = createClientFn(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[Supabase Debug] Client created:', supabase);
    console.log('[Supabase Debug] client.auth:', supabase?.auth);
    console.log('[Supabase Debug] client.from:', typeof supabase?.from);
  } else {
    console.error('[Supabase Debug] No createClient function found!');
    // Log all keys on window.supabase to find the right path
    if (window.supabase) {
      console.log('[Supabase Debug] Keys on window.supabase:', Object.keys(window.supabase));
    }
  }
} catch (err) {
  console.error('[Supabase Debug] Init error:', err);
}
