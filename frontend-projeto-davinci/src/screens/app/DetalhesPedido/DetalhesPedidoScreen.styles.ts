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
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.secondary,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    paddingBottom: 8,
  },
  customerName: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  customerAddress: {
    ...FONTS.body10,
    color: COLORS.gray_400,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
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
    ...FONTS.body9,
    color: COLORS.secondary,
  },
  productDetails: {
    ...FONTS.body11,
    color: COLORS.gray_400,
  },
  productTotal: {
    ...FONTS.body9,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    ...FONTS.body9,
    color: COLORS.gray_400,
  },
  summaryValue: {
    ...FONTS.h4,
    color: COLORS.secondary,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    backgroundColor: COLORS.white,
    marginBottom: 8,
    minWidth: '48%',
    alignItems: 'center',
  },
  statusButtonSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  statusButtonText: {
    ...FONTS.body10,
    color: COLORS.secondary,
  },
  statusButtonTextSelected: {
    color: COLORS.white,
  },
});

