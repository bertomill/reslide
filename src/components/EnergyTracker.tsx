'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Heading, Flex, Box, Button } from '@radix-ui/themes';

type EnergyState = {
  name: string;
  color: string;
};

export default function EnergyTracker() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fireIntensity, setFireIntensity] = useState(0);

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

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
    setIsAnimating(true);
    setFireIntensity(prev => Math.min(prev + 0.07, 1)); // Reduced increment from 0.2 to 0.07
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <Card size="3" style={{ 
      maxWidth: 500, 
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--gray-1)',
      minHeight: '400px'
    }}>
      {/* Fire container */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${fireIntensity * 100}%`,
          transition: 'height 0.5s ease-out',
          opacity: 0.9,
          background: 'linear-gradient(0deg, #ff4d4d 0%, #ff7e00 50%, #ffeb00 100%)',
        }}
        className="fire-container"
      >
        <div className="flames">
          {[...Array(8)].map((_, i) => ( // Increased number of flames
            <div 
              key={i} 
              className="flame"
              style={{
                left: `${(100 / 8) * i}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${1.5 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      <Flex 
        direction="column" 
        gap="5" 
        p="4" 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          backdropFilter: 'blur(3px)'
        }}
      >
        <Flex direction="column" align="center" gap="2">
          <Heading 
            as="h2" 
            size="5" 
            align="center" 
            style={{
              color: 'var(--gray-12)',
              mixBlendMode: 'difference',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              fontSize: '3rem',
              fontWeight: 'bold',
              letterSpacing: '0.2em'
            }}
          >
            LYSLOF
          </Heading>
          <Text
            size="2"
            style={{
              color: 'var(--gray-12)',
              mixBlendMode: 'difference',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              opacity: 0.8,
              fontStyle: 'italic'
            }}
          >
            Live your short life on fire
          </Text>
        </Flex>
        
        <Flex 
          wrap="wrap" 
          gap="2" 
          justify="center" 
          style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          {highEnergyStates.map((state) => (
            <Button
              key={state.name}
              color={state.color as any}
              variant={selectedState === state.name ? "solid" : "soft"}
              onClick={() => handleStateClick(state.name)}
              size="2"
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                fontWeight: 'bold'
              }}
            >
              {state.name}
            </Button>
          ))}
        </Flex>

        {selectedState && (
          <Text 
            align="center" 
            size="3" 
            weight="bold" 
            style={{ 
              color: `var(--${highEnergyStates.find(s => s.name === selectedState)?.color}-9)`,
              textShadow: '0 0 10px currentColor, 0 2px 4px rgba(0,0,0,0.5)',
              transition: 'text-shadow 0.3s ease-in-out',
              background: 'rgba(0,0,0,0.4)',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            {selectedState}
          </Text>
        )}
      </Flex>
    </Card>
  );
}