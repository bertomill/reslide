'use client';

import { useState } from 'react';
import { Card, Text, Heading, Flex, Box, Button } from '@radix-ui/themes';

type EnergyState = {
  name: string;
  color: string;
};

export default function EnergyTracker() {
  const highEnergyStates: EnergyState[] = [
    { name: "Grit", color: "red" },
    { name: "Courage", color: "orange" },
    { name: "Freedom", color: "yellow" },
    { name: "Compassion", color: "pink" },
    { name: "Laughter", color: "purple" },
    { name: "Passion", color: "red" },
    { name: "Love", color: "pink" },
    { name: "Enthusiasm", color: "orange" },
    { name: "Bliss", color: "purple" },
    { name: "Flow", color: "blue" },
    { name: "Peak", color: "green" },
    { name: "Gratitude", color: "gold" },
    { name: "Excitement", color: "orange" },
    { name: "Bloom", color: "green" }
  ];

  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="5" p="4">
        <Heading as="h2" size="5" align="center" mb="4">
          This is the only time you will ever get to make your dreams a reality
        </Heading>
        
        <Flex wrap="wrap" gap="2" justify="center">
          {highEnergyStates.map((state) => (
            <Button
              key={state.name}
              color={state.color as any}
              variant={selectedState === state.name ? "solid" : "soft"}
              onClick={() => setSelectedState(state.name)}
              size="2"
            >
              {state.name}
            </Button>
          ))}
        </Flex>

        {selectedState && (
          <Text align="center" size="3" weight="bold" style={{ color: `var(--${highEnergyStates.find(s => s.name === selectedState)?.color}-9)` }}>
            {selectedState}
          </Text>
        )}
      </Flex>
    </Card>
  );
}