import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';


export const getLargePageHeaderStyles = (screenWidth: number, screenHeight: number) => {
  const chefinhoTopPosition = screenHeight * 0.0800;
  const circleDiameter = screenWidth * 0.5373;
  const titleNameTopPosition = chefinhoTopPosition + circleDiameter + 16;
 
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
      justifyContent: 'center',
    },
    backgroundCircle: {
      position: 'absolute',
      width: circleDiameter,
      height: circleDiameter,
      top: chefinhoTopPosition, 
      borderRadius: circleDiameter / 2,
      backgroundColor: COLORS.primary,
      borderWidth: 7,
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      alignSelf: 'center',
    },
    characterWrapper: {
      width: circleDiameter * 0.9,
      height: circleDiameter * 0.9,
    },
    title: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      top: titleNameTopPosition,
      ...FONTS.h5,
      color: COLORS.secondary,
    },
  });
};