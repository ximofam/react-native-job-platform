import { StyleSheet, Platform, StatusBar } from 'react-native';

const INDIGO = '#6366F1';
const INDIGO_DARK = '#1E1B4B';

export const COLORS = {
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

export default StyleSheet.create({
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

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },

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

  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filterChipActive: {
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purpleDim,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.purple,
  },

  appCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  appCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  appAvatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
  },
  appName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  appPosition: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  appDate: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  skillChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.bg2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skillChipText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  stepDotActive: {
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purpleDim,
  },
  stepDotDone: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.greenDim,
  },
  stepDotText: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted },
  stepDotTextActive: { color: COLORS.purple },
  stepLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: '500', textAlign: 'center' },
  stepLabelActive: { color: COLORS.purple },
  stepLine: { height: 2, flex: 0.3, backgroundColor: COLORS.border, marginBottom: 20 },
  stepLineDone: { backgroundColor: COLORS.green },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg2,
  },
  tagActive: { borderColor: COLORS.purple, backgroundColor: COLORS.purpleDim },
  tagText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  tagTextActive: { color: COLORS.purple },

  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 16,
  },
  selectBtnActive: { borderColor: COLORS.purple },
  selectBtnText: { flex: 1, fontSize: 15, color: COLORS.textMuted },
  selectBtnTextFilled: { color: COLORS.textPrimary },

  dropdownBackdrop: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 10,
  },
  dropdownWrapper: {
    backgroundColor: COLORS.surfaceHigh,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: -10,
    marginBottom: 16,
    overflow: 'hidden',
    zIndex: 20,
    maxHeight: 220,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemActive: { backgroundColor: COLORS.purpleDim },
  dropdownItemText: { fontSize: 14, color: COLORS.textPrimary },
  dropdownItemTextActive: { color: COLORS.purple, fontWeight: '600' },

  addressTabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg2,
    borderRadius: 12,
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  addressTabActive: { backgroundColor: COLORS.purpleDark },
  addressTabText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  addressTabTextActive: { color: '#FFF' },

  locationCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg2,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationCardSelected: {
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purpleDim,
  },
  locationCardIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCardLabel: { fontSize: 11, color: COLORS.textMuted, marginBottom: 2 },
  locationCardAddress: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '500', flex: 1 },

  salaryRow: { flexDirection: 'row', gap: 10 },
  salaryHalf: { flex: 1 },

  navRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  navBtnBack: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  navBtnNext: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: COLORS.purpleDark,
  },
  navBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  navBtnTextNext: { fontSize: 15, fontWeight: '700', color: '#FFF' },

  reviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewRowLast: { borderBottomWidth: 0, paddingBottom: 0 },
  reviewLabel: { fontSize: 11, color: COLORS.textMuted, width: 90 },
  reviewValue: { flex: 1, fontSize: 13, color: COLORS.textPrimary, fontWeight: '500' },

  packageCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
  },
  packageCardSelected: {
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purpleDim,
  },
  packageCardPriority: {
    borderColor: COLORS.amber,
    backgroundColor: 'rgba(252,211,77,0.06)',
  },
  packageCardPrioritySelected: {
    borderColor: COLORS.amber,
    backgroundColor: COLORS.amberDim,
  },
  packageBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 10,
  },
  packageBadgeText: { fontSize: 11, fontWeight: '700' },
  packageTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 4 },
  packagePrice: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  packageFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 5,
  },
  packageFeatureText: { fontSize: 13, color: COLORS.textSecondary },
  packageSelectIndicator: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageSelectIndicatorActive: { borderColor: COLORS.purple, backgroundColor: COLORS.purple },
  packageSelectIndicatorAmber: { borderColor: COLORS.amber, backgroundColor: COLORS.amber },

  submitBtn: { borderRadius: 14, overflow: 'hidden', marginTop: 4 },
  submitBtnInner: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF', letterSpacing: 0.3 },
  submitBtnLoading: { opacity: 0.7 },

  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  successIconRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.greenDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(52,211,153,0.3)',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  successSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  successBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: COLORS.purpleDark,
    alignItems: 'center',
  },
  successBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF' },

  heroBanner: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroBannerInner: {
    padding: 20,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  companyLogoFallback: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: 'rgba(167,139,250,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(167,139,250,0.3)',
  },
  companyLogoText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.purple,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  companyTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 14,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  heroBadgeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },

  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  infoCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },

  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },

  logoutCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    backgroundColor: 'rgba(248,113,113,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.25)',
    borderRadius: 16,
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.red,
  },

  screen: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },


  header: {
    backgroundColor: INDIGO_DARK,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerSub: {
    color: '#A5B4FC',
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  addBtn: {
    backgroundColor: INDIGO,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Summary
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },

  // Tabs
  tabsWrapper: {
    marginTop: 14,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  tabActive: {
    backgroundColor: INDIGO,
    borderColor: INDIGO,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
  },
  tabBadgeTextActive: {
    color: '#FFFFFF',
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 32,
    gap: 12,
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#312E81',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  jobId: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 22,
    marginBottom: 12,
  },

  // Meta
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginBottom: 2,
  },
  metaLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 1,
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  metaValueHighlight: {
    color: INDIGO,
  },
  metaDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E7EB',
  },

  // Days left
  daysRow: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  daysRowUrgent: {
    backgroundColor: '#FFF7ED',
  },
  daysText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  daysTextUrgent: {
    color: '#C2410C',
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  actionBtnPrimary: {
    backgroundColor: INDIGO,
    borderColor: INDIGO,
    flex: 1.5,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  actionBtnTextPrimary: {
    color: '#FFFFFF',
  },

  // States
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryBtn: {
    backgroundColor: INDIGO,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});



