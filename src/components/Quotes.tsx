import { Box, Heading, Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const quotes = [
  {
    title: "The Maverick's Path",
    content: "Living in the south. Meditation at 4am, Olympic training by 5am, innovation work until 2pm, energizing meetings by 3pm. Nature walks, yoga, world-class dinner, learning, and salsa until 11pm. A clean life of high energy and longevity."
  },
  {
    title: "On Growth",
    content: "The only way to do great work is to love what you do."
  },
  {
    title: "On Leadership",
    content: "A leader is one who knows the way, goes the way, and shows the way."
  }
];

export default function Quotes() {
  return (
    <Box>
      <Heading size="4" mb="2">Daily Inspiration</Heading>
      <Accordion.Root type="single" collapsible>
        {quotes.map((quote, index) => (
          <Accordion.Item key={index} value={`item-${index}`}>
            <Accordion.Trigger style={{
              width: '100%',
              padding: '4px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}>
              <Text size="2" weight="bold" style={{ color: 'var(--gray-12)' }}>{quote.title}</Text>
              <ChevronDownIcon
                style={{
                  transition: 'transform 300ms',
                  transform: 'rotate(0deg)',
                  color: 'var(--gray-11)',
                  '[data-state=open] &': {
                    transform: 'rotate(180deg)',
                  },
                }}
              />
            </Accordion.Trigger>
            <Accordion.Content style={{
              padding: '4px 0 8px 16px',
            }}>
              <Text size="2" style={{ color: 'var(--gray-11)' }}>{quote.content}</Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Box>
  );
}
