'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Button, TextArea, Flex, TextField, Grid, IconButton } from '@radix-ui/themes';
import { createBrowserClient } from '@supabase/ssr';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import Together from "together-ai";

const PROMPTS = {
  gratitude: "What am I grateful for?",
  scared_yesterday: "What did I do that scared me yesterday?",
  beyond_yesterday: "What did I do that went above and beyond for others yesterday?",
  areas_to_improve: "What's a detail I can refine today?",
  scared_today: "How am I going to push myself out of my confort zone today? Because all growth comes from discomfort.",
  beyond_today: "What will I do today to go above and beyond for others?",
  fitness: "How am I going to work my fitness today?",
  nutrition: "How am I going to eat optimally today?",
  craft: "How am I going to work my craft today?"
};

const GOALS = {
  recovery_score: 80,
  hrv: 200,
  hours_coded: 10
};

type JournalEntry = {
  recovery_score: number;
  hrv: number;
  sleep_score: number;
  hours_coded: number;
  gratitude: string;
  scared_yesterday: string;
  beyond_yesterday: string;
  areas_to_improve: string;
  scared_today: string;
  beyond_today: string;
  fitness: string;
  nutrition: string;
  craft: string;
  created_at?: string;
  user_id?: string;
};

// Initialize Together client outside the component
const together = new Together({ 
  apiKey: '650442c69fb97cb64cf9eb9c2ff81593ea52be60ab3cb641ed50ac5921838f85'
});

// Add this type at the top with other type definitions
type PromptKey = keyof typeof PROMPTS;

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry>({
    recovery_score: 0,
    hrv: 0,
    sleep_score: 0,
    hours_coded: 0,
    gratitude: '',
    scared_yesterday: '',
    beyond_yesterday: '',
    areas_to_improve: '',
    scared_today: '',
    beyond_today: '',
    fitness: '',
    nutrition: '',
    craft: ''
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
      recovery_score: 0,
      hrv: 0,
      sleep_score: 0,
      hours_coded: 0,
      gratitude: '',
      scared_yesterday: '',
      beyond_yesterday: '',
      areas_to_improve: '',
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
          hours_coded: entries.hours_coded,
          gratitude: entries.gratitude,
          scared_yesterday: entries.scared_yesterday,
          beyond_yesterday: entries.beyond_yesterday,
          areas_to_improve: entries.areas_to_improve,
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
        hrv: 0,
        sleep_score: 0,
        hours_coded: 0,
        gratitude: '',
        scared_yesterday: '',
        beyond_yesterday: '',
        areas_to_improve: '',
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
    setIsLoadingSuggestion(prev => ({ ...prev, [promptKey]: true }));
    setIsStreaming(true);
    let fullSuggestion = '';
    
    try {
      const recentEntries = await getRecentEntries();
      
      // Format recent entries with dates for better context
      const relevantHistory = recentEntries
        .map(entry => {
          const date = new Date(entry.created_at || '').toLocaleDateString();
          return `${date} - ${PROMPTS[promptKey]}: ${entry[promptKey]}
          Recovery: ${entry.recovery_score}%, HRV: ${entry.hrv}, Sleep: ${entry.sleep_score}%, Hours Coded: ${entry.hours_coded}hrs`;
        })
        .join('\n\n');

      const systemPrompt = `I am an ambitious athlete-entrepreneur combining elite fitness with innovative AI development.
      My key traits:
      - I code AI apps 10+ hours daily with militant focus
      - I maintain peak physical condition through intense workouts
      - I meditate deeply and practice mindfulness
      - I'm building revolutionary AI products while cultivating an inspiring presence
      - I value authenticity, discipline, and continuous improvement
      
      Here are my recent journal entries for context:
      
      ${relevantHistory}`;

      const promptTemplates: Record<PromptKey, string> = {
        gratitude: "Based on my journey and recent entries, write a specific 40-word gratitude reflection focused on my progress in tech and fitness: ",
        scared_yesterday: "Analyzing my growth pattern and recent challenges in building AI products and maintaining peak fitness, write a focused 40-word reflection about: ",
        beyond_yesterday: "Given my dedication to both tech and fitness excellence, write a specific 40-word response about how I went beyond by: ",
        areas_to_improve: "Considering my dual focus on AI development and physical optimization, write a precise 40-word response about what I can refine: ",
        scared_today: "Understanding my ambitious goals in tech and fitness, write a specific 40-word response about embracing necessary discomfort: ",
        beyond_today: "With my vision of becoming a legendary tech-fitness hybrid, write a focused 40-word plan about: ",
        fitness: "As someone pursuing both mental and physical excellence, write a specific 40-word workout plan considering: ",
        nutrition: "Given my need for peak mental and physical performance, write a specific 40-word nutrition plan that: ",
        craft: "As an AI developer with a unique fitness-meditation background, write a focused 40-word plan about: "
      };

      const basePrompt = promptTemplates[promptKey] || 
        "Based on my unique journey combining tech and fitness, write a specific 40-word response about: ";
      
      const response = await together.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `${basePrompt} ${PROMPTS[promptKey]}. Keep response under 40 words and make it highly specific to my journey.`
          }
        ],
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        max_tokens: 60,
        temperature: 0.8,
        top_p: 0.9,
        top_k: 50,
        repetition_penalty: 1,
        stream: true
      });

      // Handle streaming response
      for await (const token of response) {
        const newContent = token.choices[0]?.delta?.content || '';
        fullSuggestion += newContent;
        
        // Update the actual text area instead of showing a separate suggestion
        setEntries(prev => ({
          ...prev,
          [promptKey]: fullSuggestion
        }));
      }

    } catch (error) {
      console.error('Error getting AI suggestion:', error);
      // Show error in the text area
      setEntries(prev => ({
        ...prev,
        [promptKey]: "Sorry, I couldn't generate a suggestion right now. Please try again."
      }));
    } finally {
      setIsLoadingSuggestion(prev => ({ ...prev, [promptKey]: false }));
      setIsStreaming(false);
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
                    recovery_score: Number(e.target.value)
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
                    hrv: Number(e.target.value)
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
                    sleep_score: Number(e.target.value)
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
                    hours_coded: Number(e.target.value)
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

          {Object.entries(PROMPTS).map(([key, prompt]) => (
            <Flex key={key} direction="column" gap="2">
              <Flex justify="between" align="center">
                <Text size="2" weight="bold">{prompt}</Text>
                <IconButton 
                  size="1" 
                  variant="soft" 
                  onClick={() => getSuggestion(key as PromptKey)}
                  disabled={isLoadingSuggestion[key as PromptKey]}
                >
                  <LightningBoltIcon />
                </IconButton>
              </Flex>
              <TextArea
                value={entries[key as keyof JournalEntry]}
                onChange={(e) => setEntries(prev => ({
                  ...prev,
                  [key]: e.target.value
                }))}
                placeholder="Write your thoughts here..."
                style={{ 
                  minHeight: '100px', 
                  lineHeight: '1.5',
                  opacity: isLoadingSuggestion[key as PromptKey] ? 0.7 : 1 
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