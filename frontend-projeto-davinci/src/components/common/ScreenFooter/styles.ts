import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 45,
    paddingTop: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    marginLeft: 8, 
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    marginRight: 8,
  },
  primaryButtonText: {
    ...FONTS.body2,
    color: COLORS.secondary,
  },
  secondaryButtonText: {
    ...FONTS.body2,
    color: COLORS.primary,
  },
});
