'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Text, Button, TextField, Flex } from '@radix-ui/themes';
import Cookies from 'js-cookie';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - you can change this to any password you want
    if (password === 'warrior2025') {
      // Set cookie to expire in 7 days
      Cookies.set('auth', 'true', { expires: 7 });
      router.push('/');
      router.refresh();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Card size="3" style={{ width: '100%', maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Text size="5" weight="bold" align="center">Enter Password</Text>
            <TextField.Root>
              <TextField.Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
              />
            </TextField.Root>
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