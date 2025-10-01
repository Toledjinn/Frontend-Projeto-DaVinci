import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 24,
    paddingTop: '44%',
    paddingBottom: 120,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: COLORS.gray_200,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  textInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusDisplay: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusText: {
    ...FONTS.body9,
  },
});

