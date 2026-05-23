import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import JobSearchScreen from '../Job/JobSearchScreen';
import ProfileScreen from './ProfileScreen';
import { TouchableOpacity, View } from 'react-native';
import CandidateApplicationScreen from './ApplicationScreen';

const Tab = createBottomTabNavigator();

export default function CandidateNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: '#020617' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 18, }}          >
            <View>
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
              <View
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#EF4444',
                }}
              />
            </View>
          </TouchableOpacity>
        ),

        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopColor: 'rgba(255,255,255,0.08)',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
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
      <Tab.Screen name="Search" component={JobSearchScreen} options={{ tabBarLabel: 'Tìm việc' }} />
      <Tab.Screen name="Application" component={CandidateApplicationScreen} options={{ tabBarLabel: 'Hồ sơ ứng tuyển' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Hồ sơ' }} />
    </Tab.Navigator>
  );
}