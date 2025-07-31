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
  recoverButton: {
    marginTop: 16,
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
