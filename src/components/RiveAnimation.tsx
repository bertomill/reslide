'use client';

import { useRive } from '@rive-app/react-canvas';

export default function RiveAnimation() {
  const { RiveComponent } = useRive({
    src: 'your-animation.riv',
    stateMachines: ['State Machine 1'],
    autoplay: true
  });

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <RiveComponent />
    </div>
  );
} 