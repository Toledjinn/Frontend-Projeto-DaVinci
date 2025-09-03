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
    paddingTop: 250,
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
    padding: 20,
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
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  paragraph: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGridContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  gridImageTop: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    margin: '1%',
    resizeMode: 'cover',
  },
  gridImageBottom: {
    width: '60%',
    height: 100,
    borderRadius: 8,
    margin: '1%',
    resizeMode: 'cover',
  },
  collageContainer: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 20,
  },
  collageMainImage: {
    flex: 1.5,
    height: '100%',
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  collageSideContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    gap: 5,
  },
  collageSideImage: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
