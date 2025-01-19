'use client';

import { Box, Heading, Text, Card, Button, TextField, Flex, IconButton } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon, PlusIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type Inspiration = {
  id: string;
  title: string;
  content: string;
};

export default function DailyInspiration() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchInspirations();
  }, []);

  const fetchInspirations = async () => {
    const { data, error } = await supabase
      .from('inspirations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inspirations:', error);
      return;
    }

    setInspirations(data || []);
  };

  const handleAddInspiration = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setError('Both title and content are required');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('You must be logged in to add inspirations');
        return;
      }

      const { error: insertError } = await supabase
        .from('inspirations')
        .insert([{
          title: newTitle.trim(),
          content: newContent.trim(),
          user_id: session.user.id
        }]);

      if (insertError) throw insertError;

      resetForm();
      await fetchInspirations();
    } catch (err) {
      console.error('Error adding inspiration:', err);
      setError('Failed to add inspiration. Please try again.');
    }
  };

  const handleEditInspiration = async (id: string) => {
    if (!newTitle.trim() || !newContent.trim()) {
      setError('Both title and content are required');
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('inspirations')
        .update({
          title: newTitle.trim(),
          content: newContent.trim(),
        })
        .eq('id', id);

      if (updateError) throw updateError;

      resetForm();
      await fetchInspirations();
    } catch (err) {
      console.error('Error updating inspiration:', err);
      setError('Failed to update inspiration. Please try again.');
    }
  };

  const handleDeleteInspiration = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('inspirations')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      await fetchInspirations();
    } catch (err) {
      console.error('Error deleting inspiration:', err);
      setError('Failed to delete inspiration. Please try again.');
    }
  };

  const startEditing = (inspiration: Inspiration) => {
    setIsEditing(inspiration.id);
    setNewTitle(inspiration.title);
    setNewContent(inspiration.content);
    setError('');
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(null);
    setNewTitle('');
    setNewContent('');
    setError('');
  };

  const renderForm = (id?: string) => (
    <Box mb="3" style={{ padding: '8px', backgroundColor: 'var(--gray-3)', borderRadius: '4px' }}>
      <Flex direction="column" gap="2">
        <TextField.Root size="1">
          <TextField.Input 
            placeholder="Title" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </TextField.Root>
        <TextField.Root size="1">
          <TextField.Input 
            placeholder="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </TextField.Root>
        {error && <Text size="1" color="red" mb="2">{error}</Text>}
        <Flex gap="2">
          <Button size="1" onClick={() => id ? handleEditInspiration(id) : handleAddInspiration()}>
            {id ? 'Save' : 'Add'}
          </Button>
          <Button size="1" variant="soft" onClick={resetForm}>Cancel</Button>
        </Flex>
      </Flex>
    </Box>
  );

  return (
    <Card size="2">
      <Box>
        <Flex justify="between" align="center" mb="2">
          <Heading size="3" weight="bold">Daily Inspiration</Heading>
          <Button 
            size="1" 
            variant="soft" 
            onClick={() => {
              setIsAdding(!isAdding);
              setIsEditing(null);
              setNewTitle('');
              setNewContent('');
              setError('');
            }}
          >
            <PlusIcon />
          </Button>
        </Flex>

        {isAdding && renderForm()}

        <Accordion.Root type="single" collapsible>
          {inspirations.map((inspiration) => (
            <Accordion.Item 
              key={inspiration.id} 
              value={inspiration.id}
              style={{ marginBottom: '2px' }}
            >
              {isEditing === inspiration.id ? (
                renderForm(inspiration.id)
              ) : (
                <>
                  <Accordion.Trigger style={{
                    width: '100%',
                    padding: '2px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}>
                    <Text size="1" weight="bold" style={{ color: 'var(--gray-12)' }}>{inspiration.title}</Text>
                    <Flex gap="1" align="center">
                      <IconButton 
                        size="1" 
                        variant="ghost" 
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(inspiration);
                        }}
                      >
                        <Pencil1Icon width="12" height="12" />
                      </IconButton>
                      <IconButton 
                        size="1" 
                        variant="ghost" 
                        color="red" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteInspiration(inspiration.id);
                        }}
                      >
                        <TrashIcon width="12" height="12" />
                      </IconButton>
                      <ChevronDownIcon
                        style={{
                          width: '14px',
                          height: '14px',
                          transition: 'transform 300ms',
                          transform: 'rotate(0deg)',
                          color: 'var(--gray-11)',
                          '[data-state=open] &': {
                            transform: 'rotate(180deg)',
                          },
                        }}
                      />
                    </Flex>
                  </Accordion.Trigger>
                  <Accordion.Content style={{
                    padding: '2px 0 4px 8px',
                  }}>
                    <Text size="1" style={{ color: 'var(--gray-11)', lineHeight: '1.2' }}>{inspiration.content}</Text>
                  </Accordion.Content>
                </>
              )}
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </Card>
  );
}
