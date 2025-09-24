import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getProfileHeaderStyles = (screenWidth: number, screenHeight: number, hasRiskLevel: boolean) => {
  const singleLineHeight = FONTS.body1.lineHeight || 22;
  const photoTopPosition = screenHeight * 0.0700;
  const circleDiameter = screenWidth * 0.3073;
  const userNameTopPosition = photoTopPosition + circleDiameter + 8;
  const riskContainerTopPosition = userNameTopPosition + 24;

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
    },
    backgroundCircle: {
      position: 'absolute',
      width: circleDiameter,
      height: circleDiameter,
      top: photoTopPosition, 
      borderRadius: circleDiameter / 2,
      backgroundColor: COLORS.primary,
      borderWidth: 3,
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      alignSelf: 'center',
    },
    imageWrapper: {
      width: '100%',
      height: '100%',
    },
    userName: {
      position: 'absolute',
      width: '100%',
      alignSelf: 'center',
      top: userNameTopPosition,
      ...FONTS.h2,
      color: COLORS.secondary,
      textAlign: 'center',
      lineHeight: singleLineHeight,
    },
    riskContainer: { 
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        top: riskContainerTopPosition
    }
  });
};
