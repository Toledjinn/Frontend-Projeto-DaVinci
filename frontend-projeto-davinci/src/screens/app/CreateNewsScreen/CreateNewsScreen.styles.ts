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
    padding: 24,
    paddingBottom: 20, 
  },
  blockContainer: {
    marginBottom: 24,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  manualTextInputWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  manualTextInput: {
    flex: 1,
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: 200,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePickerText: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    marginTop: 8,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 150,
  },
});
