'use client';

import { Card, Flex, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useState } from 'react';

const passions = [
  {
    title: "pursuing meditation mastery",
    icon: "🧘‍♂️",
    color: "rgb(142, 68, 173)",
  },
  {
    title: "pursuing a world championship in athletics",
    icon: "🏆",
    color: "rgb(241, 196, 15)",
  },
  {
    title: "pursuing a billion dollar start up",
    icon: "🚀",
    color: "rgb(46, 204, 113)",
  },
  {
    title: "salsa dancing",
    icon: "💃",
    color: "rgb(231, 76, 60)",
  },
  {
    title: "hanging with friends",
    icon: "👥",
    color: "rgb(52, 152, 219)",
  },
  {
    title: "dating models",
    icon: "❤️",
    color: "rgb(255, 99, 132)",
  },
  {
    title: "cooking the most exquisite meals",
    icon: "👨‍🍳",
    color: "rgb(230, 126, 34)",
  },
  {
    title: "running",
    icon: "🏃‍♂️",
    color: "rgb(155, 89, 182)",
  },
  {
    title: "swimming",
    icon: "🏊‍♂️",
    color: "rgb(52, 152, 219)",
  },
  {
    title: "hiking",
    icon: "🏔️",
    color: "rgb(39, 174, 96)",
  },
  {
    title: "the hottest fashion",
    icon: "👔",
    color: "rgb(142, 68, 173)",
  },
  {
    title: "sex",
    icon: "💋",
    color: "rgb(231, 76, 60)",
  },
  {
    title: "yoga",
    icon: "🧘‍♀️",
    color: "rgb(26, 188, 156)",
  },
];

export default function ThingsLightMeUp() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Card style={{
      background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: `
        inset 2px 2px 4px rgba(255,255,255,0.1),
        inset -2px -2px 4px rgba(0,0,0,0.5),
        0 10px 20px rgba(0,0,0,0.2)
      `,
    }}>
      <Text size="8" weight="bold" style={{ 
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem',
        display: 'block'
      }}>
        Things That Light Me Up
      </Text>
      
      <Flex gap="3" wrap="wrap">
        {passions.map((passion, index) => (
          <motion.div
            key={passion.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            style={{
              flex: '1 1 250px',
              minHeight: '120px',
              background: `linear-gradient(145deg, ${passion.color}22, ${passion.color}44)`,
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              border: `1px solid ${passion.color}33`,
              transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 50% 50%, ${passion.color}11, transparent)`,
              opacity: hoveredIndex === index ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }} />
            
            <Flex direction="column" gap="2" style={{ position: 'relative', zIndex: 1 }}>
              <Text size="8" style={{ fontSize: '2.5rem' }}>{passion.icon}</Text>
              <Text 
                size="5" 
                weight="bold" 
                style={{ 
                  color: '#fff',
                  textShadow: `0 2px 4px ${passion.color}66`
                }}
              >
                {passion.title}
              </Text>
            </Flex>
          </motion.div>
        ))}
      </Flex>
    </Card>
  );
}
