import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...FONTS.body10,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    height: 48,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  buttonUnselected: {
    backgroundColor: COLORS.white,
  },
  textSelected: {
    ...FONTS.body7,
    color: COLORS.white,
  },
  textUnselected: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
});