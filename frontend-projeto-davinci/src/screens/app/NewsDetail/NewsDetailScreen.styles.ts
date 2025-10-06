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

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 680,
  },

  title: {
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: 'center',
    fontWeight: '700',
  },
  date: {
    ...FONTS.body13,
    color: COLORS.gray_400,
    textAlign: 'right',
    marginBottom: 12,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray_200 || '#E0E0E0',
    alignSelf: 'center',
    width: '100%',
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },

  content: {
    ...FONTS.body10,
    color: COLORS.secondary,
    lineHeight: 22,
    textAlign: 'center',
  },

  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
