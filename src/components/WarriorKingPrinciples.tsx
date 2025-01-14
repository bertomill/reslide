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
    { description: "I'm a world-class team mate", category: "mindset" },
    { description: "All I do is hustle", category: "mindset" },
    { description: "I'm obssed with fitness", category: "health" },
    { description: "I play on the edge of hunger", category: "health" },
    { description: "I do long straw exhales when stressed", category: "mindset" },
    { description: "I get 30 mins of sunlight no matter what", category: "mindset" },
    { description: "I dance and clean when down", category: "mindset" },
    { description: "I never cheat on my diet", category: "discipline" },
    { description: "I never consume media unless its going to inspire me", category: "discipline" },
    { description: "I never wear headphones around people", category: "social" },
    { description: "I connect with people easily", category: "social" },
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
    "I attack my fears",
    "I ",
    "I'm the most earnest person you've ever seen",
    "I stay humble no matter what",
    "I only cook blue crack"
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
      <Flex direction="column" gap="5" p="4">
        <Box>
          <Heading size="6" mb="4">Living up to my identity</Heading>
          <Text size="2" color="gray" mb="4">
            The price I have to pay to live up to my identity
          </Text>
        </Box>

        <Box>
          <Heading size="4" mb="3">Daily Schedule</Heading>
          <Flex direction="column" gap="2">
            {dailyActivities.map((activity, idx) => (
              <Box key={idx}>
                <Flex 
                  align="center" 
                  gap="3"
                  style={{ 
                    padding: '16px',
                    borderRadius: 'var(--radius-2)',
                    backgroundColor: 'var(--gray-2)',
                    cursor: 'pointer',
                    minHeight: '60px',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                  onClick={() => handleActivityCheck(idx)}
                >
                  <Checkbox 
                    checked={checkedActivities[idx] || false}
                    onCheckedChange={() => handleActivityCheck(idx)}
                    style={{ 
                      transform: 'scale(1.4)',
                      minWidth: '24px',
                      minHeight: '24px'
                    }}
                  />
                  <Text 
                    size="2"
                    style={{ 
                      textDecoration: checkedActivities[idx] ? 'line-through' : 'none',
                      opacity: checkedActivities[idx] ? 0.6 : 1,
                      flex: 1,
                      paddingLeft: '8px',
                      paddingRight: '8px'
                    }}
                  >
                    {activity.name}
                  </Text>
                  <Badge 
                    size="1" 
                    color={getCategoryColor(activity.category)}
                    style={{
                      minWidth: '40px',
                      textAlign: 'center'
                    }}
                  >
                    {activity.hours}h
                  </Badge>
                </Flex>
                {idx < dailyActivities.length - 1 && (
                  <Box style={{ 
                    height: '1px', 
                    backgroundColor: 'var(--gray-5)', 
                    opacity: 0.2,
                    margin: '1px 0'
                  }} />
                )}
              </Box>
            ))}
          </Flex>
          <Flex justify="end" mt="4">
            <Text 
              size="2" 
              color="blue" 
              style={{ cursor: 'pointer' }}
              onClick={resetActivities}
            >
              Reset all
            </Text>
          </Flex>
        </Box>

        <Separator size="4" />

        <Box>
          <Heading size="4" mb="2">Berto Identity</Heading>
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
            These are the principles that I live by
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