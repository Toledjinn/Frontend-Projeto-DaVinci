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
    paddingBottom: 120, 
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
    marginBottom: 24,
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
  
  manualInputContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 2,
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
