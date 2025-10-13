import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  title: {
    ...FONTS.body1,
    color: COLORS.secondary,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  removeButton: {
    marginLeft: 10,
    paddingTop: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  addButtonText: {
    color: COLORS.secondary,
    ...FONTS.body7,
    marginLeft: 8,
  },
});
