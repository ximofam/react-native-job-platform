import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import common from './styles/common';
import s from './styles/employerStyles';
import JobItem from './components/JobItem';

// Dữ liệu mẫu — thay bằng API call sau
const MOCK_JOBS = [
  { id: 1, title: 'Frontend Developer', applicants: 12, status: 'active', posted: '3 ngày trước' },
  { id: 2, title: 'Backend Engineer (Node.js)', applicants: 8, status: 'active', posted: '5 ngày trước' },
  { id: 3, title: 'UI/UX Designer', applicants: 20, status: 'closed', posted: '10 ngày trước' },
];

const STATS = [
  { number: '3', label: 'Tin đã đăng', icon: 'briefcase-outline', color: '#2563EB' },
  { number: '40', label: 'Ứng viên', icon: 'people-outline', color: '#059669' },
  { number: '2', label: 'Đang mở', icon: 'checkmark-circle-outline', color: '#D97706' },
];

export default function EmployerHome({ user, onLogout }) {
  const fullName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`;

  return (
    <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={common.container}>
      <SafeAreaView style={common.safeArea}>
        <ScrollView contentContainerStyle={common.scrollContainer} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={common.headerContainer}>
            <View style={common.headerLeft}>
              {user.avatar_url ? (
                <Image source={{ uri: user.avatar_url }} style={common.avatar} />
              ) : (
                <View style={[common.avatarFallback, s.avatarFallbackEmployer]}>
                  <Text style={common.avatarFallbackText}>
                    {user.first_name?.[0]?.toUpperCase() ?? '?'}
                  </Text>
                </View>
              )}
              <View style={{ marginLeft: 12 }}>
                <Text style={common.greetingText}>Nhà tuyển dụng</Text>
                <Text style={common.nameText}>{fullName}</Text>
              </View>
            </View>

            <TouchableOpacity style={common.logoutButton} onPress={onLogout}>
              <Ionicons name="log-out-outline" size={22} color="#F87171" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={common.statsContainer}>
            {STATS.map((stat) => (
              <View key={stat.label} style={common.statCard}>
                <Ionicons name={stat.icon} size={20} color={stat.color} style={{ marginBottom: 6 }} />
                <Text style={common.statNumber}>{stat.number}</Text>
                <Text style={common.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Post new job CTA */}
          <TouchableOpacity activeOpacity={0.88}>
            <LinearGradient colors={['#7C3AED', '#6D28D9']} style={s.postJobBanner}>
              <View>
                <Text style={s.postJobBannerTitle}>Đăng tin tuyển dụng</Text>
                <Text style={s.postJobBannerSub}>Tiếp cận hàng nghìn ứng viên ngay hôm nay</Text>
              </View>
              <View style={s.postJobBannerIcon}>
                <Ionicons name="add-circle-outline" size={32} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Job list */}
          <View style={common.sectionRow}>
            <Text style={common.sectionTitle}>Tin đã đăng</Text>
            <TouchableOpacity>
              <Text style={common.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {MOCK_JOBS.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}