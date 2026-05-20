import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#020617', '#0F172A', '#1E293B']}
        style={{ flex: 1 }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              marginBottom: 48,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 12,
              }}
            >
              Create Account
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: '#94A3B8',
                textAlign: 'center',
                lineHeight: 22,
              }}
            >
              Choose how you want to use the platform
            </Text>
          </View>

          {/* Candidate */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate('CandidateRegister')
            }
            style={{
              backgroundColor: '#111827',
              borderRadius: 24,
              padding: 24,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                backgroundColor: 'rgba(37,99,235,0.15)',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 18,
              }}
            >
              <Ionicons
                name="person-outline"
                size={32}
                color="#3B82F6"
              />
            </View>

            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: '700',
                marginBottom: 8,
              }}
            >
              Candidate
            </Text>

            <Text
              style={{
                color: '#94A3B8',
                fontSize: 14,
                lineHeight: 22,
              }}
            >
              Apply for jobs, build your profile and connect with employers.
            </Text>
          </TouchableOpacity>

          {/* Employer */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate('EmployerRegister')
            }
            style={{
              backgroundColor: '#111827',
              borderRadius: 24,
              padding: 24,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                backgroundColor: 'rgba(124,58,237,0.15)',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 18,
              }}
            >
              <Ionicons
                name="business-outline"
                size={32}
                color="#8B5CF6"
              />
            </View>

            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: '700',
                marginBottom: 8,
              }}
            >
              Employer
            </Text>

            <Text
              style={{
                color: '#94A3B8',
                fontSize: 14,
                lineHeight: 22,
              }}
            >
              Post jobs, manage applications and hire top talents.
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}