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
            <Flex direction="column" gap="3">
              {[
                {
                  title: "DESTINY",
                  description: "You will be one of the special humans of your generation. It will manifest in a billion peoples lives inspired by your AI products, and a billion women inspired with your aura. This will fire up millions be their best, which will create a feedback loop for me."
                },
                {
                  title: "LIFESTYLE",
                  description: "Long hair, extremly cut, beard, tattoos, chain, fire fashion, centerfold GFs, $100M equity at age 33, dancing on the beach, cooking up the worlds best AI apps in the studio, teaching workout sessions to hundreds of people, playing soccer with locals, meditating on mountains, teaching hundreds of eager entrepreneurs AI development, world-class meals with family by the open fire, dancing every night. All done in a way that is earnest, kind, with a demonic dark-side, that was purely in service of others."
                },
                {
                  title: "WHAT'S IT GOING TO TAKE?",
                  description: ""
                },
                {
                  title: "1. PEOPLE",
                  description: "Be around great people. Find them. help them. Only time with dimes, entrepreneurs, angels, fired up people. Nic, Michael P, Michael L, Jeff B, Kree, Monique. David. Mom. Dad. Tomi. Sam U."
                },
                {
                  title: "2. PRODUCT",
                  description: "Purest product. AI & Aura. People feel it in their bones. It takes 16 hours a day coding AI while listening to AI podcasts. It's going to take immaculate eating and training and sleeping and practice dating girls."
                },
                {
                  title: "3. URGENCY",
                  description: "AI is eating the economy, to capitalize this value is to learn fastest. Spend 12-16 hours a day coding/reading/and listening to podcasts on AI, attending every event you can, pitch your ideas whenever you can. Within 1-2 years you will be financially free."
                },
                {
                  title: "4. CONFIDENCE",
                  description: "Unwavering confidence. You will never become the $10M AI founder or go on dates with supermodels unless its absolute. Confidence comes from the work. Work all day everyday - 16 hours a day - the closer you get to perfect, the more addicted you become."
                },
                {
                  title: "5. MILITANT",
                  description: "It's going to take a millitant approach. No minutes wasted. Get things done with militant precision. It's about being relentless improving your products."
                },
                {
                  title: "6. ABUNDANCE",
                  description: "It's going to take playing in abundance. Always choose love over fear. Love expands you, fear shrinks you. You can do more, you can be more, you can see more."
                },
                {
                  title: "7. ENERGY",
                  description: "void any places or people that are going to drain your energy."
                },
                {
                  title: "8. ADDICTION",
                  description: "It's going to 14 hours a day refining your product. Feeling antsy if you're not refining."
                },
                {
                  title: "9. PASSION",
                  description: "It's going to take a fire deep within you. Draw from your most painful experiences, and let them fuel your fire."
                },
                {
                  title: "10. PATIENCE",
                  description: "It's going to take a respect for the game that you never ask why. The process is painful. It's scary. It's lonely, but it's devotion to the details that bring the ultimate satisfaction."
                },
                {
                  title: "11. AUTOMATICITY",
                  description: "It's going to take you doing it so often every day it's the reflex, 14 hour workdays and 3 horus of painful training is a regular day in the life."
                },
                {
                  title: "12. AGING",
                  description: "It's going to take the acknowledgement that we age quick and die quick so there's no point in holding back."
                },
                {
                  title: "13. DETAILS",
                  description: "It's going to take an obsession with the details, the difference is in the details. It's the difference from $1M to $1B."
                },
                {
                  title: "14. HIGH",
                  description: "It's going to take an understanding of how to get high off the work, and then consistently achieving the necessary high from it."
                },
                {
                  title: "14. SELL",
                  description: "To keep your energy and motivation going at its peak, continuously sell your product to dimes (aura), and to customers (AI)."
                }
              ].map((item, index) => (
                <Flex key={index} direction="column" gap="1">
                  <EngravedText 
                    size="large"
                    highlight={item.title.toLowerCase().includes("abundance") || 
                               item.title.toLowerCase().includes("militant")}
                    style={{
                      fontSize: item.title === "WHAT'S IT GOING TO TAKE?" ? '1.5em' : '1.2em',
                      fontWeight: 'bold',
                      marginBottom: '2px'
                    }}
                  >
                    {item.title}
                  </EngravedText>
                  {item.description && (
                    <EngravedText 
                      size="small"
                      style={{
                        fontSize: '0.85em',
                        opacity: 0.8,
                        paddingLeft: '12px',
                        marginBottom: '4px'
                      }}
                    >
                      {item.description}
                    </EngravedText>
                  )}
                </Flex>
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
