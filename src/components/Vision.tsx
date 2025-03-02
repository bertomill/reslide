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
            All good things come from purifying your product
          </Heading>
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
          It's simple. Just chip away everything that is not Berto.
        </Text>
      </Flex>
    </Card>
  );
} 