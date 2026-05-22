import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { employerRegisterStyles } from './Styles';
import CompanyLocationItem from './components/CompanyLocationItem';
import SelectBox from './components/SelectBox';
import { registerEmployerApi } from '../../apis/services/authService';
import useForm from '../../hooks/useForm';

const genderOptions = [
  { label: 'Nam', value: 'MALE' },
  { label: 'Nữ', value: 'FEMALE' },
];

const companyTypeOptions = [
  { label: 'Product', value: 'PRODUCT' },
  { label: 'Outsource', value: 'OUTSOURCE' },
  { label: 'Startup', value: 'STARTUP' },
  { label: 'Agency', value: 'AGENCY' },
  { label: 'Công ty nước ngoài', value: 'FOREIGN' },
  { label: 'Doanh nghiệp nhà nước', value: 'STATE_OWNED' },
  { label: 'Khác', value: 'OTHER' },
];

const employeeSizeOptions = [
  { label: 'Nhỏ', value: 'SMALL' },
  { label: 'Trung bình', value: 'MEDIUM' },
  { label: 'Lớn', value: 'LARGE' },
  { label: 'Rất lớn', value: 'VERY_LARGE' },
  { label: 'Tập đoàn', value: 'ENTERPRISE' },
];
export default function EmployerRegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const { form, errors, updateField, setServerErrors, } = useForm({
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
  })

  const addLocation = () => {
    setForm((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        new_locations: [
          ...prev.company.new_locations,
          {
            label: 'BRANCH',
            is_primary: false,
            address_street: '',
            city: null,
            district: null,
          },
        ],
      },
    }));
  };

  const removeLocation = (index) => {
    setForm((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        new_locations:
          prev.company.new_locations.filter(
            (_, i) => i !== index
          ),
      },
    }));
  };

  const updateLocation = (index, value) => {
    setForm((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        new_locations:
          prev.company.new_locations.map(
            (item, i) =>
              i === index ? value : item
          ),
      },
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


  const handleRegister = async () => {
    try {
      const payload = {
        ...form,
        company: {
          ...form.company,
          new_locations: form.company.new_locations.map((location) => ({
            label: location.label,
            is_primary: location.is_primary,
            address_street: location.address_street,
            district: Number(location.district.id),
          })),
        },
      };

      await registerEmployerApi(payload);
      alert('Đăng ký tài khoản thành công');
      navigation.navigate('Login');
    } catch (error) {
      console.log('REGISTER ERROR:', error);
      setServerErrors(error)
    }
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
                  <Text style={employerRegisterStyles.label}>Giới tính</Text>

                  <SelectBox
                    icon="male-female-outline"
                    value={form.gender}
                    onChange={(value) =>
                      updateField('gender', value)
                    }
                    items={genderOptions}
                  />
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
                  <Text style={employerRegisterStyles.label}>
                    Loại công ty
                  </Text>

                  <SelectBox
                    icon="business-outline"
                    value={form.company.type}
                    onChange={(value) =>
                      updateCompanyField('type', value)
                    }
                    items={companyTypeOptions}
                  />
                </View>

                {/* Employee Size */}
                <View style={employerRegisterStyles.inputWrapper}>
                  <Text style={employerRegisterStyles.label}>
                    Quy mô công ty
                  </Text>

                  <SelectBox
                    icon="people-outline"
                    value={form.company.employee_size}
                    onChange={(value) =>
                      updateCompanyField('employee_size', value)
                    }
                    items={employeeSizeOptions}
                  />
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
                      onChangeText={(value) => updateCompanyField('description', value)}
                      style={employerRegisterStyles.textArea}
                    />
                  </View>
                </View>

                {/* Location */}
                <Text style={employerRegisterStyles.sectionTitle}>
                  Company Locations
                </Text>

                {form.company.new_locations.map(
                  (location, index) => (
                    <CompanyLocationItem
                      key={index}
                      styles={employerRegisterStyles}
                      value={location}
                      removable={index > 0}
                      onRemove={() => removeLocation(index)}
                      onChange={(value) =>
                        updateLocation(index, value)
                      }
                    />
                  )
                )}

                <TouchableOpacity
                  onPress={addLocation}
                  style={{
                    marginBottom: 24,
                    paddingVertical: 14,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#3B82F6',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#3B82F6',
                      fontWeight: '700',
                    }}
                  >
                    + Add Branch Location
                  </Text>
                </TouchableOpacity>

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
