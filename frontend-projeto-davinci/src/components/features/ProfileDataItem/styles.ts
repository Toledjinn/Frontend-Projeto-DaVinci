import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
    width: '100%',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',     
    width: '100%',
    gap: 12,               
  },
  itemLabel: {
    ...FONTS.body4,
    color: COLORS.gray_400,
    flex: 1,                 
  },
  itemValue: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'right',
    flexShrink: 1,            
  },
  valueWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',  
    flexShrink: 1,
  },
});
