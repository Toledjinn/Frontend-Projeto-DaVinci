import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const getRiskLevelIndicatorStyles = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'center',
    },
    text: {
      ...FONTS.body8,
      color: COLORS.white,
    },
    baixo: {
      backgroundColor: '#3B82F6',
    },
    moderado: {
      backgroundColor: '#F59E0B', 
    },
    alto: {
      backgroundColor: '#EF4444', 
    },
  });
};
