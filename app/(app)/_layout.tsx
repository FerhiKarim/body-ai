import { OnboardingProvider } from '@/providers/OnboardingProvider';
import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
      </Stack>
    </OnboardingProvider>
  );
}