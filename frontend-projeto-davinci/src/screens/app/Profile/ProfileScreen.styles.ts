import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContentContainer: {
    flexGrow: 1, 
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
  },

  itemLabel: {
    ...FONTS.body3,
    color: COLORS.gray_500,
  },
  itemValue: {
    ...FONTS.body3,
    color: COLORS.gray_500,
  },
});
