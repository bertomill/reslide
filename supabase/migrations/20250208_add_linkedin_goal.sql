-- Add LinkedIn followers goal
INSERT INTO goals_2025 (title, target, current)
SELECT 'LinkedIn Followers', '3000', '0'
WHERE NOT EXISTS (
    SELECT 1 FROM goals_2025 WHERE title = 'LinkedIn Followers'
);
