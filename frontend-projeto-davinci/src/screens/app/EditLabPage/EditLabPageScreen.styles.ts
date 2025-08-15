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
  infoText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
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
    height: 250,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 16,
  },
  manualInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    flex: 1,
    marginLeft: 18,
    textAlignVertical: 'top',
  },
});
