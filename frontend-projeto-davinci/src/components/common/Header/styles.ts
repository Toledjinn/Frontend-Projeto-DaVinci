import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const getHeaderStyles = (height: number) => {
  const circleDiameter = height * 0.115;
  const notificationCircle = height * 0.085;


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
      width: circleDiameter,
      height: circleDiameter,
      borderRadius: circleDiameter / 2,
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
      width: notificationCircle,
      height: notificationCircle,
      borderRadius: notificationCircle / 2,
      backgroundColor: COLORS.primary,
      borderWidth: 3,
      borderColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationIcon: {
      width: notificationCircle,
      height: notificationCircle,
    },

    notificationDot: {
      position: 'absolute',
      bottom: -5,
      right: -3,
      width: height * 0.025,
      height: height * 0.025,
      borderRadius: height * 0.015,
      backgroundColor: COLORS.red,
      borderWidth: 2,
      borderColor: COLORS.secondary,
    },
  });
};
