import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

export const styles = StyleSheet.create({
  headerContainer: {
    top: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    width: '100%',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    top: 2
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    marginLeft: 10,
  },
  userName: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  backButton: {
    padding: 5,
  },
  notificationContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.gray_500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    bottom: -5,
    right: -3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    borderWidth: 2,
    borderColor: COLORS.gray_500
  },
});
