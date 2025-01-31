'use client';

import { useState } from 'react';
import { Card, Text, Flex, Grid, Button, TextField, Select } from '@radix-ui/themes';
import { createBrowserClient } from '@supabase/ssr';
import { PlusIcon } from '@radix-ui/react-icons';

const MEAL_TEMPLATES = {
  breakfast: [
    "4 whole eggs + 2 whites",
    "1 cup oatmeal",
    "1 banana",
    "Coffee black"
  ],
  lunch: [
    "8oz chicken breast",
    "2 cups brown rice",
    "2 cups mixed vegetables",
    "1 tbsp olive oil"
  ],
  dinner: [
    "8oz salmon",
    "Sweet potato",
    "Asparagus",
    "Avocado"
  ],
  snacks: [
    "Protein shake + banana",
    "Almonds + berries",
    "Greek yogurt + honey"
  ]
};

type Meal = {
  id: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  foods: string[];
  calories?: number;
  protein?: number;
  notes?: string;
  eaten_at: string;
};

export default function Meals() {
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    meal_type: 'breakfast',
    foods: [],
    eaten_at: new Date().toISOString()
  });
  const [currentFood, setCurrentFood] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAddFood = () => {
    if (currentFood.trim()) {
      setNewMeal(prev => ({
        ...prev,
        foods: [...(prev.foods || []), currentFood.trim()]
      }));
      setCurrentFood('');
    }
  };

  const handleSubmit = async () => {
    if (!newMeal.foods?.length) {
      setError('Please add at least one food item');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Get the current user's session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No authenticated session');
      }

      const { error: supabaseError } = await supabase
        .from('meals')
        .insert([{
          meal_type: newMeal.meal_type,
          foods: newMeal.foods,
          calories: newMeal.calories,
          protein: newMeal.protein,
          notes: newMeal.notes,
          eaten_at: newMeal.eaten_at,
          user_id: session.user.id
        }]);

      if (supabaseError) throw supabaseError;

      setIsAddingMeal(false);
      setNewMeal({
        meal_type: 'breakfast',
        foods: [],
        eaten_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error saving meal:', err);
      setError('Failed to save meal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Text size="5" weight="bold">Elite Performance Meals</Text>
          <Button 
            onClick={() => setIsAddingMeal(!isAddingMeal)}
            variant="soft"
          >
            <PlusIcon /> Add Meal
          </Button>
        </Flex>
        
        <Text size="2" color="gray" style={{ fontStyle: 'italic' }}>
          Fuel your body like a warrior king. Every meal is an opportunity for greatness.
        </Text>

        {isAddingMeal && (
          <Card variant="surface">
            <Flex direction="column" gap="3">
              <Select.Root 
                defaultValue="breakfast"
                onValueChange={(value) => setNewMeal(prev => ({ ...prev, meal_type: value as Meal['meal_type'] }))}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="breakfast">Breakfast</Select.Item>
                  <Select.Item value="lunch">Lunch</Select.Item>
                  <Select.Item value="dinner">Dinner</Select.Item>
                  <Select.Item value="snacks">Snacks</Select.Item>
                </Select.Content>
              </Select.Root>

              <Flex gap="2">
                <TextField.Root style={{ flex: 1 }}>
                  <TextField.Input 
                    placeholder="Add food item"
                    value={currentFood}
                    onChange={(e) => setCurrentFood(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFood()}
                  />
                </TextField.Root>
                <Button onClick={handleAddFood}>Add</Button>
              </Flex>

              {newMeal.foods?.length > 0 && (
                <Flex direction="column" gap="1">
                  {newMeal.foods.map((food, index) => (
                    <Text key={index} size="2">• {food}</Text>
                  ))}
                </Flex>
              )}

              <Grid columns="2" gap="2">
                <TextField.Root>
                  <TextField.Input 
                    type="number"
                    placeholder="Calories"
                    onChange={(e) => setNewMeal(prev => ({ ...prev, calories: parseInt(e.target.value) }))}
                  />
                </TextField.Root>
                <TextField.Root>
                  <TextField.Input 
                    type="number"
                    placeholder="Protein (g)"
                    onChange={(e) => setNewMeal(prev => ({ ...prev, protein: parseInt(e.target.value) }))}
                  />
                </TextField.Root>
              </Grid>

              <TextField.Root>
                <TextField.Input 
                  placeholder="Notes"
                  onChange={(e) => setNewMeal(prev => ({ ...prev, notes: e.target.value }))}
                />
              </TextField.Root>

              {error && <Text color="red" size="2">{error}</Text>}
              
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Meal'}
              </Button>
            </Flex>
          </Card>
        )}

        <Grid columns={{ initial: '1', sm: '2' }} gap="4">
          {Object.entries(MEAL_TEMPLATES).map(([mealType, foods]) => (
            <Card key={mealType}>
              <Flex direction="column" gap="2">
                <Text size="3" weight="bold" style={{ textTransform: 'capitalize' }}>
                  {mealType}
                </Text>
                {foods.map((food, index) => (
                  <Text key={index} size="2" style={{ paddingLeft: '8px' }}>
                    • {food}
                  </Text>
                ))}
              </Flex>
            </Card>
          ))}
        </Grid>
      </Flex>
    </Card>
  );
} 