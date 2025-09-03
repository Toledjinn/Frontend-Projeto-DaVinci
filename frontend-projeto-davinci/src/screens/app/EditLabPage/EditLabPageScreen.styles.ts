import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 180, 
  },
  slideEditor: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  slideTitle: {
    ...FONTS.body5,
    color: COLORS.secondary,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
    marginTop: 16,
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
  manualInputContainer: {
    marginTop: 16,
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
    marginLeft: 16,
    height: 120,
  },
  slideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  removeSlideButton: {
    padding: 8,
  },
  addSlideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    backgroundColor: COLORS.white,
    marginTop: 8,
  },
  addSlideButtonText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginLeft: 8,
  },
});

