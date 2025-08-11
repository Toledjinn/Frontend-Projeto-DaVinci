// src/screens/app/Educational/EducationalScreen.styles.ts

import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  description: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 40,
    marginBottom: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%', // Aproximadamente um terço da tela
    alignItems: 'center',
    marginBottom: 25,
  },
  itemCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.gray_400,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // Sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});
