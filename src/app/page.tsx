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
            <Text size="3" style={{ lineHeight: '1.6' }}>
              Beart, to be one of the great athletes, great AI entrepreneurs,
              one of the great lovers, and one of the great spiritual leaders —
              you have to commit to the game. You have to respect the game. It's going to be painful, but you msut respect the process.
            </Text>
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
