

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
    ...FONTS.body5,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  paragraph: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  gridImageTop: {
    width: '30%',
    height: 100,
    borderRadius: 8,
    margin: '1%',
    resizeMode: 'cover',
  },
  gridImageBottom: {
    width: '50%',
    height: 100,
    borderRadius: 8,
    margin: '1%',
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

  collageContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 150, 
    marginBottom: 20,
  },
  collageMainImage: {
    width: '60%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },
  collageSideContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'space-between',
  },
  collageSideImage: {
    width: '100%',
    height: '50%', // Um pouco menos de 50% para ter um espaço no meio
    borderRadius: 8,
    resizeMode: 'cover',
  },

  collageSideImageTop: {
    width: '100%',
    height: '50%',
    borderTopRightRadius: 8, 
  },
  collageSideImageBottom: {
    width: '100%',
    height: '50%',
    borderBottomRightRadius: 8, 
    resizeMode: 'cover',
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

});
