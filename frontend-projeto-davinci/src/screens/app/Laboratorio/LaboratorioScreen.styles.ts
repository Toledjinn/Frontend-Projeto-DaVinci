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
    paddingBottom: SIZES.padding,
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

  cardTitle: {
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

  cardParagraph: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 16,
  },
  buttonItem: {
    alignItems: 'center',
    width: 100,
  },

  badgeShadow: {
    marginBottom: SIZES.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  itemText: {
    ...FONTS.body8,
    color: COLORS.secondary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
