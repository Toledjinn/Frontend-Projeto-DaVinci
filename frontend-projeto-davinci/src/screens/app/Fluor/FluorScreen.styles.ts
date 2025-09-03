import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 260, 
  },
  carousel: {
    flexGrow: 0,
  },
  carouselContent: {
    alignItems: 'center',
  },
  slide: {
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 450,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 30, 
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    ...FONTS.body5,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  paragraph: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  quote: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  author: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    alignSelf: 'flex-end',
  },
  text1: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  text2: {
    ...FONTS.body11,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  newImage: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  smallIcon: {
    marginHorizontal: 5,
  },
  listTitle: {
    ...FONTS.body7,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  bullet: {
    ...FONTS.body10,
    color: COLORS.secondary,
    marginRight: 8,
    lineHeight: 20,
  },
  bulletText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    flex: 1,
    lineHeight: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    width: '45%',
  },
  sideImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  imageLabel: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginTop: 8,
  },
  imageGrid: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  imageGridRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '2%',
  },
  gridImageSide: {
    width: '49%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  collageContainer: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    marginTop: 16,
  },
  collageMainImage: {
    width: '58%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },
  collageSideContainer: {
    width: '42%',
    height: '100%',
    justifyContent: 'space-between',
  },
  collageSideImage: {
    width: '100%',
    height: '48%',
    resizeMode: 'cover',
  },
  imageGridContainer: {
    width: '100%',
    alignItems: 'center',
  },
  gridImage: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  gridImageBottom: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});

