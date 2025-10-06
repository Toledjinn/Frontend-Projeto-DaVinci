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
    gap: 12,
    paddingBottom: 24
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
    alignSelf: 'center',
    width: '100%',
    maxWidth: 680,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  
    position: 'relative',     
    borderBottomWidth: 1,
    borderColor: COLORS. gray_200, 
    paddingBottom: 8 
  },
  iconButton: {
    borderRadius: 8,
    position: 'absolute', 
    right: 0,              
    top: -4,                 
  },
  titleText: {
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  customerName: {
    ...FONTS.body6,
    color: COLORS.secondary,
    marginBottom: 4,
    textAlign: 'center',
    paddingTop: 16
  },
  customerAddress: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  productItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.gray_100
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
  },
  productTotal: {
    ...FONTS.body9,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: COLORS.gray_200,
    paddingTop: 16,
    marginTop: 8
  },
  summaryLabel: {
    ...FONTS.ph2,
    color: COLORS.secondary,
  },
  summaryValue: {
    ...FONTS.ph1,
    color: COLORS.secondary,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 16
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

  statusView: {
    alignItems: 'center',
    paddingTop: 16
  },
  statusChip: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: COLORS.gray_100,
  },
  statusChipText: {
    ...FONTS.ph3,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
