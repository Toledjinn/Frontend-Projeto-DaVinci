import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getProfileHeaderStyles = (screenWidth: number, screenHeight: number) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
      top: 4, 
    },
    backgroundCircle: {
      position: 'absolute',
      width: screenWidth * 0.2273,
      height: screenWidth * 0.2273,
      left: screenWidth * 0.3841,
      top: screenHeight * 0.0889,
      borderRadius: (screenWidth * 0.2273) / 2,
      backgroundColor: COLORS.primary,
      borderWidth: 3,
      borderColor: COLORS.gray_500,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageWrapper: {
      width: '100%',
      height: '100%',
    },
    userName: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      top: screenHeight * 0.21,
      ...FONTS.body1,
      color: COLORS.secondary,
    },
  });
};
