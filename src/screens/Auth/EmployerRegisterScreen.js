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
import { employerRegisterStyles } from './Styles';

const genders = ['MALE', 'FEMALE'];
const companyTypes = ['PRODUCT', 'OUTSOURCE', 'STARTUP', 'AGENCY', 'FOREIGN', 'STATE_OWNED', 'OTHER'];
const employeeSizes = ['SMALL', 'MEDIUM', 'LARGE', 'VERY_LARGE', 'ENTERPRISE'];

export default function EmployerRegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    gender: 'MALE',
    country: 1,
    company: {
      name: '',
      type: 'PRODUCT',
      employee_size: 'SMALL',
      description: '',
      tax_code: '',
      new_locations: [
        {
          label: 'HEADQUARTERS',
          is_primary: true,
          address_street: '',
          district: '',
        },
      ],
    },
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCompanyField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const updateLocationField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        new_locations: [
          {
            ...prev.company.new_locations[0],
            [field]: value,
          },
        ],
      },
    }));
  };

  const handleRegister = () => {
    console.log(JSON.stringify(form, null, 2));
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#020617', '#0F172A', '#1E293B']}
        style={employerRegisterStyles.container}
      >
        <SafeAreaView style={employerRegisterStyles.safeArea}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              contentContainerStyle={employerRegisterStyles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Header */}
              <View style={employerRegisterStyles.headerContainer}>
                <View style={employerRegisterStyles.logoContainer}>
                  <Ionicons name="business" size={34} color="#FFFFFF" />
                </View>

                <Text style={employerRegisterStyles.title}>Employer Register</Text>

                <Text style={employerRegisterStyles.subtitle}>
                  Create your company account and start hiring
                </Text>
              </View>

              {/* Card */}
              <View style={employerRegisterStyles.card}>
                <Text style={employerRegisterStyles.sectionTitle}>Account Information</Text>

                {/* Username */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Username</Text>

                  <View style={employerRegisterStyles.inputContainer}>
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
                      style={employerRegisterStyles.input}
                    />
                  </View>
                </View>

                {/* Email */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Email</Text>

                  <View style={employerRegisterStyles.inputContainer}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter email"
                      placeholderTextColor="#94A3B8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={form.email}
                      onChangeText={(value) =>
                        updateField('email', value)
                      }
                      style={employerRegisterStyles.input}
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Password</Text>

                  <View style={employerRegisterStyles.inputContainer}>
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
                      style={employerRegisterStyles.input}
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
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Gender</Text>

                  <View style={employerRegisterStyles.rowContainer}>
                    {genders.map((gender) => {
                      const active = form.gender === gender;

                      return (
                        <TouchableOpacity
                          key={gender}
                          style={[
                            employerRegisterStyles.optionButton,
                            active && employerRegisterStyles.optionButtonActive,
                          ]}
                          onPress={() => updateField('gender', gender)}
                        >
                          <Text
                            style={[
                              employerRegisterStyles.optionText,
                              active && employerRegisterStyles.optionTextActive,
                            ]}
                          >
                            {gender}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Company Section */}
                <Text style={employerRegisterStyles.sectionTitle}>Company Information</Text>

                {/* Company Name */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Company Name</Text>

                  <View style={employerRegisterStyles.inputContainer}>
                    <Ionicons
                      name="briefcase-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter company name"
                      placeholderTextColor="#94A3B8"
                      value={form.company.name}
                      onChangeText={(value) =>
                        updateCompanyField('name', value)
                      }
                      style={employerRegisterStyles.input}
                    />
                  </View>
                </View>

                {/* Company Type */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Company Type</Text>

                  <View style={employerRegisterStyles.rowWrapContainer}>
                    {companyTypes.map((type) => {
                      const active = form.company.type === type;

                      return (
                        <TouchableOpacity
                          key={type}
                          style={[
                            employerRegisterStyles.tagButton,
                            active && employerRegisterStyles.tagButtonActive,
                          ]}
                          onPress={() =>
                            updateCompanyField('type', type)
                          }
                        >
                          <Text
                            style={[
                              employerRegisterStyles.tagText,
                              active && employerRegisterStyles.tagTextActive,
                            ]}
                          >
                            {type}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Employee Size */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Employee Size</Text>

                  <View style={employerRegisterStyles.rowWrapContainer}>
                    {employeeSizes.map((size) => {
                      const active =
                        form.company.employee_size === size;

                      return (
                        <TouchableOpacity
                          key={size}
                          style={[
                            employerRegisterStyles.tagButton,
                            active && employerRegisterStyles.tagButtonActive,
                          ]}
                          onPress={() =>
                            updateCompanyField('employee_size', size)
                          }
                        >
                          <Text
                            style={[
                              employerRegisterStyles.tagText,
                              active && employerRegisterStyles.tagTextActive,
                            ]}
                          >
                            {size}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Tax Code */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Tax Code</Text>

                  <View style={employerRegisterStyles.inputContainer}>
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter tax code"
                      placeholderTextColor="#94A3B8"
                      value={form.company.tax_code}
                      onChangeText={(value) =>
                        updateCompanyField('tax_code', value)
                      }
                      style={employerRegisterStyles.input}
                    />
                  </View>
                </View>

                {/* Description */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Company Description</Text>

                  <View style={employerRegisterStyles.textAreaContainer}>
                    <TextInput
                      placeholder="Describe your company"
                      placeholderTextColor="#94A3B8"
                      multiline
                      numberOfLines={5}
                      textAlignVertical="top"
                      value={form.company.description}
                      onChangeText={(value) =>
                        updateCompanyField('description', value)
                      }
                      style={employerRegisterStyles.textArea}
                    />
                  </View>
                </View>

                {/* Location */}
                <Text style={employerRegisterStyles.sectionTitle}>Headquarters</Text>

                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>Street Address</Text>

                  <View style={employerRegisterStyles.inputContainer}>
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter street address"
                      placeholderTextColor="#94A3B8"
                      value={form.company.new_locations[0].address_street}
                      onChangeText={(value) =>
                        updateLocationField('address_street', value)
                      }
                      style={employerRegisterStyles.input}
                    />
                  </View>
                </View>

                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>District ID</Text>

                  <View style={employerRegisterStyles.inputContainer}>
                    <Ionicons
                      name="map-outline"
                      size={20}
                      color="#64748B"
                    />

                    <TextInput
                      placeholder="Enter district id"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={String(
                        form.company.new_locations[0].district
                      )}
                      onChangeText={(value) =>
                        updateLocationField('district', value)
                      }
                      style={employerRegisterStyles.input}
                    />
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
                    style={employerRegisterStyles.registerButton}
                  >
                    <Text style={employerRegisterStyles.registerButtonText}>
                      Create Employer Account
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
