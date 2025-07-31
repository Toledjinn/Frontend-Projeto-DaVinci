import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getHeaderStyles = (height: number) => {
  return StyleSheet.create({
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    backgroundContainer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1, 
    },
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 40,
      zIndex: 3, 
      top: 6
    },
    leftSection: {
      flex: 1,
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    centerSection: {
      flex: 2,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightSection: {
      flex: 1,
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    profileImageContainer: {
      width: height * 0.1,
      height: height * 0.1,
      borderRadius: (height * 0.1) / 2,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: COLORS.secondary,
    },
    welcomeTextContainer: {
      marginLeft: 10,
    },
    userName: {
      ...FONTS.h2,
      color: COLORS.secondary,
      textAlign: 'center',
    },
    backButton: {
      padding: 5,
    },
    notificationContainer: {
      width: height * 0.07,
      height: height * 0.07,
      borderRadius: (height * 0.07) / 2,
      backgroundColor: COLORS.primary,
      borderWidth: 3,
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationDot: {
      position: 'absolute',
      bottom: -5,
      right: -3,
      width: height * 0.0209,
      height: height * 0.0209,
      borderRadius: 10,
      backgroundColor: COLORS.red,
      borderWidth: 2,
      borderColor: COLORS.secondary,
    },
  });
};
