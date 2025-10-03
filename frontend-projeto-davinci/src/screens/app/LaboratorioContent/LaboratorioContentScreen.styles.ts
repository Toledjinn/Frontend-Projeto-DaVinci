import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  carousel: {
    flex: 1,
  },
  carouselContent: {
    alignItems: 'center',
  },
  slide: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.secondary,
    marginBottom: SIZES.padding,
    textAlign: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.5,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  videoContainer: {
    width: width * 0.8,
    aspectRatio: 16 / 9,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  paragraph: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100, 
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
