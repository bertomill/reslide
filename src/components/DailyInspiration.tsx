'use client';

import { Box, Heading, Text, Card, Button, TextField, TextArea, Flex, IconButton, AlertDialog } from '@radix-ui/themes';
import { PlusIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type Inspiration = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default function DailyInspiration() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
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

      setDeleteId(null);
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
        <TextField.Root size="1" style={{ width: '100%' }}>
          <TextField.Input 
            placeholder="Title" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: '100%' }}
          />
        </TextField.Root>
        <TextField.Root size="1" style={{ width: '100%' }}>
          <TextArea 
            placeholder="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ 
              minHeight: '80px',
              lineHeight: '1.4',
              fontSize: 'var(--font-size-1)',
              width: '100%',
              boxSizing: 'border-box'
            }}
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

        <Box>
          {inspirations.map((inspiration) => (
            <Box key={inspiration.id} style={{ marginBottom: '2px' }}>
              {isEditing === inspiration.id ? (
                renderForm(inspiration.id)
              ) : (
                <Box style={{ 
                  padding: '4px 8px', 
                  backgroundColor: 'var(--gray-2)', 
                  borderRadius: 'var(--radius-2)'
                }}>
                  <Flex justify="between" align="center" gap="1">
                    <Box style={{ flex: 1 }}>
                      <Flex gap="1" align="baseline">
                        <Text size="2" weight="bold" style={{ marginRight: '4px' }}>{inspiration.title}</Text>
                        <Text size="1" style={{ color: 'var(--gray-11)', lineHeight: '1.2' }}>{inspiration.content}</Text>
                      </Flex>
                    </Box>
                    <Flex gap="1" align="center" style={{ flexShrink: 0 }}>
                      <Text size="1" color="gray">
                        {new Date(inspiration.created_at).toLocaleDateString()}
                      </Text>
                      <IconButton 
                        size="1" 
                        variant="ghost" 
                        onClick={() => startEditing(inspiration)}
                      >
                        <Pencil1Icon />
                      </IconButton>
                      <IconButton 
                        size="1" 
                        variant="ghost" 
                        color="red" 
                        onClick={() => setDeleteId(inspiration.id)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      <AlertDialog.Root open={deleteId !== null}>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this inspiration? This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={() => deleteId && handleDeleteInspiration(deleteId)}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Card>
  );
}
