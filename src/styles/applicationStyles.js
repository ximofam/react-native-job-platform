import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#6366F1',
  primaryDark: '#3730A3',
  primaryBorder: '#C7D2FE',

  success: '#10B981',
  successDark: '#166534',
  successBg: '#F0FDF4',
  successBorder: '#BBF7D0',

  gray50: '#F8FAFC',
  gray400: '#94A3B8',

  textPrimary: '#0F172A',
};

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowGap4: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  rowGap6: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  rowGap8: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  rowGap12: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  candidateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },

  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },

  candidateName: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },

  companyName: {
    fontSize: 13,
    color: COLORS.success,
    fontWeight: '500',
  },

  cardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray400,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 4,
  },

  editorSection: {
    backgroundColor: COLORS.gray50,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  editorLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  editorLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: '#fff',
  },

  statusOptionLabel: {
    fontSize: 13,
    fontWeight: '600',
  },

  selectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 2,
  },


  cvBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  cvBtnPrimary: {
    backgroundColor: '#EEF2FF',
    borderColor: COLORS.primaryBorder,
  },
  cvBtnSuccess: {
    backgroundColor: COLORS.successBg,
    borderColor: COLORS.successBorder,
  },
  cvBtnIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1,
  },
  cvBtnIconWrapPrimary: { borderColor: COLORS.primaryBorder, },
  cvBtnIconWrapSuccess: { borderColor: COLORS.successBorder, },
  cvBtnTitle: { fontSize: 14, fontWeight: '700', },
  cvBtnTitlePrimary: { color: COLORS.primaryDark, },
  cvBtnTitleSuccess: { color: COLORS.successDark },
  cvBtnSub: { fontSize: 12, marginTop: 2 },
  cvBtnSubPrimary: { color: COLORS.primary },
  cvBtnSubSuccess: { color: COLORS.success },
  updateBtn: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', },
  updateBtnDisabled: { backgroundColor: COLORS.primaryBorder, },
  updateBtnInner: { flexDirection: 'row', alignItems: 'center', gap: 8, },
  updateBtnText: { color: '#fff', fontWeight: '700', fontSize: 15, },
  readonlyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: COLORS.successBg,
    borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.successBorder,
  },
  readonlyText: { flex: 1, fontSize: 13, color: COLORS.successDark, lineHeight: 20, },
});