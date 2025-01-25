-- Add areas_to_improve column to journal_entries table
ALTER TABLE journal_entries
ADD COLUMN areas_to_improve TEXT;
