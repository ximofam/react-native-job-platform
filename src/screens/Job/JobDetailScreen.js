import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import s from './styles/jobDetailStyles';


function Section({ title, icon, children }) {
  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Ionicons
          name={icon}
          size={20}
          color="#3B82F6"
        />

        <Text style={s.sectionTitle}>
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
}

function InfoItem({ icon, text }) {
  return (
    <View style={s.infoRow}>
      <Ionicons
        name={icon}
        size={16}
        color="#94A3B8"
      />

      <Text style={s.infoText}>
        {text}
      </Text>
    </View>
  );
}

export default function JobDetailScreen() {
  const job = {
    title: 'Senior Java Backend Developer',

    company: {
      name: 'FPT Software',
      logo_url: null,
      locations: [
        {
          address:
            'Tòa nhà FPT, 17 Duy Tân, Phường Cầu Giấy, Hà Nội',
        },
      ],
    },
    salary: {
      display: '40,000,000 - 70,000,000 VND',
    },
    employment_type_display: 'Toàn thời gian',
    experience_level_display: 'Senior',
    published_at: '2026-05-19',
    requirements:
      '- Tối thiểu 4 năm kinh nghiệm với Java\n- Thành thạo Spring Boot\n- Kinh nghiệm PostgreSQL / MySQL',
    benefit:
      '- Lương cạnh tranh\n- Review lương 2 lần/năm\n- Bảo hiểm sức khỏe cao cấp',
  };

  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#111827']}
      style={s.container}
    >
      <SafeAreaView style={s.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scrollContent}
        >

          {/* Company */}
          <View style={s.companyCard}>
            {job.company.logo_url ? (
              <Image
                source={{ uri: job.company.logo_url }}
                style={s.companyLogo}
              />
            ) : (
              <View style={s.companyLogoFallback}>
                <Text style={s.companyLogoText}>
                  {job.company.name[0]}
                </Text>
              </View>
            )}

            <Text style={s.jobTitle}>
              {job.title}
            </Text>

            <Text style={s.companyName}>
              {job.company.name}
            </Text>

            <View style={s.metaContainer}>
              <View style={s.metaBadge}>
                <Ionicons
                  name="cash-outline"
                  size={14}
                  color="#059669"
                />

                <Text style={s.metaText}>
                  {job.salary.display}
                </Text>
              </View>

              <View style={s.metaBadge}>
                <Ionicons
                  name="briefcase-outline"
                  size={14}
                  color="#2563EB"
                />

                <Text style={s.metaText}>
                  {job.employment_type_display}
                </Text>
              </View>
            </View>
          </View>

          {/* Job Info */}
          <Section
            title="Thông tin công việc"
            icon="information-circle-outline"
          >
            <InfoItem
              icon="location-outline"
              text={job.company.locations[0].address}
            />

            <InfoItem
              icon="star-outline"
              text={job.experience_level_display}
            />

            <InfoItem
              icon="calendar-outline"
              text={`Đăng ngày ${job.published_at}`}
            />
          </Section>

          {/* Requirements */}
          <Section
            title="Yêu cầu ứng viên"
            icon="checkmark-circle-outline"
          >
            <Text style={s.descriptionText}>
              {job.requirements}
            </Text>
          </Section>

          {/* Benefits */}
          <Section
            title="Quyền lợi"
            icon="gift-outline"
          >
            <Text style={s.descriptionText}>
              {job.benefit}
            </Text>
          </Section>

          {/* Company */}
          <Section
            title="Về công ty"
            icon="business-outline"
          >
            <Text style={s.descriptionText}>
              FPT Software là công ty công nghệ hàng đầu Việt Nam.
            </Text>
          </Section>

        </ScrollView>

        {/* Bottom Apply */}
        <View style={s.bottomBar}>
          <TouchableOpacity style={s.saveBtn}>
            <Ionicons
              name="bookmark-outline"
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={s.applyBtn}
          >
            <LinearGradient
              colors={['#2563EB', '#3B82F6']}
              style={s.applyGradient}
            >
              <Text style={s.applyText}>
                Ứng tuyển ngay
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}