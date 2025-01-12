'use client';

import { useState } from 'react';
import { Card, Text, Button, TextField, Flex } from '@radix-ui/themes';
import { supabase } from '../lib/supabase';
import type { JournalEntry } from '../lib/supabase';

const DAILY_PROMPTS = [
  "What am I grateful for today?",
  "What's my main focus for today?",
  "How will I embody my warrior king principles today?",
  "What will I learn today?",
  "How will I push my limits today?"
];

export default function Journal() {
  const [entries, setEntries] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('journal_entries')
        .insert([
          {
            entries,
            created_at: new Date().toISOString()
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      // Clear form after successful submission
      setEntries({});
    } catch (err) {
      console.error('Error saving journal entry:', err);
      setError('Failed to save journal entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (prompt: string, value: string) => {
    setEntries(prev => ({
      ...prev,
      [prompt]: value
    }));
  };

  const isFormComplete = () => {
    return DAILY_PROMPTS.every(prompt => entries[prompt]?.trim());
  };

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Text size="5" weight="bold" align="center">Daily Journal</Text>
          
          {DAILY_PROMPTS.map((prompt) => (
            <Flex key={prompt} direction="column" gap="2">
              <Text size="2" weight="bold">{prompt}</Text>
              <TextField.Root>
                <TextField.Input
                  value={entries[prompt] || ''}
                  onChange={(e) => handleChange(prompt, e.target.value)}
                  placeholder="Your response..."
                  disabled={isSubmitted}
                />
              </TextField.Root>
            </Flex>
          ))}

          {error && (
            <Text color="red" size="2">{error}</Text>
          )}

          <Button 
            type="submit" 
            disabled={!isFormComplete() || isSubmitted || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isSubmitted ? 'Submitted' : 'Submit Journal Entry'}
          </Button>
        </Flex>
      </form>
    </Card>
  );
} 