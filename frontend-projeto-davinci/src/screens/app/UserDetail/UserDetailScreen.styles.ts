import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  pageBody: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 12,
  },

  fixedTop: {
    paddingTop: 8,
    paddingBottom: 8,
    gap: 12,
  },

  card: {
    flex: 1,
    minHeight: 0,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 680,
  },

  cardScroll: {
    flex: 1,
  },
  cardScrollContent: {
    gap: 12,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
