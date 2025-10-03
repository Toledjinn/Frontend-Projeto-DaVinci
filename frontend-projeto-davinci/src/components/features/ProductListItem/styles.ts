import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.base * 1.5,
    borderWidth: 1,
    borderColor: COLORS.gray_100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 88,
    gap: SIZES.base,
  },

  imageWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.gray_100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },

  textCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  name: {
    ...FONTS.body7,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  brand: {
    ...FONTS.body11,
    color: COLORS.gray_400,
  },
  price: {
    ...FONTS.body7,
    color: COLORS.red ?? '#F59E0B',
    fontWeight: '700',
    marginTop: 4,
  },

  chevron: { color: COLORS.gray_400 },
});
