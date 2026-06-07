-- Run this in your Supabase SQL editor before going live.
-- Dashboard → SQL → New query → paste and run.

CREATE TABLE IF NOT EXISTS summer_program_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_relationship TEXT NOT NULL,

  child_name TEXT NOT NULL,
  child_dob DATE NOT NULL,
  child_gender TEXT,

  program_option TEXT NOT NULL,
  daily_pass_dates TEXT[] DEFAULT '{}',
  amount NUMERIC NOT NULL DEFAULT 0,

  has_allergies BOOLEAN,
  allergy_details TEXT,
  medical_conditions TEXT,
  comfortable_physical BOOLEAN,

  emergency_name TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  emergency_relationship TEXT NOT NULL,

  photo_consent BOOLEAN NOT NULL,
  activity_consent BOOLEAN NOT NULL,

  hear_about TEXT,
  excited_about TEXT,

  payment_status TEXT NOT NULL DEFAULT 'pending',
  paystack_reference TEXT,
  paid_at TIMESTAMPTZ,

  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_summer_program_payment_status
  ON summer_program_registrations (payment_status);

CREATE INDEX IF NOT EXISTS idx_summer_program_email
  ON summer_program_registrations (parent_email);

ALTER TABLE summer_program_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (registration form)
CREATE POLICY "Allow public insert"
  ON summer_program_registrations
  FOR INSERT
  WITH CHECK (true);

-- Service role bypasses RLS for updates (payment confirmation via API)
