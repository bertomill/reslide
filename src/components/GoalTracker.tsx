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
  PersonIcon 
} from '@radix-ui/react-icons';

type ProgressUpdate = {
  value: string;
  timestamp: string;
  note?: string;
};

type Goal = {
  id: string;
  title: string;
  imageUrl: string;
  progress: ProgressUpdate[];
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
    {
      id: "hyrox",
      title: "I will complete Hyrox sub 70 in 2025",
      imageUrl: "/hyrox world champs.webp",
      progress: []
    },
    {
      id: "tech-pm",
      title: "I will build an AI application wiht 100 subscribers in 2025",
      imageUrl: "/Ivan.png",
      progress: []
    },
    {
      id: "meditation",
      title: "I will go on 50 Dates in 2025",
      imageUrl: "/jlegend.png",
      progress: []
    },
    {
      id: "soul",
      title: "I will meditate 500 hours in 2025",
      imageUrl: "/robin.png",
      progress: []
    },
    {
      id: "sleep",
      title: "I will increase my avg sleep score to 80% in 2025",
      imageUrl: "/Phelps_Sleep.png",
      progress: []
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
      const { error } = await supabase
        .from('progress_updates')
        .insert([{
          goal_id: goalId,
          value: progressForms[goalId].value,
          timestamp: new Date(progressForms[goalId].timestamp).toISOString(),
          note: progressForms[goalId].note
        }]);

      if (error) throw error;

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
    fontSize: '12px'
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
          <Heading size="6" align="center" mb="1">All-in for</Heading>
          <Text size="2" align="center" color="gray" mb="2" style={{ maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
            No one has the passion you do for the training, the AI development, the dates, the sleep, and the meditation.
          </Text>
        </Box>

        <Flex gap="3" justify="center" mb="4" style={{ flexWrap: 'wrap' }}>
          <Flex align="center" gap="1">
            <StarIcon width={20} height={20} />
            <Text size="3" weight="bold">70H</Text>
          </Flex>
          <Flex align="center" gap="1">
            <PersonIcon width={20} height={20} />
            <Text size="3" weight="bold">100S</Text>
          </Flex>
          <Flex align="center" gap="1">
            <HeartIcon width={20} height={20} />
            <Text size="3" weight="bold">50D</Text>
          </Flex>
          <Flex align="center" gap="1">
            <EyeOpenIcon width={20} height={20} />
            <Text size="3" weight="bold">1000M</Text>
          </Flex>
          <Flex align="center" gap="1">
            <MoonIcon width={20} height={20} />
            <Text size="3" weight="bold">80%S</Text>
          </Flex>
        </Flex>

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
              <Text size="4" weight="bold" style={{ marginBottom: '2px' }}>
                {goal.title}
              </Text>
              {goal.id === 'hyrox' && (
                <Text size="2" color="gray" style={{ marginBottom: '8px', fontStyle: 'italic' }}>
                  People want an absolute animal in the gym - it inspires them. I was born in the pit, it allowed me to go to that depth of pain very few can go
                </Text>
              )}
              {goal.id === 'tech-pm' && (
                <Text size="2" color="gray" style={{ marginBottom: '8px', fontStyle: 'italic' }}>
                  People want to see gorgeous products - it inspires them. My obsessive personality lets me create that crack product.
                </Text>
              )}
              {goal.id === 'meditation' && (
                <Text size="2" color="gray" style={{ marginBottom: '8px', fontStyle: 'italic' }}>
                  Girls want an absolute real one - it makes them feel comfortable. I've been through it so I know how to do it.
                </Text>
              )}
              {goal.id === 'soul' && (
                <Text size="2" color="gray" style={{ marginBottom: '8px', fontStyle: 'italic' }}>
                  People want to be around someone who feels good because it makes them feel good. I meditate everyday because I need it, it was my only outlet at one point.
                </Text>
              )}
              {goal.id === 'sleep' && (
                <Text size="2" color="gray" style={{ marginBottom: '8px', fontStyle: 'italic' }}>
                  Sleeping well makes you a more attractive person in every sense. I need it or I will fall into addiction which is common in my family.
                </Text>
              )}
              <Flex direction="column" gap="2" mb="2">
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
                  value={progressForms[goal.id]?.value || ''}
                  onChange={(e) => setProgressForms(prev => ({
                    ...prev,
                    [goal.id]: { ...prev[goal.id], value: e.target.value }
                  }))}
                  required
                  style={inputStyle}
                />
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
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Add Progress</button>
              </form>

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
            </Flex>
          </Box>
        ))}
      </Flex>
    </Card>
  );
}