import React, { useContext, createContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CandidateRegisterScreen from './src/screens/Auth/CandidateRegisterScreen';
import EmployerRegisterScreen from './src/screens/Auth/EmployerRegisterScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import { UserProvider } from './src/contexts/userContext';
import UserContext from './src/contexts/userContext';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NotificationProvider } from './src/contexts/notificationContext';
import NotificationScreen from './src/screens/Notification/NotificationScreen';

const Stack = createNativeStackNavigator();


function AppContent() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#020617' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? 'Home' : 'Login'}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="CandidateRegister" component={CandidateRegisterScreen} />
            <Stack.Screen name="EmployerRegister" component={EmployerRegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </StripeProvider>
      </NotificationProvider>
    </UserProvider>
  );
}