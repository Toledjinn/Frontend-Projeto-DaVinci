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
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  slideEditor: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  slideHeader: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
    paddingBottom: 8,
  },
  fieldLabel: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
    marginTop: 16,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 4,
    resizeMode: 'cover',
  },
  manualInputContainer: {
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 12,
  },
  manualInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    flex: 1,
    textAlignVertical: 'top',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
  },
  imageGridEditor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridImageContainer: {
    width: '48%',
    marginBottom: '4%',
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
  },
  collageSideContainer: {
    width: '38%',
    marginLeft: '2%',
    justifyContent: 'space-between',
  },
  collageSideImage: {
    width: '100%',
    height: 74,
    borderRadius: 4,
  },
});
