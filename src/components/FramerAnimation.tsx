'use client';

import { motion } from 'framer-motion';

export default function FramerAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'var(--accent-9)',
        borderRadius: 20
      }}
    >
      Your content here
    </motion.div>
  );
} 