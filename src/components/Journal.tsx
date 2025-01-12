'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Button, TextArea, Flex } from '@radix-ui/themes';
import { createBrowserClient } from '@supabase/ssr';

const PROMPTS = {
  gratitude: "What am I grateful for today?",
  energy: "What's my main focus for today?",
  growth: "How will I push my limits today?",
  obstacles: "What will I learn today?",
  impact: "How will I embody my warrior king principles today?"
};

type JournalEntry = {
  gratitude: string;
  energy: string;
  growth: string;
  obstacles: string;
  impact: string;
  created_at?: string;
  user_id?: string;
};

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry>({
    gratitude: '',
    energy: '',
    growth: '',
    obstacles: '',
    impact: ''
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
      gratitude: '',
      energy: '',
      growth: '',
      obstacles: '',
      impact: ''
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
          gratitude: entries.gratitude,
          energy: entries.energy,
          growth: entries.growth,
          obstacles: entries.obstacles,
          impact: entries.impact
        }]);

      if (supabaseError) throw supabaseError;

      setSuccessMessage('Journal entry saved successfully!');
      // Clear form after successful submission
      setEntries({
        gratitude: '',
        energy: '',
        growth: '',
        obstacles: '',
        impact: ''
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
          <Text size="5" weight="bold">Daily Journal</Text>
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