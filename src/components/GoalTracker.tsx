'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Heading, Flex, Box } from '@radix-ui/themes';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';

type ProgressUpdate = {
  value: string;
  timestamp: string;
  note?: string;
};

type Goal = {
  id: string;
  title: string;
  why: string[];
  benefits: string[];
  requirements?: string[];
  imageUrl: string;
  target: {
    value: string;
    description: string;
  };
  progress: ProgressUpdate[];
};

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newProgress, setNewProgress] = useState({ value: '', timestamp: new Date().toISOString().split('T')[0], note: '' });
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const staticGoals: Goal[] = [
    {
      id: "hyrox",
      title: "Pure Body - Hyrox World Championship",
      imageUrl: "/hyrox world champs.webp",
      target: {
        value: "70",
        description: "sub 70-minute"
      },
      progress: [],
      why: [
        "Next goal: sub 70-minute",
        "Inspire others through pure dedication",
        "Create content that showcases true athleticism"
      ],
      benefits: [
        "Improved physical fitness",
        "Mental toughness",
        "Competitive achievement",
        "Community connection"
      ],
      requirements: [
        "Obsession with your training",
        "Obsession with sleep",
        "Obsession with your nutrition"
      ]
    },
    {
      id: "tech-pm",
      title: "Pure Mind - Founder of AI Company",
      imageUrl: "/Ivan.png",
      target: {
        value: "100",
        description: "100 subscribers to bertomill.com"
      },
      progress: [],
      why: [
        "Next goal: 100 subs",
        "Push the boundaries of what's possible",
        "Build with absolute technical excellence"
      ],
      benefits: [
        "Technological Breakthrough",
        "Societal Impact",
        "Engineering Mastery",
        "Vision Manifestation"
      ],
      requirements: [
        "Deep mastery of AI/ML systems",
        "Build and ship something meaningful every day",
        "Relentless focus on technical excellence"
      ]
    },
    {
      id: "meditation",
      title: "Pure Heart - 100% Confidence'",
      imageUrl: "/jlegend.png",
      target: {
        value: "50",
        description: "50 dates"
      },
      progress: [],
      why: [
        "Next goal: 50 dates",
        "Maintain unwavering presence",
        "Radiate authentic joy"
      ],
      benefits: [
        "Mental Mastery",
        "Emotional Intelligence",
        "Spiritual Growth",
        "Inner Peace"
      ],
      requirements: [
        "Putting your heart out there every day",
        "Being 100% authentic through fear"
      ]
    },
    {
      id: "soul",
      title: "Pure Soul - Author of Spiritual Wisdom",
      imageUrl: "/robin.png",
      target: {
        value: "1000",
        description: "1000 hours meditated"
      },
      progress: [],
      why: [
        "Next goal: 1000 hours meditated",
        "Bridge ancient truth with modern living",
        "Guide others to their highest potential"
      ],
      benefits: [
        "Spiritual Legacy",
        "Wisdom Transmission",
        "Global Impact",
        "Soul Evolution"
      ],
      requirements: [
        "Daily deep contemplation and writing",
        "Living the principles you teach",
        "Constant refinement of wisdom"
      ]
    }
  ];

  const fetchProgressUpdates = async () => {
    try {
      const goalsWithProgress = await Promise.all(
        staticGoals.map(async (goal) => {
          const { data: progressData, error: progressError } = await supabase
            .from('progress_updates')
            .select('*')
            .eq('goal_id', goal.id)
            .order('timestamp', { ascending: false });

          if (progressError) throw progressError;

          return {
            ...goal,
            progress: progressData || []
          };
        })
      );

      setGoals(goalsWithProgress);
    } catch (error) {
      console.error('Error fetching progress updates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressUpdates();
  }, []);

  const addProgressUpdate = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('progress_updates')
        .insert([{
          goal_id: goalId,
          value: newProgress.value,
          timestamp: new Date(newProgress.timestamp).toISOString(),
          note: newProgress.note
        }]);

      if (error) throw error;

      // Reset form and refresh data
      setNewProgress({ value: '', timestamp: new Date().toISOString().split('T')[0], note: '' });
      fetchProgressUpdates();
    } catch (error) {
      console.error('Error adding progress update:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '10px',
    padding: '8px',
    borderRadius: '6px',
    backgroundColor: 'var(--gray-1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    padding: '6px',
    borderRadius: '3px',
    border: '1px solid var(--gray-4)',
    fontSize: '12px'
  };

  const buttonStyle = {
    padding: '8px',
    borderRadius: '3px',
    backgroundColor: 'var(--blue-9)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px'
  };

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="1" p="2">
        <Box mb="1">
          <Heading size="6" align="center" mb="1">I'm all-in for this</Heading>
          <Text size="2" color="gray" align="center" style={{ fontStyle: 'italic' }}>
            When all else is removed, you are left with the following
          </Text>
        </Box>

        {goals.map((goal) => (
          <Box 
            key={goal.id} 
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-2)',
              border: '1px solid var(--gray-5)',
              backgroundColor: 'var(--gray-2)'
            }}
          >
            <Flex direction="column" gap="1">
              <Text size="4" weight="bold" style={{ marginBottom: '8px' }}>
                {goal.title}
              </Text>

              <Flex direction="column" gap="2" mb="2">
                <Text size="2" weight="bold">Target: {goal.target.description}</Text>
                {goal.progress.map((update, idx) => (
                  <Text key={idx} size="2" style={{ color: 'var(--gray-11)' }}>
                    {update.value} - {new Date(update.timestamp).toLocaleDateString()} 
                    {update.note && ` (${update.note})`}
                  </Text>
                ))}
              </Flex>

              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  addProgressUpdate(goal.id); 
                }} 
                style={formStyle}
              >
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={newProgress.value}
                  onChange={(e) => setNewProgress(prev => ({ ...prev, value: e.target.value }))}
                  required
                  style={inputStyle}
                />
                <input
                  type="date"
                  name="timestamp"
                  value={newProgress.timestamp}
                  onChange={(e) => setNewProgress(prev => ({ ...prev, timestamp: e.target.value }))}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="note"
                  placeholder="Note"
                  value={newProgress.note}
                  onChange={(e) => setNewProgress(prev => ({ ...prev, note: e.target.value }))}
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Add Progress</button>
              </form>

              <Box>
                <Flex direction="column" gap="1">
                  {goal.why.map((reason, idx) => (
                    <Text key={idx} size="2" style={{ lineHeight: '1.2' }}>
                      • {reason}
                    </Text>
                  ))}
                </Flex>
              </Box>

              <Box
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '150px',
                  borderRadius: 'var(--radius-2)',
                  overflow: 'hidden',
                  marginTop: '4px'
                }}
              >
                <Image
                  src={goal.imageUrl}
                  alt={goal.title}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: goal.id === 'tech-pm' ? 'center 30%' : 'center center'
                  }}
                  sizes="(max-width: 500px) 100vw, 500px"
                />
              </Box>

              {goal.requirements && (
                <Box>
                  <Heading as="h4" size="2" mb="1">
                    What's it going to take?
                  </Heading>
                  <Flex direction="column" gap="1">
                    {goal.requirements.map((req, idx) => (
                      <Text key={idx} size="2" style={{ lineHeight: '1.2' }}>
                        • {req}
                      </Text>
                    ))}
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Card>
  );
}