import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  pageBody: { flex: 1, minHeight: 0 },

  pageBodySidePadding: { paddingHorizontal: 12 },

  card: {
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',

    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,

    paddingHorizontal: 16,
    paddingVertical: 0,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,

    alignSelf: 'center',
    width: '100%',
    maxWidth: 680,
  },

  slidePage: {
    minHeight: 0,
  },

  slideScroll: { flex: 1, minHeight: 0 },
  slideScrollContent: { paddingVertical: 16 },

  title: {
    ...FONTS.ph1,
    color: COLORS.secondary,
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: SIZES.radius,
    marginTop: 8,
    marginBottom: SIZES.base,
    alignSelf: 'center',
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.black,
    marginBottom: SIZES.base,
  },
  video: { flex: 1 },

  paragraph: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
    marginTop: 8
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray_400,
    marginVertical: 12,
    alignSelf: 'center',
    width: '100%',
  },

  paginationContainer: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: { flexDirection: 'row', alignItems: 'center' },
  dotBase: { marginHorizontal: 6 },
});
