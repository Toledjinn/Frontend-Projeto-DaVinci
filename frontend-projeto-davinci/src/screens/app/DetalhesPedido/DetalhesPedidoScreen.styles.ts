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
    marginTop: 30,
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
    ...FONTS.h2,
    color: COLORS.secondary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
  },
  productImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 8,
  },
  productName: {
    ...FONTS.body9,
    color: COLORS.secondary,
  },
  productDetails: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginTop: 2,
  },
  productTotal: {
    ...FONTS.body9,
    color: COLORS.secondary,
    fontWeight: 'bold',
    minWidth: 80, 
    textAlign: 'right',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    ...FONTS.body9,
    color: COLORS.gray_400,
  },
  summaryValue: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, 
  },
  statusButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.gray_200,
    backgroundColor: COLORS.white,
    flex: 1,
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
    fontWeight: '600',
  },
  statusButtonTextSelected: {
    color: COLORS.white,
  },
  statusButtonCancel: {
    backgroundColor: COLORS.red, 
    borderColor: COLORS.red,
  },
  statusButtonTextCancel: {
    color: COLORS.white, 
  },
});