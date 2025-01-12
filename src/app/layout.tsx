import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'One Goal',
  description: 'Focus on what matters most',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" accentColor="blue" radius="large">
          {children}
        </Theme>
      </body>
    </html>
  );
}
