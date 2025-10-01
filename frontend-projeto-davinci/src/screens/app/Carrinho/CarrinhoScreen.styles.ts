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
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyCartText: {
    ...FONTS.body9,
    color: COLORS.gray_400,
    marginTop: 10,
  },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
  itemPrice: {
    ...FONTS.body9,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
  quantityButtonText: {
    ...FONTS.body7,
    color: COLORS.white,
  },
  itemQuantityText: {
    ...FONTS.body9,
    color: COLORS.secondary,
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
    marginTop: 16,
  },
  totalText: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  totalValue: {
    ...FONTS.h2,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  checkoutButtonText: {
    ...FONTS.h2,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});