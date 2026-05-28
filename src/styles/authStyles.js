import { StyleSheet } from 'react-native';



const commonStyles = {
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  headerContainer: {
    marginBottom: 36,
  },

  logoContainer: {
    width: 74,
    height: 74,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 10,
  },

  subtitle: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
  },

  inputWrapper: {
    marginBottom: 20,
  },

  label: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },

  inputContainer: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    marginLeft: 12,
    color: '#0F172A',
    fontSize: 15,
  },

  registerButton: {
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
};


export const loginStyles = StyleSheet.create({
  ...commonStyles,

  scrollContainer: {
    ...commonStyles.scrollContainer,
    justifyContent: 'center',
  },

  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 28,
  },

  forgotPasswordText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },

  loginButton: {
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  dividerText: {
    marginHorizontal: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },

  socialButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    backgroundColor: '#FFFFFF',
  },

  socialButtonText: {
    marginLeft: 12,
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerText: {
    color: '#64748B',
    fontSize: 14,
  },

  registerLink: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '700',
  },
});


export const candidateRegisterStyles = StyleSheet.create({
  ...commonStyles,

  scrollContainer: {
    ...commonStyles.scrollContainer,
    justifyContent: 'center',
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  genderButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  genderButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  genderText: {
    color: '#334155',
    fontWeight: '600',
  },

  genderTextActive: {
    color: '#FFFFFF',
  },

  countryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  countryItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  countryItemActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },

  countryText: {
    color: '#334155',
    fontWeight: '600',
  },

  countryTextActive: {
    color: '#1D4ED8',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },

  footerText: {
    color: '#64748B',
    fontSize: 14,
  },

  loginLink: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '700',
  },
});


export const employerRegisterStyles = StyleSheet.create({
  ...commonStyles,

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 18,
    marginTop: 6,
  },

  textAreaContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    padding: 16,
    minHeight: 130,
  },

  textArea: {
    fontSize: 15,
    color: '#0F172A',
    minHeight: 100,
  },

  rowContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  rowWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  optionButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  optionText: {
    color: '#334155',
    fontWeight: '600',
  },

  optionTextActive: {
    color: '#FFFFFF',
  },

  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },

  tagButtonActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },

  tagText: {
    color: '#334155',
    fontWeight: '600',
  },

  tagTextActive: {
    color: '#1D4ED8',
  },

  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 56,
  },
});

export const pickerSelectStyles = {
  inputIOS: {
    color: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 15,
    flex: 1,
  },

  inputAndroid: {
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    flex: 1,
  },

  placeholder: {
    color: '#94A3B8',
  },

  iconContainer: {
    top: 16,
    right: 12,
  },
};