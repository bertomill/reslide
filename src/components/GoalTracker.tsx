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
        "Be around your people",
        "Build your confidence",
        "You love it"
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
      title: "Own a brand that makes money while you sleep",
      timeline: "2025",
      imageUrl: "/Jack Dorsey.avif",
      why: [
        "Freedom from work",
        "Be around your people",
        "Inspire millions",
      ],
      benefits: [
        "Tech Leadership",
        "AI Innovation",
        "Career Growth",
        "Entrepreneurial Path"
      ],
      requirements: [
        "6 hours of coding every day",
        "2 hours of reading every day",
        "5 high-quality reach-outs to AI companies every day",
        "1 pitch meeting per day showing my AI application",
        "Build an AI app with 100+ subscribers",
        "10 5-star reviews"
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
        "Develop an incredibly sharp mind",
        "Live a way happier, more meaningful life"
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
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="2" p="4">
        <Box mb="2">
          <Heading size="6" align="center" mb="1">Goals that align with your identity</Heading>
          <Text size="2" color="gray" align="center">Manifesting the Vision Through</Text>
        </Box>

        {goals.map((goal, index) => (
          <Box 
            key={goal.id} 
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-2)',
              border: '1px solid var(--gray-5)',
              backgroundColor: 'var(--gray-2)'
            }}
          >
            <Flex direction="column" gap="2">
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