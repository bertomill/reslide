'use client';

import { useEffect, useState } from 'react';
import { Card, Text, Heading } from '@radix-ui/themes';
import { supabase } from '../lib/supabase';

export default function SupabaseConnectionTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus('testing');
    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from('journal_entries')
          .select('count')
          .limit(1);

        if (error) throw error;
        
        setStatus('success');
      } catch (e) {
        setStatus('error');
        setError(e instanceof Error ? e.message : 'Unknown error occurred');
      }
    }

    testConnection();
  }, []);

  if (status === 'idle') {
    return null;
  }

  return (
    <Card size="2" style={{ maxWidth: 500, margin: '20px auto' }}>
      <Heading size="3" mb="2">Supabase Connection Status</Heading>
      {status === 'testing' && (
        <Text color="blue">Testing connection...</Text>
      )}
      {status === 'success' && (
        <Text color="green">Successfully connected to Supabase!</Text>
      )}
      {status === 'error' && (
        <Text color="red">
          Connection error: {error}
        </Text>
      )}
    </Card>
  );
} 