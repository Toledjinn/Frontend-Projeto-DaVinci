import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    paddingVertical: 14,
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
    width: '60%'            
  },
  valueWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',  
    flexShrink: 1,
  },
});
