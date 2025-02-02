'use client';

import { useState, useEffect } from 'react';
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

const getDayOfWeek = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
};

export default function Meals() {
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
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

  const fetchMeals = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', session.user.id)
        .order('eaten_at', { ascending: false });

      if (error) throw error;
      setMeals(data || []);
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

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
      
      await fetchMeals();
    } catch (err) {
      console.error('Error saving meal:', err);
      setError('Failed to save meal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card size="3" id="meals-section">
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
              <Grid columns="2" gap="2">
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

                <Flex align="center" gap="2">
                  <TextField.Root style={{ flex: 1 }}>
                    <TextField.Input 
                      type="date"
                      value={new Date(newMeal.eaten_at).toISOString().split('T')[0]}
                      onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        setNewMeal(prev => ({
                          ...prev,
                          eaten_at: newDate.toISOString()
                        }));
                      }}
                    />
                  </TextField.Root>
                  <Text size="1" color="gray" style={{ minWidth: 'fit-content' }}>
                    {getDayOfWeek(new Date(newMeal.eaten_at))}
                  </Text>
                </Flex>
              </Grid>

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

              {newMeal.foods && newMeal.foods.length > 0 && (
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

        <Flex direction="column" gap="2">
          {meals.map((meal) => (
            <Card key={meal.id} variant="surface" style={{ padding: '8px' }}>
              <Flex direction="column" gap="1">
                <Flex justify="between" align="center">
                  <Text size="2" weight="bold" style={{ textTransform: 'capitalize' }}>
                    {meal.meal_type}
                  </Text>
                  <Flex align="center" gap="2">
                    <Text size="1" color="gray" style={{ opacity: 0.8 }}>
                      {getDayOfWeek(new Date(meal.eaten_at))}
                    </Text>
                    <Text size="1" color="gray">
                      {new Date(meal.eaten_at).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Flex>
                
                <Flex direction="column" gap="1">
                  {meal.foods.map((food, index) => (
                    <Text key={index} size="1" style={{ marginLeft: '8px' }}>
                      • {food}
                    </Text>
                  ))}
                </Flex>
                
                {(meal.calories || meal.protein) && (
                  <Flex gap="2">
                    {meal.calories && (
                      <Text size="1" color="gray">
                        {meal.calories} calories
                      </Text>
                    )}
                    {meal.protein && (
                      <Text size="1" color="gray">
                        {meal.protein}g protein
                      </Text>
                    )}
                  </Flex>
                )}
                
                {meal.notes && (
                  <Text size="1" color="gray" style={{ fontStyle: 'italic' }}>
                    {meal.notes}
                  </Text>
                )}
              </Flex>
            </Card>
          ))}
        </Flex>

        <Grid columns={{ initial: '2', sm: '4' }} gap="2">
          {Object.entries(MEAL_TEMPLATES).map(([mealType, foods]) => (
            <Card key={mealType} style={{ padding: '8px' }}>
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold" style={{ textTransform: 'capitalize' }}>
                  {mealType}
                </Text>
                {foods.map((food, index) => (
                  <Text key={index} size="1" style={{ paddingLeft: '8px' }}>
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