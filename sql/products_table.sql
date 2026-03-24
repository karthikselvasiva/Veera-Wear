-- ============================================
-- VEERA WEAR — Products Table (Run in Supabase SQL Editor)
-- ============================================

-- Create the products table to store dynamic products
CREATE TABLE IF NOT EXISTS public.products (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT 'men',
  subcategory  TEXT,
  price        NUMERIC(10,2) NOT NULL,
  old_price    NUMERIC(10,2),
  badge        TEXT,
  image        TEXT NOT NULL,
  images       TEXT[],
  sizes        TEXT[] NOT NULL DEFAULT '{"S","M","L","XL"}',
  description  TEXT,
  rating       NUMERIC(3,1) DEFAULT 4.5,
  reviews      INT DEFAULT 0,
  is_new       BOOLEAN DEFAULT false,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Allow admins to manage products (full CRUD)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can do everything on products"
  ON public.products
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Allow public read access (anyone can view products)
CREATE POLICY "Anyone can view active products"
  ON public.products
  FOR SELECT
  USING (is_active = true);

-- Function to auto-update  updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
