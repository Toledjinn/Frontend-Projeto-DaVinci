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
    paddingHorizontal: 12,
    paddingBottom: 24,
    alignItems: 'center',
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 680,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: COLORS.gray_200,
    paddingBottom: 8,
    marginBottom: 4,
  },
  titleText: {
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: 'center',
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
    marginBottom: 24,
  },
  productItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.gray_100,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...FONTS.body6,
    color: COLORS.secondary,
  },
  productDetails: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    width: '90%'
  },

  rightCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productTotal: {
    ...FONTS.body5,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  quantityButtonL: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pendente,
  },
  quantityButtonR: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  itemQuantityText: {
    ...FONTS.body8,
    color: COLORS.secondary,
    minWidth: 22,
    textAlign: 'center',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: COLORS.gray_200,
    paddingTop: 16,
    paddingBottom: 16,
  },
  summaryLabel: {
    ...FONTS.ph2,
    color: COLORS.secondary,
  },
  footer: {
    paddingTop: 16
  },
  summaryValue: {
    ...FONTS.ph1,
    color: COLORS.secondary,
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
});
