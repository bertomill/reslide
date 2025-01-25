'use client';

import { Card, Text, Heading, Flex, Box } from '@radix-ui/themes';
import Image from 'next/image';

type Goal = {
  id: string;
  title: string;
  why: string[];
  benefits: string[];
  requirements?: string[];
  imageUrl: string;
};

export default function GoalTracker() {
  const goals: Goal[] = [
    {
      id: "hyrox",
      title: "Pure Body - Hyrox World Championship",
      imageUrl: "/hyrox world champs.webp",
      why: [
        "Express the highest form of physical potential",
        "Inspire others through pure dedication",
        "Create content that showcases true athleticism"
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
      title: "Pure Mind - Founder of AI Company",
      imageUrl: "/Ivan.png",
      why: [
        "Create AI that genuinely elevates humanity",
        "Push the boundaries of what's possible",
        "Build with absolute technical excellence"
      ],
      benefits: [
        "Technological Breakthrough",
        "Societal Impact",
        "Engineering Mastery",
        "Vision Manifestation"
      ],
      requirements: [
        "Deep mastery of AI/ML systems",
        "Build and ship something meaningful every day",
        "Relentless focus on technical excellence"
      ]
    },
    {
      id: "meditation",
      title: "Pure Heart - Known as a 'Jolly Good Fellow'",
      imageUrl: "/Chad.png",
      why: [
        "Embody genuine tranquility",
        "Maintain unwavering presence",
        "Radiate authentic joy"
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
    },
    {
      id: "soul",
      title: "Pure Soul - Author of Spiritual Wisdom",
      imageUrl: "/robin.png",
      why: [
        "Share timeless wisdom that transforms lives",
        "Bridge ancient truth with modern living",
        "Guide others to their highest potential"
      ],
      benefits: [
        "Spiritual Legacy",
        "Wisdom Transmission",
        "Global Impact",
        "Soul Evolution"
      ],
      requirements: [
        "Daily deep contemplation and writing",
        "Living the principles you teach",
        "Constant refinement of wisdom"
      ]
    }
  ];

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto', padding: '8px' }}>
      <Flex direction="column" gap="1" p="2">
        <Box mb="1">
          <Heading size="6" align="center" mb="1">The Purest Products of My Being</Heading>
          <Text size="2" color="gray" align="center" style={{ fontStyle: 'italic' }}>
            When all else is removed, you are left with the following
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