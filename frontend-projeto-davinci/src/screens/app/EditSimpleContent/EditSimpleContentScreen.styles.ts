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
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  sectionTitle: {
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
  },
  manualInputContainer: {
    height: 200,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  manualInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    flex: 1,
    textAlignVertical: 'top',
  },
});
