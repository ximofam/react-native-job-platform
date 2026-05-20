import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Hero
  heroContainer: { marginBottom: 28 },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 44,
    marginBottom: 12,
  },
  heroDescription: { color: '#CBD5E1', fontSize: 15, lineHeight: 24 },

  // Action grid
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  actionCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: { color: '#E2E8F0', fontSize: 14, fontWeight: '600' },

  // Profile card
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  profileCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  profileCardTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginLeft: 8 },
  profileCardSub: { color: '#94A3B8', fontSize: 13, lineHeight: 20, marginBottom: 16 },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    marginBottom: 8,
  },
  progressBarFill: { height: 8, backgroundColor: '#3B82F6', borderRadius: 8 },
  progressText: { color: '#94A3B8', fontSize: 12, marginBottom: 16 },
  completeProfileBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  completeProfileBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});