-- Add binary metrics columns to journal_entries
ALTER TABLE journal_entries 
ADD COLUMN published_blog_post boolean DEFAULT false,
ADD COLUMN published_application boolean DEFAULT false;
