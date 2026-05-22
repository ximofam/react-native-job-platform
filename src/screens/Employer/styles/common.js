import { StyleSheet, Platform, StatusBar } from 'react-native';

const COLORS = {
  bg0: '#060813',
  bg1: '#0C0F1E',
  bg2: '#111527',
  surface: '#161A2E',
  surfaceHigh: '#1E2340',
  border: 'rgba(255,255,255,0.07)',
  borderHigh: 'rgba(167,139,250,0.25)',
  purple: '#A78BFA',
  purpleDim: 'rgba(167,139,250,0.15)',
  purpleDark: '#7C3AED',
  green: '#34D399',
  greenDim: 'rgba(52,211,153,0.12)',
  amber: '#FCD34D',
  amberDim: 'rgba(252,211,77,0.12)',
  red: '#F87171',
  redDim: 'rgba(248,113,113,0.12)',
  blue: '#60A5FA',
  blueDim: 'rgba(96,165,250,0.12)',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
};

const common = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 110,
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 4,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  avatarFallback: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  greetingText: {
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 1,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.redDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.2)',
  },

  // Stats row
  statsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },

  // Section row
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    color: COLORS.purple,
    fontWeight: '600',
  },

  // Page title
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },

  // Card base
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },

  // Input
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 6,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.bg2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: COLORS.textPrimary,
    fontSize: 15,
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: COLORS.purple,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
});

export { COLORS };
export default common;