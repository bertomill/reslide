'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Button, TextField, Flex } from '@radix-ui/themes';
import { supabase } from '../lib/supabase';

const PROMPTS = {
  gratitude: "What am I grateful for today?",
  energy: "What's my main focus for today?",
  growth: "How will I push my limits today?",
  obstacles: "What will I learn today?",
  impact: "How will I embody my warrior king principles today?"
};

export default function Journal() {
  const [entries, setEntries] = useState<{[key: string]: string}>({
    gratitude: '',
    energy: '',
    growth: '',
    obstacles: '',
    impact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      const { data, error: supabaseError } = await supabase
        .from('journal_entries')
        .insert([{
          created_at: new Date().toISOString(),
          ...entries
        }])
        .select();

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

  const handleChange = (field: string, value: string) => {
    setEntries(prev => ({
      ...prev,
      [field]: value
    }));
    // Reset success message when user starts typing again
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const isFormComplete = () => {
    return Object.values(entries).every(value => value.trim());
  };

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Text size="5" weight="bold" align="center">Daily Journal</Text>
          
          {Object.entries(PROMPTS).map(([field, prompt]) => (
            <Flex key={field} direction="column" gap="2">
              <Text size="2" weight="bold">{prompt}</Text>
              <TextField.Root>
                <TextField.Input
                  value={entries[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder="Your response..."
                  disabled={isSubmitting}
                />
              </TextField.Root>
            </Flex>
          ))}

          {error && (
            <Text color="red" size="2">{error}</Text>
          )}

          {successMessage && (
            <Text color="green" size="2">{successMessage}</Text>
          )}

          <Button 
            type="submit" 
            disabled={!isFormComplete() || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Submit Journal Entry'}
          </Button>
        </Flex>
      </form>
    </Card>
  );
} 