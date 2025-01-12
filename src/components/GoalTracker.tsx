'use client';

import { Card, Text, Heading, Flex, Box, Badge } from '@radix-ui/themes';
import Image from 'next/image';

type Goal = {
  id: string;
  title: string;
  why: string[];
  benefits: string[];
  timeline?: string;
  imageUrl: string;
};

export default function GoalTracker() {
  const goals: Goal[] = [
    {
      id: "hyrox",
      title: "Make it to the Hyrox World Championships",
      timeline: "2025",
      imageUrl: "/hyrox world champs.webp",
      why: [
        "Join a fast-growing community of fitness enthusiasts",
        "Build confidence through athletic achievement",
        "Maintain focus on health and wellness",
        "You love this and you can do it"
      ],
      benefits: [
        "Community Connection",
        "Personal Growth",
        "Health Focus"
      ]
    },
    {
      id: "tech-pm",
      title: "Join an AI-focused Tech Company as Product Manager",
      timeline: "2025",
      imageUrl: "/Jack Dorsey.avif",
      why: [
        "Leverage my coding and management expertise",
        "Work with brilliant minds in AI",
        "Build stakeholder relationship skills",
        "Step towards entrepreneurship"
      ],
      benefits: [
        "Tech Leadership",
        "AI Innovation",
        "Career Growth",
        "Entrepreneurial Path"
      ]
    }
  ];

  return (
    <Flex direction="column" gap="4">
      <Text size="2" color="gray" align="center">Manifesting the Vision Through</Text>
      {goals.map((goal, index) => (
        <Card key={goal.id} size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
          <Flex direction="column" gap="5" p="4">
            <Box>
              <Flex justify="between" align="center">
                <Heading as="h3" size="4" mb="2">
                  Goal {index + 1}
                </Heading>
                <Badge size="2" color="blue">
                  {goal.timeline}
                </Badge>
              </Flex>
              <Text size="5" weight="bold" mb="4">
                {goal.title}
              </Text>
            </Box>

            <Box>
              <Heading as="h4" size="3" mb="2">
                Why This Matters
              </Heading>
              <Flex direction="column" gap="2">
                {goal.why.map((reason, idx) => (
                  <Text key={idx} size="2">
                    • {reason}
                  </Text>
                ))}
              </Flex>
            </Box>

            <Flex gap="2" wrap="wrap">
              {goal.benefits.map((benefit, idx) => (
                <Badge key={idx} size="2" color={index === 0 ? "green" : "purple"}>
                  {benefit}
                </Badge>
              ))}
            </Flex>

            <Box
              style={{
                position: 'relative',
                width: '100%',
                height: '200px',
                borderRadius: 'var(--radius-3)',
                overflow: 'hidden',
                marginTop: '8px'
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
          </Flex>
        </Card>
      ))}
    </Flex>
  );
} 