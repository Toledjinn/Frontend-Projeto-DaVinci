import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  outerContainer: {
    flex: 1,
  },
  bodyScroll: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  manualInputContainer: {
    height: 150,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  manualInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    flex: 1,
    marginLeft: 18,
    textAlignVertical: 'top',
  },
});
