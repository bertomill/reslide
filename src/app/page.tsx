import EnergyTracker from '../components/EnergyTracker';
import GoalTracker from '../components/GoalTracker';
import WarriorKingPrinciples from '../components/WarriorKingPrinciples';
import Journal from '../components/Journal';
import DailyInspiration from '../components/DailyInspiration';
import ThingsILove from '../components/ThingsILove';
import ThingsLightMeUp from '../components/ThingsLightMeUp';
import Meals from '@/components/Meals';
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
                "DESTINY - Your destiny is to become the greatest FBH Full-Body Human in human history. It will manifest in a billion people inspired by your AI products, and a billion women obsessed with your aura. This will fire up millions of others to be their best, which will create a feedback loop for me.",
                "LIFESTYLE - Long hair, extremly cut, beard, tattoos, chain, fire fashion, centerfold GFs, $100M equity at age 33, dancing on the beach, cooking up the worlds best AI apps in the studio, teaching workout sessions to hundreds of people, playing soccer with locals, meditating on mountains, teaching hundreds of eager entrepreneurs AI development, world-class meals with family by the open fire, dancing every night. All done in a way that is earnest, kind, with a demonic dark-side, that was purely in service of others.",
                "WHAT'S IT GOING TO TAKE?",
                "1. PEOPLE - It's going to take being around great people. Find them. help them. Only spend time with them. Nic, Michael P, Michael L, Jeff B, Kree, Monique. David. Mom. Dad. Tomi.",
                "2. PRODUCT - It's going to take the purest product. AI & Aura. People should feel it in their bones when they try your AI products. People should feel your aura deep within their bones when i'm around them or their watching my content. It's one of the most rewarding feeling in the world when people are true fans of your product.",
                "3. MILITANT - It's going to take a millitant approach. No minutes wasted. Get things done with militant precision. It's about being relentless improving your products.",
                "4. ABUNDANCE - It's going to take playing in abundance. Always choose love over fear. Love expands you, fear shrinks you. You can do more, you can be more, you can see more.",
                "5. ENVIRONMENT - It's going to take carefully chosing your envronments. There is real energy in the places you frequent that energize you or suck from you.",
                "8. ADDICTION - It's going to take an irrational addiction to the game. Building your apps and your aura needs to become an addiction.",
                "9. PASSION - It's going to take a fire deep within you. Draw from your most painful experiences, and let them fuel your fire.",
                "11. PATIENCE - It's going to take a respect for the game that you never ask why. The process is painful. It's scary. It's lonely, but it's devotion to the details that bring the ultimate satisfaction."
              ].map((text, index) => (
                <EngravedText 
                  key={index} 
                  size="large"
                  highlight={text.includes("abundance") || text.includes("militant") || text.includes("Never do what doesn't light you up")}
                  style={{
                    ...(text === "WHAT'S IT GOING TO TAKE?" && {
                      fontSize: '1.5em',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      margin: '1rem 0',
                      color: 'var(--accent-9)'
                    })
                  }}
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
          <Meals />
          <ThingsILove />
          <DailyInspiration />
        </Flex>
      </Container>
    </>
  );
}
