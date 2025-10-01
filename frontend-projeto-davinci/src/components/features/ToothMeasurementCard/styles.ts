import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: 12,
    overflow: 'hidden', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    ...FONTS.body1,
    color: COLORS.secondary,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
  },
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  inputContainer: {
    width: '30%', 
    marginBottom: 12,
  },
  inputLabel: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginBottom: 4,
  },
  textInput: {
    ...FONTS.body7,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    borderRadius: 6,
    height: 40,
    textAlign: 'center',
  },
  textNormal: {
    color: COLORS.secondary,
  },
  textAlert: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
});