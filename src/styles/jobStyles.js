import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 10,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 140,
  },

  companyCard: {
    backgroundColor: '#111827',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },

  companyLogo: {
    width: 74,
    height: 74,
    borderRadius: 22,
    marginBottom: 18,
  },

  companyLogoFallback: {
    width: 74,
    height: 74,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  companyLogoText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  jobTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },

  companyName: {
    color: '#94A3B8',
    fontSize: 15,
    marginBottom: 18,
  },

  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },

  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },

  metaText: {
    color: '#E2E8F0',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 13,
  },

  section: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  infoText: {
    color: '#CBD5E1',
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },

  descriptionText: {
    color: '#CBD5E1',
    lineHeight: 26,
    fontSize: 15,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#020617',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },

  saveBtn: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  applyBtn: {
    flex: 1,
  },

  applyGradient: {
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  applyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  searchWrapper: {
    marginBottom: 10,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#0F172A',
    fontSize: 15,
  },

  searchBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 10,
  },

  searchBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  locationRow: {
    marginBottom: 10,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  chipActive: {
    backgroundColor: '#2563EB',
  },

  chipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },

  chipTextActive: {
    color: '#FFFFFF',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  loadingText: {
    color: '#64748B',
    fontSize: 14,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },

  emptyIconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },

  emptySub: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  resultCount: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 16,
  },

  loadMoreWrapper: {
    paddingVertical: 20,
    alignItems: 'center',
  },

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

  loadMoreText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '700',
  },

  endText: {
    color: '#475569',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 20,
  },
});