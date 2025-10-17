import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  dateText: {
    ...FONTS.body4,
    color: COLORS.secondary,
  },
  dentistText: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.secondary,
    marginTop: 16,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    textAlign: 'center',
  },
  toothTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginTop: 16,
    textAlign: 'center',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: COLORS.gray_200,
    rowGap: 8, 
  },

  cellContainer: {
    width: '33.333%',
    borderBottomWidth: 1,
    borderColor: COLORS.gray_200,
    borderRightWidth: 1,
    borderLeftWidth: 1, 
  },

  labelContainer: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 4,
    alignItems: 'center',
  },
  labelText: {
    ...FONTS.body11,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  valueContainer: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  valueText: {
    ...FONTS.body7,
  },
  textNormal: {
    color: COLORS.secondary,
  },
  textAlert: {
    color: COLORS.red,
  },
});
