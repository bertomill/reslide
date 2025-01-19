'use client';

import { Box, Heading, Text, Card, Button, TextField, TextArea, Flex, IconButton, AlertDialog } from '@radix-ui/themes';
import { PlusIcon, Pencil1Icon, TrashIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type Thing = {
  id: string;
  title: string;
  description: string;
  created_at: string;
};

export default function ThingsILove() {
  const [things, setThings] = useState<Thing[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchThings();
  }, []);

  const fetchThings = async () => {
    const { data, error } = await supabase
      .from('things_i_love')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching things:', error);
      return;
    }

    setThings(data || []);
  };

  const handleAddThing = async () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      setError('Both title and description are required');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('You must be logged in to add things');
        return;
      }

      const { error: insertError } = await supabase
        .from('things_i_love')
        .insert([{
          title: newTitle.trim(),
          description: newDescription.trim(),
          user_id: session.user.id
        }]);

      if (insertError) throw insertError;

      resetForm();
      await fetchThings();
    } catch (err) {
      console.error('Error adding thing:', err);
      setError('Failed to add. Please try again.');
    }
  };

  const handleEditThing = async (id: string) => {
    if (!newTitle.trim() || !newDescription.trim()) {
      setError('Both title and description are required');
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('things_i_love')
        .update({
          title: newTitle.trim(),
          description: newDescription.trim(),
        })
        .eq('id', id);

      if (updateError) throw updateError;

      resetForm();
      await fetchThings();
    } catch (err) {
      console.error('Error updating thing:', err);
      setError('Failed to update. Please try again.');
    }
  };

  const handleDeleteThing = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('things_i_love')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setDeleteId(null);
      await fetchThings();
    } catch (err) {
      console.error('Error deleting thing:', err);
      setError('Failed to delete. Please try again.');
    }
  };

  const startEditing = (thing: Thing) => {
    setIsEditing(thing.id);
    setNewTitle(thing.title);
    setNewDescription(thing.description);
    setError('');
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(null);
    setNewTitle('');
    setNewDescription('');
    setError('');
  };

  const renderForm = (id?: string) => (
    <Box mb="3" style={{ padding: '8px', backgroundColor: 'var(--gray-3)', borderRadius: '4px' }}>
      <Flex direction="column" gap="2">
        <TextField.Root size="1" style={{ width: '100%' }}>
          <TextField.Input 
            placeholder="What do you love?" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: '100%' }}
          />
        </TextField.Root>
        <TextField.Root size="1" style={{ width: '100%' }}>
          <TextArea 
            placeholder="Why do you love it?"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
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
          <Button size="1" onClick={() => id ? handleEditThing(id) : handleAddThing()}>
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
          <Flex align="center" gap="2">
            <HeartFilledIcon color="var(--red-9)" width="16" height="16" />
            <Heading size="3" weight="bold">Things I Love</Heading>
          </Flex>
          <Button 
            size="1" 
            variant="soft" 
            onClick={() => {
              setIsAdding(!isAdding);
              setIsEditing(null);
              setNewTitle('');
              setNewDescription('');
              setError('');
            }}
          >
            <PlusIcon />
          </Button>
        </Flex>

        {isAdding && renderForm()}

        <Box>
          {things.map((thing) => (
            <Box key={thing.id} style={{ marginBottom: '2px' }}>
              {isEditing === thing.id ? (
                renderForm(thing.id)
              ) : (
                <Box style={{ 
                  padding: '4px 8px', 
                  backgroundColor: 'var(--gray-2)', 
                  borderRadius: 'var(--radius-2)'
                }}>
                  <Flex justify="between" align="center" gap="1">
                    <Box style={{ flex: 1 }}>
                      <Flex gap="1" align="baseline">
                        <Text size="2" weight="bold" style={{ marginRight: '4px' }}>{thing.title}</Text>
                        <Text size="1" style={{ color: 'var(--gray-11)', lineHeight: '1.2' }}>{thing.description}</Text>
                      </Flex>
                    </Box>
                    <Flex gap="1" align="center" style={{ flexShrink: 0 }}>
                      <Text size="1" color="gray">
                        {new Date(thing.created_at).toLocaleDateString()}
                      </Text>
                      <IconButton 
                        size="1" 
                        variant="ghost" 
                        onClick={() => startEditing(thing)}
                      >
                        <Pencil1Icon />
                      </IconButton>
                      <IconButton 
                        size="1" 
                        variant="ghost" 
                        color="red" 
                        onClick={() => setDeleteId(thing.id)}
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
            Are you sure you want to delete this item? This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={() => deleteId && handleDeleteThing(deleteId)}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Card>
  );
}
