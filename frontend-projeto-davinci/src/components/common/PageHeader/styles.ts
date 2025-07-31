import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getPageHeaderStyles = (screenWidth: number, screenHeight: number) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
      justifyContent: 'center'
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
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    characterWrapper: {
      width: screenWidth * 0.1568,
      height: screenHeight * 0.0994,
    },
    title: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      top: screenHeight * 0.21,
      ...FONTS.h2,
      color:  COLORS.secondary
    },
  });
};