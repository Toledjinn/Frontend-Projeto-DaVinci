import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContentContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 120, // Espaço para o footer flutuante
  },
  emptyText: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    textAlign: 'center',
    marginTop: 48,
  },
});
