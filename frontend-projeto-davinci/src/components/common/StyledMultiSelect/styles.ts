import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getStyledMultiSelectStyles = (height: number, width: number) => {
  return StyleSheet.create({
    wrapper: {
      width: '100%',
    },
    label: {
      ...FONTS.body3,
      color: COLORS.secondary,
      marginBottom: 8,
    },
    inputContainer: {
      height: height * 0.055,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.gray_200,
      paddingHorizontal: width * 0.04,
    },
    icon: {
      marginRight: width * 0.05,
    },
    valueText: {
      ...FONTS.body9,
      color: COLORS.secondary,
      flex: 1,
    },
    placeholder: {
      ...FONTS.body9,
      color: COLORS.gray_400,
      flex: 1,
    },
    chevronIcon: {
      marginLeft: 'auto',
    },
    errorText: {
      color: COLORS.red,
      fontSize: height * 0.014,
      marginTop: height * 0.005,
    },
    errorPlaceholder: {
      height: 20,
    },
    // Estilos do Modal
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '70%',
      paddingBottom: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray_200,
    },
    modalTitle: {
      ...FONTS.body1,
      color: COLORS.secondary,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray_100,
    },
    optionText: {
      ...FONTS.body9,
      marginLeft: 15,
      color: COLORS.secondary,
    },
    modalFooter: {
        paddingHorizontal: 20,
        paddingTop: 20,
    }
  });
};