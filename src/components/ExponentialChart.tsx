'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Text, Heading, Flex } from '@radix-ui/themes';  // We're using Radix UI

const ExponentialChart = () => {
  // Generate data points using 1.2^x from 50 to 100
  const data = [
    ...Array.from({ length: 39 }, (_, i) => ({
      x: i + 50,
      y: Math.pow(1.2, i + 50),  // Changed base to 1.2
      showDot: false
    })),
    {
      x: 90,
      y: Math.pow(1.2, 90),  // Changed base to 1.2
      showDot: true
    },
    {
      x: 100,
      y: Math.pow(1.2, 100),  // Changed base to 1.2
      showDot: true
    }
  ];

  // Custom labels component
  const CustomLabels = () => {
    return (
      <>
        <text
          x={50}
          y={220}
          fill="var(--gray-11)"
          opacity={0.7}
          fontSize={12}
          textAnchor="middle"
        >
          average
        </text>
        <text
          x={90}
          y={180}
          fill="var(--gray-11)"
          opacity={0.7}
          fontSize={12}
          textAnchor="middle"
        >
          very good
        </text>
        <text
          x={100}
          y={180}
          fill="var(--gray-11)"
          opacity={0.7}
          fontSize={12}
          textAnchor="middle"
        >
          the best
        </text>
      </>
    );
  };

  return (
    <Card style={{ width: '100%', marginTop: '24px' }}>
      <Flex direction="column" gap="4" p="4" align="center">
        <Heading size="4" mb="2">The Path to Greatness</Heading>
        <Text size="2" color="gray" mb="4" style={{ fontStyle: 'italic' }}>
          Small improvements at the highest level yield exponential rewards
        </Text>
        
        <div style={{ 
          width: '100%', 
          height: '300px',
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="x" 
                label={{ 
                  value: 'Effort', 
                  position: 'bottom', 
                  dy: 20
                }}
                domain={[50, 100]}
                ticks={[50, 60, 70, 80, 90, 100]}
              />
              <CustomLabels />
              <YAxis 
                domain={[0, 'auto']}
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 10,
                  fill: 'var(--gray-11)',
                  opacity: 0.5
                }}
                width={45}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip formatter={(value: number) => Math.round(value).toLocaleString()} />
              <Legend 
                wrapperStyle={{ 
                  bottom: -35,
                  opacity: 0.7
                }} 
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="var(--blue-9)"
                name="Exponential Growth"
                dot={({ cx, cy, payload }: { cx: number; cy: number; payload: any }) => (
                  <svg 
                    x={cx - 4} 
                    y={cy - 4} 
                    width={8} 
                    height={8} 
                    style={{ visibility: payload.showDot ? 'visible' : 'hidden' }}
                  >
                    <circle
                      cx="4"
                      cy="4"
                      r="4"
                      fill="var(--blue-9)"
                      stroke="var(--blue-9)"
                    />
                  </svg>
                )}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Text size="2" align="center" style={{ fontStyle: 'italic' }}>
          Going from 90% (very good) to 100% (the best) effort gives you 10x the return.
          Therefore, never settle for anything less than 100%.
        </Text>
      </Flex>
    </Card>
  );
};

export default ExponentialChart; 