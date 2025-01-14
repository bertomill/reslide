'use client';

import { Card, Text, Heading, Flex, Box } from '@radix-ui/themes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function RewardChart() {
  // Create data points for the curve
  const createCurveData = () => {
    const points = [];
    for (let x = 25; x <= 50; x += 0.5) {  // More granular points, starting from 25
      points.push({
        effort: x,
        reward: x * x
      });
    }
    return points;
  };

  const data = createCurveData();

  // Key points to mark - these will be exactly on the curve
  const markers = [
    { effort: 25, reward: 25 * 25 },   // 625
    { effort: 40, reward: 40 * 40 },   // 1600
    { effort: 50, reward: 50 * 50 }    // 2500
  ];

  return (
    <Card size="3" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Flex direction="column" gap="4" p="4">
        <Box>
          <Heading size="4" mb="2">The Reward Curve</Heading>
          <Text size="2" color="gray" mb="4" style={{ fontStyle: 'italic' }}>
            Small improvements at the highest level yield exponential rewards
          </Text>
        </Box>

        <Box style={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="effort" 
                domain={[25, 50]}  // Start from 25 to focus on the steep part
                ticks={[25, 40, 50]}
                label={{ value: 'Effort', position: 'bottom' }}
              />
              <YAxis 
                domain={[0, 2500]}
                ticks={[0, 625, 1600, 2500]}  // Match the marker points
                label={{ value: 'Reward', angle: -90, position: 'left' }}
              />
              <Line 
                type="basis"  // Changed to basis for smoother curve
                dataKey="reward" 
                stroke="var(--blue-9)" 
                strokeWidth={2}
                dot={false}
              />
              {markers.map((marker, index) => (
                <Line
                  key={index}
                  data={[marker]}
                  dataKey="reward"
                  stroke="none"
                  dot={{
                    r: 4,
                    fill: 'var(--blue-9)',
                    strokeWidth: 2
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Text size="2" align="center" style={{ fontStyle: 'italic' }}>
          The difference between good and great is exponential
        </Text>
      </Flex>
    </Card>
  );
} 