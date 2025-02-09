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

type HabitGroup = {
  title: string;
  habits: string[];
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

  const habitGroups: HabitGroup[] = [
    {
      title: "In the morning",
      habits: [
        "YOGA - I stretch 2 minutes",
        "MEDITATE - I meditate 30 mins+",
        "DELAY COFFEE - Wait 30 minutes before coffee, let your adenocene naturally clear",
        "CREATINE - I have creatine",
        "BIG WATER -I have a big glass of water",
        "SUNLIGHT - I get my 30 minutes of sunlight",
        "WORKOUT - I never skip the morning workout or my day is ruined",
        "HOT|COLD|HOT|COLD - A hot cold hot cold shower is an excellent way to get you feeling great to start work.",
      ]
    },
    {
      title: "At the gym",
      habits: [
        "AUDIOBOOK - During active recovery, I listen to audiobooks",
        "DEEP STRETCH - Im stretching my muscles as deep as possible",
        "PLIABILITY - I'm massaging my muscles as deep as possible",
        "CONTENT -I capture one piece of content every workout",
        "DEMON - I let the demon out, and the demon wants damage",
        "FIND PAIN - I find the spot of most pain, and focus my energy there",
        "HIGH PUMP - I can get high off the pump, to the feeling of cumming.",
        "CARDIO DAILY - I do cardio every evening otherwise I can't sleep",
        "NO ONE OUT - No ones making it out today",
        "MIN 3 WITH - I make sure I get at least 3 workouts with others per week to reap the ultimate serotonin from friendship"
      ]
    },
    {
      title: "When walking",
      habits: [
        "CLEAR MIND - Give your mind time to clean, do the necessary work to reset."
      ]
    },
    {
      title: "At work",
      habits: [
        "ALL DAY - I do it all day 7 days a week",
        "DETAIL - I obsess over every detail",
        "FIND DOPE - Dopamine lets you continue",
        "1 COFFEE - I have 1 or less coffees or it will ruin my sleep",
        "NAP - Your body naturally has a dip in energy around 2pm, leverage it to replenish your mind with a nap",
        "DNCE&CLEAN - When i'm stressed I get up and move",
        "FOCUS - The only thing that matters is progressing the task",
        "SOLVE STRUGGLE - Everything I do at work is about understanding the progress people are trying to achieve, and what struggles are in the way of that, and then solving the struggle"
      ]
    },
    {
      title: "At home",
      habits: [
        "JAZZ - I do jazz 1x per month",
        "CLEANING - I'm constantly cleaning"
      ]
    },
    {
      title: "With others",
      habits: [
        "10X - I don't give a fuck who you are, you're getting 10X from me.",
        "LISTEN - I listen intently to what they are saying",
        "CARE - I care deeply about their success",
        "LOVE - I love them, and I let them know",
        "SHARE - I share everything I know",
        "BE AUTHENTIC - Remove any filter on your thoughts"
      ]
    },
    {
      title: "In the kitchen",
      habits: [
        "INSPIRING VIDEO - I'll watch a fitness video with dinner if i'm alone",
        "CLEAN - I eat extremely clean otherwise I get anxiety later in the day.",
        "PROTEIN - I eat really clean protein",
        "FIBER - I eat as much fiber as I can so I can have really effective nutrient absorption",
        "DAIRY - I don't eat dairy, it creates the microbiome that craves more",
        "GLUTEN - I don't eat gluten, it creates the microbiome that craves more",
        "SUGAR - I don't eat added sugar, it creates the microbiome that craves more",
        "ALCOHOL - I don't drink alcohol, it creates the microbiome that craves more",
        "END EARLY - I finish eating at least 2 hours before bed so I can get the ultimate restorative sleep"
      ]
    },
    {
      title: "Before bed",
      habits: [
        "DIGESTED - I need to give my body at lease a few hours to digest before I sleep ",
        "READ 5 - I read at least 5 pages before bed every night",
        "STRETCH PRAY 5 - 5 minutes of stretching and praying replenish the body and the heart"
      ]
    },
    {
      title: "When times are tough",
      habits: [
        "PERSPECTIVE - I stop saying why and I start saying wow",
        "APATHY - Apathy is death, love is the birth of hope."
      ]
    },
    {
      title: "During meditation",
      habits: [
        "AURA - Done right, everyone you come into contact for the day will feel your loving energy without you trying.",
        "OXYGENATE - Breathe so deeply and consistently your whole body feels a buzz",
        "OBSERVE - Watch thoughts pass by without attachment",
        "LOVE - Tag everything that comes up with love"
      ]
    }
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
    <Card size="3" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Flex direction="column" gap="5" p="4" style={{ width: '100%' }}>
        <Box>
          <Heading size="6" mb="4">Guiding Principles</Heading>
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
          <Grid columns="1" gap="4">
            {habitGroups.map((group, groupIdx) => (
              <Box 
                key={groupIdx}
                style={{
                  backgroundColor: 'var(--gray-2)',
                  padding: '16px',
                  borderRadius: '8px',
                  width: '100%'
                }}
              >
                <Flex align="center" gap="2" mb="3">
                  <Text weight="bold" size="3" style={{ color: 'var(--gray-12)' }}>
                    {group.title}
                  </Text>
                </Flex>
                <Flex direction="column" gap="3">
                  {group.habits.map((habit, habitIdx) => {
                    const globalIdx = groupIdx * 100 + habitIdx; // Unique index for each habit
                    return (
                      <Flex 
                        key={habitIdx} 
                        align="center" 
                        gap="3"
                        style={{ 
                          padding: '4px',
                          cursor: 'pointer',
                          marginBottom: '4px',
                          width: '100%'
                        }}
                        onClick={() => handleCheck(globalIdx)}
                      >
                        <Checkbox 
                          checked={checkedHabits[globalIdx] || false}
                          onCheckedChange={() => handleCheck(globalIdx)}
                          style={{ transform: 'scale(1)' }}
                        />
                        <Text 
                          size="1" 
                          style={{ 
                            textDecoration: checkedHabits[globalIdx] ? 'line-through' : 'none',
                            opacity: checkedHabits[globalIdx] ? 0.6 : 0.8,
                            flex: 1
                          }}
                        >
                          {habit}
                        </Text>
                      </Flex>
                    );
                  })}
                </Flex>
              </Box>            ))}
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