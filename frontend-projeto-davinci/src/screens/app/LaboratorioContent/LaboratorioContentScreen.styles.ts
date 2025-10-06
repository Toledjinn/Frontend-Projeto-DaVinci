import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    paddingBottom: SIZES.padding,
  },

  carousel: {
    flexGrow: 0,
  },
  carouselContent: {
  },
  slide: {
    paddingHorizontal: SIZES.padding,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,

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
    ...FONTS.h1,              
    color: COLORS.secondary,  
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 8,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray_200 || '#E0E0E0',
    marginVertical: 12,
    alignSelf: 'center',
    width: '100%',
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.black,
    marginBottom: SIZES.base,
  },
  video: {
    flex: 1,
  },

  paragraph: {
    ...FONTS.body9,          
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
  },
});
