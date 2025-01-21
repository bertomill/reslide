'use client';

import { Card, Text, Heading, Flex, Box, Grid } from '@radix-ui/themes';
import Image from 'next/image';

type WarriorKing = {
  id: string;
  imageUrl: string;
};

export default function Vision() {
  const warriorKings: WarriorKing[] = [
    { id: "1", imageUrl: "/Channing.webp" },
    { id: "2", imageUrl: "/Christiano.webp" },
    { id: "3", imageUrl: "/Kobe.jpg" },
    { id: "4", imageUrl: "/The Rock Ballers.webp" },
    { id: "5", imageUrl: "/Tom Brady.webp" },
    { id: "6", imageUrl: "/Russ.png" },
    { id: "7", imageUrl: "/John Wooden.png" }
  ];

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto', padding: '8px' }}>
      <Flex direction="column" gap="2" p="2">
        <Box>
          <Heading size="6" mb="2">
            2030 Vision: Financial Freedom
          </Heading>
          <Text size="3" mb="4" style={{ lineHeight: '1.5' }}>
            The ability to do what I want, with who I want, where I want.
          </Text>
        </Box>

        <Grid columns="2" gap="1" width="100%" mb="4">
          {warriorKings.map((warrior) => (
            <Box 
              key={warrior.id}
              style={{
                position: 'relative',
                width: '100%',
                height: '180px',
                borderRadius: 'var(--radius-3)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease-in-out'
              }}
              className="hover:scale-105"
            >
              <Image
                src={warrior.imageUrl}
                alt="Warrior King"
                fill
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
                sizes="(max-width: 500px) 50vw, 250px"
              />
            </Box>
          ))}
        </Grid>

        <Text size="2" color="gray" style={{ fontStyle: 'italic' }} mb="4">
          And that requires me to own part of a business that makes money while I sleep.
        </Text>

        <Box mb="4">
          <Text size="2" weight="bold" mb="2">
            My Unique Assets:
          </Text>
          <Text size="2" style={{ lineHeight: '1.5' }}>
            I must leverage my fitness, my meditation, my ability to code, my ability to create content, and my ability to sell/network.
          </Text>
        </Box>

        <Box>
          <Text size="2" weight="bold" mb="2">
            The Price of Success:
          </Text>
          <Text size="2" style={{ lineHeight: '1.5' }}>
            I must fully commit to this lifestyle - No parties, no junk food, no wasting money or time on the weekends, no trips. It's just going to be 24/7 work for the next 4 years, but you will reach escape velocity.
          </Text>
        </Box>
      </Flex>
    </Card>
  );
} 