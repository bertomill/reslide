import EnergyTracker from '../components/EnergyTracker';
import GoalTracker from '../components/GoalTracker';
import WarriorKingPrinciples from '../components/WarriorKingPrinciples';
import Journal from '../components/Journal';
import DailyInspiration from '../components/DailyInspiration';
import ThingsILove from '../components/ThingsILove';
import { Container, Heading, Flex, Separator, Box, Card, Text } from '@radix-ui/themes';

export default function Home() {
  return (
    <>
      <Box style={{ 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'var(--gray-1)', 
        borderBottom: '1px solid var(--gray-5)',
        zIndex: 10,
        padding: '0.5rem'
      }}>
        <Flex align="center" justify="center" gap="2">
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
      </Box>

      <Container size="2" p="3">
        <Flex direction="column" gap="4">
          <EnergyTracker />
          <Separator size="4" />
          
          <Card style={{ 
            background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: `
              inset 2px 2px 4px rgba(255,255,255,0.1),
              inset -2px -2px 4px rgba(0,0,0,0.5),
              0 10px 20px rgba(0,0,0,0.2)
            `,
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.15"/%3E%3C/svg%3E")',
              opacity: 0.4,
              mixBlendMode: 'overlay',
            }} />
            <Flex direction="column" gap="5">
              {[
                "Your destiny is to be one of the great athlete-entrepreneurs. That Bert guy, he's the most earnest, kind kid, but he has a demon in him that makes him work 24/7. Pursue your destiny in the service of others. People make you happy, not your accomplishments. Find people who inspire you and give them your all. Nic, Michael P, Michael L, Jeff B, Kree, Monique. David. Mom. Dad. Tomi.",
                "You can play in fear or you can play in abundance. Always choose abundance. Never choose fear. You can do more, you can be more, you can see more.",
                "Be militant in your work. You ain't reached your best yet. Get things done with militant precision.",
                "Amp it up. If you're not at it 14 hours a day, with full love and full effort, you're not playing the game right.",
                "Amazing things come from dedication to the game - long hair, beard, tatts on my body, gold chain, Richard Mille, designer clothes, playing soccer on the beach with the locals, salsa dancing, cooking on an open fire, sleeping with models, meditating on a mountain, building the worlds best AI applications, leading extremely intense workout groups, close friends with the head chef at your favourite restaurant. But you have to bring a passion to your work that's so far beyond the status quo it edges on obsession.",
                "You must respect the game. The process is painful. It's scary. It's lonely, but the devotion to the game is what brings the ultimate satisfaction."
              ].map((text, index, array) => (
                <Text key={index} size="3" style={{ 
                  lineHeight: '1.8',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.02em',
                  color: index === array.length - 1 ? 'var(--blue-9)' : '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  padding: '0.5rem',
                  background: index === array.length - 1 ? 'rgba(0,0,0,0.2)' : 'transparent',
                  borderRadius: index === array.length - 1 ? '8px' : '0',
                  fontSize: index === 0 ? '1.2rem' : '1rem',
                  fontWeight: index === 0 ? '500' : '400',
                  transform: 'translateZ(0)',
                  WebkitFontSmoothing: 'antialiased',
                }}>
                  {text.split('.').map((sentence, i) => (
                    <span key={i} style={{
                      display: 'inline',
                      color: sentence.includes('dedication to the game') || 
                             sentence.includes('militant') ||
                             sentence.includes('14 hours') ||
                             sentence.includes('abundance') ? 
                             'var(--blue-9)' : 'inherit',
                      fontWeight: sentence.includes('dedication to the game') || 
                                 sentence.includes('militant') ||
                                 sentence.includes('14 hours') ||
                                 sentence.includes('abundance') ? 
                                 '600' : 'inherit',
                    }}>
                      {sentence}{i < text.split('.').length - 1 ? '.' : ''}
                    </span>
                  ))}
                </Text>
              ))}
            </Flex>
          </Card>

          <GoalTracker />
          <WarriorKingPrinciples />
          <Journal />
          <ThingsILove />
          <DailyInspiration />
        </Flex>
      </Container>
    </>
  );
}
