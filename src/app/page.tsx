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
            backgroundColor: 'var(--gray-2)', 
            padding: '1rem',
            borderLeft: '4px solid var(--blue-9)'
          }}>
            <Flex direction="column" gap="3">
              <Text size="3" style={{ lineHeight: '1.6' }}>
                Beart, the people you spend your time with make you. Attract them through inspirational pursuits Hyrox & AI. Find people who inspire you and give them your all. Nic, Michael, Jeff B, Kree, Monique. David. Mom. Dad. Tomi.
              </Text>
              
              <Text size="3" style={{ lineHeight: '1.6' }}>
                You can play in fear or you can play in abundance. Always choose abundance. Never choose fear. You can do more, you , can be more, you can see more.
              </Text>

              <Text size="3" style={{ lineHeight: '1.6' }}>
                Be militant in your work. You ain't reached your best yet. Get things done with militant percision.
              </Text>

              <Text size="3" style={{ lineHeight: '1.6' }}>
                Amp it up. If you're not at it 14 hours a day, with full love and full effort, you're not playing hte game right.
              </Text>

              <Text size="3" style={{ lineHeight: '1.6' }}>
                Amazing things come from dedication to the game - long hair, beard, tatts on my body, gold chain, Richard Mille, designer clothes, playing soccer on the beach with the locals, salsa dancing, cooking on an open fire, sleeping with models, meditating on a mountain, building the worlds best AI applications, leading extremely intense workout groups, close friends with the head chef at your favourite restaurant. But you have to bring a passin to your work that's so far beyond the status quo it edges on obsession.
              </Text>

              <Text size="3" style={{ lineHeight: '1.6', color: 'var(--blue-11)' }}>
                You must respect the game. The process is painful. It's scary. It's lonely, but the devotion to the game is what brings the ultimate satisfaction.
              </Text>
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
