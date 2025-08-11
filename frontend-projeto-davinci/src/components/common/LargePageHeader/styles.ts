import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

// Note que o nome da função foi alterado para getLargePageHeaderStyles
export const getLargePageHeaderStyles = (screenWidth: number, screenHeight: number) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
      justifyContent: 'center',
    },
    backgroundCircle: {
      position: 'absolute',
      width: screenWidth * 0.28,
      height: screenWidth * 0.28,
      left: screenWidth * 0.36,
      top: screenHeight * 0.1,
      borderRadius: (screenWidth * 0.28) / 2,
      backgroundColor: COLORS.primary,
      borderWidth: 3,
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    characterWrapper: {
      width: screenWidth * 0.18,
      height: screenHeight * 0.11,
    },
    title: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      top: screenHeight * 0.24,
      ...FONTS.h2,
      color: COLORS.secondary,
    },
  });
};