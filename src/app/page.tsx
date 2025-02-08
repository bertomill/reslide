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
                  description: "To become the kid from Windsor who went on to found a billion dollar Sillicon Valley startup. Long hair & beard, extremly cut, tattoos, gold chain, simple but fire fashion, centerfold GF, $100M equity. Teaching fitness to millions of fans. Cooking up the worlds best AI apps in the studio. dancing on the beach with the locals, playing soccer with locals, meditating on mountains. Teaching AI development to millions of young entrepreneurs. Making world-class meals with my family by the open fire. Leaving everyone I meet with a twinkle of inspiration and love. I'm extremely earnest and kind. All I do is work. No one has ever trained like you, meditated like you, and worked on the most powerful tech in history like you, I'm convinced I can do something really special if I just stick to the process."
                },
                {
                  title: "WHAT IT TAKES",
                  description: ""
                },
                {
                  title: "PEOPLE",
                  description: "Be around great people. Find them. help them. Only time with dimes, entrepreneurs, angels, fired up people. Nic, Michael P, Michael L, Jeff B, Kree, Monique. David. Mom. Dad. Tomi. Sam U."
                },
                {
                  title: "PRODUCT",
                  description: "Purest product. AI & Aura. People feel it in their bones. It takes 16 hours a day coding AI while listening to AI podcasts. It's going to take immaculate eating and training and sleeping and practice dating girls."
                },
                {
                  title: "URGENCY",
                  description: "AI is eating the economy, to capitalize this value is to learn fastest. Spend 12-16 hours a day coding/reading/and listening to podcasts on AI, attending every event you can, pitch your ideas whenever you can. Within 1-2 years you will be financially free."
                },
                {
                  title: "CONFIDENCE",
                  description: "Unwavering confidence. You will never become the $10M AI founder or go on dates with supermodels unless its absolute. Confidence comes from the work. Work all day everyday - 16 hours a day - the closer you get to perfect, the more addicted you become."
                },
                {
                  title: "MILITANT",
                  description: "It's going to take a millitant approach. No minutes wasted. Get things done with militant precision. It's about being relentless improving your products."
                },
                {
                  title: "ABUNDANCE",
                  description: "It's going to take playing in abundance. Always choose love over fear. Love expands you, fear shrinks you. You can do more, you can be more, you can see more."
                },
                {
                  title: "ENERGY",
                  description: "void any places or people that are going to drain your energy."
                },
                {
                  title: "ADDICTION",
                  description: "It's going to 14 hours a day refining your product. Feeling antsy if you're not refining."
                },
                {
                  title: "WORSHIP THE PROCESS",
                  description: "Fall in love with the process. The daily grind, the small improvements, the constant refinement. Make the process your religion."
                },
                {
                  title: "PASSION",
                  description: "It's going to take a fire deep within you. Draw from your most painful experiences, and let them fuel your fire."
                },
                {
                  title: "METHODICAL",
                  description: "It's going to take executing one step of the process at a time methodically and with a religious obsession."
                },
                {
                  title: "AUTOMATICITY",
                  description: "It's going to take you doing it so often every day it's the reflex, 14 hour workdays and 3 horus of painful training is a regular day in the life."
                },
                {
                  title: "AGING",
                  description: "It's going to take the acknowledgement that we age quick and die quick so there's no point in holding back."
                },
                {
                  title: "DETAILS",
                  description: "Obsess over every detail. No one can get nearly as granular as you. It's the difference from $1M to $1B."
                },
                {
                  title: "HIGH",
                  description: "It's going to take an understanding of how to get high off the work, and then consistently achieving the necessary high from it."
                },
                {
                  title: "SELL",
                  description: "To keep your energy and motivation going at its peak, continuously sell your product to dimes (aura), and to customers (AI)."
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
