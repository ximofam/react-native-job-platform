import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { candidateRegisterStyles } from './Styles';

const genders = ['MALE', 'FEMALE', 'OTHER'];
const countries = [
  { id: 1, name: 'Vietnam' },
  { id: 2, name: 'United States' },
  { id: 3, name: 'Japan' },
  { id: 4, name: 'Singapore' },
];

export default function CandidateRegisterScreen() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    gender: 'MALE',
    country: 1,
  });

  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    console.log(form);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#020617', '#0F172A', '#1E293B']}
        style={candidateRegisterStyles.container}
      >
        <SafeAreaView style={candidateRegisterStyles.safeArea}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              contentContainerStyle={candidateRegisterStyles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Header */}
              <View style={candidateRegisterStyles.headerContainer}>
                <View style={candidateRegisterStyles.logoContainer}>
                  <Ionicons name="person-add" size={34} color="#FFFFFF" />
                </View>

                <Text style={candidateRegisterStyles.title}>Create Account</Text>

                <Text style={candidateRegisterStyles.subtitle}>
                  Start applying to your dream jobs today
                </Text>
              </View>

              {/* Card */}
              <View style={candidateRegisterStyles.card}>
                {/* Username */}
                <View style={candidateRegisterStyles.inputWrapper}>
                  <Text style={candidateRegisterStyles.label}>Username</Text>

                  <View style={candidateRegisterStyles.inputContainer}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter username"
                      placeholderTextColor="#94A3B8"
                      value={form.username}
                      onChangeText={(value) =>
                        updateField('username', value)
                      }
                      autoCapitalize="none"
                      style={candidateRegisterStyles.input}
                    />
                  </View>
                </View>

                {/* Email */}
                <View style={candidateRegisterStyles.inputWrapper}>
                  <Text style={candidateRegisterStyles.label}>Email</Text>

                  <View style={candidateRegisterStyles.inputContainer}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter email"
                      placeholderTextColor="#94A3B8"
                      value={form.email}
                      onChangeText={(value) => updateField('email', value)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={candidateRegisterStyles.input}
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={candidateRegisterStyles.inputWrapper}>
                  <Text style={candidateRegisterStyles.label}>Password</Text>

                  <View style={candidateRegisterStyles.inputContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter password"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showPassword}
                      value={form.password}
                      onChangeText={(value) =>
                        updateField('password', value)
                      }
                      style={candidateRegisterStyles.input}
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={22}
                        color="#64748B"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Gender */}
                <View style={candidateRegisterStyles.inputWrapper}>
                  <Text style={candidateRegisterStyles.label}>Gender</Text>

                  <View style={candidateRegisterStyles.genderContainer}>
                    {genders.map((gender) => {
                      const active = form.gender === gender;

                      return (
                        <TouchableOpacity
                          key={gender}
                          activeOpacity={0.85}
                          style={[
                            candidateRegisterStyles.genderButton,
                            active && candidateRegisterStyles.genderButtonActive,
                          ]}
                          onPress={() => updateField('gender', gender)}
                        >
                          <Text
                            style={[
                              candidateRegisterStyles.genderText,
                              active && candidateRegisterStyles.genderTextActive,
                            ]}
                          >
                            {gender}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Country */}
                <View style={candidateRegisterStyles.inputWrapper}>
                  <Text style={candidateRegisterStyles.label}>Country</Text>

                  <View style={candidateRegisterStyles.countryList}>
                    {countries.map((country) => {
                      const active = form.country === country.id;

                      return (
                        <TouchableOpacity
                          key={country.id}
                          style={[
                            candidateRegisterStyles.countryItem,
                            active && candidateRegisterStyles.countryItemActive,
                          ]}
                          onPress={() =>
                            updateField('country', country.id)
                          }
                        >
                          <Text
                            style={[
                              candidateRegisterStyles.countryText,
                              active && candidateRegisterStyles.countryTextActive,
                            ]}
                          >
                            {country.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleRegister}
                >
                  <LinearGradient
                    colors={['#2563EB', '#3B82F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={candidateRegisterStyles.registerButton}
                  >
                    <Text style={candidateRegisterStyles.registerButtonText}>
                      Create Account
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Footer */}
                <View style={candidateRegisterStyles.footerContainer}>
                  <Text style={candidateRegisterStyles.footerText}>
                    Already have an account?
                  </Text>

                  <TouchableOpacity>
                    <Text style={candidateRegisterStyles.loginLink}> Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}