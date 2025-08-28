import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  paragraph: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 20,
  },
});
