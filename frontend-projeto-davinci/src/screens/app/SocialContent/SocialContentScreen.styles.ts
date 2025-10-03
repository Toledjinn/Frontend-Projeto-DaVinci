import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100, 
  },
  paragraph: {
    ...FONTS.body10,
    color: COLORS.secondary,
    marginBottom: SIZES.padding,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.black,
  },
  video: {
    flex: 1,
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
  },
  depoimentoText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    fontStyle: 'italic',
    marginBottom: SIZES.base,
  },
  author: {
    ...FONTS.body8,
    color: COLORS.gray_400,
    textAlign: 'right',
  },
});
