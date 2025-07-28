import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 4,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 20,
  },
  input: {
    ...FONTS.body9,
    color: COLORS.secondary,
    flex: 1,
    paddingVertical: 0,
    paddingTop: Platform.OS === 'android' ? 2 : 0,
    textAlign: 'left',
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
