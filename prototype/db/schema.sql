PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  clerk_user_id TEXT UNIQUE,
  email TEXT,
  display_name TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS investor_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  investor_type TEXT NOT NULL,
  jurisdiction TEXT,
  kyc_status TEXT NOT NULL DEFAULT 'not_started',
  eligibility_status TEXT NOT NULL DEFAULT 'pending',
  first_name TEXT,
  last_name TEXT,
  date_of_birth TEXT,
  nationality TEXT,
  country_of_residence TEXT,
  phone TEXT,
  phone_country TEXT,
  review_notes TEXT,
  reviewed_at TEXT,
  reviewed_by TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  asset_class TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL,
  total_value_aed INTEGER,
  target_raise_aed INTEGER,
  funded_percent INTEGER NOT NULL DEFAULT 0,
  min_investment_aed INTEGER,
  target_return_min REAL,
  target_return_max REAL,
  duration_years REAL,
  risk_level TEXT,
  sponsor_investment_aed INTEGER,
  summary TEXT,
  metric_label TEXT,
  metric_value TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS investment_applications (
  id TEXT PRIMARY KEY,
  investor_profile_id TEXT NOT NULL REFERENCES investor_profiles(id),
  project_id TEXT NOT NULL REFERENCES projects(id),
  requested_amount_aed INTEGER NOT NULL,
  minimum_allocation_aed INTEGER,
  preferred_currency TEXT DEFAULT 'AED',
  funding_method TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS allocations (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES investment_applications(id),
  approved_amount_aed INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'reserved',
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waitlist_entries (
  id TEXT PRIMARY KEY,
  investor_profile_id TEXT NOT NULL REFERENCES investor_profiles(id),
  project_id TEXT NOT NULL REFERENCES projects(id),
  desired_amount_aed INTEGER NOT NULL,
  minimum_allocation_aed INTEGER,
  validity_days INTEGER DEFAULT 90,
  interested_in_additional_raise INTEGER NOT NULL DEFAULT 1,
  interested_in_existing_position INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_verifications (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id),
  document_name TEXT NOT NULL,
  document_hash TEXT NOT NULL,
  verification_id TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  signature_status TEXT NOT NULL DEFAULT 'signed',
  blockchain_status TEXT NOT NULL DEFAULT 'simulated_verified',
  verified_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS staff_users (
  id TEXT PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
