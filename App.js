import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CandidateRegisterScreen from './src/screens/Auth/CandidateRegisterScreen';

import EmployerRegisterScreen from './src/screens/Auth/EmployerRegisterScreen';

import LoginScreen from './src/screens/Auth/LoginScreen';

import HomeScreen from './src/screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, }}      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CandidateRegister" component={CandidateRegisterScreen} />
        <Stack.Screen name="EmployerRegister" component={EmployerRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}