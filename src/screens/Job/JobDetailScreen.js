import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView,
  TouchableOpacity, Image, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import s from '../../styles/jobStyles';
import { getJobApi } from '../../apis/services/jobService';

function Section({ title, icon, children }) {
  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Ionicons name={icon} size={20} color="#3B82F6" />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function InfoItem({ icon, text }) {
  return (
    <View style={s.infoRow}>
      <Ionicons name={icon} size={16} color="#94A3B8" />
      <Text style={s.infoText}>{text}</Text>
    </View>
  );
}

export default function JobDetailScreen({ route, navigation }) {
  const { id } = route.params;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchJob() {
      try {
        setLoading(true);
        setError(null);
        const data = await getJobApi(id);
        if (!cancelled) setJob(data);
      } catch (err) {
        if (!cancelled) setError(err?.message ?? 'Có lỗi xảy ra');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchJob();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={s.container}>
        <SafeAreaView style={[s.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (error || !job) {
    return (
      <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={s.container}>
        <SafeAreaView style={[s.safeArea, { justifyContent: 'center', alignItems: 'center', gap: 12 }]}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={{ color: '#94A3B8', fontSize: 15 }}>{error ?? 'Không tìm thấy công việc'}</Text>
          <TouchableOpacity onPress={() => { setError(null); setLoading(true); }}>
            <Text style={{ color: '#3B82F6', fontSize: 14 }}>Thử lại</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const primaryLocation =
    job.company?.locations?.find((l) => l.is_primary) ??
    job.company?.locations?.[0];

  const locationText = primaryLocation?.address ?? job.address ?? '—';

  const salaryText =
    job.salary_min && job.salary_max
      ? `${Number(job.salary_min).toLocaleString('vi-VN')} - ${Number(job.salary_max).toLocaleString('vi-VN')} ${job.salary_currency ?? 'VND'}`
      : job.salary_min
        ? `Từ ${Number(job.salary_min).toLocaleString('vi-VN')} ${job.salary_currency ?? 'VND'}`
        : 'Thỏa thuận';

  const publishedDate = job.published_at ? new Date(job.published_at).toLocaleDateString('vi-VN') : '—';

  return (
    <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={s.container}>
      <SafeAreaView style={s.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scrollContent}
        >
          {/* Company card */}
          <View style={s.companyCard}>
            {job.company?.logo_url ? (
              <Image source={{ uri: job.company.logo_url }} style={s.companyLogo} />
            ) : (
              <View style={s.companyLogoFallback}>
                <Text style={s.companyLogoText}>
                  {job.company?.name?.[0] ?? '?'}
                </Text>
              </View>
            )}

            <Text style={s.jobTitle}>{job.title}</Text>
            <Text style={s.companyName}>{job.company?.name}</Text>

            <View style={s.metaContainer}>
              <View style={s.metaBadge}>
                <Ionicons name="cash-outline" size={14} color="#059669" />
                <Text style={s.metaText}>{salaryText}</Text>
              </View>

              <View style={s.metaBadge}>
                <Ionicons name="briefcase-outline" size={14} color="#2563EB" />
                <Text style={s.metaText}>{job.employment_type_display}</Text>
              </View>
            </View>
          </View>

          {/* Job info */}
          <Section title="Thông tin công việc" icon="information-circle-outline">
            <InfoItem icon="location-outline" text={locationText} />
            <InfoItem icon="star-outline" text={job.experience_level_display} />
            <InfoItem icon="calendar-outline" text={`Đăng ngày ${publishedDate}`} />
          </Section>

          {/* Requirements */}
          <Section title="Yêu cầu ứng viên" icon="checkmark-circle-outline">
            <Text style={s.descriptionText}>{job.requirements}</Text>
          </Section>

          {/* Benefits */}
          <Section title="Quyền lợi" icon="gift-outline">
            <Text style={s.descriptionText}>{job.benefit}</Text>
          </Section>

          {/* About company */}
          {job.company?.description ? (
            <Section title="Về công ty" icon="business-outline">
              <Text style={s.descriptionText}>{job.company.description}</Text>
            </Section>
          ) : null}
        </ScrollView>

        {/* Bottom bar */}
        <View style={s.bottomBar}>
          <TouchableOpacity style={s.saveBtn}>
            <Ionicons name="bookmark-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={s.applyBtn} onPress={() => navigation.navigate('JobApplication')}>
            <LinearGradient colors={['#2563EB', '#3B82F6']} style={s.applyGradient}>
              <Text style={s.applyText}>Ứng tuyển ngay</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}