import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
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
import React, { useContext } from 'react';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const { onboardingData } = useOnboarding();
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

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView>
        <VStack className="p-4" space="xl">
          {/* Header Section */}
          <VStack space="xs">
            <Heading size="xl">Welcome Back!</Heading>
            <Text className="text-gray-600 dark:text-gray-400">
              Let's check your progress
            </Text>
          </VStack>

          {/* Stats Overview */}
          <HStack space="md" className="w-full">
            <Box className="flex-1 p-4 bg-primary-50 rounded-xl">
              <VStack>
                <Text className="text-gray-600">Current Weight</Text>
                <Heading size="lg">{onboardingData.weight} kg</Heading>
              </VStack>
            </Box>
            <Box className="flex-1 p-4 bg-primary-50 rounded-xl">
              <VStack>
                <Text className="text-gray-600">Height</Text>
                <Heading size="lg">{onboardingData.height} cm</Heading>
              </VStack>
            </Box>
          </HStack>

          {/* Goals Section */}
          <VStack space="sm">
            <Heading size="lg">Your Goals</Heading>
            <VStack space="xs" className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              {onboardingData.goals.map((goal, index) => (
                <Text key={index} className="text-lg">
                  • {goal}
                </Text>
              ))}
            </VStack>
          </VStack>

          {/* Workout Schedule */}
          <VStack space="sm">
            <Heading size="lg">Workout Schedule</Heading>
            <Box className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <Text className="text-lg">
                {onboardingData.workoutDays} days per week
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 mt-2">
                Activity Level: {onboardingData.dailyRoutine.replace('_', ' ')}
              </Text>
            </Box>
          </VStack>

          {/* Quick Actions */}
          <VStack space="sm">
            <Heading size="lg">Quick Actions</Heading>
            <HStack space="md">
              <Button
                className="flex-1"
                variant="outline"
                action="secondary"
              >
                <ButtonText>Update Weight</ButtonText>
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                action="secondary"
              >
                <ButtonText>Log Workout</ButtonText>
              </Button>
            </HStack>
          </VStack>
          <Button
            variant="outline"
            action="secondary"
            className="mt-4"
            onPress={handleLogout}
          >
            <ButtonText>Sign out</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}