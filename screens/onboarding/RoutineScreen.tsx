import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlHelper, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { useRouter } from '@unitools/router';
import React from 'react';
import { ScrollView } from 'react-native';

const RoutineScreen = () => {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const dailyRoutines = [
    { label: 'Sedentary (Little to no exercise)', value: 'sedentary' },
    { label: 'Lightly Active (Light exercise 1-3 days/week)', value: 'lightly_active' },
    { label: 'Moderately Active (Moderate exercise 3-5 days/week)', value: 'moderately_active' },
    { label: 'Very Active (Hard exercise 6-7 days/week)', value: 'very_active' },
    { label: 'Extra Active (Very hard exercise & physical job)', value: 'extra_active' }
  ];

  const handleComplete = () => {
    // Here you would typically save all the onboarding data
    // and navigate to the main app
    console.log('Completed onboarding:', onboardingData);
    router.push('/dashboard');
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <VStack className="p-4" space="xl">
        <Heading size="xl" className="text-center">
          Your Routine
        </Heading>
        <Text size="sm" className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Tell us about your daily activity level and workout preferences.
        </Text>

        <VStack space="lg">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Daily Activity Level</FormControlLabelText>
            </FormControlLabel>
            <Select
              selectedValue={onboardingData.dailyRoutine}
              onValueChange={(value) => updateOnboardingData({ dailyRoutine: value })}
            >
              <SelectTrigger>
                <SelectInput 
                  placeholder="Select your daily activity level"
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicator />
                  {dailyRoutines.map((routine) => (
                    <SelectItem 
                      key={routine.value}
                      label={routine.label}
                      value={routine.value}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlHelper>
              <Text size="xs">Choose the option that best describes your typical day</Text>
            </FormControlHelper>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Workout Days per Week</FormControlLabelText>
            </FormControlLabel>
            <Select
              selectedValue={onboardingData.workoutDays}
              onValueChange={(value) => updateOnboardingData({ workoutDays: value })}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select number of days" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicator />
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <SelectItem 
                      key={day}
                      label={`${day} day${day > 1 ? 's' : ''} per week`}
                      value={day.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlHelper>
              <Text size="xs">How many days can you commit to working out?</Text>
            </FormControlHelper>
          </FormControl>
        </VStack>

        <HStack space="md" className="mt-6">
          <Button
            variant="outline"
            action="secondary"
            className="flex-1"
            onPress={() => router.back()}
          >
            <ButtonText>Back</ButtonText>
          </Button>
          <Button
            variant="solid"
            action="primary"
            className="flex-1"
            onPress={handleComplete}
            isDisabled={!onboardingData.dailyRoutine || !onboardingData.workoutDays}
          >
            <ButtonText>Complete</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default RoutineScreen;