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
    paddingTop: "44%",
    paddingBottom: 120,
  },
  slideEditor: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  blockContainer: {
    marginBottom: 16,
  },
  slideTitle: {
    ...FONTS.body5,
    color: COLORS.secondary,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
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
  slideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeSlideButton: {
    padding: 8,
  },
  slideContent: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
    marginTop: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.secondary,
    marginBottom: 24,
  },
  modalOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray_100,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  modalOptionText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginLeft: 12,
  },
  modalCloseButton: {
    marginTop: 12,
    padding: 12,
  },
  modalCloseButtonText: {
    ...FONTS.body9,
    color: COLORS.gray_400,
  }
});

