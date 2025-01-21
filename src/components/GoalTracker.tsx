'use client';

import { Card, Text, Heading, Flex, Box, Badge } from '@radix-ui/themes';
import Image from 'next/image';

type Goal = {
  id: string;
  title: string;
  why: string[];
  benefits: string[];
  requirements?: string[];
  timeline?: string;
  imageUrl: string;
};

export default function GoalTracker() {
  const goals: Goal[] = [
    {
      id: "hyrox",
      title: "Be in the Hyrox World Championships",
      timeline: "2025",
      imageUrl: "/hyrox world champs.webp",
      why: [
        "Hangout around people who share your passion",
        "Get super shredded",
        "Make content that thousands of people love"
      ],
      benefits: [
        "Improved physical fitness",
        "Mental toughness",
        "Competitive achievement",
        "Community connection"
      ],
      requirements: [
        "Obsession with your training",
        "Obsession with sleep",
        "Obsession with your nutrition"
      ]
    },
    {
      id: "tech-pm",
      title: "Build the Berto Mill brand",
      timeline: "2025",
      imageUrl: "/Jack Dorsey.avif",
      why: [
        "Financial Freedom",
        "Be around your people who share my passion",
        "Serve thousands of people who love what I do",
      ],
      benefits: [
        "Tech Leadership",
        "AI Innovation",
        "Career Growth",
        "Entrepreneurial Path"
      ],
      requirements: [
        "Coding 8 hours a day",
        "Share something on social media every day",
        "Get super ripped"
      ]
    },
    {
      id: "meditation",
      title: "Be a genuinely peaceful happy person",
      timeline: "2025",
      imageUrl: "/Chad.png",
      why: [
        "Attract other happy people",
        "Never having panic attacks",
        "Great sense of charecter"
      ],
      benefits: [
        "Mental Mastery",
        "Emotional Intelligence",
        "Spiritual Growth",
        "Inner Peace"
      ],
      requirements: [
        "Waking up at 4-5am every day",
        "Meditating 30 mins to 2 hours every day"
      ]
    }
  ];

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto', padding: '8px' }}>
      <Flex direction="column" gap="1" p="2">
        <Box mb="1">
          <Heading size="6" align="center" mb="1">Goals coming up</Heading>
          <Text size="2" color="gray" align="center" style={{ fontStyle: 'italic' }}>
            Time is flying right by
          </Text>
        </Box>

        {goals.map((goal, index) => (
          <Box 
            key={goal.id} 
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-2)',
              border: '1px solid var(--gray-5)',
              backgroundColor: 'var(--gray-2)'
            }}
          >
            <Flex direction="column" gap="1">
              <Box>
                <Flex justify="between" align="center">
                  <Badge size="2" color="blue">
                    {goal.timeline}
                  </Badge>
                </Flex>
                <Text size="4" weight="bold" style={{ marginTop: '4px', marginBottom: '8px' }}>
                  {goal.title}
                </Text>
              </Box>

              <Box>
                <Flex direction="column" gap="1">
                  {goal.why.map((reason, idx) => (
                    <Text key={idx} size="2" style={{ lineHeight: '1.2' }}>
                      • {reason}
                    </Text>
                  ))}
                </Flex>
              </Box>

              <Box
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '150px',
                  borderRadius: 'var(--radius-2)',
                  overflow: 'hidden',
                  marginTop: '4px'
                }}
              >
                <Image
                  src={goal.imageUrl}
                  alt={goal.title}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: goal.id === 'tech-pm' ? 'center 30%' : 'center center'
                  }}
                  sizes="(max-width: 500px) 100vw, 500px"
                />
              </Box>

              {goal.requirements && (
                <Box>
                  <Heading as="h4" size="2" mb="1">
                    What's it going to take?
                  </Heading>
                  <Flex direction="column" gap="1">
                    {goal.requirements.map((req, idx) => (
                      <Text key={idx} size="2" style={{ lineHeight: '1.2' }}>
                        • {req}
                      </Text>
                    ))}
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Card>
  );
} 