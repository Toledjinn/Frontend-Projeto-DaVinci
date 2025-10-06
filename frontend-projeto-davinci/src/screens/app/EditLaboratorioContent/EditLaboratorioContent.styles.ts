import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    paddingHorizontal: 12,
    flex: 1,
  },

  editorCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
  },
  cardTitle: {
    ...FONTS.body6,
    color: COLORS.secondary,
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    padding: SIZES.base / 2,
    marginRight: SIZES.base,
  },
  cardContent: {
    padding: SIZES.padding,
  },
  inputGroup: {
    marginBottom: SIZES.padding,
  },
  label: {
    ...FONTS.body7,
    color: COLORS.gray_400,
    marginBottom: SIZES.base,
  },
  textInput: {
    ...FONTS.body9,
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base * 1.5,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  imagePicker: {
    width: '100%',
    height: 180,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray_200,
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
    marginTop: SIZES.padding,
    alignItems: 'flex-start',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base * 1.2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: SIZES.base,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginLeft: SIZES.base,
  },
});
