-- Cloudflare D1 Schema

CREATE TABLE IF NOT EXISTS churches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  church_id TEXT NOT NULL REFERENCES churches(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  age_group TEXT NOT NULL CHECK (age_group IN ('0-4', '5-9', '10-12', '13-19')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  teacher_id TEXT NOT NULL REFERENCES teachers(id),
  name TEXT NOT NULL,
  age_group TEXT NOT NULL CHECK (age_group IN ('0-4', '5-9', '10-12', '13-19')),
  magic_token TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS weeks (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  big_truth TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  week_id INTEGER NOT NULL REFERENCES weeks(id),
  age_group TEXT NOT NULL CHECK (age_group IN ('0-4', '5-9', '10-12', '13-19')),
  memory_verse TEXT NOT NULL,
  memory_verse_ref TEXT NOT NULL,
  bible_teaching TEXT NOT NULL, -- JSON array
  key_points TEXT NOT NULL,     -- JSON array
  life_application TEXT NOT NULL,
  youtube_url TEXT,
  workbook TEXT NOT NULL        -- JSON object
);

CREATE TABLE IF NOT EXISTS completions (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students(id),
  week_id INTEGER NOT NULL REFERENCES weeks(id),
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(student_id, week_id)
);

-- Seed data: Week 1-3
INSERT OR IGNORE INTO weeks (id, title, theme, big_truth) VALUES
  (1, 'Blessed to Be a Blessing', 'God blesses us so we can bless others', 'God''s blessings flow through us to the world'),
  (2, 'Obedience Pleases God', 'Choosing to obey God in everything', 'Obedience is better than sacrifice'),
  (3, 'God''s Power Helps Us', 'We can do all things through Christ', 'God''s power helps me every day');
