-- Add hours_coded column to journal_entries table
ALTER TABLE journal_entries
ADD COLUMN hours_coded NUMERIC DEFAULT 0;
