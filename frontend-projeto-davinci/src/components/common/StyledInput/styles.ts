import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getStyledInputStyles = (height: number, width: number) => {
  return StyleSheet.create({
    wrapper: {
      width: '100%',
      marginBottom: 0,
    },
    label: {
      ...FONTS.body3,
      color: COLORS.secondary,
      marginBottom: 8,
    },
    container: {
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
    input: {
      ...FONTS.body9,
      color: COLORS.secondary,
      flex: 1,
      paddingVertical: 0,
      paddingTop: Platform.OS === 'android' ? 2 : 0,
      textAlign: 'left',
    },
    errorText: {
      color: COLORS.red,
      fontSize: height * 0.014, 
      marginTop: height * 0.005, 
      marginLeft: 2,
    },
    errorPlaceholder: {
      height: 20,
    },
  });
};
