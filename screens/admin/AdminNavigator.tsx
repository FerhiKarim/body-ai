import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdminDashboard from './Dashboard';
import Users from './Users';

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={AdminDashboard} />
      <Stack.Screen name="Users" component={Users} />
    </Stack.Navigator>
  );
};

export default AdminNavigator; 