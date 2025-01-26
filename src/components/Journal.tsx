'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Button, TextArea, Flex, TextField } from '@radix-ui/themes';
import { createBrowserClient } from '@supabase/ssr';

const PROMPTS = {
  gratitude: "What am I grateful for?",
  scared_yesterday: "What did I do that scared me yesterday?",
  beyond_yesterday: "What did I do that went above and beyond for others yesterday?",
  areas_to_improve: "What's an area that didn't go very well for me yesterday?",
  off_purpose: "Were there any moments yesterday where I was off-purpose?",
  scared_today: "How can I push past my comfort zone in all facets today?",
  beyond_today: "What will I do today to go above and beyond for others?",
  fitness: "How am I going to work my fitness today?",
  nutrition: "How am I going to eat optimally today?",
  craft: "How am I going to work my craft today?"
};

type JournalEntry = {
  recovery_score: number;
  hrv: number;
  sleep_score: number;
  gratitude: string;
  scared_yesterday: string;
  beyond_yesterday: string;
  areas_to_improve: string;
  off_purpose: string;
  scared_today: string;
  beyond_today: string;
  fitness: string;
  nutrition: string;
  craft: string;
  created_at?: string;
  user_id?: string;
};

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry>({
    recovery_score: 0,
    hrv: 100,
    sleep_score: 0,
    gratitude: '',
    scared_yesterday: '',
    beyond_yesterday: '',
    areas_to_improve: '',
    off_purpose: '',
    scared_today: '',
    beyond_today: '',
    fitness: '',
    nutrition: '',
    craft: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Reset form on mount
  useEffect(() => {
    setEntries({
      recovery_score: 0,
      hrv: 100,
      sleep_score: 0,
      gratitude: '',
      scared_yesterday: '',
      beyond_yesterday: '',
      areas_to_improve: '',
      off_purpose: '',
      scared_today: '',
      beyond_today: '',
      fitness: '',
      nutrition: '',
      craft: ''
    });
    setError('');
    setSuccessMessage('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      // Get the current user's session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No authenticated session');
      }

      const { error: supabaseError } = await supabase
        .from('journal_entries')
        .insert([{
          created_at: new Date().toISOString(),
          user_id: session.user.id,
          recovery_score: entries.recovery_score,
          hrv: entries.hrv,
          sleep_score: entries.sleep_score,
          gratitude: entries.gratitude,
          scared_yesterday: entries.scared_yesterday,
          beyond_yesterday: entries.beyond_yesterday,
          areas_to_improve: entries.areas_to_improve,
          off_purpose: entries.off_purpose,
          scared_today: entries.scared_today,
          beyond_today: entries.beyond_today,
          fitness: entries.fitness,
          nutrition: entries.nutrition,
          craft: entries.craft
        }]);

      if (supabaseError) throw supabaseError;

      setSuccessMessage('Journal entry saved successfully!');
      // Clear form after successful submission
      setEntries({
        recovery_score: 0,
        hrv: 100,
        sleep_score: 0,
        gratitude: '',
        scared_yesterday: '',
        beyond_yesterday: '',
        areas_to_improve: '',
        off_purpose: '',
        scared_today: '',
        beyond_today: '',
        fitness: '',
        nutrition: '',
        craft: ''
      });
    } catch (err) {
      console.error('Error saving journal entry:', err);
      setError('Failed to save journal entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card size="3">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="1">
            <Text size="5" weight="bold">Daily Journal</Text>
            <Text size="2" color="gray" style={{ fontStyle: 'italic' }}>
              A warrior king has fully mastered his mind, body, heart and soul
            </Text>
          </Flex>

          <Flex gap="4" style={{ marginBottom: '1rem' }}>
            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Text size="2" weight="bold">Recovery Score (%)</Text>
              <TextField.Root>
                <TextField.Input
                  type="number"
                  value={entries.recovery_score.toString()}
                  onChange={(e) => setEntries(prev => ({
                    ...prev,
                    recovery_score: Number(e.target.value)
                  }))}
                />
              </TextField.Root>
            </Flex>
            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Text size="2" weight="bold">Heart Rate Variability</Text>
              <TextField.Root>
                <TextField.Input
                  type="number"
                  value={entries.hrv.toString()}
                  onChange={(e) => setEntries(prev => ({
                    ...prev,
                    hrv: Number(e.target.value)
                  }))}
                />
              </TextField.Root>
            </Flex>
            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Text size="2" weight="bold">Sleep Score (%)</Text>
              <TextField.Root>
                <TextField.Input
                  type="number"
                  value={entries.sleep_score.toString()}
                  onChange={(e) => setEntries(prev => ({
                    ...prev,
                    sleep_score: Number(e.target.value)
                  }))}
                />
              </TextField.Root>
            </Flex>
          </Flex>

          {Object.entries(PROMPTS).map(([key, prompt]) => (
            <Flex key={key} direction="column" gap="2">
              <Text size="2" weight="bold">{prompt}</Text>
              <TextArea
                value={entries[key as keyof JournalEntry]}
                onChange={(e) => setEntries(prev => ({
                  ...prev,
                  [key]: e.target.value
                }))}
                placeholder="Write your thoughts here..."
                style={{ minHeight: '100px', lineHeight: '1.5' }}
              />
            </Flex>
          ))}
          {error && (
            <Text color="red" size="2">{error}</Text>
          )}
          {successMessage && (
            <Text color="green" size="2">{successMessage}</Text>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Entry'}
          </Button>
        </Flex>
      </form>
    </Card>
  );
} 