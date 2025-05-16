import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlHelper, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { useRouter } from '@unitools/router';
import React from 'react';
import { ScrollView } from 'react-native';

const MeasurementsScreen = () => {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const handleContinue = () => {
    // Here you would typically validate the inputs
    router.push('/onboarding/routine');
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <VStack className="p-4" space="xl">
        <Heading size="xl" className="text-center">
          Body Measurements
        </Heading>
        <Text size="sm" className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Please provide your measurements for a more personalized experience.
        </Text>

        <VStack space="lg">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Waist Measurement</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={onboardingData.waist}
                onChangeText={(value) => updateOnboardingData({ waist: value })}
                keyboardType="numeric"
                placeholder="Enter waist measurement in cm"
              />
            </Input>
            <FormControlHelper>
              <Text size="xs">Measure around your natural waistline</Text>
            </FormControlHelper>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Neck Measurement</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={onboardingData.neck}
                onChangeText={(value) => updateOnboardingData({ neck: value })}
                keyboardType="numeric"
                placeholder="Enter neck measurement in cm"
              />
            </Input>
            <FormControlHelper>
              <Text size="xs">Measure around the base of your neck</Text>
            </FormControlHelper>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Hip Measurement</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={onboardingData.hip}
                onChangeText={(value) => updateOnboardingData({ hip: value })}
                keyboardType="numeric"
                placeholder="Enter hip measurement in cm"
              />
            </Input>
            <FormControlHelper>
              <Text size="xs">Measure around the fullest part of your hips</Text>
            </FormControlHelper>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Medical Conditions</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={onboardingData.medicalConditions}
                onChangeText={(value) => updateOnboardingData({ medicalConditions: value })}
                placeholder="List any relevant medical conditions"
                multiline
                numberOfLines={3}
              />
            </Input>
            <FormControlHelper>
              <Text size="xs">This helps us provide safer recommendations</Text>
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
            onPress={handleContinue}
          >
            <ButtonText>Continue</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default MeasurementsScreen;