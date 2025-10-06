import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getProfileHeaderStyles = (screenWidth: number, screenHeight: number, hasRiskLevel: boolean) => {
  const singleLineHeight = FONTS.body1.lineHeight || 22;
  const photoTopPosition = screenHeight * 0.0450;
  const circleDiameter = screenWidth * 0.3073;

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
      alignItems: 'center',
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
    textBlock: {
      marginTop: photoTopPosition + circleDiameter + 8,
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 12,
    },
    userName: {
      ...FONTS.h2,
      color: COLORS.secondary,
      textAlign: 'center',
      lineHeight: singleLineHeight,
    },
    riskContainer: { 
      alignItems: 'center',
    }
  });
};
