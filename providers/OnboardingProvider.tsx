import React, { createContext, useContext, useState } from 'react';

type OnboardingData = {
  gender: string;
  age: string;
  height: string;
  weight: string;
  waist: string;
  neck: string;
  hip: string;
  medicalConditions: string;
  dailyRoutine: string;
  workoutDays: string;
  goals: string[];
  nutritionPreferences: string;
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  resetOnboardingData: () => void;
};

const initialOnboardingData: OnboardingData = {
  gender: '',
  age: '',
  height: '',
  weight: '',
  waist: '',
  neck: '',
  hip: '',
  medicalConditions: '',
  dailyRoutine: '',
  workoutDays: '',
  goals: [],
  nutritionPreferences: '',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialOnboardingData);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const resetOnboardingData = () => {
    setOnboardingData(initialOnboardingData);
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateOnboardingData,
        resetOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};