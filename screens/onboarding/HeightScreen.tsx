import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { useRouter } from '@unitools/router';
import React from 'react';

const HeightScreen = () => {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const handleContinue = () => {
    if (onboardingData.height) {
      router.push('/onboarding/goals');
    }
  };

  return (
    <VStack className="flex-1 bg-white dark:bg-gray-900 p-4 justify-between">
      <VStack space="xs" className="items-center">
        <Heading size="xl" className="text-center">
          What is Your Height?
        </Heading>
        <Text size="sm" className="text-center text-gray-600 dark:text-gray-400">
          Height in cm. Don't worry, you can always change it later.
        </Text>
        
        <VStack space="xl" className="w-full items-center mt-8">
          <Input
            className="w-32 h-20"
          >
            <InputField
              value={onboardingData.height}
              onChangeText={(value) => updateOnboardingData({ height: value })}
              keyboardType="numeric"
              className="text-center text-4xl"
              size="2xl"
              maxLength={3}
            />
          </Input>

          {/* Height Selector */}
          <VStack space="md" className="items-center mt-4">
            {[172, 173, 174, 175, 176, 177, 178].map((height) => (
              <Text
                key={height}
                className={`text-2xl ${onboardingData.height === height.toString() 
                  ? 'text-primary-500 font-bold' 
                  : 'text-gray-400'}`}
                onPress={() => updateOnboardingData({ height: height.toString() })}
              >
                {height}
              </Text>
            ))}
          </VStack>
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

export default HeightScreen;