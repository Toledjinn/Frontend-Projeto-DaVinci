import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 180,
  },
  blockContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  manualInputContainer: {
  },
  manualTextInputWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  manualTextInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlignVertical: 'top',
    minHeight: 150,
  },
  imagePicker: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  addButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  addButtonText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    marginLeft: 8,
  }
});
