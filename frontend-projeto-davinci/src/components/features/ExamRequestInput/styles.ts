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
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 16,
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlignVertical: 'top',
    height: 150,
  },
});