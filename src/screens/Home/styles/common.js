import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContainer: { paddingHorizontal: 24, paddingVertical: 32 },

  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 16 },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  greetingText: { color: '#94A3B8', fontSize: 13 },
  nameText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700', marginTop: 2 },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(248,113,113,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  statLabel: { color: '#94A3B8', fontSize: 12, textAlign: 'center' },

  // Section
  sectionTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: { color: '#60A5FA', fontSize: 14, fontWeight: '600' },
});