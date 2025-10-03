import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100, // Espaço para o footer
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base * 1.5,
    marginTop: 20, // Espaço abaixo do header
    marginBottom: SIZES.padding, // Espaço antes da lista de pedidos
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
  },
  searchInput: {
      flex: 1,
      ...FONTS.body10,
      color: COLORS.secondary,
      paddingVertical: SIZES.base * 1.5,
      textAlignVertical: 'center',
      marginLeft: SIZES.base,
      marginRight: SIZES.base,
    },

  emptyText: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    textAlign: 'center',
    marginTop: 48,
  },
});

