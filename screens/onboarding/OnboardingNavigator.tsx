import { OnboardingProvider } from '@/providers/OnboardingProvider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import GoalsScreen from './GoalsScreen';
import HeightScreen from './HeightScreen';
import MeasurementsScreen from './MeasurementsScreen';
import RoutineScreen from './RoutineScreen';
import WeightScreen from './WeightScreen';

const Stack = createNativeStackNavigator();

const OnboardingNavigator = () => {
  return (
    <OnboardingProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'white',
          },
        }}
        initialRouteName="Weight"
      >
        <Stack.Screen name="Weight" component={WeightScreen} />
        <Stack.Screen name="Height" component={HeightScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Measurements" component={MeasurementsScreen} />
        <Stack.Screen name="Routine" component={RoutineScreen} />
      </Stack.Navigator>
    </OnboardingProvider>
  );
};

export default OnboardingNavigator;