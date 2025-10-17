import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  pageBody: {
    flex: 1,
    minHeight: 0,
  },
  pageBodySidePadding: {
    paddingHorizontal: 12,
  },

  editorCard: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 12,

    backgroundColor: COLORS.white,
    borderRadius: SIZES?.radius ?? 12,

    paddingHorizontal: 12,
    paddingVertical: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  editorScroll: {
    flex: 1,
    minHeight: 0,
  },
  editorScrollContent: {
    paddingVertical: 8,
  },

  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: SIZES?.radius ?? 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },

  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...FONTS.body7,
    color: COLORS.gray_400,
    marginBottom: 8,
  },
  textInput: {
    ...FONTS.body10,
    color: COLORS.secondary,
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES?.radius ?? 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  statusDisplay: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES?.radius ?? 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statusText: {
    ...FONTS.body10,
  },
});
