import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SIZES.padding,
    paddingBottom: 120, 
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
    padding: SIZES.padding / 1.5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    backgroundColor: COLORS.white,
  },
  cardTitle: {
    ...FONTS.body6,
    color: COLORS.secondary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    padding: SIZES.base,
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
    ...FONTS.body10,
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 1.5,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    color: COLORS.secondary,
  },
  imagePicker: {
    height: 200,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonsContainer: {
    marginTop: SIZES.padding,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding / 1.5,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: SIZES.base * 1.5,
  },
  addButtonText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginLeft: SIZES.base,
  },
});

