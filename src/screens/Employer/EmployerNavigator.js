import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

import PostJobScreen from './PostJobScreen';
import ApplicationsScreen from './ApplicationsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused, color }) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
      <Ionicons name={name} size={22} color={focused ? '#A78BFA' : '#64748B'} />
    </View>
  );
}

export default function EmployerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#A78BFA',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.tabBarAndroid]} />
          )
        ),
      })}
    >
      <Tab.Screen
        name="PostJob"
        options={{
          tabBarLabel: 'Đăng tin',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'add-circle' : 'add-circle-outline'} focused={focused} />
          ),
        }}
      >
        {(props) => <PostJobScreen {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Applications"
        options={{
          tabBarLabel: 'Ứng viên',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'documents' : 'documents-outline'} focused={focused} />
          ),
        }}
      >
        {(props) => <ApplicationsScreen {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'business' : 'business-outline'} focused={focused} />
          ),
        }}
      >
        {(props) => <ProfileScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    paddingTop: 10,
    backgroundColor: 'transparent',
    borderTopColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: 1,
  },
  tabBarAndroid: {
    backgroundColor: 'rgba(9, 11, 22, 0.97)',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  iconWrapper: {
    width: 40,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
  },
});