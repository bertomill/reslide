'use client';

import { Card, Text, Heading, Flex, Box, Button, Separator, Badge, Checkbox } from '@radix-ui/themes';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

type Activity = {
  time: string;
  name: string;
  category: 'mind' | 'body' | 'spirit' | 'social' | 'work';
  note: string;
};

type DaySchedule = {
  day: string;
  activities: Activity[];
};

export default function Schedule() {
  const weekSchedule: DaySchedule[] = [
    {
      day: 'Sunday',
      activities: [
        { time: '07:00', name: 'Morning Meditation', category: 'spirit', note: 'I will relentlessly concentrate on my third eye going deeper and deeper into the bliss state' },
        { time: '08:00', name: 'Active Recovery', category: 'body', note: 'Audiobook only (no music) - inspiring bios work best - get blood moving and stretch muscles' },
        { time: '09:00', name: 'Reading', category: 'mind', note: 'Train your mind on the world\'s best information' },
        { time: '11:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '17:00', name: 'Cardio', category: 'body', note: 'Audiobook not music - if you can do it with someone do it' },
        { time: '19:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '20:00', name: 'TV Show', category: 'spirit', note: 'Watch someone who inspires you - get a different perspective on the world' },
        { time: '21:00', name: 'Wind Down', category: 'body', note: 'Prepare yourself for the most restorative sleep' }
      ]
    },
    {
      day: 'Monday',
      activities: [
        { time: '04:45', name: 'Morning Meditation', category: 'spirit', note: 'Third eye focus - building concentration for bliss state' },
        { time: '05:30', name: 'Chest and Triceps', category: 'body', note: 'Maximize tension - no headphones around people, make friends' },
        { time: '07:00', name: 'Messages + News', category: 'work', note: 'Be a great communicator and stay up-to-date on current events' },
        { time: '08:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '15:00', name: 'Reading', category: 'mind', note: 'Train your mind on the world\'s best information' },
        { time: '17:00', name: 'Active Recovery', category: 'body', note: 'Audiobook only (no music) - inspiring bios work best - get blood moving and stretch muscles' },
        { time: '19:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '20:00', name: 'TV Show', category: 'spirit', note: 'Watch someone who inspires you - get a different perspective on the world' },
        { time: '21:00', name: 'Wind Down', category: 'body', note: 'Prepare yourself for the most restorative sleep' }
      ]
    },
    {
      day: 'Tuesday',
      activities: [
        { time: '04:45', name: 'Morning Meditation', category: 'spirit', note: 'Third eye concentration - progressive deepening of awareness' },
        { time: '05:30', name: 'Squats and Quads', category: 'body', note: 'Maximize tension - no headphones around people, make friends' },
        { time: '07:00', name: 'Messages + News', category: 'work', note: 'Be a great communicator and stay up-to-date on current events' },
        { time: '08:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '15:00', name: 'Reading', category: 'mind', note: 'Train your mind on the world\'s best information' },
        { time: '17:00', name: 'Active Recovery', category: 'body', note: 'Audiobook only (no music) - inspiring bios work best - get blood moving and stretch muscles' },
        { time: '19:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '20:00', name: 'TV Show', category: 'spirit', note: 'Watch someone who inspires you - get a different perspective on the world' },
        { time: '21:00', name: 'Wind Down', category: 'body', note: 'Prepare yourself for the most restorative sleep' }
      ]
    },
    {
      day: 'Wednesday',
      activities: [
        { time: '04:45', name: 'Morning Meditation', category: 'spirit', note: 'Third eye focus - expanding consciousness towards bliss' },
        { time: '05:30', name: 'Back and Biceps', category: 'body', note: 'Maximize tension - no headphones around people, make friends' },
        { time: '07:00', name: 'Messages + News', category: 'work', note: 'Be a great communicator and stay up-to-date on current events' },
        { time: '08:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '15:00', name: 'Reading', category: 'mind', note: 'Train your mind on the world\'s best information' },
        { time: '17:00', name: 'Active Recovery', category: 'body', note: 'Audiobook only (no music) - inspiring bios work best - get blood moving and stretch muscles' },
        { time: '19:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '20:00', name: 'TV Show', category: 'spirit', note: 'Watch someone who inspires you - get a different perspective on the world' },
        { time: '21:00', name: 'Wind Down', category: 'body', note: 'Prepare yourself for the most restorative sleep' }
      ]
    },
    {
      day: 'Thursday',
      activities: [
        { time: '04:45', name: 'Morning Meditation', category: 'spirit', note: 'Third eye concentration - cultivating sustained bliss state' },
        { time: '05:30', name: 'Deadlift and Hamstrings', category: 'body', note: 'Maximize tension - no headphones around people, make friends' },
        { time: '07:00', name: 'Messages + News', category: 'work', note: 'Be a great communicator and stay up-to-date on current events' },
        { time: '08:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '15:00', name: 'Reading', category: 'mind', note: 'Train your mind on the world\'s best information' },
        { time: '17:00', name: 'Active Recovery', category: 'body', note: 'Audiobook only (no music) - inspiring bios work best - get blood moving and stretch muscles' },
        { time: '19:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '20:00', name: 'TV Show', category: 'spirit', note: 'Watch someone who inspires you - get a different perspective on the world' },
        { time: '21:00', name: 'Wind Down', category: 'body', note: 'Prepare yourself for the most restorative sleep' }
      ]
    },
    {
      day: 'Friday',
      activities: [
        { time: '04:45', name: 'Morning Meditation', category: 'spirit', note: 'Third eye focus - deepening the path to pure consciousness' },
        { time: '05:30', name: 'Active Recovery', category: 'body', note: 'Audiobook only (no music) - inspiring bios work best - get blood moving and stretch muscles' },
        { time: '07:00', name: 'Messages + News', category: 'work', note: 'Be a great communicator and stay up-to-date on current events' },
        { time: '08:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '15:00', name: 'Reading', category: 'mind', note: 'Train your mind on the world\'s best information' },
        { time: '17:00', name: 'Cardio', category: 'body', note: 'Audiobook not music - if you can do it with someone do it' },
        { time: '19:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '20:00', name: 'TV Show', category: 'spirit', note: 'Watch someone who inspires you - get a different perspective on the world' },
        { time: '21:00', name: 'Wind Down', category: 'body', note: 'Prepare yourself for the most restorative sleep' }
      ]
    },
    {
      day: 'Saturday',
      activities: [
        { time: '07:00', name: 'Morning Meditation', category: 'spirit', note: 'Extended third eye concentration - weekend session for profound bliss state' },
        { time: '08:00', name: 'Active Recovery', category: 'body', note: 'Audiobook only (no music) - inspiring bios work best - get blood moving and stretch muscles' },
        { time: '09:00', name: 'Reading', category: 'mind', note: 'Train your mind on the world\'s best information' },
        { time: '11:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '17:00', name: 'Cardio', category: 'body', note: 'Audiobook not music - if you can do it with someone do it' },
        { time: '19:00', name: 'Building AI Apps', category: 'work', note: 'Relentless attention to detail - master clear communication' },
        { time: '20:00', name: 'TV Show', category: 'spirit', note: 'Watch someone who inspires you - get a different perspective on the world' },
        { time: '21:00', name: 'Wind Down', category: 'body', note: 'Prepare yourself for the most restorative sleep' }
      ]
    }
  ];

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [checkedActivities, setCheckedActivities] = useState<{[key: string]: boolean}>({});

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev === 0 ? weekSchedule.length - 1 : prev - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev === weekSchedule.length - 1 ? 0 : prev + 1));
  };

  const handleActivityCheck = (activityKey: string) => {
    setCheckedActivities(prev => ({
      ...prev,
      [activityKey]: !prev[activityKey]
    }));
  };

  const resetChecks = () => {
    setCheckedActivities({});
  };

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between" gap="3">
          <Button variant="soft" onClick={handlePrevDay}>
            <ChevronLeftIcon />
          </Button>
          <Heading size="4">{weekSchedule[currentDayIndex].day}</Heading>
          <Button variant="soft" onClick={handleNextDay}>
            <ChevronRightIcon />
          </Button>
        </Flex>

        <Flex direction="column" gap="4">
          {weekSchedule[currentDayIndex].activities.map((activity, idx) => {
            const activityKey = `${currentDayIndex}-${idx}`;
            return (
              <Flex 
                key={idx}
                direction="column" 
                style={{ 
                  padding: '8px',
                  borderRadius: 'var(--radius-2)',
                  backgroundColor: 'var(--gray-2)',
                  cursor: 'pointer'
                }}
                onClick={() => handleActivityCheck(activityKey)}
              >
                <Flex align="center" gap="3">
                  <Checkbox 
                    checked={checkedActivities[activityKey] || false}
                    onCheckedChange={() => handleActivityCheck(activityKey)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <Text 
                    size="2" 
                    color="gray"
                    style={{ 
                      opacity: checkedActivities[activityKey] ? 0.6 : 1
                    }}
                  >
                    {activity.time}
                  </Text>
                  <Badge size="1" color={activity.category === 'mind' ? 'blue' :
                                      activity.category === 'body' ? 'green' :
                                      activity.category === 'spirit' ? 'purple' :
                                      activity.category === 'social' ? 'orange' : 'cyan'}>
                    {activity.category}
                  </Badge>
                  <Text 
                    size="2" 
                    weight="bold"
                    style={{ 
                      textDecoration: checkedActivities[activityKey] ? 'line-through' : 'none',
                      opacity: checkedActivities[activityKey] ? 0.6 : 1,
                      flex: 1
                    }}
                  >
                    {activity.name}
                  </Text>
                </Flex>
                <Text 
                  size="2" 
                  color="gray" 
                  style={{ 
                    marginLeft: '52px',
                    opacity: checkedActivities[activityKey] ? 0.6 : 0.8
                  }}
                >
                  {activity.note}
                </Text>
              </Flex>
            );
          })}
        </Flex>

        <Flex justify="end" mt="2">
          <Text 
            size="2" 
            color="blue" 
            style={{ cursor: 'pointer' }}
            onClick={resetChecks}
          >
            Reset all
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
} 