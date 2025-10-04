import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: '19.3%',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 0,
  },
  loginButton: {
    marginTop: 32,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 16,
    width: '100%',
  },
  forgotPasswordText: {
    ...FONTS.h3,
    color: COLORS.secondary,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
  },
});

export const forgotStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: '19.3%',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 0,
  },
  recoverButton: {
    marginTop: 16,
    width: '100%',
  },
  icon: {
    marginRight: 20,
  },
  dateText: {
    ...FONTS.body9,
    color: COLORS.secondary,
  },
  placeholder: {
    ...FONTS.body9,
    color: COLORS.gray_400,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
  },
  errorPlaceholder: {
    height: 18,
  },
});

export const changeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: '19.3%',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 0,
  },
  changeButton: {
    marginTop: 16,
  },
});
