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
        "CREATINE - I have creatine",
        "BIG WATER -I have a big glass of water",
        "SUNLIGHT - I get my 30 minutes of sunlight",
        "WORKOUT - I never skip the morning workout or my day is ruined",
        "FOUNDER - I get inspired by reading blogs from founders while stretching",
        "HYPERFOCUS - A shot of espresso followed immediately by a cold shower while fasted is the cocktail for extremely good mental performance.",
      ]
    },
    {
      title: "At the gym",
      habits: [
        "AUDIOBOOK - During active recovery, I listen to audiobooks",
        "STRETCH - Im stretching my muscles as deep as possible",
        "PLIABILITY - I'm massaging my muscles as deep as possible",
        "CONTENT -I capture one piece of content every workout",
        "DEMON - Sometimes I let the demon out, and the demon wants to damage my body",
        "FIND PAIN - I find the spot of most pain, and focus my energy there",
        "HIGH PUMP - I can get high off the pump, to the feeling of cumming.",
        "CADIO DAILY -I do cardio every evening otherwise I can't sleep",
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
        "CODE EVERYDAY - If i'm not coding every day, I lose all the momemntum I built",
        "GRANULAR - I start to get into my best work when i'm slowly, methodically going through one line of code, one scentence, one detail at a time. The extreme granularity creates a deep sense of flow.",
        "TIME ON TASK  - I put in 10 hours a day, 7 days a week, for years on end on AI app dev.",
        "FIND DOPAMINE - When you hit the wall in work don't panic, scroll social media for a few mins and you're back.",
        "STUDIO - I'm in the studio - cooking uwp insanely great AI products.",
        "CURIOSITY - I let curiosity be my engine and rudder.",
        "FAST TIL NOON - I fast til noon. It does miracles for my focus and my skin.",
        "1 COFFEE - I have 1 or less coffees or it will ruin my sleep",
        "SAVE - I never waste money, debt is a chain",
        "NAP - Naps save my life",
        "DNCE&CLEAN - You wil get anxious when things are not going well. The best break and i've done this a thousand times is to dance and clean, when your body has cortisol, you need to move/shake to dispense it.",
        "FRONTIER - I relentlessly push to be on the froniter of knowlegde",
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
        "IMPRESSION - The very first impression you leave on someone is often the most important one you'll get.",
        "LOVE - Just be an addict for making friendships. Let all the other actions fall into place naturally. The best friendships you've ever made are the ones where you can just turn off your thinking and be 100% authentic.",
        "NEVER HEADPHONES - I never wear headphones around people",
        "TALK - I try to not even talk to people unless they energize me, sorry, my time is too short.",
        "SAY YES - I always say yes to possibility",
        "REALEST - The hottest girls want te be with me because I'm the realest person they've ever met.",
        "DIMES - Approach dimes, it's a win-win, huge confidence, or huge motivation",
        "GET REPS -  Let the dates accumulate, and watch them get easier and more enjoyable."
      ]
    },
    {
      title: "In the kitchen",
      habits: [
        "MILITANT - I like i'm in the military",
        "FASTING - I enjoy food through fasting, not through added flavoring",
        "INSPIRATION - I'll watch a fitness video with dinner if i'm alone",
        "PALEO - It's easier to go all the way boring meals than to play in the middle. Be extreme.",
        "DAIRY - I don't eat dairy, it creates the microbiome that craves more",
        "GLUTEN - I don't eat gluten, it creates the microbiome that craves more",
        "SUGAR - I don't eat added sugar, it creates the microbiome that craves more",
        "ALCOHOL - I don't drink alcohol, it creates the microbiome that craves more",
        "HIGH - I feel the high of eating perfect fibre and protein and proportion 2 hours after the meal consistently."
      ]
    },
    {
      title: "Before bed",
      habits: [
        "DIGESTED - I need to give my body at lease a few hours to digest before I sleep ",
        "READ - I read for 30 minutes",
        "STRETCH - I stretch for two minutes",
        "PRAYER - I take the time to pray before bed, becasue it works"
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
        "CHAKRAS - Move upward from base chakra focus, to heart chakra, to intuition chakra",
        "BREATH - Focus on the breath as an anchor to the present moment",
        "STILLNESS - Find complete stillness in both body and mind",
        "OBSERVE - Watch thoughts pass by without attachment",
        "ENERGY - Feel the energy moving through the body",
        "GRATITUDE - End with gratitude for this moment of peace"
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