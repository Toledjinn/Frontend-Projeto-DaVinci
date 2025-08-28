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
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 10,
    resizeMode: 'contain',
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

  imageGridContainer: {
    width: '100%',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridImage: {
    width: '50%',
    height: 80,
    borderRadius: 10,
    marginHorizontal: '1%',
    resizeMode: 'cover',
  },
  gridImageBottom: {
    width: '80%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
