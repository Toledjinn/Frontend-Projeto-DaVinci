import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    ...FONTS.body13,
    color: COLORS.gray_400,
    marginBottom: 4,
  },
  titleText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  snippetText: {
    ...FONTS.body11,
    color: COLORS.gray_400,
  },
  iconContainer: {
    paddingLeft: 12,
  },
});
