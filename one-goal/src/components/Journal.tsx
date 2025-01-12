'use client';

import { Card, Text, Heading, Flex, Box, TextArea, Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';

type JournalPrompt = {
  id: string;
  question: string;
  category: 'gratitude' | 'goals' | 'reflection' | 'growth';
};

const DAILY_PROMPTS: JournalPrompt[] = [
  { 
    id: 'gratitude',
    question: 'What are you deeply grateful for in this moment?',
    category: 'gratitude'
  },
  {
    id: 'energy',
    question: 'How will you channel your energy to achieve your warrior king vision today?',
    category: 'goals'
  },
  {
    id: 'growth',
    question: 'What is one way you will push beyond your comfort zone today?',
    category: 'growth'
  },
  {
    id: 'obstacles',
    question: 'What obstacles might arise, and how will you overcome them with strength?',
    category: 'reflection'
  },
  {
    id: 'impact',
    question: 'How will you make a positive impact on others today?',
    category: 'goals'
  }
];

export default function Journal() {
  const [entries, setEntries] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form on mount/refresh
  useEffect(() => {
    setEntries({});
    setIsSubmitted(false);
  }, []);

  const handleChange = (promptId: string, value: string) => {
    setEntries(prev => ({
      ...prev,
      [promptId]: value
    }));
  };

  const handleSubmit = () => {
    const allAnswered = DAILY_PROMPTS.every(prompt => entries[prompt.id]?.trim());
    if (allAnswered) {
      setIsSubmitted(true);
      // Here we'll later add the Supabase submission
    }
  };

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="5" p="4">
        <Box>
          <Heading size="4" mb="2">Morning Journal</Heading>
          <Text size="2" color="gray">Set your intention for the day ahead</Text>
        </Box>

        <Flex direction="column" gap="4">
          {DAILY_PROMPTS.map((prompt) => (
            <Box key={prompt.id}>
              <Text 
                size="2" 
                mb="2" 
                style={{ 
                  color: prompt.category === 'gratitude' ? 'var(--purple-a11)' :
                         prompt.category === 'goals' ? 'var(--blue-a11)' :
                         prompt.category === 'growth' ? 'var(--green-a11)' :
                         'var(--orange-a11)'
                }}
              >
                {prompt.question}
              </Text>
              <TextArea 
                value={entries[prompt.id] || ''}
                onChange={(e) => handleChange(prompt.id, e.target.value)}
                disabled={isSubmitted}
                placeholder="Type your response..."
              />
            </Box>
          ))}
        </Flex>

        <Button 
          onClick={handleSubmit}
          disabled={isSubmitted || !DAILY_PROMPTS.every(prompt => entries[prompt.id]?.trim())}
        >
          {isSubmitted ? 'Submitted for Today' : 'Submit Journal Entry'}
        </Button>
      </Flex>
    </Card>
  );
} 