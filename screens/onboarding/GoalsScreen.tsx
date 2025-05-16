import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { CheckIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { useRouter } from '@unitools/router';
import React from 'react';

const GoalsScreen = () => {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const goals = [
    'Get Fitter',
    'Gain Weight',
    'Lose Weight',
    'Building Muscles',
    'Improving Endurance',
    'Others'
  ];

  const handleGoalToggle = (goal: string) => {
    const updatedGoals = onboardingData.goals.includes(goal)
      ? onboardingData.goals.filter(g => g !== goal)
      : [...onboardingData.goals, goal];
    
    updateOnboardingData({ goals: updatedGoals });
  };

  const handleContinue = () => {
    if (onboardingData.goals.length > 0) {
      router.push('/onboarding/measurements');
    }
  };

  return (
    <VStack className="flex-1 bg-white dark:bg-gray-900 p-4 justify-between">
      <VStack space="xs">
        <Heading size="xl" className="text-center">
          What is Your Goal?
        </Heading>
        <Text size="sm" className="text-center text-gray-600 dark:text-gray-400 mb-6">
          You can choose more than one. Don't worry, you can always change it later.
        </Text>
        
        <VStack space="md">
          {goals.map((goal) => (
            <Checkbox
              key={goal}
              value={goal}
              isChecked={onboardingData.goals.includes(goal)}
              onChange={() => handleGoalToggle(goal)}
              size="lg"
              className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <CheckboxIndicator className="mr-3">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel className="flex-1 text-lg">{goal}</CheckboxLabel>
            </Checkbox>
          ))}
        </VStack>
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
          onPress={handleContinue}
          isDisabled={onboardingData.goals.length === 0}
        >
          <ButtonText>Continue</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};

export default GoalsScreen;