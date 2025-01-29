'use client';

import styles from './EngravedText.module.css';
import { cn } from '@/lib/utils';

interface EngravedTextProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  highlight?: boolean;
  className?: string;
}

export function EngravedText({ 
  children, 
  size = 'medium', 
  highlight, 
  className 
}: EngravedTextProps) {
  return (
    <div 
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
