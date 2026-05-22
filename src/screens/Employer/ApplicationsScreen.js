import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import common, { COLORS } from './styles/common';
import s from './styles/applicationsStyles';

const MOCK_APPLICATIONS = [
  {
    id: 1,
    name: 'Nguyễn Minh Khoa',
    position: 'Frontend Developer',
    appliedAt: '2 giờ trước',
    status: 'new',
    skills: ['React', 'TypeScript', 'TailwindCSS'],
    exp: '3 năm',
    avatarColor: '#7C3AED',
  },
  {
    id: 2,
    name: 'Trần Thị Lan Anh',
    position: 'UI/UX Designer',
    appliedAt: '5 giờ trước',
    status: 'reviewing',
    skills: ['Figma', 'Prototyping', 'Illustrator'],
    exp: '4 năm',
    avatarColor: '#0891B2',
  },
  {
    id: 3,
    name: 'Lê Văn Đức',
    position: 'Backend Engineer',
    appliedAt: '1 ngày trước',
    status: 'interview',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    exp: '5 năm',
    avatarColor: '#059669',
  },
  {
    id: 4,
    name: 'Phạm Thị Hoa',
    position: 'Frontend Developer',
    appliedAt: '2 ngày trước',
    status: 'rejected',
    skills: ['Vue.js', 'SCSS', 'Webpack'],
    exp: '2 năm',
    avatarColor: '#D97706',
  },
];

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'new', label: 'Mới' },
  { key: 'reviewing', label: 'Đang xem' },
  { key: 'interview', label: 'Phỏng vấn' },
  { key: 'rejected', label: 'Từ chối' },
];

const STATUS_CONFIG = {
  new: { label: 'Mới', color: COLORS.blue, bg: COLORS.blueDim },
  reviewing: { label: 'Đang xem', color: COLORS.amber, bg: COLORS.amberDim },
  interview: { label: 'Phỏng vấn', color: COLORS.green, bg: COLORS.greenDim },
  rejected: { label: 'Từ chối', color: COLORS.red, bg: COLORS.redDim },
};

function ApplicationCard({ app }) {
  const statusCfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.new;
  const initials = app.name.split(' ').map((n) => n[0]).slice(-2).join('');

  return (
    <View style={s.appCard}>
      <View style={s.appCardHeader}>
        <View style={[s.appAvatarFallback, { backgroundColor: app.avatarColor + '33' }]}>
          <Text style={[s.appAvatarText, { color: app.avatarColor }]}>{initials}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={s.appName}>{app.name}</Text>
          <Text style={s.appPosition}>{app.position} · {app.exp}</Text>
          <Text style={s.appDate}>{app.appliedAt}</Text>
        </View>

        <View style={[s.statusBadge, { backgroundColor: statusCfg.bg }]}>
          <Text style={[s.statusText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
        </View>
      </View>

      <View style={s.skillRow}>
        {app.skills.map((skill) => (
          <View key={skill} style={s.skillChip}>
            <Text style={s.skillChipText}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={s.actionRow}>
        <TouchableOpacity
          style={[s.actionBtn, { backgroundColor: COLORS.purpleDim, borderWidth: 1, borderColor: COLORS.borderHigh }]}
          activeOpacity={0.75}
        >
          <Ionicons name="document-text-outline" size={14} color={COLORS.purple} />
          <Text style={[s.actionBtnText, { color: COLORS.purple }]}>Xem CV</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.actionBtn, { backgroundColor: COLORS.greenDim, borderWidth: 1, borderColor: 'rgba(52,211,153,0.25)' }]}
          activeOpacity={0.75}
        >
          <Ionicons name="calendar-outline" size={14} color={COLORS.green} />
          <Text style={[s.actionBtnText, { color: COLORS.green }]}>Hẹn phỏng vấn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.actionBtn, { flex: 0, paddingHorizontal: 12, backgroundColor: COLORS.redDim, borderWidth: 1, borderColor: 'rgba(248,113,113,0.2)' }]}
          activeOpacity={0.75}
        >
          <Ionicons name="close-outline" size={16} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ApplicationsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_APPLICATIONS.filter((app) => {
    const matchFilter = activeFilter === 'all' || app.status === activeFilter;
    const matchSearch =
      search.trim() === '' ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <LinearGradient colors={['#060813', '#0C0F1E', '#111527']} style={common.container}>
      <SafeAreaView style={common.safeArea}>
        <ScrollView
          contentContainerStyle={common.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={common.pageTitle}>Hồ sơ ứng viên</Text>
          <Text style={common.pageSubtitle}>{MOCK_APPLICATIONS.length} ứng viên đã nộp hồ sơ</Text>

          {/* Search */}
          <View style={s.searchBar}>
            <Ionicons name="search-outline" size={18} color={COLORS.textMuted} />
            <TextInput
              style={s.searchInput}
              placeholder="Tìm theo tên, vị trí..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 18, marginHorizontal: -18 }}
            contentContainerStyle={{ paddingHorizontal: 18, gap: 8 }}
          >
            {FILTERS.map((f) => {
              const active = activeFilter === f.key;
              return (
                <TouchableOpacity
                  key={f.key}
                  style={[s.filterChip, active && s.filterChipActive]}
                  onPress={() => setActiveFilter(f.key)}
                  activeOpacity={0.75}
                >
                  <Text style={[s.filterChipText, active && s.filterChipTextActive]}>
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* List */}
          {filtered.length === 0 ? (
            <View style={{ alignItems: 'center', paddingTop: 40 }}>
              <Ionicons name="folder-open-outline" size={48} color={COLORS.textMuted} />
              <Text style={{ color: COLORS.textMuted, marginTop: 12, fontSize: 14 }}>
                Không có ứng viên phù hợp
              </Text>
            </View>
          ) : (
            filtered.map((app) => <ApplicationCard key={app.id} app={app} />)
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}