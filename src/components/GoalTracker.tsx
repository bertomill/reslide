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
      id: "ai-founder",
      title: "I will earn 100 paying subscribers in 2025",
      imageUrl: "/Ivan.png",
      progress: []
    },
    {
      id: "dates",
      title: "I will go on 20 dates in 2025",
      imageUrl: "/dates.png",
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
      // For dates goal, automatically increment the counter
      const value = goalId === 'dates' 
        ? `Date #${(goals.find(g => g.id === 'dates')?.progress.length || 0) + 1}`
        : progressForms[goalId].value;

      const { error } = await supabase
        .from('progress_updates')
        .insert([{
          goal_id: goalId,
          value,
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
           Hyrox world champion. AI founder. Long hair, beard, tatted, gold chain, Richard Mille. Porsche, playing soccer with the locals on the beach, salsa dancing evenings after open BBQ and music dinner, complete confidence around centerfold GFs. Cooking up the worlds leading AI applications in my studio on the beach with my small team of devotees.
          </Text>
        </Box>

        <Flex gap="3" justify="center" mb="4" style={{ flexWrap: 'wrap' }}>
          <Flex align="center" gap="1">
            <TriangleUpIcon width={20} height={20} />
            <Text size="3" weight="bold">HYROX</Text>
          </Flex>
          <Flex align="center" gap="1">
            <TriangleUpIcon width={20} height={20} />
            <Text size="3" weight="bold">AI FOUNDER</Text>
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
              <Flex align="center" gap="2">
                <Box>
                  {goal.id === 'dates' && <HeartFilledIcon width="20" height="20" />}
                  {goal.id === 'hyrox' && <TriangleUpIcon width="20" height="20" />}
                  {goal.id === 'ai-founder' && <TriangleUpIcon width="20" height="20" />}
                </Box>
                <Heading size="4">{goal.title}</Heading>
              </Flex>
              {goal.id === 'hyrox' && (
                <>
                  <Text size="2" color="gray" style={{ marginBottom: '4px', fontStyle: 'italic' }}>
                    People need to be inspired - my respect for the game gets that job done for them. I was born in the pit, it allowed me to go to that depth of pain very few can go.
                  </Text>
                  <Text size="2" color="gray" style={{ marginBottom: '8px' }}>
                    <strong>How:</strong> Be obsessive about every little detail of the game.
                  </Text>
                </>
              )}
              {goal.id === 'ai-founder' && (
                <>
                  <Text size="2" color="gray" style={{ marginBottom: '4px', fontStyle: 'italic' }}>
                    People need innovation - Your in the best AI city in the world, in the best time-window in history for AI application development, at the right place (CIBC AI), with extremely specific and valuable domain expertise (Evident), with the best education (innovation). Just get 12 hours a day of deep focus on AI, and you will 10X Chris Patterson (250K salary), and Dave G (300K salary).
                  </Text>
                  <Text size="2" color="gray" style={{ marginBottom: '8px' }}>
                    <strong>How:</strong> Deep focus on AI 12 hours a day. Build a moat with Evident knowlege leveraged with your technical understanding.
                  </Text>
                </>
              )}
              {goal.id === 'dates' && (
                <>
                  <Text size="2" color="gray" style={{ marginBottom: '4px', fontStyle: 'italic' }}>
                    Dating is a skill that needs to be practiced. Each date is an opportunity to learn, grow, and potentially find someone special.
                  </Text>
                  <Text size="2" color="gray" style={{ marginBottom: '8px' }}>
                    <strong>How:</strong> Put yourself out there, be genuine, and focus on having fun and learning from each experience.
                  </Text>
                </>
              )}
              {goal.id === 'soul' && (
                <>
                  <Text size="2" color="gray" style={{ marginBottom: '4px', fontStyle: 'italic' }}>
                    Meditation is the secret to all your success. The obsessive attention to every detail in the gym and in the studio, and your seamingly limtless energy and pervasive smile all come from meditation - no one else is doing it.
                  </Text>
                  <Text size="2" color="gray" style={{ marginBottom: '8px' }}>
                    <strong>How:</strong> Meditate every morning minimum 30+ mins. Obsessive over every detail of your practice.
                  </Text>
                </>
              )}
              {goal.id === 'sleep' && (
                <>
                  <Text size="2" color="gray" style={{ marginBottom: '4px', fontStyle: 'italic' }}>
                    Sleeping well brings it all together. Win at sleep and you compound all your success by 20%.
                  </Text>
                  <Text size="2" color="gray" style={{ marginBottom: '8px' }}>
                    <strong>How:</strong> Obsess over every little detail of your pre-sleep routine.
                  </Text>
                </>
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
                {goal.id !== 'dates' ? (
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
                ) : (
                  <div style={{ ...inputStyle, backgroundColor: 'var(--gray-3)' }}>
                    Date #{(goals.find(g => g.id === 'dates')?.progress.length || 0) + 1}
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
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Add Progress</button>
              </form>

              {/* Only show image box if goal has an image URL */}
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
                      objectPosition: goal.id === 'ai-founder' ? 'center 30%' : 'center center'
                    }}
                    sizes="(max-width: 500px) 100vw, 500px"
                  />
                </Box>
              )}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Card>
  );
}