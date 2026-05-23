import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import CandidateNavigator from './CandidateNavigator';
// import NotificationScreen from '../Notifications/NotificationScreen';
import JobDetailScreen from '../Job/JobDetailScreen';

const Stack = createNativeStackNavigator();

export default function CandidateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CandidateTabs" component={CandidateNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen}
        options={{
          title: 'Chi tiết công việc',
          headerStyle: { backgroundColor: '#020617' },
          headerTintColor: '#FFFFFF',
        }}
      />


      {/* <Stack.Screen name="Notifications" component={NotificationScreen}
        options={{
          title: 'Thông báo',
          headerStyle: {
            backgroundColor: '#020617',
          },
          headerTintColor: '#FFFFFF',
        }}
      /> */}
    </Stack.Navigator>
  );
}