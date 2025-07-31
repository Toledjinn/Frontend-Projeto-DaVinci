import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  title: {
    ...FONTS.body1,
    color: COLORS.secondary,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
    paddingBottom: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginRight: 12,
    marginBottom: 12,
  },
  buttonText: {
    ...FONTS.body10,
    color: COLORS.gray_400,
  },
});
