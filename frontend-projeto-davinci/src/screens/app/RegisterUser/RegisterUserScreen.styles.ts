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

  bodyScroll: {
    flex: 1,
  },

  bodyContent: {
    paddingHorizontal: 16,
    gap: 8,
  },

  formContainer: {
    width: '100%',
    paddingTop: 8,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },

  inputWrapper: {
    marginBottom: 8,
    width: '100%',
  },

  halfInputWrapper: {
    flexBasis: '48%',
    minWidth: '48%',
    marginBottom: 8,
  },

  croInput: { flexBasis: '48%', minWidth: '48%' },
  ufPicker: { flexBasis: '48%', minWidth: '48%' },

  cepLoading: {
    position: 'absolute',
    right: 15,
    top: 36,
  },

  allergyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  removeButton: {
    marginLeft: 10,
    paddingTop: 8,
  },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  addButtonText: {
    color: COLORS.white,
    ...FONTS.body7,
    marginLeft: 6,
  },
});
