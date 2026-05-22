import { StyleSheet } from 'react-native';
import { COLORS } from './common';

const profileStyles = StyleSheet.create({
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
});

export default profileStyles;