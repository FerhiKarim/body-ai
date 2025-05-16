import { ProfileEditForm } from '@/components/ProfileEditForm';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { supabase } from '@/lib/supabase';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { SessionContext } from '@/providers/SessionProvider';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';

export function ProfileScreen() {
  const { onboardingData } = useOnboarding();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isAuthenticated, session } = useContext(SessionContext);
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.show({
          placement: 'bottom right',
          render: ({ id }) => (
            <Toast nativeID={id} variant="outline" action="error">
              <ToastTitle>{error.message}</ToastTitle>
            </Toast>
          ),
        });
        return;
      }
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => (
          <Toast nativeID={id} variant="outline" action="success">
            <ToastTitle>Successfully signed out!</ToastTitle>
          </Toast>
        ),
      });
      router.push('/auth/signin');
    } catch (error) {
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => (
          <Toast nativeID={id} variant="outline" action="error">
            <ToastTitle>An error occurred. Please try again.</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const renderMeasurement = (label: string, value: string | number, unit: string) => (
    <HStack className="justify-between items-center py-2">
      <Text className="text-gray-600 dark:text-gray-400">{label}</Text>
      <Text className="font-semibold">{value} {unit}</Text>
    </HStack>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView>
        <VStack className="p-4" space="xl">
          {/* Profile Header */}
          <VStack space="xs" className="items-center">
            <Box className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center mb-2">
              <Text className="text-3xl">👤</Text>
            </Box>
            <Button variant="outline" action="secondary" onPress={() => setIsEditModalOpen(true)}>
              <ButtonText>Edit Profile</ButtonText>
            </Button>
            <ProfileEditForm isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
          </VStack>

          {/* Personal Information */}
          <VStack className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4" space="xs">
            <Heading size="md" className="mb-2">Personal Information</Heading>
            <HStack className="justify-between items-center py-2">
              <Text className="text-gray-600 dark:text-gray-400">Gender</Text>
              <Text className="font-semibold">{onboardingData.gender || 'Not set'}</Text>
            </HStack>
            <Divider />
            <HStack className="justify-between items-center py-2">
              <Text className="text-gray-600 dark:text-gray-400">Age</Text>
              <Text className="font-semibold">{onboardingData.age || 'Not set'} years</Text>
            </HStack>
          </VStack>

          {/* Body Measurements */}
          <VStack className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4" space="xs">
            <Heading size="md" className="mb-2">Body Measurements</Heading>
            {renderMeasurement('Weight', onboardingData.weight || 'Not set', 'kg')}
            <Divider />
            {renderMeasurement('Height', onboardingData.height || 'Not set', 'cm')}
            <Divider />
            {renderMeasurement('Neck', onboardingData.neck || 'Not set', 'cm')}
            <Divider />
            {renderMeasurement('Waist', onboardingData.waist || 'Not set', 'cm')}
            <Divider />
            {renderMeasurement('Hip', onboardingData.hip || 'Not set', 'cm')}
          </VStack>

          {/* Fitness Information */}
          <VStack className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4" space="xs">
            <Heading size="md" className="mb-2">Fitness Information</Heading>
            <HStack className="justify-between items-center py-2">
              <Text className="text-gray-600 dark:text-gray-400">Daily Routine</Text>
              <Text className="font-semibold">{onboardingData.dailyRoutine || 'Not set'}</Text>
            </HStack>
            <Divider />
            <HStack className="justify-between items-center py-2">
              <Text className="text-gray-600 dark:text-gray-400">Workout Days</Text>
              <Text className="font-semibold">{onboardingData.workoutDays || 'Not set'} days/week</Text>
            </HStack>
            <Divider />
            <HStack className="justify-between items-center py-2">
              <Text className="text-gray-600 dark:text-gray-400">Goals</Text>
              <Text className="font-semibold">{onboardingData.goals[0] || 'Not set'}</Text>
            </HStack>
          </VStack>

          {/* Health Information */}
          <VStack className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4" space="xs">
            <Heading size="md" className="mb-2">Health Information</Heading>
            <HStack className="justify-between items-center py-2">
              <Text className="text-gray-600 dark:text-gray-400">Nutrition Preferences</Text>
              <Text className="font-semibold">{onboardingData.nutritionPreferences || 'Not set'}</Text>
            </HStack>
            <Divider />
            <HStack className="justify-between items-center py-2">
              <Text className="text-gray-600 dark:text-gray-400">Medical Conditions</Text>
              <Text className="font-semibold">{onboardingData.medicalConditions || 'Healthy'}</Text>
            </HStack>
          </VStack>
        </VStack>
        <Button
          variant="outline"
          action="secondary"
          className="mt-4"
          onPress={handleLogout}
        >
          <ButtonText>Sign out</ButtonText>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}