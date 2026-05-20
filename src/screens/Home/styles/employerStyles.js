import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Post job banner
  postJobBanner: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  postJobBannerTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 4 },
  postJobBannerSub: { color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 20 },
  postJobBannerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Job card
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  jobCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  jobTitle: { color: '#0F172A', fontSize: 15, fontWeight: '700', flex: 1, marginRight: 10 },
  jobStatusBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  badgeActive: { backgroundColor: '#D1FAE5' },
  badgeClosed: { backgroundColor: '#F1F5F9' },
  jobStatusText: { fontSize: 12, fontWeight: '700' },
  badgeActiveText: { color: '#059669' },
  badgeClosedText: { color: '#94A3B8' },
  jobCardBottom: { flexDirection: 'row', alignItems: 'center' },
  jobMeta: { flexDirection: 'row', alignItems: 'center', marginRight: 14 },
  jobMetaText: { color: '#94A3B8', fontSize: 13, marginLeft: 4 },
  jobDetailBtn: {
    marginLeft: 'auto',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  jobDetailBtnText: { color: '#2563EB', fontSize: 13, fontWeight: '700' },

  // Employer avatar fallback color override
  avatarFallbackEmployer: { backgroundColor: '#7C3AED' },
});