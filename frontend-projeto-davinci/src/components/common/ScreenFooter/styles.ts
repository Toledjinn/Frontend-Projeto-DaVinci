import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 45,
    paddingTop: 20,
    backgroundColor: COLORS.background,
  },
  footerContainerSingle: {
    justifyContent: 'center',
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonFlex: {
    flex: 1,
  },
  buttonSingle: {
    width: '80%',
  },
  primaryButton: {
    backgroundColor: COLORS.secondary,
  },
  primaryButtonText: {
    ...FONTS.body2,
    color: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButtonText: {
    ...FONTS.body2,
    color: COLORS.secondary,
  },
  primaryMargin: {
    marginLeft: 8,
  },
  secondaryMargin: {
    marginRight: 8,
  },
});
