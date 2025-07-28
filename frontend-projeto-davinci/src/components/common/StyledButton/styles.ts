import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: 24 
  },
  text: {
    ...FONTS.body2,
    color: '#FFC045', 
  },
});
