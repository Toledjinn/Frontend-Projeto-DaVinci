import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/constants/theme';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
  },
});