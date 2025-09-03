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
    paddingTop: 250, 
  },
  slideEditor: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10, 
    marginBottom: 16, 
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
  },
  imageRowEditor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainerEditor: {
    width: '48%',
    alignItems: 'center',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageLabelEditor: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginTop: 8,
  },
  gridContainerEditor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridImageContainerEditor: {
    width: '48%', 
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  slideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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
  imageGridEditor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  gridImageContainer: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  collageContainerEditor: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    gap: 5,
  },
  collageMainImageContainer: {
    flex: 1.5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  collageSideContainerEditor: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 5,
  },
  collageSideImageContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slideContent: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
    marginTop: 10,
  },
});

