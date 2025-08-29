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