import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Animated, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../styles/employerScreenStyles';
import { getMyJobsApi } from '../../apis/services/jobService';

const STATUS_CONFIG = {
  DRAFT: { label: 'Bản nháp', bg: '#E5E7EB', text: '#374151', dot: '#9CA3AF', icon: 'document-text-outline' },
  PUBLISHED: { label: 'Đang hiển thị', bg: '#DCFCE7', text: '#166534', dot: '#22C55E', icon: 'checkmark-circle-outline' },
  EXPIRED: { label: 'Đã hết hạn', bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444', icon: 'time-outline' },
  CLOSED: { label: 'Đã đóng', bg: '#E0E7FF', text: '#3730A3', dot: '#6366F1', icon: 'close-circle-outline' },
};

const FILTER_TABS = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'PUBLISHED', label: 'Đang hiển thị' },
  { key: 'DRAFT', label: 'Bản nháp' },
  { key: 'EXPIRED', label: 'Hết hạn' },
  { key: 'CLOSED', label: 'Đã đóng' },
];

const formatDate = (date) => {
  if (!date) return '—';
  const d = new Date(date);

  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

const getDaysLeft = (expiredAt) => {
  if (!expiredAt) return null;
  return Math.ceil((new Date(expiredAt).getTime() - Date.now()) / 86400000);
};

const MetaItem = memo(({ icon, label, value, highlight }) => (
  <View style={styles.metaItem}>
    <Ionicons name={icon} size={16} color={highlight ? '#4F46E5' : '#6B7280'} />

    <View style={{ marginLeft: 6 }}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={[styles.metaValue, highlight && styles.metaValueHighlight]}>
        {value}
      </Text>
    </View>
  </View>
));

function ActionBtn({ icon, label, primary, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.actionBtn, primary && styles.actionBtnPrimary]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Ionicons name={icon} size={16} color={primary ? '#FFFFFF' : '#4F46E5'} />

      <Text style={[styles.actionBtnText, primary && styles.actionBtnTextPrimary]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function JobCard({ item, index, onViewDetail, onEdit, onRepublish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 70,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.CLOSED;
  const daysLeft = getDaysLeft(item.expired_at);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity style={styles.card} activeOpacity={0.85}>
        <View style={styles.cardHeader}>
          <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
            <View style={[styles.dot, { backgroundColor: cfg.dot }]} />

            <Ionicons name={cfg.icon} size={14} color={cfg.text} style={{ marginRight: 4 }} />

            <Text style={[styles.badgeText, { color: cfg.text }]}>
              {cfg.label}
            </Text>
          </View>

          <Text style={styles.jobId}>#{item.id}</Text>
        </View>

        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.metaRow}>
          <MetaItem
            icon="calendar-outline"
            label="Ngày đăng"
            value={formatDate(item.published_at)}
          />

          <View style={styles.metaDivider} />

          <MetaItem
            icon="time-outline"
            label="Hết hạn"
            value={formatDate(item.expired_at)}
          />

          <View style={styles.metaDivider} />

          <MetaItem
            icon="people-outline"
            label="Ứng viên"
            value={String(item.application_count || 0)}
            highlight={item.application_count > 0}
          />
        </View>

        {item.status === 'PUBLISHED' && daysLeft !== null && (
          <View style={[styles.daysRow, daysLeft <= 7 && styles.daysRowUrgent]}>
            <Ionicons
              name="alarm-outline"
              size={15}
              color={daysLeft <= 7 ? '#DC2626' : '#4338CA'}
            />

            <Text style={[styles.daysText, daysLeft <= 7 && styles.daysTextUrgent]}>
              {daysLeft > 0 ? `Còn ${daysLeft} ngày` : 'Hết hạn hôm nay'}
            </Text>
          </View>
        )}

        <View style={styles.actionRow}>
          <ActionBtn
            icon="eye-outline"
            label="Chi tiết"
            primary
            onPress={() => onViewDetail(item)}
          />

          {item.status === 'PUBLISHED' && (
            <ActionBtn
              icon="create-outline"
              label="Chỉnh sửa"
              onPress={() => onEdit(item)}
            />
          )}

          {item.status === 'EXPIRED' && (
            <ActionBtn
              icon="refresh-outline"
              label="Đăng lại"
              onPress={() => onRepublish(item)}
            />
          )}

          {item.status === 'DRAFT' && (
            <ActionBtn
              icon="document-outline"
              label="Tiếp tục"
              onPress={() => onEdit(item)}
            />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function SummaryBar({ jobs }) {
  const counts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const items = [
    { label: 'Tổng', value: jobs.length, color: '#4F46E5' },
    { label: 'Hiển thị', value: counts.PUBLISHED || 0, color: '#16A34A' },
    { label: 'Nháp', value: counts.DRAFT || 0, color: '#6B7280' },
    { label: 'Hết hạn', value: counts.EXPIRED || 0, color: '#DC2626' },
  ];

  return (
    <View style={styles.summaryBar}>
      {items.map((item) => (
        <View key={item.label} style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: item.color }]}>
            {item.value}
          </Text>

          <Text style={styles.summaryLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

function FilterTabs({ active, onChange, jobs }) {
  const counts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <View style={styles.tabsWrapper}>
      <FlatList
        horizontal
        data={FILTER_TABS}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.tabsContainer}
        renderItem={({ item }) => {
          const isActive = item.key === active;
          const count = item.key === 'ALL' ? jobs.length : counts[item.key] || 0;

          return (
            <TouchableOpacity
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onChange(item.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {item.label}
              </Text>

              {count > 0 && (
                <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
                  <Text style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default function JobManagementScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const fetchJobs = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setError(null);
      const response = await getMyJobsApi();
      setJobs(response);
    } catch (err) {
      console.log(err);
      setError('Không thể tải danh sách tuyển dụng');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = activeFilter === 'ALL'
    ? jobs
    : jobs.filter((job) => job.status === activeFilter);

  const handleViewDetail = (job) => {
    navigation.navigate('EmployerJobDetailScreen', { jobId: job.id });
  };

  const handleEdit = (job) => {
    navigation.navigate('UpdateJobScreen', { jobId: job.id });
  };

  const handleRepublish = (job) => {
    console.log('republish', job.id);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={56} color="#EF4444" />

          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity style={styles.retryBtn} onPress={() => fetchJobs()}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <SummaryBar jobs={jobs} />

          <FilterTabs
            active={activeFilter}
            onChange={setActiveFilter}
            jobs={jobs}
          />

          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <JobCard
                item={item}
                index={index}
                onViewDetail={handleViewDetail}
                onEdit={handleEdit}
                onRepublish={handleRepublish}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchJobs(true)}
                colors={['#4F46E5']}
                tintColor="#4F46E5"
              />
            }
            ListEmptyComponent={
              <View style={styles.empty}>
                <Ionicons
                  name="briefcase-outline"
                  size={64}
                  color="#9CA3AF"
                />

                <Text style={styles.emptyTitle}>
                  Không có tin tuyển dụng
                </Text>

                <Text style={styles.emptyDesc}>
                  {activeFilter === 'ALL'
                    ? 'Bạn chưa tạo tin tuyển dụng nào'
                    : 'Không có tin nào trong danh mục này'}
                </Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
}