
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
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 20,
  },
  quote: {
    ...FONTS.body7,
    color: COLORS.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
  salutation: {
    ...FONTS.body10,
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
    width: '40%',
  },
  itemCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});
