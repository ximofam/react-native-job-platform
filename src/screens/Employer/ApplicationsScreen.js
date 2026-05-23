import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal, ScrollView,
  ActivityIndicator, RefreshControl, StatusBar, Animated, Alert, StyleSheet, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  STATUS_CONFIG, ALL_STATUSES,
  formatDate, formatSalary,
  StatusBadge, InfoRow, EmptyState, sharedStyles as S,
} from '../../utils/applicationUtils';
import { getApplicationApi, getApplicationsApi, updateApplicationStatusApi } from '../../apis/services/applicationService';
import s from '../../styles/applicationStyles'

const EmployerCard = ({ item, onPress, fadeAnim }) => (
  <Animated.View style={{ opacity: fadeAnim }}>
    <TouchableOpacity style={S.card} onPress={() => onPress(item)} activeOpacity={0.75}>
      <View style={S.cardHeader}>
        <View style={S.cardTitleWrap}>
          <Text style={S.cardTitle} numberOfLines={1}>{item.job_title}</Text>
          <View style={s.candidateRow}>
            <Ionicons name="person-outline" size={13} color="#6366F1" />
            <Text style={s.candidateName}>
              {item.candidate
                ? `${item.candidate.first_name} ${item.candidate.last_name}`.trim()
                : '—'}
            </Text>
          </View>
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
          <Ionicons name="create-outline" size={14} color="#6366F1" />
          <Text style={[S.cardAction, { color: '#6366F1' }]}>Xem & Chỉnh sửa</Text>
          <Ionicons name="chevron-forward-outline" size={14} color="#6366F1" />
        </View>
      </View>
    </TouchableOpacity>
  </Animated.View>
);

// ─── StatusEditor ──────────────────────────────────────────────────────────
const STATUS_ICONS = {
  PENDING: { lib: 'Ionicons', name: 'time-outline' },
  REVIEWING: { lib: 'Ionicons', name: 'search-outline' },
  ACCEPTED: { lib: 'Ionicons', name: 'checkmark-circle-outline' },
  REJECTED: { lib: 'Ionicons', name: 'close-circle-outline' },
};

const StatusEditor = ({ selectedStatus, onSelect }) => (
  <View style={s.editorSection}>
    <View style={s.editorLabelRow}>
      <Ionicons name="create-outline" size={16} color="#0F172A" />
      <Text style={s.editorLabel}>Cập nhật trạng thái</Text>
    </View>
    <View style={s.statusGrid}>
      {ALL_STATUSES.map((s) => {
        const cfg = STATUS_CONFIG[s];
        const iconCfg = STATUS_ICONS[s];
        const isSelected = selectedStatus === s;
        return (
          <TouchableOpacity
            key={s}
            style={[s.statusOption, { borderColor: cfg.color }, isSelected && { backgroundColor: cfg.bg }]}
            onPress={() => onSelect(s)}
            activeOpacity={0.7}
          >
            <Ionicons name={iconCfg.name} size={16} color={cfg.color} />
            <Text style={[s.statusOptionLabel, { color: cfg.color }]}>{cfg.label}</Text>
            {isSelected && <View style={[s.selectedDot, { backgroundColor: cfg.color }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

// ─── EmployerDetailModal ───────────────────────────────────────────────────
const EmployerDetailModal = ({ visible, application, onClose, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [updating, setUpdating] = useState(false);
  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (visible) setSelectedStatus(application?.status || null);
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : 600,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [visible]);

  const handleUpdate = async () => {
    if (!selectedStatus || selectedStatus === application?.status) return;
    setUpdating(true);
    try {
      await updateApplicationStatusApi(application.id, selectedStatus);
      onUpdateStatus(application.id, selectedStatus);
      Alert.alert('Thành công', `Đã cập nhật thành "${STATUS_CONFIG[selectedStatus].label}"`);
      onClose();
    } catch {
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái. Thử lại sau.');
    } finally {
      setUpdating(false);
    }
  };

  const candidateName = application
    ? `${application.candidate?.first_name ?? ''} ${application.candidate?.last_name ?? ''}`.trim()
    : '';
  const candidateId = application?.candidate?.id;
  const cvUrl = application?.cv_file_url;

  const handleOpenCV = async () => {
    if (!cvUrl) return;
    const supported = await Linking.canOpenURL(cvUrl);
    if (supported) {
      await Linking.openURL(cvUrl);
    } else {
      Alert.alert('Lỗi', 'Không thể mở file CV.');
    }
  };

  if (!application) return null;
  const cfg = STATUS_CONFIG[application.status];
  const hasChanged = selectedStatus && selectedStatus !== application.status;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={S.overlay}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        <Animated.View style={[S.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={S.sheetHandle} />

          <View style={S.sheetHeader}>
            <Text style={S.sheetTitle}>Chi tiết & Chỉnh sửa</Text>
            <TouchableOpacity onPress={onClose} style={S.closeBtn}>
              <Ionicons name="close" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Status banner */}
            <View style={[S.statusBanner, { backgroundColor: cfg?.bg }]}>
              <Ionicons name={STATUS_ICONS[application.status]?.name} size={18} color={cfg?.color} />
              <Text style={[S.statusBannerText, { color: cfg?.color, marginLeft: 8 }]}>{cfg?.label}</Text>
            </View>

            {/* Info rows */}
            <View style={S.infoSection}>
              <InfoRow icon={<Ionicons name="briefcase-outline" size={18} color="#6366F1" />} label="Vị trí" value={application.job_title} />
              <InfoRow icon={<Ionicons name="person-outline" size={18} color="#6366F1" />} label="Ứng viên" value={candidateName} />
              <InfoRow icon={<Ionicons name="card-outline" size={18} color="#6366F1" />} label="ID ứng viên" value={`#${candidateId}`} />
              <InfoRow icon={<Ionicons name="cash-outline" size={18} color="#10B981" />} label="Lương kỳ vọng" value={formatSalary(application.expected_salary)} />
              <InfoRow icon={<Ionicons name="calendar-outline" size={18} color="#3B82F6" />} label="Ngày ứng tuyển" value={formatDate(application.applied_at)} />
              <InfoRow icon={<Ionicons name="document-text-outline" size={18} color="#F59E0B" />} label="Mã đơn" value={`#${application.id}`} />
            </View>

            {/* CV button */}
            {cvUrl && (
              <TouchableOpacity style={s.cvBtn} onPress={handleOpenCV} activeOpacity={0.8}>
                <View style={s.cvBtnIconWrap}>
                  <Ionicons name="document-attach-outline" size={24} color="#6366F1" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.cvBtnTitle}>Xem CV ứng viên</Text>
                  <Text style={s.cvBtnSub}>Mở file PDF</Text>
                </View>
                <Ionicons name="open-outline" size={18} color="#6366F1" />
              </TouchableOpacity>
            )}

            <StatusEditor
              currentStatus={application.status}
              selectedStatus={selectedStatus}
              onSelect={setSelectedStatus}
            />

            <TouchableOpacity
              style={[s.updateBtn, (!hasChanged || updating) && s.updateBtnDisabled]}
              onPress={handleUpdate}
              disabled={!hasChanged || updating}
              activeOpacity={0.8}
            >
              {updating ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <View style={s.updateBtnInner}>
                  <Ionicons name="save-outline" size={18} color="#fff" />
                  <Text style={s.updateBtnText}>Lưu thay đổi</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={{ height: 32 }} />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ─── EmployerApplicationScreen ─────────────────────────────────────────────
export default function EmployerApplicationScreen() {
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

  const handleUpdateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const filtered = filterStatus === 'ALL'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  return (
    <View style={S.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header */}
      <View style={S.header}>
        <View>
          <Text style={S.headerTitle}>Quản lý đơn ứng tuyển</Text>
          <View style={s.headerSubRow}>
            <Ionicons name="business-outline" size={13} color="#64748B" />
            <Text style={S.headerSub}>Nhà tuyển dụng • {filtered.length} đơn</Text>
          </View>
        </View>
        <View style={[S.roleBadge, S.roleBadgeEmployer]}>
          <Text style={S.roleBadgeText}>EMPLOYER</Text>
        </View>
      </View>

      {/* Filter tabs */}
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
              {f !== 'ALL' && (
                <Ionicons
                  name={STATUS_ICONS[f]?.name}
                  size={13}
                  color={active ? cfg.color : '#64748B'}
                />
              )}
              {f === 'ALL' && <Ionicons name="list-outline" size={13} color={active ? '#6366F1' : '#64748B'} />}
              <Text style={[S.filterTabText, active && cfg && { color: cfg.color }, active && f === 'ALL' && { color: '#6366F1' }]}>
                {f === 'ALL' ? ' Tất cả' : ` ${cfg.label}`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* List */}
      {loading ? (
        <View style={S.loadingWrap}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={S.loadingText}>Đang tải...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <EmployerCard item={item} onPress={handleCardPress} fadeAnim={fadeAnim} />
          )}
          contentContainerStyle={S.listContent}
          ListEmptyComponent={<EmptyState />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => fetchList(true)} tintColor="#6366F1" colors={['#6366F1']} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Detail loading overlay */}
      {detailLoading && modalVisible && (
        <Modal visible transparent>
          <View style={[S.overlay, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={S.detailLoader}>
              <ActivityIndicator size="large" color="#6366F1" />
              <Text style={S.loadingText}>Đang tải chi tiết...</Text>
            </View>
          </View>
        </Modal>
      )}

      <EmployerDetailModal
        visible={modalVisible && !detailLoading}
        application={selectedApp}
        onClose={() => { setModalVisible(false); setSelectedApp(null); }}
        onUpdateStatus={handleUpdateStatus}
      />
    </View>
  );
}
