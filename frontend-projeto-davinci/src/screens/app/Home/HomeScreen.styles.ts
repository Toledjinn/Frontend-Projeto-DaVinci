import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...FONTS.h1,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});