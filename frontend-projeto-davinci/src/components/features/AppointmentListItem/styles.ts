import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 16,
    marginBottom: 12,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray_200,
  },
  dateText: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
  timeText: {
    ...FONTS.body11,
    color: COLORS.gray_400,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  dentistText: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
  procedureText: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginVertical: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    ...FONTS.body8,
    marginLeft: 6,
  },
  iconContainer: {
    paddingLeft: 12,
  },
});