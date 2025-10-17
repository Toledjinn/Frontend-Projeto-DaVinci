import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  pageBody: {
    flex: 1,
    minHeight: 0,
  },
  pageBodySidePadding: {
    paddingHorizontal: 12,
  },

  card: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',

    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 16, 

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardScroll: {
    flex: 1,
    minHeight: 0,
  },
  cardScrollContent: {
    paddingBottom: 24,
  },

  productImage: {
    width: '100%',
    height: 260,
    borderRadius: SIZES.radius,
    marginBottom: 12,
  },

  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    ...FONTS.h1,
    color: COLORS.secondary,
    textAlign: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: 8,
  },
  sectionContent: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingVertical: 8,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    ...FONTS.ph1,
    color: COLORS.secondary,
  },
  detailValue: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'right',
  },

  footerContainer: {
    borderTopWidth: 1,
    borderColor: COLORS.gray_200,
    paddingTop: 16,
  },
  priceFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 48,
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  decrementButton: {
    backgroundColor: COLORS.pendente,
  },
  incrementButton: {
    backgroundColor: COLORS.secondary,
  },
  itemQuantityText: {
    ...FONTS.body8,
    color: COLORS.secondary,
    minWidth: 24,
    textAlign: 'center',
  },
  addButtonCompact: {
    flexGrow: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
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
});
