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
import { loginStyles } from './Styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log({ email, password });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#0F172A', '#111827', '#1E293B']}
        style={loginStyles.container}
      >
        <SafeAreaView style={loginStyles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={loginStyles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Header */}
              <View style={loginStyles.headerContainer}>
                <View style={loginStyles.logoContainer}>
                  <Ionicons name="briefcase" size={34} color="#FFFFFF" />
                </View>

                <Text style={loginStyles.title}>Welcome Back</Text>
                <Text style={loginStyles.subtitle}>
                  Login to continue your job search journey
                </Text>
              </View>

              {/* Card */}
              <View style={loginStyles.card}>
                {/* Email */}
                <View style={loginStyles.inputWrapper}>
                  <Text style={loginStyles.label}>Email</Text>

                  <View style={loginStyles.inputContainer}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter your email"
                      placeholderTextColor="#94A3B8"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={loginStyles.input}
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={loginStyles.inputWrapper}>
                  <Text style={loginStyles.label}>Password</Text>

                  <View style={loginStyles.inputContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      style={loginStyles.input}
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

                {/* Forgot password */}
                <TouchableOpacity style={loginStyles.forgotPasswordContainer}>
                  <Text style={loginStyles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleLogin}
                >
                  <LinearGradient
                    colors={['#2563EB', '#3B82F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={loginStyles.loginButton}
                  >
                    <Text style={loginStyles.loginButtonText}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={loginStyles.dividerContainer}>
                  <View style={loginStyles.divider} />
                  <Text style={loginStyles.dividerText}>OR</Text>
                  <View style={loginStyles.divider} />
                </View>

                {/* Social Login */}
                <TouchableOpacity style={loginStyles.socialButton}>
                  <Ionicons name="logo-google" size={22} color="#EA4335" />

                  <Text style={loginStyles.socialButtonText}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                {/* Register */}
                <View style={loginStyles.registerContainer}>
                  <Text style={loginStyles.registerText}>
                    Don't have an account?
                  </Text>

                  <TouchableOpacity>
                    <Text style={loginStyles.registerLink}> Sign Up</Text>
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
