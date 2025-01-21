'use client';

import { Card, Text, Heading, Flex, Box, Badge, Separator, Grid, Checkbox } from '@radix-ui/themes';
import { useState } from 'react';
import ExponentialChart from './ExponentialChart';

type DailyActivity = {
  name: string;
  hours: number;
  category: 'mind' | 'body' | 'spirit' | 'social' | 'work';
};

type Habit = {
  description: string;
  category: 'discipline' | 'social' | 'mindset' | 'health' | 'craft';
};

type Principle = {
  title: string;
  description: string;
};

export default function WarriorKingPrinciples() {
  const [checkedHabits, setCheckedHabits] = useState<{[key: string]: boolean}>({});
  const [checkedPrinciples, setCheckedPrinciples] = useState<{[key: string]: boolean}>({});
  const [checkedActivities, setCheckedActivities] = useState<{[key: string]: boolean}>({});
  
  const dailyActivities: DailyActivity[] = [
    { name: "Reading", hours: 2, category: "mind" },
    { name: "Coding", hours: 6, category: "work" },
    { name: "Sleep", hours: 8, category: "body" },
    { name: "Physical Training", hours: 3, category: "body" },
    { name: "Project Management", hours: 2, category: "work" },
    { name: "Quality Time Together", hours: 1, category: "social" },
    { name: "Meditation", hours: 1, category: "spirit" },
    { name: "Blogging", hours: 1, category: "mind" }
  ];

  const habits: Habit[] = [
    { description: "I have creatine and protein every day", category: "health" },
    { description: "I use whim Hoff breathing to increase adrenaline", category: "health" },
    { description: "I use 2 big inhale, one slow excale breathing to increase seretonin", category: "health" },
    { description: "I fast til 1-4 pm", category: "health" },
    { description: "I play on the edge of hunger", category: "health" },
    { description: "I do long straw exhales when stressed", category: "mindset" },
    { description: "I get 30 mins of sunlight no matter what", category: "mindset" },
    { description: "I dance and clean when down", category: "mindset" },
    { description: "I don't eat dairy", category: "discipline" },
    { description: "I don't eat gluten", category: "discipline" },
    { description: "I don't eat added sugar", category: "discipline" },
    { description: "I never wear headphones around people", category: "social" },
    { description: "I wear clothes that match my aura", category: "social" },
    { description: "I'm never late for people", category: "discipline" },
    { description: "I give people 10x no matter what", category: "social" },
    { description: "I never waste money - cash is freedom", category: "discipline" },
    { description: "I read every night before bed", category: "discipline" },
    { description: "I listen to audiobooks during active recovery", category: "mindset" },
    { description: "I always say yes to possibility", category: "social" },
    { description: "I never drink alcohol", category: "discipline" },
    { description: "I do jazz only once a month", category: "discipline" },
    { description: "I find fear and move towards it", category: "mindset" },
    { description: "I make friends no matter what - there's no other option", category: "social" },
    { description: "I clean compulsively", category: "discipline" },
    { description: "I find boring work and attack it because boring work leads to exceptional results", category: "craft" },
    { description: "I go for at least one quiet walk every day", category: "mindset" },
    { description: "I work in timed sprints - no matter how I'm feeling", category: "craft" }
  ];

  const principles: Principle[] = [
    {
      title: "Industriousness",
      description: "There is no substitute for work. Worthwhile results come from hard work and careful planning."
    },
    {
      title: "Friendship",
      description: "Comes from mutual esteem, respect, and devotion. Like marriage it must not be taken for granted but requires a joint effort."
    },
    {
      title: "Loyalty",
      description: "To yourself and all those depending upon you. Keep your self-respect."
    },
    {
      title: "Cooperation",
      description: "With all levels of your co-workers. Listen if you want to be heard. Be interested in finding the best way, not having your own way."
    },
    {
      title: "Enthusiasm",
      description: "Brushes off upon those whom you come in contact. You must truly enjoy what you are doing."
    },
    {
      title: "Intentness",
      description: "Setting a realistic goal. Concentrate on its achievement by resisting all temptations and being determined and persistent."
    },
    {
      title: "Initiative",
      description: "Cultivate the ability to make decisions and think alone. Do not be afraid of failure, and learn from it."
    },
    {
      title: "Alertness",
      description: "Be observing constantly. Stay open-minded. Be eager to learn and improve."
    },
    {
      title: "Self-Control",
      description: "Practice self-discipline and keep emotions under control. Good judgment and common sense are essential."
    },
    {
      title: "Condition",
      description: "Mental-moral-physical. Rest, exercise and diet must be considered."
    },
    {
      title: "Skill",
      description: "A knowledge of and the ability to quickly execute the fundamentals. Be prepared and cover every detail."
    },
    {
      title: "Team Spirit",
      description: "A genuine consideration for others. An eagerness to sacrifice personal interests of glory for the welfare of all."
    },
    {
      title: "Confidence",
      description: "Respect without fear, may come from being prepared and keeping all things in proper perspective."
    },
    {
      title: "Poise",
      description: "Just being yourself. Being at ease in any situation. Never fighting yourself."
    },
    {
      title: "Competitive Greatness",
      description: "Be at your best when your best is needed. Enjoyment of a difficult challenge."
    }
  ];

  const getCategoryColor = (category: string): "gray" | "blue" | "green" | "purple" | "orange" | "cyan" | "red" | "yellow" => {
    const colors: { [key: string]: "gray" | "blue" | "green" | "purple" | "orange" | "cyan" | "red" | "yellow" } = {
      mind: "blue",
      body: "green",
      spirit: "purple",
      social: "orange",
      work: "cyan",
      discipline: "red",
      mindset: "yellow",
      health: "green",
      craft: "gray"
    };
    return colors[category] || "gray";
  };

  const handleCheck = (habitIndex: number) => {
    setCheckedHabits(prev => ({
      ...prev,
      [habitIndex]: !prev[habitIndex]
    }));
  };

  const handlePrincipleCheck = (principleIndex: number) => {
    setCheckedPrinciples(prev => ({
      ...prev,
      [principleIndex]: !prev[principleIndex]
    }));
  };

  const handleActivityCheck = (activityIndex: number) => {
    setCheckedActivities(prev => ({
      ...prev,
      [activityIndex]: !prev[activityIndex]
    }));
  };

  const resetChecks = () => {
    setCheckedHabits({});
  };

  const resetPrinciples = () => {
    setCheckedPrinciples({});
  };

  const resetActivities = () => {
    setCheckedActivities({});
  };

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="5" p="4" style={{ width: '100%' }}>
        <Box>
          <Heading size="6" mb="4">Guiding Principles</Heading>
          <Text size="2" color="gray" mb="4">
            What it takes to live a successful life
          </Text>
        </Box>

        <Separator size="4" />

        <Box>
          <Grid columns="1" gap="4">
            {principles.map((principle, idx) => (
              <Flex 
                key={idx} 
                align="start" 
                gap="3"
                style={{ 
                  padding: '4px',
                  borderRadius: 'var(--radius-2)',
                  backgroundColor: 'var(--gray-2)',
                  cursor: 'pointer'
                }}
                onClick={() => handlePrincipleCheck(idx)}
              >
                <Checkbox 
                  checked={checkedPrinciples[idx] || false}
                  onCheckedChange={() => handlePrincipleCheck(idx)}
                  style={{ transform: 'scale(1.2)', marginTop: '4px' }}
                />
                <Box>
                  <Text 
                    size="3" 
                    weight="bold"
                    style={{ 
                      textDecoration: checkedPrinciples[idx] ? 'line-through' : 'none',
                      opacity: checkedPrinciples[idx] ? 0.6 : 1
                    }}
                  >
                    {principle.title}
                  </Text>
                  <Text
                    size="1"
                    color="gray"
                    style={{ 
                      marginTop: '2px',
                      opacity: checkedPrinciples[idx] ? 0.6 : 0.8
                    }}
                  >
                    {principle.description}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Grid>
          <Flex justify="end" mt="4">
            <Text 
              size="2" 
              color="blue" 
              style={{ cursor: 'pointer' }}
              onClick={resetPrinciples}
            >
              Reset all
            </Text>
          </Flex>
        </Box>

        <Separator size="4" />

        <Box>
          <Heading size="4" mb="2">My habits make me</Heading>
          <Text size="2" color="gray" mb="4" style={{ fontStyle: 'italic' }}>
            This is who I am
          </Text>
          <Grid columns="1" gap="4">
            {habits.map((habit, idx) => (
              <Flex 
                key={idx} 
                align="center" 
                gap="3"
                style={{ 
                  padding: '8px',
                  borderRadius: 'var(--radius-2)',
                  backgroundColor: 'var(--gray-2)',
                  cursor: 'pointer'
                }}
                onClick={() => handleCheck(idx)}
              >
                <Checkbox 
                  checked={checkedHabits[idx] || false}
                  onCheckedChange={() => handleCheck(idx)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <Badge 
                  size="2" 
                  color={getCategoryColor(habit.category)}
                  style={{
                    width: '80px',
                    textAlign: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {habit.category}
                </Badge>
                <Text 
                  size="2" 
                  style={{ 
                    textDecoration: checkedHabits[idx] ? 'line-through' : 'none',
                    opacity: checkedHabits[idx] ? 0.6 : 1,
                    flex: 1
                  }}
                >
                  {habit.description}
                </Text>
              </Flex>
            ))}
          </Grid>
          <Flex justify="end" mt="4">
            <Text 
              size="2" 
              color="blue" 
              style={{ cursor: 'pointer' }}
              onClick={resetChecks}
            >
              Reset all
            </Text>
          </Flex>
        </Box>

        <Box style={{ width: '100%' }}>
          <Separator size="4" />
          <ExponentialChart />
        </Box>
      </Flex>
    </Card>
  );
} 