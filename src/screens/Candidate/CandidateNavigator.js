import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import CandidateApplicationScreen from './ApplicationScreen';
import JobStack from '../Job/JobStack';
import NotificationBell from '../../components/NotificationBell';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const Tab = createBottomTabNavigator();

export default function CandidateNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: '#020617' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
        headerShown: true,
        headerRight: () => <NotificationBell />,

        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopColor: 'rgba(255,255,255,0.08)',
          borderTopWidth: 1,
          height: 64 + insets.bottom,
          paddingBottom: 10 + insets.bottom,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#475569',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            Search: focused ? 'search' : 'search-outline',
            Application: focused ? 'documents' : 'documents-outline',
            Profile: focused ? 'person' : 'person-outline',
          };

          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Search" component={JobStack} options={{ tabBarLabel: 'Tìm việc' }} />
      <Tab.Screen name="Application" component={CandidateApplicationScreen} options={{ tabBarLabel: 'Hồ sơ ứng tuyển' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Hồ sơ' }} />
    </Tab.Navigator>
  );
}