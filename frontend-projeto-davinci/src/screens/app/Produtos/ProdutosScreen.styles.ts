

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
    paddingTop: 250,
    alignItems: 'center',
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
    justifyContent: 'center',
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
    minHeight: 450, 
    justifyContent: 'center',
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
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5, 
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
