import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  pageBody: { flex: 1, minHeight: 0 },
  pageBodySidePadding: { paddingHorizontal: 12 },

  card: {
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    paddingHorizontal: 16, 
    paddingVertical: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 680,
  },

  slidePage: {
    minHeight: 0,
  },

  slideScroll: { flex: 1, minHeight: 0 },
  slideScrollContent: { paddingVertical: 16 },

  slideTitle: { ...FONTS.h1, color: COLORS.secondary, textAlign: 'center', marginBottom: 16 },
  slideImage: { width: '100%', height: 200, borderRadius: SIZES.radius, marginBottom: 16, alignSelf: 'center' },
  slideText: { ...FONTS.body9, color: COLORS.secondary, textAlign: 'center', marginBottom: 16, lineHeight: 22 },
  slideQuote: { ...FONTS.body6, fontStyle: 'italic', textAlign: 'center', marginBottom: 8, color: COLORS.gray_400, paddingHorizontal: 16 },
  slideAuthor: { ...FONTS.body7, textAlign: 'center', marginBottom: 16, color: COLORS.secondary },
  slideListTitle: { ...FONTS.h2, color: COLORS.secondary, textAlign: 'center', marginBottom: 16 },
  slideBullet: { ...FONTS.body10, color: COLORS.secondary, marginBottom: 8, lineHeight: 20, textAlign: 'left', paddingHorizontal: 16 },
  beforeAfterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  beforeAfterImage: { width: '48%', height: 150, borderRadius: SIZES.radius },
  imageGallery: { alignItems: 'center', marginBottom: 16 },
  galleryImage: { width: '90%', height: 150, borderRadius: SIZES.radius, marginBottom: 12 },
  imageGridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  gridImage: { width: 100, height: 100, margin: 4, borderRadius: SIZES.radius },

  paginationContainer: { height: 56, alignItems: 'center', justifyContent: 'center' },
  dotsRow: { flexDirection: 'row', alignItems: 'center' },
  dotBase: { marginHorizontal: 6 },

  emptyText: { ...FONTS.body10, color: COLORS.gray_400, textAlign: 'center' },
});
