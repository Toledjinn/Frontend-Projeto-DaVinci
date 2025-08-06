import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEE2E2', 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...FONTS.body4,
    color: COLORS.red,
    marginBottom: 4,
  },
  allergyItem: {
    ...FONTS.body10,
    color: COLORS.secondary,
  },
});
