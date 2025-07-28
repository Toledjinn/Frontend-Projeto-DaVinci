import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '19.3%',
    paddingBottom: '48%',
  },
  form: {
    width: '100%',
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginVertical: 20,
    top: 8,
    bottom: 16
  },
  forgotPasswordText: {
    ...FONTS.body1,
    color: COLORS.secondary,
    textDecorationLine: 'underline',
  },
});
