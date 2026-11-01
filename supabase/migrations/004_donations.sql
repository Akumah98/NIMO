-- ==============================================================================
-- Migration: 004_donations.sql
-- Description: Create donations table, indexes, and Row Level Security policies
-- ==============================================================================

CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  trans_id TEXT UNIQUE,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XAF',
  cause TEXT NOT NULL DEFAULT 'General Fund',
  frequency TEXT NOT NULL DEFAULT 'one-time',
  status TEXT NOT NULL DEFAULT 'pending',
  payment_medium TEXT,
  financial_trans_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Admins can view and manage all donations
DROP POLICY IF EXISTS "Admin full access donations" ON donations;
CREATE POLICY "Admin full access donations"
  ON donations FOR ALL TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Indexes for lookup speed
CREATE INDEX IF NOT EXISTS idx_donations_external_id ON donations (external_id);
CREATE INDEX IF NOT EXISTS idx_donations_trans_id ON donations (trans_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations (status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations (created_at DESC);

