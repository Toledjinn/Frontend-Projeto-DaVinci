import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    ...FONTS.body1,
    color: COLORS.secondary,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  item: {
    width: '33%', 
    marginBottom: 12,
  },
  label: {
    ...FONTS.body11,
    color: COLORS.gray_400,
  },
  value: {
    ...FONTS.body7,
  },
  textNormal: {
    color: COLORS.secondary,
  },
  textAlert: {
    color: COLORS.red,
  },
});