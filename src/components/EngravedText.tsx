'use client';

import styles from './EngravedText.module.css';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

export type EngravedTextProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  highlight?: boolean;
  style?: CSSProperties;
  className?: string;
};

export function EngravedText({ 
  children, 
  size = 'medium', 
  highlight = false,
  style = {},
  className
}: EngravedTextProps) {
  const baseStyle: CSSProperties = {
    color: '#fff',
    textShadow: highlight 
      ? '0 -1px 2px rgba(0,0,0,.6), 0 1px 1px rgba(255,255,255,.2), 0 0 15px rgba(255,255,255,.2)'
      : '0 -1px 2px rgba(0,0,0,.6), 0 1px 1px rgba(255,255,255,.2)',
    fontSize: size === 'large' ? '1.1rem' : size === 'small' ? '0.9rem' : '1rem',
    lineHeight: '1.5',
    letterSpacing: '0.02em',
    ...style
  };

  return (
    <div 
      style={baseStyle}
      className={cn(
        styles.engraved,
        styles[size],
        highlight && styles.highlight,
        className
      )}
    >
      {children}
    </div>
  );
}
