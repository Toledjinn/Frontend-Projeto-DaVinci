import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getUserListItemStyles = (height: number) => {
  const itemHeight = height * 0.1;
  const imageSize = itemHeight * 0.7;

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
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize / 2,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.gray_100,
      marginRight: 12,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: imageSize / 2,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    nameText: {
      ...FONTS.body7,
      color: COLORS.secondary,
    },
    detailLabel: {
      ...FONTS.body8,
      color: COLORS.gray_400,
    },
    detailText: {
      ...FONTS.body11,
      color: COLORS.gray_400,
      top: 4,
    },
    alertIcon: {
      marginHorizontal: 8,
    },
    iconContainer: {
      paddingLeft: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
