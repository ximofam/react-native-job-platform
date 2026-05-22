import { StyleSheet } from 'react-native';
import { COLORS } from './common';

const s = StyleSheet.create({
  // ── Step indicator ───────────────────────────────────
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

  // ── Tag chip selector ────────────────────────────────
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

  // ── Select button (dropdown trigger) ────────────────
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

  // ── Dropdown overlay ─────────────────────────────────
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

  // ── Address mode tabs ────────────────────────────────
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

  // ── Company location card ────────────────────────────
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

  // ── Salary row ───────────────────────────────────────
  salaryRow: { flexDirection: 'row', gap: 10 },
  salaryHalf: { flex: 1 },

  // ── Nav buttons ──────────────────────────────────────
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

  // ── Review summary card ──────────────────────────────
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

  // ── Publish package cards ────────────────────────────
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

  // ── Submit button ────────────────────────────────────
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

  // ── Success screen ───────────────────────────────────
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
});

export default s;