import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...FONTS.body1,
    color: COLORS.secondary,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
    paddingBottom: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  conditionalInput: {
    marginTop: 16,
  }
});