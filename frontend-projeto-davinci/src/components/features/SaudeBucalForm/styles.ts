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
});