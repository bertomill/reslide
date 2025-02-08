'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Button, TextArea, Flex, TextField, Grid, IconButton } from '@radix-ui/themes';
import { createBrowserClient } from '@supabase/ssr';
import { LightningBoltIcon } from '@radix-ui/react-icons';

const PROMPTS = {
  gratitude: "What am I grateful for?",
  scared_yesterday: "What did I do that scared me yesterday?",
  beyond_yesterday: "What did I do that went above and beyond for others yesterday?",
  areas_to_improve: "What's a detail I can refine today?",
  scared_today: "How am I going to push myself out of my confort zone today? Because all growth comes from discomfort.",
  beyond_today: "What will I do today to go above and beyond for others?",
  fitness: "How am I going to work my fitness today?",
  nutrition: "How am I going to eat optimally today?",
  craft: "How am I going to work my craft today?",
  perfect_day: "What is my perfect day today?"
};

const GOALS = {
  recovery_score: 80,
  hrv: 200,
  hours_coded: 10
};

type JournalEntry = {
  recovery_score: string;
  hrv: string;
  sleep_score: string;
  hours_coded: string;
  published_blog_post: boolean;
  published_application: boolean;
  gratitude: string;
  scared_yesterday: string;
  beyond_yesterday: string;
  areas_to_improve: string;
  scared_today: string;
  beyond_today: string;
  fitness: string;
  nutrition: string;
  craft: string;
  perfect_day: string;
  created_at?: string;
  user_id?: string;
};

type PromptKey = keyof typeof PROMPTS;

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry>({
    recovery_score: '',
    hrv: '',
    sleep_score: '',
    hours_coded: '',
    published_blog_post: false,
    published_application: false,
    gratitude: '',
    scared_yesterday: '',
    beyond_yesterday: '',
    areas_to_improve: '',
    scared_today: '',
    beyond_today: '',
    fitness: '',
    nutrition: '',
    craft: '',
    perfect_day: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [suggestions, setSuggestions] = useState<{[key: string]: string}>({});
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState<{[key: string]: boolean}>({});
  const [isStreaming, setIsStreaming] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Reset form on mount
  useEffect(() => {
    setEntries({
      recovery_score: '',
      hrv: '',
      sleep_score: '',
      hours_coded: '',
      published_blog_post: false,
      published_application: false,
      gratitude: '',
      scared_yesterday: '',
      beyond_yesterday: '',
      areas_to_improve: '',
      scared_today: '',
      beyond_today: '',
      fitness: '',
      nutrition: '',
      craft: '',
      perfect_day: ''
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
          hours_coded: entries.hours_coded,
          published_blog_post: entries.published_blog_post,
          published_application: entries.published_application,
          gratitude: entries.gratitude,
          scared_yesterday: entries.scared_yesterday,
          beyond_yesterday: entries.beyond_yesterday,
          areas_to_improve: entries.areas_to_improve,
          scared_today: entries.scared_today,
          beyond_today: entries.beyond_today,
          fitness: entries.fitness,
          nutrition: entries.nutrition,
          craft: entries.craft,
          perfect_day: entries.perfect_day
        }]);

      if (supabaseError) throw supabaseError;

      setSuccessMessage('Journal entry saved successfully!');
      // Clear form after successful submission
      setEntries({
        recovery_score: '',
        hrv: '',
        sleep_score: '',
        hours_coded: '',
        published_blog_post: false,
        published_application: false,
        gratitude: '',
        scared_yesterday: '',
        beyond_yesterday: '',
        areas_to_improve: '',
        scared_today: '',
        beyond_today: '',
        fitness: '',
        nutrition: '',
        craft: '',
        perfect_day: ''
      });
    } catch (err) {
      console.error('Error saving journal entry:', err);
      setError('Failed to save journal entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRecentEntries = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data: entries, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(6);  // Get last 6 entries

      if (error) throw error;
      return entries;
    } catch (error) {
      console.error('Error fetching recent entries:', error);
      return [];
    }
  };

  const getSuggestion = async (promptKey: PromptKey) => {
    try {
      setIsLoadingSuggestion(prev => ({ ...prev, [promptKey]: true }));

      // Fetch last 3 entries for this prompt
      const { data: recentEntries, error: fetchError } = await supabase
        .from('journal_entries')
        .select(promptKey)
        .order('created_at', { ascending: false })
        .limit(3);

      if (fetchError) throw fetchError;

      // Get current text in the field
      const currentText = entries[promptKey];

      // Create context from recent entries and current text
      const recentContext = recentEntries
        ?.map(entry => entry[promptKey as keyof typeof entry])
        .filter(Boolean)
        .join('\n');

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are continuing a journal entry. Here are some recent similar entries for context:

${recentContext}

The current entry starts with:
${currentText}

Continue the current entry naturally, maintaining the same style and tone. Only provide the continuation, do not repeat what was already written.`,
          max_tokens: 150
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get suggestion');
      }

      const data = await response.json();
      
      // Append the suggestion to the current text
      setEntries(prev => ({
        ...prev,
        [promptKey]: (prev[promptKey] + ' ' + data.text).trim()
      }));

    } catch (error) {
      console.error('Error getting suggestion:', error);
      setError('Failed to get suggestion. Please try again.');
    } finally {
      setIsLoadingSuggestion(prev => ({ ...prev, [promptKey]: false }));
    }
  };

  const questions = [
    {
      id: 'gratitude',
      question: PROMPTS.gratitude,
      value: entries.gratitude,
    },
    {
      id: 'scared_yesterday',
      question: PROMPTS.scared_yesterday,
      value: entries.scared_yesterday,
    },
    {
      id: 'beyond_yesterday',
      question: PROMPTS.beyond_yesterday,
      value: entries.beyond_yesterday,
    },
    {
      id: 'areas_to_improve',
      question: PROMPTS.areas_to_improve,
      value: entries.areas_to_improve,
    },
    {
      id: 'scared_today',
      question: PROMPTS.scared_today,
      value: entries.scared_today,
    },
    {
      id: 'beyond_today',
      question: PROMPTS.beyond_today,
      value: entries.beyond_today,
    },
    {
      id: 'fitness',
      question: PROMPTS.fitness,
      value: entries.fitness,
    },
    {
      id: 'nutrition',
      question: PROMPTS.nutrition,
      value: entries.nutrition,
    },
    {
      id: 'craft',
      question: PROMPTS.craft,
      value: entries.craft,
    },
    {
      id: 'perfect_day',
      question: PROMPTS.perfect_day,
      value: entries.perfect_day,
    },
  ];

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

          <Grid columns={{ initial: '1', sm: '4' }} gap="4" style={{ marginBottom: '1rem' }}>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold" style={{ minHeight: '40px' }}>
                Recovery Score (%) 
                <Text size="1" color="gray">Goal: {GOALS.recovery_score}%</Text>
              </Text>
              <TextField.Root>
                <TextField.Input
                  type="number"
                  value={entries.recovery_score || ''}
                  onChange={(e) => setEntries(prev => ({
                    ...prev,
                    recovery_score: e.target.value
                  }))}
                  placeholder="Enter score"
                />
              </TextField.Root>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--gray-4)', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${Math.min((entries.recovery_score / GOALS.recovery_score) * 100, 100)}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-9)',
                    transition: 'width 0.3s ease-in-out'
                  }} 
                />
              </div>
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold" style={{ minHeight: '40px' }}>
                Heart Rate Variability
                <Text size="1" color="gray">Goal: {GOALS.hrv}</Text>
              </Text>
              <TextField.Root>
                <TextField.Input
                  type="number"
                  value={entries.hrv || ''}
                  onChange={(e) => setEntries(prev => ({
                    ...prev,
                    hrv: e.target.value
                  }))}
                  placeholder="Enter HRV"
                />
              </TextField.Root>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--gray-4)', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${Math.min((entries.hrv / GOALS.hrv) * 100, 100)}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-9)',
                    transition: 'width 0.3s ease-in-out'
                  }} 
                />
              </div>
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold" style={{ minHeight: '40px' }}>
                Sleep Score (%)
              </Text>
              <TextField.Root>
                <TextField.Input
                  type="number"
                  value={entries.sleep_score || ''}
                  onChange={(e) => setEntries(prev => ({
                    ...prev,
                    sleep_score: e.target.value
                  }))}
                  placeholder="Enter score"
                />
              </TextField.Root>
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold" style={{ minHeight: '40px' }}>
                Hours Coded
                <Text size="1" color="gray">Goal: {GOALS.hours_coded}hrs</Text>
              </Text>
              <TextField.Root>
                <TextField.Input
                  type="number"
                  value={entries.hours_coded || ''}
                  onChange={(e) => setEntries(prev => ({
                    ...prev,
                    hours_coded: e.target.value
                  }))}
                  placeholder="Enter hours"
                />
              </TextField.Root>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--gray-4)', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${Math.min((entries.hours_coded / GOALS.hours_coded) * 100, 100)}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-9)',
                    transition: 'width 0.3s ease-in-out'
                  }} 
                />
              </div>
            </Flex>
          </Grid>

          <Grid columns="2" gap="4" width="auto">
            <Flex direction="column" gap="2">
              <Flex justify="between" align="center">
                <Text size="2">Published Blog Post?</Text>
              </Flex>
              <Button
                size="2"
                variant={entries.published_blog_post ? "solid" : "outline"}
                onClick={(e) => {
                  e.preventDefault();
                  setEntries(prev => ({ ...prev, published_blog_post: !prev.published_blog_post }));
                }}
                style={{
                  background: entries.published_blog_post ? '#22c55e' : 'transparent',
                  color: entries.published_blog_post ? 'white' : 'currentColor',
                  cursor: 'pointer'
                }}
              >
                {entries.published_blog_post ? 'Yes ✓' : 'No'}
              </Button>
            </Flex>

            <Flex direction="column" gap="2">
              <Flex justify="between" align="center">
                <Text size="2">Published Application?</Text>
              </Flex>
              <Button
                size="2"
                variant={entries.published_application ? "solid" : "outline"}
                onClick={(e) => {
                  e.preventDefault();
                  setEntries(prev => ({ ...prev, published_application: !prev.published_application }));
                }}
                style={{
                  background: entries.published_application ? '#22c55e' : 'transparent',
                  color: entries.published_application ? 'white' : 'currentColor',
                  cursor: 'pointer'
                }}
              >
                {entries.published_application ? 'Yes ✓' : 'No'}
              </Button>
            </Flex>
          </Grid>

          {questions.map(({ id, question, value }) => (
            <Flex key={id} direction="column" gap="2">
              <Flex justify="between" align="center">
                <Text size="2" weight="bold">{question}</Text>
                <IconButton 
                  size="1" 
                  variant="soft" 
                  onClick={() => getSuggestion(id as PromptKey)}
                  disabled={isLoadingSuggestion[id as PromptKey]}
                >
                  <LightningBoltIcon />
                </IconButton>
              </Flex>
              <TextArea
                value={value}
                onChange={(e) => setEntries(prev => ({
                  ...prev,
                  [id]: e.target.value
                }))}
                placeholder="Write your thoughts here..."
                style={{ 
                  minHeight: '100px', 
                  lineHeight: '1.5',
                  opacity: isLoadingSuggestion[id as PromptKey] ? 0.7 : 1 
                }}
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