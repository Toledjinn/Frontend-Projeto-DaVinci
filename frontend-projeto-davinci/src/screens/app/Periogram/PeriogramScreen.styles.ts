import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 12,
  },
  sectionTitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
});
