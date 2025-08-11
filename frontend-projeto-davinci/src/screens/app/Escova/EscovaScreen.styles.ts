// src/screens/app/Escova/EscovaScreen.styles.ts

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
    paddingTop: 280,
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
    height: 150,
    borderRadius: 8,
    marginTop: 10,
    resizeMode: 'contain',
  },

  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    width: '45%',
  },
  sideImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  imageLabel: {
    ...FONTS.body11,
    color: COLORS.secondary,
    marginTop: 8,
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
