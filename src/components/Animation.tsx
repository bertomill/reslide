'use client';

import Lottie from 'lottie-react';
import animationData from './animation.json';

export default function Animation() {
  return (
    <div style={{ 
      width: '300px',  // or whatever size you want
      margin: '0 auto'
    }}>
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
} 