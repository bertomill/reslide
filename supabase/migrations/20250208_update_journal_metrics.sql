DO $$ 
BEGIN
    -- Convert existing numeric columns to text if they exist
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'journal_entries' AND column_name = 'recovery_score') THEN
        ALTER TABLE journal_entries ALTER COLUMN recovery_score TYPE text USING CAST(recovery_score AS text);
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'journal_entries' AND column_name = 'hrv') THEN
        ALTER TABLE journal_entries ALTER COLUMN hrv TYPE text USING CAST(hrv AS text);
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'journal_entries' AND column_name = 'sleep_score') THEN
        ALTER TABLE journal_entries ALTER COLUMN sleep_score TYPE text USING CAST(sleep_score AS text);
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'journal_entries' AND column_name = 'hours_coded') THEN
        ALTER TABLE journal_entries ALTER COLUMN hours_coded TYPE text USING CAST(hours_coded AS text);
    END IF;

    -- Add binary metrics columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'journal_entries' AND column_name = 'published_blog_post') THEN
        ALTER TABLE journal_entries ADD COLUMN published_blog_post boolean DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'journal_entries' AND column_name = 'published_application') THEN
        ALTER TABLE journal_entries ADD COLUMN published_application boolean DEFAULT false;
    END IF;
END $$;
