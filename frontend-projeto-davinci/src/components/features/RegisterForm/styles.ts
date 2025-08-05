import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  inputWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  halfInputWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  cepLoading: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
  allergyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  removeButton: {
    marginLeft: 10,
    paddingTop: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: COLORS.white,
    ...FONTS.body7,
    marginLeft: 8,
  },
  croInput: {
      width: '48%',
  },
  ufPicker: {
      width: '48%',
  }
});
