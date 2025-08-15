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
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    ...FONTS.body1,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_200,
    paddingTop: 20,
  },
  sectionTitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
    marginBottom: 16,
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
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_200,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
