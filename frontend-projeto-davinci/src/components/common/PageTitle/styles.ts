import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getPageHeaderStyles = (screenWidth: number, screenHeight: number) => {
  const chefinhoTopPosition = screenHeight * 0.0700;
  const circleDiameter = screenWidth * 0.3073;
  const titleTopPosition = chefinhoTopPosition + circleDiameter + 8;
  
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
      justifyContent: 'center'
    },
    backgroundCircle: {
      position: 'absolute',
      width: circleDiameter,
      height: circleDiameter,
      top: chefinhoTopPosition,
      borderRadius: circleDiameter / 2,
      backgroundColor: COLORS.primary,
      borderWidth: 3,
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',    
    },
    characterWrapper: {
      width: circleDiameter,
      height: circleDiameter,
    },
    title: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      top: titleTopPosition,
      ...FONTS.h1,
      color:  COLORS.secondary
    },
  });
};