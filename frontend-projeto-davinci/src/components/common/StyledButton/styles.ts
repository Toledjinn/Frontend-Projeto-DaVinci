import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getStyledButtonStyles = (height: number) => {
  return StyleSheet.create({
    container: {
      height: height * 0.055, 
      backgroundColor: COLORS.secondary,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    text: {
      ...FONTS.body2,
      color: COLORS.primary, 
    },
  });
};
