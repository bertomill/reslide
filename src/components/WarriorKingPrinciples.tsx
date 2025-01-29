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
        "YOGA - I stretch for 2 minutes",
        "MEDITATE - I meditate 30 minutes or more",
        "CRATINE - I have creatine",
        "BIG WATER -I have a big glass of water",
        "SUNLIGHT - I get my 30 minutes of sunlight",
        "READ - I read for 30 minutes",
        "WORKOUT - I never don't go workout in the morning",
        "SLEEP -I never get less than 8 hours in bed on the weekends"
      ]
    },
    {
      title: "At the gym",
      habits: [
        "AUDIOBOOKS - If I'm doing active recovery, I will listen to an audiobook",
        "CONTENT -I capture one piece of content with every workout",
        "CAN'T WALK - If its a heavy lift, I workout till I can't walk",
        "PAIN DEPTH - My mentality is no one's making it out - the pain is extreme",
        "DEMON - Sometimes I let the demon out, and the demon wants to damage my body",
        "FIND PAIN - I find the spot of most pain, and focus my energy there",
        "CADIO DAILY -I do cardio every evening because I can't sleep otherwise",
        "SADNESS - There's a twinge of sadness in my workouts, because I need them to keep myself form hurting myself otherwise",
      ]
    },
    {
      title: "When walking",
      habits: [
        "CLEAR MIND - I don't listen to anything - giving my mind some time to clear, and significantly reducing my anxiety."
      ]
    },
    {
      title: "At work",
      habits: [
        "CODE EVERYDAY - If i'm not coding every day, i'm going to lose the groove it takes",
        "FLOW  - The objective is flow",
        "TIME ON TASK  - The competition between you, Dave G, and Chrip P, is going to come down to who is spending more time on task.",
        "STUDIO -I'm in the studio - cooking uwp insanely great AI products.",
        "CURIOSITY - I let curiosity be my engine and rudder.",
        "FAST TIL NOON - I fast til noon. It does miracles for my focus and my skin.",
        "1 COFFEE - I have 1 or less coffees or it will ruin my sleep",
        "SAVE - I never waste money, debt is a chain",
        "NAP - Naps save my life",
        "LOCAL GOLD - I don't need to be the best in the world at the job to be done, yet. I need to be the best in my local environment, and as an AI expert - the competition is Dave G and Chris P.",
        "FRONTIER - I relentlessly push to be on the froniter of knowlegde",
        "COMPOUND - The more hours you learn about something, the easier it is to learn more. Growing an audience is another: the more fans you have, the more new fans they'll bring you",
        "DISTRACTION - I avoid distraction that pushes my work out of the top spot, or I'll waste this valuable type of thinking on the distraction instead. (Exception: Don't avoid love.)",
        "COLLEAGUES - Colleagues don't just affect your work, though; they also affect you. So work with people you want to become like, because you will.",
        "OUTLIER - I boldly chase outlier ideas",
        "ME - I make what I would want",
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
        "OPEN HEART - I open up to others, even if it's uncomfortable",
        "MOTIVATION - Every time a customer or a girl passes on me, it's good for both of us because it gives them optionality, and it lights my fire for next time",
        "ANNOYING - Best way to make friends. How to not make friends is being timid, so be the opposite.",
        "NEVER HEADPHONES - I never wear headphones around people",
        "SAY YES - I always say yes to possibility",
        "DIMES - I try to go for absolute wifeys, because if I get them i's huge energy and if i'm rejected its huge motivation",
        "NO OPTION - I don't leave myself an option to not make friends",
        "AUTHENTIC - I text back quickly, and 100% authentically",
        "GET REPS -  I see dates with girls as reps of opening my heart. The more the better."
      ]
    },
    {
      title: "In the kitchen",
      habits: [
        "PERFECTION - I'm a perfectinist with my nutrition",
        "INSPIRATION - I'll watch a fitness video with dinner if i'm alone",
        "OPTIMIZE - I optimize protein, fibre, and vitamins",
        "DAIRY - I don't eat dairy, it creates the microbiome that craves more",
        "GLUTEN - I don't eat gluten, it creates the microbiome that craves more",
        "SUGAR - I don't eat added sugar, it creates the microbiome that craves more",
        "ALCOHOL - I don't drink alcohol, it creates the microbiome that craves more"
      ]
    },
    {
      title: "Before bed",
      habits: [
        "READ - I read for 30 minutes",
        "STRETCH - I stretch for two minutes",
        "GOOD SLEEP - I remember I can't work the next day if I don't get a good sleep",
        "BUFFER - remember sleep makes life feel okay."
      ]
    },
    {
      title: "When times are tough",
      habits: [
        "PERSPECTIVE - I stop saying why and I start saying wow",
        "APATHY - Apathy is death, love is the birth of hope."
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