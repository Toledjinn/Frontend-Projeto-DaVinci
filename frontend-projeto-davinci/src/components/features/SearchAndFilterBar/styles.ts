import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base * 1.5,
    paddingVertical: SIZES.base * 1.5,
    marginTop: 20,
    marginBottom: SIZES.padding,
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
    paddingVertical: 0, 
    marginLeft: SIZES.base,
    marginRight: SIZES.base,
    textAlignVertical: 'center',
  },
});

