'use client';

import { Card, Text, Flex, Button, TextField } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { EngravedText } from './EngravedText';
import { createBrowserClient } from '@supabase/ssr';

type Goal = {
  id: string;
  title: string;
  target: string;
  current: string;
  latestUpdate?: GoalUpdate;
};

type GoalUpdate = {
  id: string;
  previous_value: string;
  new_value: string;
  note?: string;
  created_at: string;
};

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [newValue, setNewValue] = useState('');
  const [updateNote, setUpdateNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchGoals = async () => {
    try {
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals_2025')
        .select('*')
        .order('created_at', { ascending: true });

      if (goalsError) throw goalsError;

      const goalsWithUpdates = await Promise.all(
        goalsData.map(async (goal) => {
          const { data: updates, error: updatesError } = await supabase
            .from('goals_2025_updates')
            .select('*')
            .eq('goal_id', goal.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (updatesError) throw updatesError;

          return {
            ...goal,
            latestUpdate: updates?.[0]
          };
        })
      );

      setGoals(goalsWithUpdates);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleUpdateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdating) return;

    const goalId = selectedGoal;
    if (!goalId) return;

    const goal = goals.find(g => g.id === goalId);
    if (!goal || !newValue.trim()) {
      console.error('Missing goal or new value');
      return;
    }

    setIsUpdating(true);

    try {
      // First update the goal
      const { error: goalError } = await supabase
        .from('goals_2025')
        .update({ current: newValue.trim() })
        .eq('id', goalId);

      if (goalError) throw goalError;

      // Then create the update record
      const { error: updateError } = await supabase
        .from('goals_2025_updates')
        .insert({
          goal_id: goalId,
          previous_value: goal.current,
          new_value: newValue.trim(),
          note: updateNote.trim() || null
        });

      if (updateError) throw updateError;

      // Reset form state after successful update
      setNewValue('');
      setUpdateNote('');
      setSelectedGoal(null);
      await fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <Card style={{ 
      background: 'linear-gradient(145deg, #1a1a1a, #111111)',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.05), inset -2px -2px 4px rgba(0,0,0,0.5)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.15"/%3E%3C/svg%3E")',
        opacity: 0.3,
        mixBlendMode: 'overlay',
      }} />

      <Flex direction="column" gap="2">
        <EngravedText size="large" style={{ fontSize: '1.2em', marginBottom: '8px' }}>
          2025 Goals
        </EngravedText>

        {goals.map((goal) => (
          <Flex 
            key={goal.id} 
            align="center" 
            justify="between"
            onClick={() => !isUpdating && setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '4px',
              marginBottom: '4px',
              cursor: isUpdating ? 'not-allowed' : 'pointer',
              padding: '8px',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              backgroundColor: selectedGoal === goal.id ? 'rgba(255,255,255,0.05)' : 'transparent',
              opacity: isUpdating && selectedGoal === goal.id ? 0.5 : 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            <Flex gap="3" align="center" style={{ flex: 1 }}>
              <EngravedText 
                size="small"
                style={{
                  fontSize: '0.9em',
                  fontWeight: 'bold',
                }}
              >
                {goal.title}
              </EngravedText>
              <EngravedText 
                size="small"
                style={{
                  fontSize: '0.8em',
                  opacity: 0.7
                }}
              >
                {goal.current} / {goal.target}
              </EngravedText>
            </Flex>

            {goal.latestUpdate?.note && (
              <EngravedText 
                size="small"
                style={{
                  fontSize: '0.8em',
                  opacity: 0.6,
                  fontStyle: 'italic'
                }}
              >
                {goal.latestUpdate.note}
              </EngravedText>
            )}

            {selectedGoal === goal.id && (
              <form onSubmit={handleUpdateGoal}>
                <Flex gap="2" align="center" style={{ marginLeft: '8px' }}>
                  <TextField.Input 
                    size="1"
                    placeholder="New value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    disabled={isUpdating}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: 'white'
                    }}
                  />
                  <TextField.Input 
                    size="1"
                    placeholder="Note"
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    disabled={isUpdating}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: 'white'
                    }}
                  />
                  <Button 
                    type="submit"
                    size="1" 
                    disabled={isUpdating || !newValue.trim()}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      cursor: isUpdating || !newValue.trim() ? 'not-allowed' : 'pointer',
                      opacity: isUpdating || !newValue.trim() ? 0.5 : 1
                    }}
                  >
                    {isUpdating ? 'Updating...' : 'Update'}
                  </Button>
                </Flex>
              </form>
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}