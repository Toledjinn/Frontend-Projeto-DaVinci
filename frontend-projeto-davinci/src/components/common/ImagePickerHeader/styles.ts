import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getImagePickerHeaderStyles = (screenWidth: number, screenHeight: number) => {
  const circleDiameter = screenWidth * 0.2273;
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 4, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    touchableWrapper: {
      position: 'absolute',
      top: screenHeight * 0.0889,
    },
    backgroundCircle: {
      width: circleDiameter,
      height: circleDiameter,
      borderRadius: circleDiameter / 2,
      backgroundColor: COLORS.white,
      borderWidth: 3,
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraIconWrapper: {
    },
    plusIconWrapper: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      backgroundColor: COLORS.secondary,
      borderRadius: 50,
      padding: 2,
      borderWidth: 2,
      borderColor: COLORS.white,
    },
    title: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      top: screenHeight * 0.21,
      ...FONTS.h2,
      color: COLORS.secondary,
    },
  });
};
