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
    paddingBottom: '62%',
  },
  form: {
    width: '100%',
  },
  changeButton: {
    marginVertical: 20,
    top: 12,
  },
  inputWrapper: {
    marginBottom: 4,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  icon: {
    marginRight: 20,
  },
  placeholder: {
    ...FONTS.body12,
    color: COLORS.gray_400,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  errorPlaceholder: {
    height: 16,
  },
});
