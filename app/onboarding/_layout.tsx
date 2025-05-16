import OnboardingNavigator from '@/screens/onboarding/OnboardingNavigator';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        component={OnboardingNavigator}
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  );
}