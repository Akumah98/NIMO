-- ==============================================================================
-- Migration: 003_team_members.sql
-- Description: Create team_members table, Row Level Security, and seed members
-- ==============================================================================

-- 1. Create Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  department_slug TEXT NOT NULL DEFAULT 'leadership',
  location TEXT NOT NULL DEFAULT 'Buea, Cameroon',
  image TEXT,
  bio TEXT NOT NULL DEFAULT '',
  credentials TEXT[] DEFAULT '{}',
  email TEXT,
  linkedin TEXT,
  display_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Row Level Security (RLS)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read visible team members" ON team_members;
CREATE POLICY "Public can read visible team members"
  ON team_members FOR SELECT
  USING (visible = true);

DROP POLICY IF EXISTS "Admin full access team_members" ON team_members;
CREATE POLICY "Admin full access team_members"
  ON team_members FOR ALL TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 3. Indexes for fast query performance
CREATE INDEX IF NOT EXISTS idx_team_members_department ON team_members (department_slug);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members (display_order ASC);

-- 4. Seed Initial Team Members (only if table is currently empty)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM team_members LIMIT 1) THEN
    INSERT INTO team_members (name, role, department, department_slug, location, image, bio, credentials, email, display_order, visible)
    VALUES
      (
        'Dr. Sarah Mbella',
        'Executive Director & Founder',
        'Executive Leadership',
        'leadership',
        'Mile 18 Junction, Buea',
        '/posts/gender_transformative_approaches_training3.jpeg',
        'Over 14 years steering grassroots humanitarian action, institutional partnerships, and community-driven development across Central Africa.',
        ARRAY['Humanitarian Leadership', 'PSEA Focal Point', 'M&E Specialist'],
        'contact@nimo.africa',
        1,
        true
      ),
      (
        'Emmanuel Ngufor',
        'Head of Programs & Operations',
        'Executive Leadership',
        'leadership',
        'South West Region',
        '/posts/gbv_case_management_training7.jpeg',
        'Directs NIMO''s cross-sectoral interventions, ensuring compliance with international emergency standards, safety protocols, and field logistics.',
        ARRAY['Operations Management', 'Sphere Standards', 'Crisis Coordination'],
        'contact@nimo.africa',
        2,
        true
      ),
      (
        'Grace Eposi Enanga',
        'Lead Child Protection Officer',
        'Child Protection & Wellbeing',
        'protection',
        'Buea & Peri-Urban Outreaches',
        '/posts/cfs_activities5.jpeg',
        'Oversees Child-Friendly Spaces (CFS), case management for separated and vulnerable minors, and community child protection committees.',
        ARRAY['CPIMS+ Certified', 'Case Management', 'Trauma-Informed Care'],
        'contact@nimo.africa',
        3,
        true
      ),
      (
        'David Tabi Ashu',
        'Education in Emergencies Coordinator',
        'Education & Development',
        'education',
        'Fako Division',
        '/posts/cfs_activities2.jpeg',
        'Coordinates accelerated learning initiatives, teacher psychosocial training, and scholastic support for out-of-school and displaced children.',
        ARRAY['INEE Minimum Standards', 'Teacher Training', 'Curriculum Adaptation'],
        'contact@nimo.africa',
        4,
        true
      ),
      (
        'Blandine Bih',
        'GBV & Psychosocial Support Specialist',
        'Gender & Protection',
        'gbv',
        'Mile 18 & Southwest Hubs',
        '/posts/gbv_case_management_training3.jpeg',
        'Leads survivor-centred clinical referral pathways, confidential case handling, and gender transformative community mobilization.',
        ARRAY['MHPSS Toolkit Certified', 'GBV Case Management', 'Safe Referrals'],
        'contact@nimo.africa',
        5,
        true
      ),
      (
        'Patrick Ndip',
        'Lead Research & M&E Analyst',
        'Research & Evaluation',
        'research',
        'South West Region',
        '/posts/gender_transformative_approaches_training.jpeg',
        'Designs quantitative and qualitative surveys, conducts community baseline vulnerability assessments, and measures longitudinal intervention impacts.',
        ARRAY['Data & Statistical Modeling', 'Participatory M&E', 'Survey Design'],
        'contact@nimo.africa',
        6,
        true
      ),
      (
        'Miriam Lum',
        'Community Mobilization & Safeguarding Officer',
        'Child Protection & Safeguarding',
        'protection',
        'Buea Environs',
        '/posts/one_day_training_on_psea.jpeg',
        'Builds active community feedback mechanisms and ensures local ownership of child safety networks and safeguarding reporting lines.',
        ARRAY['Community Engagement', 'PSEA Trainer', 'Facilitation'],
        'contact@nimo.africa',
        7,
        true
      ),
      (
        'Roland Eyong',
        'Livelihoods & Youth Empowerment Lead',
        'Education & Development',
        'education',
        'South West Region',
        '/posts/dishwashing_liquid4.jpeg',
        'Directs vocational apprenticeships, financial literacy workshops, and income-generating cooperative projects for vulnerable youth and women.',
        ARRAY['Vocational Training', 'Youth Leadership', 'Cooperative Mgmt'],
        'contact@nimo.africa',
        8,
        true
      ),
      (
        'Constance Ayuk',
        'Women''s Safe Spaces & Menstrual Health Focal Point',
        'Gender & Protection',
        'gbv',
        'Mile 18 Junction & Field Centers',
        '/posts/menstrual_hygiene.jpeg',
        'Coordinates dignity kit distribution, safe spaces for teenage mothers, and sexual reproductive health education in rural communities.',
        ARRAY['MHM Trainer', 'Safe Spaces Facilitator', 'Adolescent Care'],
        'contact@nimo.africa',
        9,
        true
      );
  END IF;
END $$;
