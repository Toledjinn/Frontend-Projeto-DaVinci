import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  outerContainer: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 8, 
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 24,
  },

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
    gap: 12,
  },
  conditionalInput: {
    marginTop: 16,
  },
});
