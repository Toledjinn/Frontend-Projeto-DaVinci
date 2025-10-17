import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
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
    overflow: 'hidden',
    marginBottom: 12,

    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,

    paddingHorizontal: 16,
    paddingVertical: 0,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,

    alignSelf: 'center',
    width: '100%',
    maxWidth: 680,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    paddingVertical: SIZES.padding / 1.5,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    backgroundColor: COLORS.white,
  },
  cardTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },

  editorScroll: {
    flex: 1,
    minHeight: 0,
  },
  editorScrollContent: {
    paddingVertical: 16,
  },

  itemBox: {
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },

  label: {
    ...FONTS.body3,
    color: COLORS.gray_400,
    marginBottom: SIZES.base,
  },
  manualTextInputWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  manualTextInput: {
    flex: 1,
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlignVertical: 'top',
  },

    imagePicker: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  imagePreview: { width: '100%', height: '100%' },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    marginTop: 8,
  },
  itemBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  removeIconTap: { padding: 6 },

  addButtonsContainer: {
    marginTop: SIZES.padding,
  },
  addRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 14,
    paddingVertical: 12,

    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  addButtonText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginLeft: SIZES.base,
  },
  
});
