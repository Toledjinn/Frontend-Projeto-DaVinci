import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  paragraph: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 20,
  },
  quote: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
  salutation: {
    ...FONTS.body9,
    fontStyle: 'italic',
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonItem: {
    alignItems: 'center',
    width: '30%',
  },

  badgeShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  itemText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
});
