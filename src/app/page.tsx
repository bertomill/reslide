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
                Beart, life is all about bringing your unique gifts to the community and in turn receiving all of the love, energy and inspiration that comes with it.
              </Text>
              
              <Text size="3" style={{ lineHeight: '1.6' }}>
                No one is passionate about physical training as you are. No one has the dedication and obsession with building AI applications as you do. No one is as passionate about being the loving, caring man that you are.
              </Text>

              <Text size="3" style={{ lineHeight: '1.6' }}>
                The job to be done for people is to bring them inspiration, to bring them the tools and knowledge to help them achieve success, and to bring a smile to their faces.
              </Text>

              <Text size="3" style={{ lineHeight: '1.6' }}>
                The best part of life is the love and energy that you receive from the community you contribute to.
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
