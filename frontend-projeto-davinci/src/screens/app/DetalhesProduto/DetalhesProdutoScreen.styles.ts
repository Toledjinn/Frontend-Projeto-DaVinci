import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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

  productImage: {
    width: '100%',
    height: 260,
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
    paddingVertical: 12
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 12,
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
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
  priceFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 8
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
  section: {
    paddingVertical: 20
  },
  sectionTitle: {
    ...FONTS.h1,
    color: COLORS.secondary,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.gray_400, 
    paddingTop: 24,
    paddingBottom: 8
  },
  sectionContent: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingVertical: 12,
  },
});
