'use client';

import Lottie from 'lottie-react';

// We'll need to create or import an actual animation JSON file
const defaultAnimation = {
  v: "5.5.7",
  fr: 60,
  ip: 0,
  op: 180,
  w: 512,
  h: 512,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [
    // Basic loading animation
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shape Layer",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], h: 0 },
            { t: 180, s: [360], h: 0 }
          ]
        },
        p: { a: 0, k: [256, 256, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [{
        ty: "el",
        p: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] }
      }],
      ip: 0,
      op: 180,
      st: 0
    }
  ]
};

export default function Animation() {
  return (
    <div style={{ 
      width: '300px',
      margin: '0 auto'
    }}>
      <Lottie 
        animationData={defaultAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
  );
} 