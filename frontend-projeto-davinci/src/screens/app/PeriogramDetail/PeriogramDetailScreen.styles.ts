import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  contentContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  sectionTitle: {
    ...FONTS.body1,
    color: COLORS.secondary,
    marginTop: 24,
    marginBottom: 16,
  },
});