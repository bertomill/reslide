-- Add CIBC presentation goal
INSERT INTO goals_2025 (title, target, current)
SELECT 'Present Technology to CIBC Executive', 'Done', 'Not Started'
WHERE NOT EXISTS (
    SELECT 1 FROM goals_2025 WHERE title = 'Present Technology to CIBC Executive'
);
