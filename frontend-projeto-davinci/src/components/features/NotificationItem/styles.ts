import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.base * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray_100,
    minHeight: 85, 
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base * 1.5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 5,
  },
  notificationText: {
    ...FONTS.body11,
    color: COLORS.secondary,
    lineHeight: 18,
  },
  dateTimeContainer: {
  position: 'absolute',
  bottom: SIZES.padding / 2,
  right: SIZES.padding / 2,
  flexDirection: 'row',
  alignItems: 'center',
  },
  dateText: {
    ...FONTS.body8,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  timeText: {
    ...FONTS.body13,
    color: COLORS.gray_400,
  },
  chevronContainer: {
    paddingLeft: SIZES.base,
  },
  chevron: {
    color: COLORS.gray_400,
  },
});