import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
    width: '100%',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    ...FONTS.body3,
    color: COLORS.gray_400,
    width: '50%', 
  },
  itemValue: {
    ...FONTS.body9,
    color: COLORS.secondary,
    width: '50%', 
    textAlign: 'right',
  },
});
