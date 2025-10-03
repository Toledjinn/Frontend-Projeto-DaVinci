import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { OrderStatus } from '@/state/pedidosStore';

export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Aprovado':
    case 'Entregue':
      return '#10B981'; 
    case 'Pendente':
      return '#F59E0B';
    case 'Enviado':
      return '#3B82F6'; 
    case 'Cancelado':
      return '#EF4444';
    default:
      return COLORS.gray_400;
  }
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 0.75,
    marginBottom: SIZES.base * 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerName: {
    ...FONTS.h4,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  orderId: {
    ...FONTS.body13,
    color: COLORS.gray_400,
    marginTop: 2,
  },
  status: {
    ...FONTS.body7,
    fontWeight: '600',
    marginRight: SIZES.base,
  },
  chevron: {
    color: COLORS.gray_400,
  },
  productList: {
    marginBottom: SIZES.padding,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base * 1.5,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray_100,
    marginRight: SIZES.base * 1.5,
  },
  productName: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
  productQuantity: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginTop: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
    paddingTop: SIZES.base * 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    ...FONTS.body10,
    color: COLORS.gray_400,
  },
  footerValue: {
    ...FONTS.h4,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});

