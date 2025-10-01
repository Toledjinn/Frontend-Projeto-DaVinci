import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  contentContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  emptyText: { ...FONTS.body10, textAlign: 'center', marginTop: 40, color: COLORS.gray_400 },
});