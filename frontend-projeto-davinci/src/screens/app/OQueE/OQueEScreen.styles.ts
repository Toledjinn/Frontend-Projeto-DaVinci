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
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
});
