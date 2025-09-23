import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  procedureItemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    ...FONTS.body1,
    color: COLORS.secondary,
    marginBottom: 16,
    textAlign: 'center'
  },
  procedureEntry: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100, 
  },
  lastProcedureEntry: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  inputsContainer: {
    flex: 1,
  },
  pickerWrapper: {
    marginBottom: 8,
  },
  descriptionInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlignVertical: 'top',
    height: 80,
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 4,
  },
  removeButtonText: {
    ...FONTS.body11,
    color: COLORS.red,
    textDecorationLine: 'underline',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  addButtonText: {
    color: COLORS.secondary,
    ...FONTS.body7,
    marginLeft: 8,
  },
});