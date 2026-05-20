import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContainer: { paddingBottom: 40 },

  // Hero section
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

  // Logout
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

  // Body
  body: { paddingHorizontal: 24, paddingTop: 8 },

  // Card section
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

  // Bio
  bioText: { color: '#CBD5E1', fontSize: 14, lineHeight: 22 },
  bioEmpty: { color: '#475569', fontSize: 14, fontStyle: 'italic' },

  // Education / Experience item
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

  // Empty state inside card
  cardEmpty: { color: '#475569', fontSize: 14, fontStyle: 'italic', textAlign: 'center', paddingVertical: 8 },

  // Divider
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 12 },
});