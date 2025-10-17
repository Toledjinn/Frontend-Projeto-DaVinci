import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  pageBody: {
    flex: 1,
    minHeight: 0,
  },
  pageBodySidePadding: {
    paddingHorizontal: 12,
  },

  scrollView: { flex: 1 },

  card: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 12,

    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,

    paddingHorizontal: 12,
    paddingVertical: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.black,
  },
  video: { flex: 1 },

  content: {
    ...FONTS.body15,
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
