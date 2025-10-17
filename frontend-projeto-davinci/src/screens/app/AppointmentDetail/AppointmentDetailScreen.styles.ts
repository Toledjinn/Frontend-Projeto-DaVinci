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
  contentContainer: {
    paddingHorizontal: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    ...FONTS.body7,
    marginLeft: 6,
  },

  actionButtonContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
  },

  reportContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
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
  metaColDivider: {
    borderRightWidth: 1,
    borderRightColor: COLORS.gray_200,
  },
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
  metaValueCentered: {
    ...FONTS.body7,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  dentistTitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
    textAlign: 'center',
    paddingTop: 12,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_200,
    marginBottom: 4,
  },

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

  sectionTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginTop: 8,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    textAlign: 'center',
  },

  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginRight: 8,
    lineHeight: 20,
  },
  listText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    flex: 1,
  },

  mediaRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  mediaThumb: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: COLORS.gray_100,
  },

  viewerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  viewerHeader: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewerCloseBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  viewerCloseText: {
    ...FONTS.body8,
    color: COLORS.white,
  },
  viewerPager: {
    flex: 1,
  },
  viewerSlideBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerImg: {
    resizeMode: 'contain',
  },
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
