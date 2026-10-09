-- Media Library Table
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT DEFAULT 0,
  mime_type TEXT DEFAULT 'image/jpeg',
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security for Media table
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read media" ON media;
CREATE POLICY "Public can read media"
  ON media FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin full access media" ON media;
CREATE POLICY "Admin full access media"
  ON media FOR ALL TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Storage Bucket setup (Public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read media objects" ON storage.objects;
CREATE POLICY "Public read media objects"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Admin insert media objects" ON storage.objects;
CREATE POLICY "Admin insert media objects"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Admin delete media objects" ON storage.objects;
CREATE POLICY "Admin delete media objects"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media');

-- Initial Seed for Site Backgrounds and Core Assets
INSERT INTO media (name, file_path, file_url, category, mime_type)
VALUES
  ('Hero Community Banner', 'hero-bg.jpg', '/hero-bg.jpg', 'background', 'image/jpeg'),
  ('Alternative Hero Banner', 'hero1-bg.jpg', '/hero1-bg.jpg', 'background', 'image/jpeg'),
  ('Partners Section Background', 'partners-bg.jpg', '/partners-bg.jpg', 'background', 'image/jpeg'),
  ('MHPSS Referral Toolkit Session 1', 'posts/MHPSS_Referral_Toolkit1.jpeg', '/posts/MHPSS_Referral_Toolkit1.jpeg', 'posts', 'image/jpeg'),
  ('MHPSS Referral Toolkit Session 2', 'posts/MHPSS_Referral_Toolkit2.jpeg', '/posts/MHPSS_Referral_Toolkit2.jpeg', 'posts', 'image/jpeg'),
  ('CFS Community Outreach Activity', 'posts/cfs_activities.jpeg', '/posts/cfs_activities.jpeg', 'events', 'image/jpeg'),
  ('Limbe Flood Relief Assistance', 'posts/flood_in_limbe1.jpeg', '/posts/flood_in_limbe1.jpeg', 'events', 'image/jpeg'),
  ('GBV Case Management Workshop', 'posts/gbv_case_management_training.jpeg', '/posts/gbv_case_management_training.jpeg', 'posts', 'image/jpeg'),
  ('Gender Transformative Training', 'posts/gender_transformative_approaches_training.jpeg', '/posts/gender_transformative_approaches_training.jpeg', 'posts', 'image/jpeg'),
  ('World Humanitarian Day Commemoration', 'posts/humanitarian Day 1.jpeg', '/posts/humanitarian Day 1.jpeg', 'events', 'image/jpeg'),
  ('Maternal Health Initiative', 'posts/initiative_for_pregnant_women.jpeg', '/posts/initiative_for_pregnant_women.jpeg', 'events', 'image/jpeg'),
  ('Menstrual Hygiene Education', 'posts/menstrual_hygiene.jpeg', '/posts/menstrual_hygiene.jpeg', 'posts', 'image/jpeg'),
  ('PSEA Capacity Building Training', 'posts/one_day_training_on_psea.jpeg', '/posts/one_day_training_on_psea.jpeg', 'posts', 'image/jpeg'),
  ('Dishwashing Liquid Production Workshop', 'posts/dishwashing_liquid1.jpeg', '/posts/dishwashing_liquid1.jpeg', 'events', 'image/jpeg'),
  ('Economic Empowerment Initiative', 'posts/emp1.jpeg', '/posts/emp1.jpeg', 'events', 'image/jpeg')
ON CONFLICT DO NOTHING;
