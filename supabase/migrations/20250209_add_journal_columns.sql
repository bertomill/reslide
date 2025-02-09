-- Add published_application column to journal_entries
ALTER TABLE journal_entries
ADD COLUMN IF NOT EXISTS published_application BOOLEAN DEFAULT false;

-- Add published_blog_post column to journal_entries
ALTER TABLE journal_entries
ADD COLUMN IF NOT EXISTS published_blog_post BOOLEAN DEFAULT false;
