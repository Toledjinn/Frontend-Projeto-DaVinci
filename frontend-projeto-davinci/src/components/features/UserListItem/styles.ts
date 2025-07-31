import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getUserListItemStyles = (height: number) => {
  const itemHeight = height * 0.1;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.gray_200,
      padding: 12,
      marginBottom: 12,
      minHeight: itemHeight,
    },
    imageContainer: {
      width: itemHeight * 0.7,
      height: itemHeight * 0.7,
      borderRadius: (itemHeight * 0.7) / 2,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.gray_100,
      marginRight: 12,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    nameText: {
      ...FONTS.body7,
      color: COLORS.secondary,
    },
    detailText: {
      ...FONTS.body11,
      color: COLORS.gray_400,
      
    },
    iconContainer: {
      paddingLeft: 12,
    },
  });
};