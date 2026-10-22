ALTER TABLE investor_profiles ADD COLUMN phone_country TEXT;
ALTER TABLE investor_profiles ADD COLUMN review_notes TEXT;
ALTER TABLE investor_profiles ADD COLUMN reviewed_at TEXT;
ALTER TABLE investor_profiles ADD COLUMN reviewed_by TEXT;

CREATE TABLE IF NOT EXISTS staff_users (
  id TEXT PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
