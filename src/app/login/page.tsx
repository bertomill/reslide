'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Text, Button, Flex } from '@radix-ui/themes';
import { createBrowserClient } from '@supabase/ssr';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: 'warrior@onegoal.com',
        password: password
      });

      if (signInError) {
        throw signInError;
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid password');
    }
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Card size="3" style={{ width: '100%', maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Text size="5" weight="bold" align="center">Enter Password</Text>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="rt-TextFieldInput"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--gray-7)',
                background: 'var(--gray-2)',
                color: 'var(--gray-12)',
              }}
            />
            {error && (
              <Text color="red" size="2">{error}</Text>
            )}
            <Button type="submit">
              Enter
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
} 