// navigation/JobStack.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobSearchScreen from './JobSearchScreen';
import JobDetailScreen from './JobDetailScreen';
import JobApplicationScreen from './JobApplicationScreen';


const Stack = createNativeStackNavigator();

export default function JobStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="JobSearch" component={JobSearchScreen} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
      <Stack.Screen name="JobApplication" component={JobApplicationScreen} />
    </Stack.Navigator>
  );
}