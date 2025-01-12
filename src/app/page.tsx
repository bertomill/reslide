import EnergyTracker from '../components/EnergyTracker';
import GoalTracker from '../components/GoalTracker';
import Vision from '../components/Vision';
import WarriorKingPrinciples from '../components/WarriorKingPrinciples';
import Schedule from '../components/Schedule';
import Journal from '../components/Journal';
import { Container, Heading, Flex, Separator, Box } from '@radix-ui/themes';

export default function Home() {
  return (
    <>
      <Box style={{ 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'var(--gray-1)', 
        borderBottom: '1px solid var(--gray-5)',
        zIndex: 10,
        padding: '1rem'
      }}>
        <Flex align="center" justify="center" gap="3">
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

      <Container size="2" p="6">
        <Flex direction="column" gap="6">
          <EnergyTracker />
          <Separator size="4" />
          
          <Vision />
          <GoalTracker />
          <WarriorKingPrinciples />
          <Schedule />
          <Journal />
        </Flex>
      </Container>
    </>
  );
}
