import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: COLORS.gray_400,
  },
});
