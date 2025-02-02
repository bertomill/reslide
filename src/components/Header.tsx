'use client';

import { Heading, Flex, Box, Text } from '@radix-ui/themes';

export default function Header() {
  return (
    <Box style={{ 
      position: 'sticky', 
      top: 0, 
      backgroundColor: 'var(--gray-1)', 
      borderBottom: '1px solid var(--gray-5)',
      zIndex: 10,
      padding: '0.5rem'
    }}>
      <Flex align="center" justify="center" gap="4">
        <Flex align="center" gap="2">
          <div style={{ 
            width: '32px', 
            height: '32px', 
            backgroundColor: 'var(--blue-9)', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontSize: '20px' }}>⚡</span>
          </div>
          <Heading size="8" weight="bold">
            One Goal
          </Heading>
        </Flex>

        <a 
          href="#meals-section" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            textDecoration: 'none',
            color: 'var(--gray-12)',
            padding: '4px 12px',
            borderRadius: '6px',
            backgroundColor: 'var(--gray-3)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--gray-4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--gray-3)';
          }}
        >
          <span style={{ fontSize: '20px' }}>🍽️</span>
          <Text size="2" weight="bold">Meals</Text>
        </a>
      </Flex>
    </Box>
  );
} 