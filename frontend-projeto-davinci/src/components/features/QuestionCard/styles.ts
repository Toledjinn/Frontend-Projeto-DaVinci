import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    paddingBottom: 12
  },
  numberContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  numberText: {
    ...FONTS.body7,
    color: COLORS.white,
  },
  title: {
    ...FONTS.body4,
    color: COLORS.secondary,
    flex: 1,
  },
  editButton: {
  },
  body: {
  },
});