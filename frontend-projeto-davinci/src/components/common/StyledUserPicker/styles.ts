import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getStyledUserPickerStyles = (height: number, width: number) => {
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
    selectedValueContainer: {
      flex: 1, 
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImage: {
      width: 28,
      height: 28,
      borderRadius: 14,
      marginRight: 10,
      backgroundColor: COLORS.gray_100,
    },
    valueText: {
      ...FONTS.body9,
      flex: 1,
      color: COLORS.secondary,
    },
    placeholder: {
      ...FONTS.body9,
      color: COLORS.gray_400,
      flex: 1, 
    },
    allergyIcon: {
      marginLeft: 'auto', 
      marginRight: 10, 
    },
    chevronIcon: {
      marginLeft: 'auto', 
    },

    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
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
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.gray_100,
      borderRadius: 8,
      margin: 20,
      paddingHorizontal: 12,
    },
    searchInput: {
      ...FONTS.body9,
      flex: 1,
      height: 44,
      color: COLORS.secondary,
      marginLeft: 10,
    },
    userItemButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray_100,
    },
    userItemText: {
      ...FONTS.body9,
      marginLeft: 15,
      color: COLORS.secondary,
    },
  });
};