import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  contentContainer: { paddingHorizontal: 12, paddingBottom: 40 },

  emptyText: {
    ...FONTS.body10,
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.gray_400,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: 12,
    overflow: 'hidden',
  },

  cardHeaderTouchable: { paddingHorizontal: 16, paddingVertical: 14 },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftRightWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  cardTitle: { ...FONTS.body3, color: COLORS.secondary },
  cardSubtitle: { ...FONTS.body9, color: COLORS.gray_400 },

  chevronWrap: { marginLeft: 10, marginTop: 2 },

  headerDivider: { height: 1, backgroundColor: COLORS.gray_100, marginTop: 12 },

  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 10,
  },

  reportTitle: {
    ...FONTS.body1,
    color: COLORS.secondary,
    textAlign: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
    marginBottom: 8,
  },

  metaRowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaColCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  metaColDivider: { borderRightWidth: 1, borderRightColor: COLORS.gray_200 },
  metaTitleCentered: {
    ...FONTS.body4,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  metaTitleDivider: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: COLORS.gray_200,
    marginBottom: 6,
  },
  metaValueCentered: { ...FONTS.body7, color: COLORS.secondary, textAlign: 'center' },

  sectionHeaderTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 4,
    paddingTop: 24,
  },
  sectionHeaderDivider: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: COLORS.gray_200,
    marginBottom: 8,
  },

  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: { ...FONTS.body7, color: COLORS.secondary, marginRight: 8, lineHeight: 20 },
  listText: { ...FONTS.body7, color: COLORS.secondary, flex: 1 },

  mediaRow: { flexDirection: 'row', marginTop: 8 },
  mediaThumb: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: COLORS.gray_100,
  },

  actionRow: { flexDirection: 'row', gap: 8, paddingTop: 8 },
});

export const periStyles = StyleSheet.create({
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
  valueText: { ...FONTS.body7 },
  textNormal: { color: COLORS.secondary },
  textAlert: { color: COLORS.red },
});
