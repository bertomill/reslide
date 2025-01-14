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
      ],
      requirements: [
        "Work on your body 2x per day",
        "8 hours of sleep every day",
        "No alcohol",
        "No cheating on the diet"
      ]
    },
    {
      id: "tech-pm",
      title: "Join an AI-focused Tech Company as Product Manager",
      timeline: "2025",
      imageUrl: "/Jack Dorsey.avif",
      why: [
        "The skills required match your talents",
        "You will get to work with really smart people that energize and push you",
        "You're going to help a lot of people",
        "It's the next step towards building your own company"
      ],
      benefits: [
        "Tech Leadership",
        "AI Innovation",
        "Career Growth",
        "Entrepreneurial Path"
      ],
      requirements: [
        "6 hours of coding, 7 days a week",
        "2 hours of reading, every day",
        "Leading a team to the highest level, every single day"
      ]
    },
    {
      id: "meditation",
      title: "1000 Hours of Meditation Mastery",
      timeline: "2025",
      imageUrl: "/Chad.png",
      why: [
        "Develop unshakeable mental clarity and focus",
        "Master emotional intelligence and inner peace",
        "Build the foundation for spiritual growth",
        "Transform consciousness through dedicated practice"
      ],
      benefits: [
        "Mental Mastery",
        "Emotional Intelligence",
        "Spiritual Growth",
        "Inner Peace"
      ],
      requirements: [
        "Waking up at 4-5am every morning",
        "Meditating 30 mins to 2 hours daily"
      ]
    }
  ];

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="4" p="4">
        <Box>
          <Heading size="6" align="center" mb="1">Identity-aligned Goals</Heading>
          <Text size="2" color="gray" align="center">Manifesting the Vision Through</Text>
        </Box>

        {goals.map((goal, index) => (
          <Box 
            key={goal.id} 
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-3)',
              backgroundColor: 'var(--gray-2)'
            }}
          >
            <Flex direction="column" gap="5">
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

              {goal.requirements && (
                <Box>
                  <Heading as="h4" size="3" mb="2">
                    What's it going to take?
                  </Heading>
                  <Flex direction="column" gap="2">
                    {goal.requirements.map((req, idx) => (
                      <Text key={idx} size="2">
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