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
    { id: "3", imageUrl: "/Mark Whalburg.jpg" },
    { id: "4", imageUrl: "/The Rock Ballers.webp" },
    { id: "5", imageUrl: "/Tom Brady.webp" },
    { id: "6", imageUrl: "/Russ.png" }
  ];

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="4" p="4">
        <Box>
          <Text size="2" color="gray" style={{ fontStyle: 'italic' }}>
            To achieve the highest state of energy, I have to pursue my highest calling
          </Text>
          <Heading size="6" mb="4">Become a Modern Day Warrior King</Heading>
        </Box>

        <Grid columns="2" gap="3" width="100%">
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
      </Flex>
    </Card>
  );
} 