import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 8, 
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  actionButtonContainer: {
    paddingHorizontal: 24,

  },
  
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    ...FONTS.body7,
    marginLeft: 6, 
  },
  recordContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 16,
    marginBottom: 24,
    top: 16
  },
  recordSectionTitle: {
    ...FONTS.body1,
    color: COLORS.secondary,
    textAlign: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
  },
  procedureItem: {
    paddingVertical: 12,
  },
  procedureSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
  },
  procedureTitle: {
    ...FONTS.body7,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  procedureDescription: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    lineHeight: 18,
  },
});