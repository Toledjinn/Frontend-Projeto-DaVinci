import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    ...FONTS.body9,
    color: COLORS.gray_400,
  },
  productDetailsContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  productImage: {
    width: 250,
    height: 250,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  productName: {
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  productBrand: {
    ...FONTS.body9,
    color: COLORS.gray_400,
    textAlign: 'center',
    marginBottom: 16,
  },
  productDescription: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  productPrice: {
    ...FONTS.h1,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: 24, 
  },
  addToCartText: {
    ...FONTS.h2,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'center',
  },
  quantityButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_400,
  },
  decrementButton: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  incrementButton: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  itemQuantityText: {
    ...FONTS.h2,
    color: COLORS.secondary,
    marginHorizontal: 24,
  },
});