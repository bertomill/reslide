-- Add dates goal to progress_updates table
-- No need to modify the table structure since it already supports our needs

-- Insert the dates goal into the goals table
INSERT INTO goals (id, title, imageurl, target_value, target_description)
VALUES ('dates', 'Pure Heart - Known as a Jolly Good Fellow', NULL, '20', '20 dates');

-- Insert initial goal data if needed
-- Note: The actual goal tracking will happen through the progress_updates table
-- when users add individual date entries

-- View all date entries
SELECT 
    value,
    timestamp,
    note
FROM progress_updates
WHERE goal_id = 'dates'
ORDER BY timestamp DESC;

-- Get total count of dates
SELECT COUNT(*) as total_dates
FROM progress_updates
WHERE goal_id = 'dates';
