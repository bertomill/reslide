import EnergyTracker from '../components/EnergyTracker';
import GoalTracker from '../components/GoalTracker';
import WarriorKingPrinciples from '../components/WarriorKingPrinciples';
import Journal from '../components/Journal';
import DailyInspiration from '../components/DailyInspiration';
import ThingsILove from '../components/ThingsILove';
import ThingsLightMeUp from '../components/ThingsLightMeUp';
import { Container, Heading, Flex, Separator, Box, Card } from '@radix-ui/themes';
import { EngravedText } from '@/components/EngravedText';

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
                "Your destiny is to be one of the worlds great athlete-entrepreneurs. Long hair, extremly cut, beard, tattoos, chain, fire fashion, absolute dime GFs, $100M equity at age 35, dancing on the beach, cooking up the worlds best AI apps in the studio, competing in fitness competitions, playing soccer with the locals, meditating on mountain tops, cooking world-class meals with family by the open fire, salsa dancing every night. To do it in a way that is earnest, kind, with a demonic dark-side, that was purely in service of others. People make you, not your accomplishments. Find your people. Nic, Michael P, Michael L, Jeff B, Kree, Monique. David. Mom. Dad. Tomi.",
                "You can play in fear or you can play in abundance. Always choose abundance. Never choose fear. You can do more, you can be more, you can see more.",
                "Be militant in your work. You ain't reached your best yet. Get things done with militant precision.",
                "Amp it up. If you're not at it 14 hours a day, with full love and full effort, you're not playing the game right.",
                "You must respect the game. The process is painful. It's scary. It's lonely, but the devotion to the game is what brings the ultimate satisfaction.",
                "Never do what doesn't light you up. It's a slippery slope to apathy. Protect your inner fire at all costs."
              ].map((text, index) => (
                <EngravedText 
                  key={index} 
                  size="large"
                  highlight={text.includes("abundance") || text.includes("militant") || text.includes("Never do what doesn't light you up")}
                >
                  {text}
                </EngravedText>
              ))}
            </Flex>
          </Card>

          <ThingsLightMeUp />
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
