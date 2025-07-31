import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getStyledDatePickerStyles = (height: number, width: number) => {
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
      height: height * 0.0502, 
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
    dateText: {
      ...FONTS.body9,
      color: COLORS.secondary,
    },
    placeholder: {
      ...FONTS.body9,
      color: COLORS.gray_400,
    },
    errorText: {
      color: COLORS.red,
      fontSize: height * 0.014, 
      marginTop: height * 0.005, 
    },
    errorPlaceholder: {
      height: height * 0.021, 
    },
  });
};
