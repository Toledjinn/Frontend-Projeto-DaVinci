import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  bodyList: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
  },
  sectionTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  sectionSubtitle: {
    ...FONTS.body9,
    color: COLORS.gray_400,
  },
  sectionBody: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaThumb: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: COLORS.gray_100,
    marginRight: 10,
    marginBottom: 10,
  },
  emptyContainer: {
    paddingTop: 24,
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.body5,
    color: COLORS.secondary,
    marginBottom: 6,
  },
  emptySubtext: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    textAlign: 'center',
  },
  viewerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  viewerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 28,
    paddingHorizontal: 16,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  viewerCloseBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  viewerCloseText: {
    ...FONTS.body8,
    color: '#fff',
  },
  viewerPager: { flex: 1 },
  viewerSlideBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewerImg: {
    resizeMode: 'contain',
  },
});
