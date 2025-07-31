import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray_200,
  },
  dateText: {
    ...FONTS.body8,
    color: COLORS.gray_400,
  },
  timeText: {
    ...FONTS.body11,
    color: COLORS.secondary,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center'
  },
  iconContainer: {
    padding: 8,
  },
});
