-- Events (migrated from WordPress)
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  cover_image TEXT,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'outreach',
  published BOOLEAN DEFAULT true,
  event_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  author TEXT DEFAULT 'NIMO Care',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Research reports and documents
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  cover_image TEXT,
  category TEXT,
  published BOOLEAN DEFAULT true,
  published_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact form submissions
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT DEFAULT 'Community Member',
  author_role TEXT,
  visible BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Editable site content (hero text, mission, vision, etc.)
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security Policies

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published events"
  ON events FOR SELECT USING (published = true);

CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT USING (published = true);

CREATE POLICY "Public can read published reports"
  ON reports FOR SELECT USING (published = true);

CREATE POLICY "Public can read visible testimonials"
  ON testimonials FOR SELECT USING (visible = true);

CREATE POLICY "Public can read site content"
  ON site_content FOR SELECT TO anon USING (true);

-- Public can submit contact inquiries
CREATE POLICY "Public can submit inquiries"
  ON inquiries FOR INSERT TO anon WITH CHECK (true);

-- Authenticated users (admin) have full access
CREATE POLICY "Admin full access events"
  ON events FOR ALL TO authenticated
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access posts"
  ON posts FOR ALL TO authenticated
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access reports"
  ON reports FOR ALL TO authenticated
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access inquiries"
  ON inquiries FOR ALL TO authenticated
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials"
  ON testimonials FOR ALL TO authenticated
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access site_content"
  ON site_content FOR ALL TO authenticated
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Public can submit contact inquiries (validated check)
CREATE POLICY "Public can submit inquiries"
  ON inquiries FOR INSERT TO anon
  WITH CHECK (length(name) > 0 AND length(email) > 0 AND length(message) > 0);

