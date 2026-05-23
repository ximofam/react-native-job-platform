import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },


  scrollContainerSearch: { paddingHorizontal: 24, paddingBottom: 32 },

  header: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24 },
  headerTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 4 },
  headerSub: { color: '#94A3B8', fontSize: 15 },

  searchWrapper: { marginBottom: 10 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
  },
  searchInput: { flex: 1, marginLeft: 10, color: '#0F172A', fontSize: 15 },
  searchBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 10,
  },
  searchBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },

  locationRow: { marginBottom: 10 },

  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  chipActive: { backgroundColor: '#2563EB' },
  chipText: { color: '#94A3B8', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: '#64748B', fontSize: 14 },

  emptyContainer: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 32 },
  emptyIconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  emptySub: { color: '#64748B', fontSize: 14, lineHeight: 22, textAlign: 'center' },

  resultCount: { color: '#64748B', fontSize: 13, marginBottom: 16 },

  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  jobCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  companyLogoImg: {
    width: 50,
    height: 50,
    borderRadius: 14,
    marginRight: 14,
    backgroundColor: '#F1F5F9',
  },
  companyLogoText: { color: '#2563EB', fontSize: 20, fontWeight: '800' },
  jobInfo: { flex: 1 },
  jobTitle: { color: '#0F172A', fontSize: 15, fontWeight: '700', marginBottom: 4, lineHeight: 22 },
  companyName: { color: '#64748B', fontSize: 13 },
  bookmarkBtn: { padding: 4 },

  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 4 },
  addressText: { color: '#94A3B8', fontSize: 12, flex: 1 },

  jobCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobSalary: { color: '#2563EB', fontSize: 13, fontWeight: '700', flex: 1, marginRight: 8 },
  applyBtn: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  applyBtnText: { color: '#2563EB', fontSize: 13, fontWeight: '700' },

  loadMoreWrapper: { paddingVertical: 20, alignItems: 'center' },
  loadMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(59,130,246,0.1)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.3)',
    alignSelf: 'center',
  },
  loadMoreText: { color: '#3B82F6', fontSize: 14, fontWeight: '700' },
  endText: { color: '#475569', fontSize: 13, textAlign: 'center', paddingVertical: 20 },


  scrollContainerProfile: { paddingBottom: 40 },

  heroBg: { paddingTop: 40, paddingBottom: 32, paddingHorizontal: 24, alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginBottom: 16 },
  avatar: { width: 90, height: 90, borderRadius: 28 },
  avatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: { color: '#FFFFFF', fontSize: 34, fontWeight: '800' },
  avatarEditBtn: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  profileName: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', marginBottom: 4 },
  profileEmail: { color: '#94A3B8', fontSize: 14 },

  logoutBtn: {
    position: 'absolute',
    top: 44,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248,113,113,0.1)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  logoutText: { color: '#F87171', fontSize: 13, fontWeight: '700', marginLeft: 6 },

  body: { paddingHorizontal: 24, paddingTop: 8 },

  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginLeft: 8 },
  editBtn: {
    backgroundColor: 'rgba(37,99,235,0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editBtnText: { color: '#60A5FA', fontSize: 12, fontWeight: '700' },

  bioText: { color: '#CBD5E1', fontSize: 14, lineHeight: 22 },
  bioEmpty: { color: '#475569', fontSize: 14, fontStyle: 'italic' },

  timelineItem: { flexDirection: 'row', marginBottom: 16 },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    marginTop: 5,
    marginRight: 14,
  },
  timelineContent: { flex: 1 },
  timelineTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginBottom: 2 },
  timelineSub: { color: '#94A3B8', fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: '#475569', fontSize: 12 },

  cardEmpty: { color: '#475569', fontSize: 14, fontStyle: 'italic', textAlign: 'center', paddingVertical: 8 },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 12 },
});