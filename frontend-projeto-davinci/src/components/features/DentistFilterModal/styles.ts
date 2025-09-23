import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  scrollContainer: {
    width: '100%',
  },
  sectionContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    paddingBottom: 20,
  },
  sectionTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    marginLeft: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_200,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});