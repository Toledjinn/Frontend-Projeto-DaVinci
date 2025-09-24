import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getStyledButtonStyles = (height: number) => {
  return StyleSheet.create({
    container: {
      height: height * 0.055,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16, 
    },
    secondaryContainer: {
      backgroundColor: COLORS.secondary,
    },
    secondaryText: {
      ...FONTS.body2,
      color: COLORS.primary,
      width: '100%',
      textAlign: 'center',
    },
    primaryContainer: {
      backgroundColor: COLORS.primary,
    },
    primaryText: {
      ...FONTS.body2,
      color: COLORS.secondary,
      width: '100%',
      textAlign: 'center',
    },
  });
};
