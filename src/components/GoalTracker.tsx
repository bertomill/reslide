'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { Card, Text, Heading, Flex, Box } from '@radix-ui/themes';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';
import { 
  StarIcon, 
  EyeOpenIcon, 
  HeartIcon, 
  MoonIcon, 
  PersonIcon,
  TriangleUpIcon,
  HeartFilledIcon 
} from '@radix-ui/react-icons';
import styles from './GoalTracker.module.css';

type ProgressUpdate = {
  value: string;
  timestamp: string;
  note?: string;
};

type Metric = {
  title: string;
  target: string;
  description: string;
  progress: ProgressUpdate[];
};

type Goal = {
  id: string;
  title: string;
  imageUrl: string;
  progress: ProgressUpdate[];
  description?: string;
  metrics?: Metric[];
};

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [progressForms, setProgressForms] = useState<{[key: string]: { value: string; timestamp: string; note: string }}>({});
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const staticGoals: Goal[] = [
    // Main Goals
    {
      id: "ai-product",
      title: "1. Get 100 investment researchers subscribed to Levery",
      imageUrl: "/Ivan.png",
      progress: [],
      description: "Leverage Toronto in-person meetups, leverage the latest AI tools, leverage your finance connections within CIBC, leverage your relationship with Evident, leverage your time (all day)",
      metrics: [
        {
          title: "Sleep Score",
          target: "80%",
          description: "An indicator your mind is operating at its peak over time",
          progress: []
        },
        {
          title: "Deep Focus Hours",
          target: "10 hours/day",
          description: "A signal you are at the forefront of the AI field",
          progress: []
        }
      ]
    },
    {
      id: "aura",
      title: "2. Go on 50 dates with dimes in 2025",
      imageUrl: "/dates.png",
      progress: [],
      description: "Leverage unity to become the most cut, leverage meditation to become the most kind, leverage nutrition to glow, leverage social media to create dating opportunity",
      metrics: [
        {
          title: "Hyrox Time",
          target: "Sub 70 minutes",
          description: "Indicates your body is in the absolute best shape",
          progress: []
        },
        {
          title: "Meditation Hours",
          target: "500 hours",
          description: "Indicates your mind is at its most empathetic",
          progress: []
        }
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
    // Initialize progress forms for each goal
    const initialForms = staticGoals.reduce((acc, goal) => ({
      ...acc,
      [goal.id]: { value: '', timestamp: new Date().toISOString().split('T')[0], note: '' }
    }), {});
    setProgressForms(initialForms);
  }, []);

  const addProgressUpdate = async (goalId: string) => {
    try {
      let value = progressForms[goalId]?.value;
      
      if (goalId === 'aura') {
        value = `Date #${(goals.find(g => g.id === 'aura')?.progress.length || 0) + 1}`;
      }

      if (!value && goalId !== 'aura') {
        console.error('No value provided for progress update');
        return;
      }

      console.log('Attempting to add progress update:', {
        goal_id: goalId,
        value,
        timestamp: new Date(progressForms[goalId].timestamp).toISOString(),
        note: progressForms[goalId].note
      });

      const { error } = await supabase
        .from('progress_updates')
        .insert([{
          goal_id: goalId,
          value,
          timestamp: new Date(progressForms[goalId].timestamp).toISOString(),
          note: progressForms[goalId].note
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Progress update added successfully');

      // Reset only this goal's form
      setProgressForms(prev => ({
        ...prev,
        [goalId]: { value: '', timestamp: new Date().toISOString().split('T')[0], note: '' }
      }));
      fetchProgressUpdates();
    } catch (error) {
      console.error('Error adding progress update:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '10px',
    padding: '8px',
    borderRadius: '6px',
    backgroundColor: 'var(--gray-1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle: CSSProperties = {
    padding: '6px',
    borderRadius: '3px',
    border: '1px solid var(--gray-4)',
    fontSize: '12px',
    backgroundColor: 'var(--gray-3)',
    color: 'var(--gray-12)',
  };

  const buttonStyle: CSSProperties = {
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
          <Heading size="6" align="center" mb="1">2025 Goals</Heading>
        </Box>

        <Text size="2" color="gray" align="center" mb="4" style={{ fontStyle: 'italic' }}>
          Become the best AI developer and most attractive guy in the world through relentless focus on product and personal development.
        </Text>

        {goals.map((goal) => (
          <Box key={goal.id}>
            <Box 
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-2)',
                border: '1px solid var(--gray-5)',
                backgroundColor: 'var(--gray-2)',
                marginBottom: '16px'
              }}
            >
              <Flex direction="column" gap="3">
                {/* Goal Title */}
                <Flex align="center" gap="2">
                  <Box>
                    {goal.id === 'aura' && <HeartFilledIcon width="20" height="20" />}
                    {goal.id === 'ai-product' && <TriangleUpIcon width="20" height="20" />}
                  </Box>
                  <Heading size="4">{goal.title}</Heading>
                </Flex>

                {/* Goal Description */}
                {goal.description && (
                  <Text size="2" color="gray" style={{ fontStyle: 'italic' }}>
                    {goal.description}
                  </Text>
                )}

                {/* Supporting Metrics */}
                {goal.metrics && goal.metrics.length > 0 && (
                  <Box style={{ backgroundColor: 'var(--gray-3)', padding: '12px', borderRadius: '6px' }}>
                    <Text size="2" weight="bold" mb="2">Supporting Metrics:</Text>
                    {goal.metrics.map((metric, idx) => (
                      <Flex key={idx} direction="column" gap="1" mb="2">
                        <Text size="2" weight="bold" style={{ color: 'var(--blue-9)' }}>
                          {metric.title}: {metric.target}
                        </Text>
                        <Text size="1" color="gray">
                          {metric.description}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                )}

                {/* Progress Updates */}
                <Flex direction="column" gap="2">
                  {goal.progress.map((update, idx) => (
                    <Text key={idx} size="2" style={{ color: 'var(--gray-11)' }}>
                      {update.value} - {new Date(update.timestamp).toLocaleDateString()} 
                      {update.note && ` (${update.note})`}
                    </Text>
                  ))}
                </Flex>

                {/* Progress Form */}
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    addProgressUpdate(goal.id); 
                  }} 
                  style={formStyle}
                >
                  {goal.id !== 'aura' ? (
                    <input
                      type="text"
                      name="value"
                      placeholder={goal.id === 'ai-product' ? "Enter number of subscribers" : "Value"}
                      value={progressForms[goal.id]?.value || ''}
                      onChange={(e) => setProgressForms(prev => ({
                        ...prev,
                        [goal.id]: { ...prev[goal.id], value: e.target.value }
                      }))}
                      required
                      style={inputStyle}
                    />
                  ) : (
                    <div style={{ ...inputStyle, backgroundColor: 'var(--gray-3)' }}>
                      Date #{(goals.find(g => g.id === 'aura')?.progress.length || 0) + 1}
                    </div>
                  )}
                  <input
                    type="date"
                    name="timestamp"
                    value={progressForms[goal.id]?.timestamp || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setProgressForms(prev => ({
                      ...prev,
                      [goal.id]: { ...prev[goal.id], timestamp: e.target.value }
                    }))}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="note"
                    placeholder="Note"
                    value={progressForms[goal.id]?.note || ''}
                    onChange={(e) => setProgressForms(prev => ({
                      ...prev,
                      [goal.id]: { ...prev[goal.id], note: e.target.value }
                    }))}
                    className={styles.input}
                    style={inputStyle}
                  />
                  <button type="submit" style={buttonStyle}>Add Progress</button>
                </form>

                {/* Goal Image */}
                {goal.imageUrl && (
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
                        objectPosition: goal.id === 'ai-product' ? 'center 30%' : 
                                       goal.id === 'aura' ? 'center 15%' : 
                                       'center center'
                      }}
                      sizes="(max-width: 500px) 100vw, 500px"
                    />
                  </Box>
                )}
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>
    </Card>
  );
}