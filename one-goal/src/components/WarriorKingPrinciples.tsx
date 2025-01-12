'use client';

import { Card, Text, Heading, Flex, Box, Badge, Separator, Grid, Checkbox } from '@radix-ui/themes';
import { useState } from 'react';

type DailyActivity = {
  name: string;
  hours: number;
  category: 'mind' | 'body' | 'spirit' | 'social' | 'work';
};

type Habit = {
  description: string;
  category: 'discipline' | 'social' | 'mindset' | 'health';
};

type Principle = string;

export default function WarriorKingPrinciples() {
  const [checkedHabits, setCheckedHabits] = useState<{[key: string]: boolean}>({});
  const [checkedPrinciples, setCheckedPrinciples] = useState<{[key: string]: boolean}>({});
  
  const dailyActivities: DailyActivity[] = [
    { name: "Reading", hours: 2, category: "mind" },
    { name: "Coding", hours: 6, category: "work" },
    { name: "Sleep", hours: 8, category: "body" },
    { name: "Physical Training", hours: 3, category: "body" },
    { name: "Project Management", hours: 2, category: "work" },
    { name: "Social Connection", hours: 1, category: "social" },
    { name: "Meditation", hours: 1, category: "spirit" },
    { name: "Relaxation", hours: 1, category: "spirit" }
  ];

  const habits: Habit[] = [
    { description: "I have creatine and protein every day", category: "health" },
    { description: "I dance and clean when stressed", category: "mindset" },
    { description: "I never cheat on my diet", category: "discipline" },
    { description: "I never consume media unless its my evening show", category: "discipline" },
    { description: "I never wear headphones around people", category: "social" },
    { description: "I'm never late for people", category: "discipline" },
    { description: "I listen my ass off with people", category: "social" },
    { description: "I give people 10x no matter what", category: "social" },
    { description: "I never waste money - cash is freedom", category: "discipline" },
    { description: "I read every night before bed", category: "discipline" },
    { description: "I listen to inspiring audiobooks during active recovery", category: "mindset" },
    { description: "I smile and nod to strangers", category: "social" },
    { description: "I always say yes to possibility", category: "social" },
    { description: "I never drink alcohol", category: "discipline" },
    { description: "I do jazz only once a month", category: "discipline" }
  ];

  const principles: Principle[] = [
    "I don't have an ounce of fear in my body",
    "I work harder than anyone else",
    "I am earnest in everything I do",
    "I stay humble no matter what"
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
      health: "green"
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

  const resetChecks = () => {
    setCheckedHabits({});
  };

  const resetPrinciples = () => {
    setCheckedPrinciples({});
  };

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="5" p="4">
        <Box>
          <Heading size="6" mb="4">Modern Day Warrior King</Heading>
          <Text size="2" color="gray" mb="4">
            The path of physical and mental excellence
          </Text>
        </Box>

        <Box>
          <Heading size="4" mb="3">Daily Schedule ({dailyActivities.reduce((acc, curr) => acc + curr.hours, 0)} hours)</Heading>
          <Flex direction="column" gap="2">
            {dailyActivities.map((activity, idx) => (
              <Flex key={idx} justify="between" align="center">
                <Text size="2">{activity.name}</Text>
                <Flex gap="2" align="center">
                  <Badge size="1" color={getCategoryColor(activity.category)}>
                    {activity.hours}h
                  </Badge>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Box>

        <Separator size="4" />

        <Box>
          <Heading size="4" mb="2">Core Habits</Heading>
          <Text size="2" color="gray" mb="4" style={{ fontStyle: 'italic' }}>
            State each habit aloud and check it off as you go
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
                  color={habit.category === 'discipline' ? 'red' : 
                         habit.category === 'social' ? 'orange' :
                         habit.category === 'mindset' ? 'yellow' : 'green'}
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

        <Separator size="4" />

        <Box>
          <Heading size="4" mb="2">Guiding Principles</Heading>
          <Text size="2" color="gray" mb="4" style={{ fontStyle: 'italic' }}>
            State each principle aloud and check it off as you go
          </Text>
          <Grid columns="1" gap="4">
            {principles.map((principle, idx) => (
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
                onClick={() => handlePrincipleCheck(idx)}
              >
                <Checkbox 
                  checked={checkedPrinciples[idx] || false}
                  onCheckedChange={() => handlePrincipleCheck(idx)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <Text 
                  size="3" 
                  weight="bold"
                  style={{ 
                    textDecoration: checkedPrinciples[idx] ? 'line-through' : 'none',
                    opacity: checkedPrinciples[idx] ? 0.6 : 1,
                    flex: 1
                  }}
                >
                  {principle}
                </Text>
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
      </Flex>
    </Card>
  );
} 