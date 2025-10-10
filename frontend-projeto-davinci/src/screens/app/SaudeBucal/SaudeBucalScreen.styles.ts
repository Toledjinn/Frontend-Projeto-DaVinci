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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },

  removeButton: {
    marginLeft: 10,
    paddingTop: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  addButtonText: {
    color: COLORS.secondary,
    ...FONTS.body7,
    marginLeft: 8,
  },

  disabled: {
    opacity: 0.5,
  },
  lockedValueRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  lockedChip: {
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    backgroundColor: COLORS.gray_100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  lockedChipText: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
  lockedText: {
    ...FONTS.body6,
    color: COLORS.gray_200,
    marginTop: 8,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray_100,
    marginVertical: 12,
  },
});
