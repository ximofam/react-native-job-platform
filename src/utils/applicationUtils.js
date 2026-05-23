import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export const STATUS_CONFIG = {
  PENDING: { label: 'Chờ duyệt', color: '#F59E0B', bg: '#FEF3C7', icon: 'time-outline', },
  REVIEWING: { label: 'Đang xét', color: '#3B82F6', bg: '#DBEAFE', icon: 'search-outline', },
  ACCEPTED: { label: 'Chấp nhận', color: '#10B981', bg: '#D1FAE5', icon: 'checkmark-circle-outline', },
  REJECTED: { label: 'Từ chối', color: '#EF4444', bg: '#FEE2E2', icon: 'close-circle-outline', },
};

export const ALL_STATUSES = Object.keys(STATUS_CONFIG);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

export const formatSalary = (n) =>
  n ? `$${Number(n).toLocaleString()}` : 'Thỏa thuận';

export const StatusBadge = ({ status, size = 'md' }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

  return (
    <View style={[sharedStyles.badge, { backgroundColor: cfg.bg }, size === 'sm' && sharedStyles.badgeSm,]}>
      <Ionicons name={cfg.icon} size={size === 'sm' ? 13 : 15} color={cfg.color} />
      <Text style={[sharedStyles.badgeText, { color: cfg.color }, size === 'sm' && sharedStyles.badgeTextSm,]}>
        {cfg.label}
      </Text>
    </View>
  );
};

export const InfoRow = ({ icon, label, value }) => (
  <View style={sharedStyles.infoRow}>
    <View style={sharedStyles.infoIconWrap}>{icon}</View>
    <View style={sharedStyles.infoContent}>
      <Text style={sharedStyles.infoLabel}>{label}</Text>
      <Text style={sharedStyles.infoValue}>{value ?? '—'}</Text>
    </View>
  </View>
);

export const EmptyState = () => (
  <View style={sharedStyles.emptyWrap}>
    <Text style={sharedStyles.emptyIcon}>📭</Text>
    <Text style={sharedStyles.emptyTitle}>Chưa có đơn ứng tuyển</Text>
    <Text style={sharedStyles.emptySub}>Danh sách trống hoặc không có dữ liệu phù hợp.</Text>
  </View>
);

export const sharedStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 48 : 56,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#0F172A', letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  roleBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  roleBadgeCandidate: { backgroundColor: '#DCFCE7' },
  roleBadgeEmployer: { backgroundColor: '#EDE9FE' },
  roleBadgeText: { fontSize: 11, fontWeight: '700', color: '#4C1D95', letterSpacing: 0.5 },

  filterBar: { maxHeight: 52, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  filterBarContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8, flexDirection: 'row' },
  filterTab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' },
  filterTabActive: { borderWidth: 1.5 },
  filterTabText: { fontSize: 13, fontWeight: '500', color: '#64748B' },

  listContent: { padding: 16, gap: 12, paddingBottom: 32 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  cardTitleWrap: { flex: 1, marginRight: 10 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', lineHeight: 22 },
  cardMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaIcon: { fontSize: 13 },
  metaText: { fontSize: 13, color: '#475569', fontWeight: '500' },
  cardFooter: { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 10 },
  cardAction: { fontSize: 13, fontWeight: '600' },

  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeSm: { paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 13, fontWeight: '600' },
  badgeTextSm: { fontSize: 12 },

  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 20,
  },
  sheetHandle: { width: 36, height: 4, backgroundColor: '#CBD5E1', borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { fontSize: 14, color: '#64748B', fontWeight: '600' },

  statusBanner: { borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginBottom: 20 },
  statusBannerText: { fontSize: 16, fontWeight: '700' },

  infoSection: { gap: 4, marginBottom: 24 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  infoIconWrap: { width: 32, justifyContent: 'center', alignItems: 'flex-start' },
  infoIcon: { fontSize: 18, width: 32 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '500', marginBottom: 2 },
  infoValue: { fontSize: 15, color: '#0F172A', fontWeight: '600' },

  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { fontSize: 14, color: '#64748B', marginTop: 8 },
  emptyWrap: { alignItems: 'center', paddingTop: 80, gap: 8 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: '#334155' },
  emptySub: { fontSize: 14, color: '#94A3B8', textAlign: 'center', paddingHorizontal: 40 },

  detailLoader: { backgroundColor: '#fff', borderRadius: 16, padding: 32, alignItems: 'center', gap: 12, minWidth: 180 },
});