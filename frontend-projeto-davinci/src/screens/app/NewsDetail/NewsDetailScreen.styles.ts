

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
  title: {
    ...FONTS.h1,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  date: {
    ...FONTS.body13,
    color: COLORS.gray_400,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  content: {
    ...FONTS.body10,
    color: COLORS.secondary,
    lineHeight: 22,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
