import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getPageHeaderStyles = (screenWidth: number, screenHeight: number) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
      justifyContent: 'center',
    },
    circleAnchor: {
      position: 'absolute',
      alignSelf: 'center',
    },
    title: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      ...FONTS.h1,
      color: COLORS.secondary,
    },
  });
};
