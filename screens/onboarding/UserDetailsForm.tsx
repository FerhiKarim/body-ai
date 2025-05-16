import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { CheckIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    gender: '',
    height: '',
    weight: '',
    waist: '',
    neck: '',
    hip: '',
    medicalConditions: '',
    dailyRoutine: '',
    workoutDays: '',
    goals: []
  });

  const goals = [
    'Get Fitter',
    'Gain Weight',
    'Lose Weight',
    'Building Muscles',
    'Improving Endurance',
    'Others'
  ];

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleContinue = () => {
    // Handle form submission
    console.log('Form data:', formData);
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <VStack space="xl" className="p-4">
        {/* Weight Section */}
        <VStack space="xs">
          <Heading size="lg">What is Your Weight?</Heading>
          <Text size="sm" className="text-gray-600 dark:text-gray-400">
            Weight in kg. Don't worry, you can always change it later.
          </Text>
          <Input>
            <InputField
              value={formData.weight}
              onChangeText={(value) => setFormData(prev => ({ ...prev, weight: value }))}
              keyboardType="numeric"
              className="text-center text-4xl"
              size="2xl"
            />
          </Input>
        </VStack>

        {/* Height Section */}
        <VStack space="xs">
          <Heading size="lg">What is Your Height?</Heading>
          <Text size="sm" className="text-gray-600 dark:text-gray-400">
            Height in cm. Don't worry, you can always change it later.
          </Text>
          <Input>
            <InputField
              value={formData.height}
              onChangeText={(value) => setFormData(prev => ({ ...prev, height: value }))}
              keyboardType="numeric"
              className="text-center text-4xl"
              size="2xl"
            />
          </Input>
        </VStack>

        {/* Goals Section */}
        <VStack space="xs">
          <Heading size="lg">What is Your Goal?</Heading>
          <Text size="sm" className="text-gray-600 dark:text-gray-400">
            You can choose more than one. Don't worry, you can always change it later.
          </Text>
          <VStack space="md">
            {goals.map((goal) => (
              <Checkbox
                key={goal}
                value={goal}
                isChecked={formData.goals.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
                size="lg"
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                <CheckboxIndicator className="mr-3">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>{goal}</CheckboxLabel>
              </Checkbox>
            ))}
          </VStack>
        </VStack>

        {/* Additional Measurements */}
        <VStack space="md">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Waist Measurement (cm)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={formData.waist}
                onChangeText={(value) => setFormData(prev => ({ ...prev, waist: value }))}
                keyboardType="numeric"
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Neck Measurement (cm)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={formData.neck}
                onChangeText={(value) => setFormData(prev => ({ ...prev, neck: value }))}
                keyboardType="numeric"
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Hip Measurement (cm)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={formData.hip}
                onChangeText={(value) => setFormData(prev => ({ ...prev, hip: value }))}
                keyboardType="numeric"
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Medical Conditions</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={formData.medicalConditions}
                onChangeText={(value) => setFormData(prev => ({ ...prev, medicalConditions: value }))}
                placeholder="List any medical conditions"
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Daily Routine</FormControlLabelText>
            </FormControlLabel>
            <Select
              selectedValue={formData.dailyRoutine}
              onValueChange={(value) => setFormData(prev => ({ ...prev, dailyRoutine: value }))}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select your daily routine" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicator />
                  <SelectItem label="Sedentary" value="sedentary" />
                  <SelectItem label="Lightly Active" value="lightly_active" />
                  <SelectItem label="Moderately Active" value="moderately_active" />
                  <SelectItem label="Very Active" value="very_active" />
                  <SelectItem label="Extra Active" value="extra_active" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Workout Days per Week</FormControlLabelText>
            </FormControlLabel>
            <Select
              selectedValue={formData.workoutDays}
              onValueChange={(value) => setFormData(prev => ({ ...prev, workoutDays: value }))}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select number of days" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicator />
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <SelectItem key={day} label={`${day} day${day > 1 ? 's' : ''}`} value={day.toString()} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
        </VStack>

        {/* Navigation Buttons */}
        <HStack space="md" className="mt-6">
          <Button
            variant="outline"
            action="secondary"
            className="flex-1"
            onPress={() => {}}
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

export default UserDetailsForm;