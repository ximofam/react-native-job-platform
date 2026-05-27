import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal, ScrollView,
  ActivityIndicator, RefreshControl, StatusBar, Animated, Alert, Linking, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  STATUS_CONFIG, ALL_STATUSES,
  formatDate, formatSalary,
  StatusBadge, InfoRow, EmptyState, sharedStyles as S,
} from '../../utils/applicationUtils';
import { getApplicationApi, getApplicationsApi } from '../../apis/services/applicationService';
import s from '../../styles/applicationStyles'


const CandidateCard = ({ item, onPress, fadeAnim }) => (
  <Animated.View style={{ opacity: fadeAnim }}>
    <TouchableOpacity style={S.card} onPress={() => onPress(item)} activeOpacity={0.75}>
      <View style={S.cardHeader}>
        <View style={S.cardTitleWrap}>
          <Text style={S.cardTitle} numberOfLines={1}>{item.job_title}</Text>
          {item.job?.company?.name && (
            <View style={s.companyRow}>
              <Ionicons name="business-outline" size={13} color="#10B981" />
              <Text style={s.companyName}>{item.job.company.name}</Text>
            </View>
          )}
        </View>
        <StatusBadge status={item.status} size="sm" />
      </View>

      <View style={S.metaItem}>
        <Ionicons name="cash-outline" size={15} color="#10B981" />
        <Text style={S.metaText}>{formatSalary(item.expected_salary)}</Text>
      </View>

      <View style={[S.metaItem, { marginTop: 6 }]}>
        <Ionicons name="calendar-outline" size={15} color="#3B82F6" />
        <Text style={S.metaText}>{formatDate(item.applied_at)}</Text>
      </View>

      <View style={S.cardFooter}>
        <View style={s.cardActionRow}>
          <Ionicons name="eye-outline" size={14} color="#10B981" />
          <Text style={[S.cardAction, { color: '#10B981' }]}>Xem chi tiết</Text>
          <Ionicons name="chevron-forward-outline" size={14} color="#10B981" />
        </View>
      </View>
    </TouchableOpacity>
  </Animated.View>
);

const CandidateDetailModal = ({ visible, application, onClose }) => {
  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : 600,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [visible]);

  const handleOpenCV = async () => {
    const url = application?.cv_file_url;
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Lỗi', 'Không thể mở file CV.');
    }
  };

  if (!application) return null;
  const cfg = STATUS_CONFIG[application.status];
  const job = application.job;
  const salary = job?.salary;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={S.overlay}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        <Animated.View style={[S.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={S.sheetHandle} />

          <View style={S.sheetHeader}>
            <Text style={S.sheetTitle}>Chi tiết đơn ứng tuyển</Text>
            <TouchableOpacity onPress={onClose} style={S.closeBtn}>
              <Ionicons name="close" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Status banner */}
            <View style={[S.statusBanner, { backgroundColor: cfg?.bg, flexDirection: 'row', justifyContent: 'center', gap: 8 }]}>
              <Ionicons name={STATUS_CONFIG[application.status].icon} size={18} color={cfg?.color} />
              <Text style={[S.statusBannerText, { color: cfg?.color }]}>{cfg?.label}</Text>
            </View>

            {/* Thông tin đơn ứng tuyển */}
            <Text style={s.sectionTitle}>Thông tin ứng tuyển</Text>
            <View style={S.infoSection}>
              <InfoRow
                icon={<Ionicons name="document-text-outline" size={18} color="#6366F1" />}
                label="Mã đơn"
                value={`#${application.id}`}
              />
              <InfoRow
                icon={<Ionicons name="cash-outline" size={18} color="#10B981" />}
                label="Lương kỳ vọng"
                value={formatSalary(application.expected_salary)}
              />
              <InfoRow
                icon={<Ionicons name="calendar-outline" size={18} color="#3B82F6" />}
                label="Ngày ứng tuyển"
                value={formatDate(application.applied_at)}
              />
            </View>

            {/* Thông tin công việc */}
            {job && (
              <>
                <Text style={s.sectionTitle}>Thông tin công việc</Text>
                <View style={S.infoSection}>
                  <InfoRow
                    icon={<Ionicons name="briefcase-outline" size={18} color="#6366F1" />}
                    label="Vị trí"
                    value={job.title}
                  />
                  <InfoRow
                    icon={<Ionicons name="business-outline" size={18} color="#6366F1" />}
                    label="Công ty"
                    value={job.company?.name ?? '—'}
                  />
                  <InfoRow
                    icon={<Ionicons name="location-outline" size={18} color="#F59E0B" />}
                    label="Địa chỉ"
                    value={job.address ?? '—'}
                  />
                  {salary && (
                    <InfoRow
                      icon={<Ionicons name="wallet-outline" size={18} color="#10B981" />}
                      label="Mức lương"
                      value={salary.display}
                    />
                  )}
                  <InfoRow
                    icon={<Ionicons name="time-outline" size={18} color="#3B82F6" />}
                    label="Ngày đăng"
                    value={formatDate(job.published_at)}
                  />
                </View>
              </>
            )}

            {/* Nút xem CV */}
            {application.cv_file_url && (
              <TouchableOpacity style={s.cvBtn} onPress={handleOpenCV} activeOpacity={0.8}>
                <View style={s.cvBtnIconWrap}>
                  <Ionicons name="document-attach-outline" size={24} color="#10B981" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.cvBtnTitle}>Xem CV đã nộp</Text>
                  <Text style={s.cvBtnSub}>Mở file PDF</Text>
                </View>
                <Ionicons name="open-outline" size={18} color="#10B981" />
              </TouchableOpacity>
            )}

            {/* Readonly note */}
            <View style={s.readonlyNote}>
              <Ionicons name="information-circle-outline" size={16} color="#166534" />
              <Text style={s.readonlyText}>
                Trạng thái do nhà tuyển dụng cập nhật. Bạn không thể chỉnh sửa.
              </Text>
            </View>

            <View style={{ height: 32 }} />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function CandidateApplicationScreen() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchList = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const res = await getApplicationsApi();
      setApplications(res);
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    } catch {
      Alert.alert('Lỗi', 'Không thể tải danh sách đơn ứng tuyển.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchList(); }, []);

  const handleCardPress = async (item) => {
    setDetailLoading(true);
    setModalVisible(true);
    try {
      const res = await getApplicationApi(item.id);
      setSelectedApp(res);
    } catch {
      Alert.alert('Lỗi', 'Không thể tải chi tiết đơn.');
      setModalVisible(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const filtered = filterStatus === 'ALL'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  return (
    <View style={S.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={S.header}>
        <View>
          <Text style={S.headerTitle}>Đơn ứng tuyển của tôi</Text>
          <View style={s.headerSubRow}>
            <Ionicons name="person-outline" size={13} color="#64748B" />
            <Text style={S.headerSub}>Ứng viên • {filtered.length} đơn</Text>
          </View>
        </View>
        <View style={[S.roleBadge, S.roleBadgeCandidate]}>
          <Text style={[S.roleBadgeText, { color: '#166534' }]}>CANDIDATE</Text>
        </View>
      </View>


      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={S.filterBar}
        contentContainerStyle={S.filterBarContent}
      >
        {['ALL', ...ALL_STATUSES].map((f) => {
          const cfg = f === 'ALL' ? null : STATUS_CONFIG[f];
          const active = filterStatus === f;
          return (
            <TouchableOpacity
              key={f}
              style={[S.filterTab, active && S.filterTabActive, active && cfg && { borderColor: cfg.color, backgroundColor: cfg.bg }]}
              onPress={() => setFilterStatus(f)}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                {f === 'ALL'
                  ? <Ionicons name="list-outline" size={13} color={active ? '#6366F1' : '#64748B'} />
                  : <Ionicons name={STATUS_CONFIG[f].icon} size={13} color={active ? cfg.color : '#64748B'} />
                }
                <Text style={[S.filterTabText, active && cfg && { color: cfg.color }, active && f === 'ALL' && { color: '#6366F1' }]}>
                  {f === 'ALL' ? 'Tất cả' : cfg.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>


      {loading ? (
        <View style={S.loadingWrap}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={S.loadingText}>Đang tải...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CandidateCard item={item} onPress={handleCardPress} fadeAnim={fadeAnim} />
          )}
          contentContainerStyle={S.listContent}
          ListEmptyComponent={<EmptyState />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => fetchList(true)} tintColor="#10B981" colors={['#10B981']} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}


      {detailLoading && modalVisible && (
        <Modal visible transparent>
          <View style={[S.overlay, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={S.detailLoader}>
              <ActivityIndicator size="large" color="#10B981" />
              <Text style={S.loadingText}>Đang tải chi tiết...</Text>
            </View>
          </View>
        </Modal>
      )}

      <CandidateDetailModal
        visible={modalVisible && !detailLoading}
        application={selectedApp}
        onClose={() => { setModalVisible(false); setSelectedApp(null); }}
      />
    </View>
  );
}
