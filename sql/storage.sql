-- ============================================
-- VEERA WEAR — Storage Bucket Setup
-- Run this in the Supabase SQL Editor
-- ============================================

-- Create a new public bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the bucket
-- Allow public access to view images
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

-- Allow authenticated admins to insert images
CREATE POLICY "Admin Insert Access" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Allow authenticated admins to update images
CREATE POLICY "Admin Update Access" 
ON storage.objects FOR UPDATE 
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Allow authenticated admins to delete images
CREATE POLICY "Admin Delete Access" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
