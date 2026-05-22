import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { candidateRegisterStyles } from './Styles';
import SelectBox from './components/SelectBox';
import { getCountriesApi } from '../../apis/services/locationService';
import { registerCandidateApi } from '../../apis/services/authService';
import useForm from '../../hooks/useForm';

const genderOptions = [
  { label: 'Nam', value: 'MALE' },
  { label: 'Nữ', value: 'FEMALE' },
];

export default function CandidateRegisterScreen({ navigation }) {
  const { form, errors, updateField, setServerErrors, } = useForm({
    username: '',
    email: '',
    password: '',
    gender: 'MALE',
    country: 1,
  });
  const [countries, setCountries] = useState([])
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, [])

  const fetchCountries = async () => {
    try {
      const res = await getCountriesApi();
      setCountries(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await registerCandidateApi(form)
      alert('Đăng ký tài khoản thành công');
      navigation.navigate('Login');
    } catch (error) {
      setServerErrors(error);
      console.log(errors)
    }
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
                  <Text style={candidateRegisterStyles.label}>Giới tính</Text>
                  <SelectBox
                    icon="male-female-outline"
                    value={form.gender}
                    onChange={(value) =>
                      updateField('gender', value)
                    }
                    items={genderOptions}
                  />
                </View>

                {/* Country */}
                <View style={candidateRegisterStyles.inputWrapper}>
                  <Text style={candidateRegisterStyles.label}>Country</Text>
                  <SelectBox
                    icon="earth-outline"
                    value={form.country}
                    onChange={(value) => updateField('country', value)}
                    items={countries.map(country => ({
                      label: country.name,
                      value: country.id,
                    }))}
                  />
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