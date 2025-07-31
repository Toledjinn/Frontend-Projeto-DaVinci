import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getProfileHeaderStyles = (screenWidth: number, screenHeight: number) => {
  const singleLineHeight = FONTS.body1.lineHeight || 22;

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
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
      overflow: 'hidden',
    },
    imageWrapper: {
      width: '100%',
      height: '100%',
    },
    userName: {
      position: 'absolute',
      width: '75%',
      alignSelf: 'center',
      top: screenHeight * 0.21,
      ...FONTS.body1,
      color: COLORS.secondary,
      textAlign: 'center',
      lineHeight: singleLineHeight,
    },
  });
};
