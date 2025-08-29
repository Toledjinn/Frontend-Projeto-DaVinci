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
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
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
    color: COLORS.secondary, 
  },
  timeText: {
    ...FONTS.body11,
    color: COLORS.gray_400, 
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16, 
  },
  notificationText: {
    ...FONTS.body11,
    color: COLORS.secondary,
    textAlign: 'left',
    lineHeight: 18, 
  },
});
