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
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productDetailsTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
  productPrice: {
    ...FONTS.h2,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  productBrand: {
    ...FONTS.body10,
    color: COLORS.gray_400,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decrementButton: {
    backgroundColor: COLORS.red,
  },
  incrementButton: {
    backgroundColor: COLORS.green,
  },
  itemQuantityText: {
    ...FONTS.body9,
    color: COLORS.secondary,
    marginHorizontal: 8,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addToCartText: {
    ...FONTS.body10,
    color: COLORS.black,
    marginLeft: 4,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noProductsText: {
    ...FONTS.body9,
    color: COLORS.gray_400,
    textAlign: 'center',
  },
});