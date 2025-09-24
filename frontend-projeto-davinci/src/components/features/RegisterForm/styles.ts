import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 8,                
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',          
  },
  inputWrapper: {
    marginBottom: 8,              
    width: '100%',
  },
  halfInputWrapper: {
    width: '48%',
    marginBottom: 8,              
  },
  cepLoading: {
    position: 'absolute',
    right: 15,
    top: 36,                        
  },
  allergyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  removeButton: {
    marginLeft: 10,
    paddingTop: 8,                  
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,             
    paddingHorizontal: 14,          
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 6,                   
    marginBottom: 12,               
  },
  addButtonText: {
    color: COLORS.white,
    ...FONTS.body7,
    marginLeft: 6,                  
  },
  croInput: { width: '48%' },
  ufPicker: { width: '48%' },
});
