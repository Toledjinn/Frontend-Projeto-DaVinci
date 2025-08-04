import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getSearchAndFilterBarStyles = (screenHeight: number) => {
  const barHeight = screenHeight * 0.048;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8                                                                                                                                                                    , 
      marginBottom: 8, 
    },
    filterButton: {
      height: barHeight,
      width: barHeight,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 8,
      marginRight: 12,
      borderWidth: 1,
      borderColor: COLORS.gray_200,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.gray_200,
      paddingHorizontal: 12,
      height: barHeight,
    },
    searchInput: {
      flex: 1,
      ...FONTS.body10,
      color: COLORS.secondary,
      paddingVertical: 0,
      textAlignVertical: 'center'
    },
    searchIcon: {
      marginLeft: 0,
    },
    inputWrapper: {
      flex: 1,
      justifyContent: 'center',
    },
  });
};
