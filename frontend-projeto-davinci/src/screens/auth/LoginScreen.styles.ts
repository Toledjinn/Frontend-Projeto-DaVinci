import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
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
  },
  forgotPasswordText: {
    ...FONTS.body1,
    color: COLORS.secondary,
    textDecorationLine: 'underline',
  },
});
