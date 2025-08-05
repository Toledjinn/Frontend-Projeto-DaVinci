import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.gray_200,
    marginTop: 8,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
});
