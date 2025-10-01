import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingBottom: 180,
  },
  galleryContainer: {
    backgroundColor: COLORS.gray_100,
    position: 'relative',
  },
  productImage: {
    aspectRatio: 1.4,
    resizeMode: 'contain',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: SIZES.base,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray_200,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  infoContainer: {
    padding: SIZES.padding,
  },
  productName: {
    ...FONTS.h1,
    color: COLORS.secondary,
    marginBottom: SIZES.base,
    lineHeight: 38,
  },
  specsContainer: {
    marginBottom: 0,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  specLabel: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    width: '30%',
  },
  specValue: {
    ...FONTS.body11,
    color: COLORS.secondary,
    fontWeight: 'bold',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_100,
    marginVertical: SIZES.base / 2,
  },
  descriptionTitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
    marginBottom: SIZES.base,
  },
  
  productDescription: {
    ...FONTS.body13,
    color: COLORS.secondary,
    lineHeight: 22, 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
  },
  topFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.radius,
  },
  quantityButton: {
    padding: SIZES.base,
    minWidth: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemQuantityText: {
    ...FONTS.h3,
    color: COLORS.secondary,
    paddingHorizontal: SIZES.base,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    ...FONTS.body13,
    color: COLORS.gray_400,
  },
  footerPrice: {
    ...FONTS.h2,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  addToCartButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base * 1.5,
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addToCartText: {
    ...FONTS.h4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    ...FONTS.h3,
    color: COLORS.gray_400,
  },
});