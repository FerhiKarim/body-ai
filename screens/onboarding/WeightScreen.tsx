import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { useRouter } from '@unitools/router';
import React from 'react';

const WeightScreen = () => {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const handleContinue = () => {
    if (onboardingData.weight) {
      router.push('/onboarding/height');
    }
  };

  return (
    <VStack className="flex-1 bg-white dark:bg-gray-900 p-4 justify-between">
      <VStack space="xs" className="items-center">
        <Heading size="xl" className="text-center">
          What is Your Weight?
        </Heading>
        <Text size="sm" className="text-center text-gray-600 dark:text-gray-400">
          Weight in kg. Don't worry, you can always change it later.
        </Text>
        
        <VStack space="xl" className="w-full items-center mt-8">
          <Input
            className="w-32 h-20"
          >
            <InputField
              value={onboardingData.weight}
              onChangeText={(value) => updateOnboardingData({ weight: value })}
              keyboardType="numeric"
              className="text-center text-4xl"
              size="2xl"
              maxLength={3}
            />
          </Input>

          {/* Weight Selector */}
          <HStack space="md" className="justify-center items-center mt-4">
            {[63, 64, 65, 66, 67].map((weight) => (
              <Text
                key={weight}
                className={`text-2xl ${onboardingData.weight === weight.toString() ? 'text-primary-500' : 'text-gray-400'}`}
                onPress={() => updateOnboardingData({ weight: weight.toString() })}
              >
                {weight}
              </Text>
            ))}
          </HStack>
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
        >
          <ButtonText>Continue</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};

export default WeightScreen;