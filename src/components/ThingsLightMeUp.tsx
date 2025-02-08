'use client';

import { Card, Flex, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaMoon, 
  FaStar, 
  FaRocket, 
  FaMusic, 
  FaUsers, 
  FaHeart, 
  FaUtensils, 
  FaBolt, 
  FaSwimmer, 
  FaMountain 
} from 'react-icons/fa';

const passions = [
  {
    title: "Meditation Mastery",
    Icon: FaMoon,
    description: "So insense the high lasts throughout the day",
    color: "rgb(142, 68, 173)",
  },
  {
    title: "Getting ripped",
    Icon: FaStar,
    description: "Putting so much focus and tension on the muscles it's euphoric",
    color: "rgb(241, 196, 15)",
  },
  {
    title: "Building startups",
    Icon: FaRocket,
    description: "Building things so innovative it's jaw dropping",
    color: "rgb(46, 204, 113)",
  },
  {
    title: "Salsa Dancing",
    Icon: FaMusic,
    description: "Getting lost in the flow of the music",
    color: "rgb(231, 76, 60)",
  },
  {
    title: "Conversation with loved ones",
    Icon: FaUsers,
    description: "Listening so intently you get lost in the flow",
    color: "rgb(52, 152, 219)",
  },
  {
    title: "Dating models",
    Icon: FaHeart,
    description: "Such high quality dates I get lost in the flow",
    color: "rgb(255, 99, 132)",
  },
  {
    title: "Nutrition",
    Icon: FaUtensils,
    description: "Eating food so nutritiour it litterally makes my skin glow",
    color: "rgb(230, 126, 34)",
  },
  {
    title: "Long Distance Running",
    Icon: FaBolt,
    description: "Getting such an eponephrine drip that running faster actually feels better",
    color: "rgb(155, 89, 182)",
  },
  {
    title: "Swimming",
    Icon: FaSwimmer,
    description: "Geeting lost in the flow of the water",
    color: "rgb(52, 152, 219)",
  },
  {
    title: "Hiking",
    Icon: FaMountain,
    description: "Oxygen plus intense focus on the ground ahead I get lost in the flow",
    color: "rgb(39, 174, 96)",
  },
];

export default function ThingsLightMeUp() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Card style={{
      background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.5)',
    }}>
      <Text size="6" weight="bold" style={{ 
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
        display: 'block'
      }}>
        Things That Light Me Up
      </Text>
      
      <Flex direction="column" gap="2">
        {passions.map((passion, index) => {
          const { Icon } = passion;
          return (
            <motion.div
              key={passion.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{
                background: `linear-gradient(145deg, ${passion.color}11, ${passion.color}22)`,
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${passion.color}22`,
                transform: hoveredIndex === index ? 'scale(1.01)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}
            >
              <Flex align="center" gap="3" style={{ position: 'relative', zIndex: 1 }}>
                <Icon 
                  style={{ 
                    color: passion.color,
                    fontSize: '20px'
                  }}
                />
                <Text 
                  weight="bold" 
                  style={{ 
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                >
                  {passion.title}
                </Text>
                <Text
                  style={{
                    color: '#999',
                    fontSize: '0.8rem',
                    marginLeft: 'auto'
                  }}
                >
                  {passion.description}
                </Text>
              </Flex>
            </motion.div>
          );
        })}
      </Flex>
    </Card>
  );
}
