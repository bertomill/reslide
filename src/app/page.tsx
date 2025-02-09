import EnergyTracker from '../components/EnergyTracker';
import GoalTracker from '../components/GoalTracker';
import WarriorKingPrinciples from '../components/WarriorKingPrinciples';
import Journal from '../components/Journal';
import DailyInspiration from '../components/DailyInspiration';
import ThingsILove from '../components/ThingsILove';
import ThingsLightMeUp from '../components/ThingsLightMeUp';
import Meals from '@/components/Meals';
import Header from '@/components/Header';
import { Container, Flex, Separator, Box, Card } from '@radix-ui/themes';
import { EngravedText } from '@/components/EngravedText';

export default function Home() {
  return (
    <>
      <Header />
      <Container size="2" p="3">
        <Flex direction="column" gap="0">
          <EnergyTracker />
          <Separator size="4" />
          
          <Card style={{ 
            background: 'linear-gradient(145deg, #1a1a1a, #111111)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: `
              inset 2px 2px 4px rgba(255,255,255,0.05),
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
              opacity: 0.3,
              mixBlendMode: 'overlay',
            }} />
            <Flex direction="column" gap="0">
              {[
                {
                  title: "VISION",
                  description: "To become the **kid from Windsor** who went on to found a billion dollar **software company**. Long hair & beard, extremly cut, tattoos, gold chain, simple but fire fashion, centerfold GF, $100M equity. Teaching **fitness to millions** of fans. Cooking up the worlds best AI apps in the studio. **Dancing on the beach** with the locals, playing soccer with locals, meditating on mountains. Teaching AI development to millions of **young entrepreneurs**. Making world-class **meals with my family** by the open fire. Leaving everyone I meet with a twinkle of **inspiration** and love. I'm extremely earnest and kind. All I do is work. **No one has ever** trained like you, meditated like you, and worked on the most powerful tech in history like you, I'm convinced I can do **something really special** if I just stick to the process."
                },
                {
                  title: "WHAT IT TAKES",
                  description: "Worship of the **process**. Methodical **Monk**. Militant. Step by step, following the **process**. No deviation, no shortcuts, just pure **devotion** to each step of the journey. Like a monk in his monastery, every action is deliberate, every moment is sacred. The **process** is your **religion**, and each day is a ceremony of progress."
                }
              ].map((item, index) => (
                <Box key={index} style={{ marginBottom: '0.5rem' }}>
                  <EngravedText 
                    size="large"
                    style={{
                      fontSize: item.title === "VISION" ? '1.2em' : '1.1em',
                      fontWeight: 'bold',
                      marginBottom: '0.1rem',
                      display: 'block',
                      lineHeight: '1.2'
                    }}
                  >
                    {item.title}
                  </EngravedText>
                  {item.description && (
                    <EngravedText 
                      size="small"
                      style={{
                        fontSize: '0.8em',
                        opacity: 0.8,
                        display: 'block',
                        marginTop: '3px',
                        lineHeight: '1.2'
                      }}
                    >
                      {item.description}
                    </EngravedText>
                  )}
                </Box>
              ))}
            </Flex>
          </Card>

          <ThingsLightMeUp />
          <GoalTracker />
          <WarriorKingPrinciples />
          <Journal />
          <Meals />
          <ThingsILove />
          <DailyInspiration />
        </Flex>
      </Container>
    </>
  );
}
