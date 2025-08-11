// src/screens/app/Chefinho/ChefinhoScreen.styles.ts

import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 250, // Aumentado para descer mais o conteúdo
  },
  carousel: {
    flexGrow: 0,
  },
  carouselContent: {
    alignItems: 'center',
  },
  slide: {
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'flex-start', // Alterado para alinhar os cards no topo
    minHeight: 450, // Adicionado para dar uma altura consistente ao slide
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  // Layout 1
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  quote: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  author: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    alignSelf: 'flex-end',
  },
  // Layout 2
  text1: {
    ...FONTS.body10,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  text2: {
    ...FONTS.body11,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  newImage: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
  },
  // Layout 3
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  smallIcon: {
    marginHorizontal: 5,
  },
  listTitle: {
    ...FONTS.body7,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  bullet: {
    ...FONTS.body10,
    color: COLORS.secondary,
    marginRight: 8,
    lineHeight: 20, // Alinha a bolinha com o texto
  },
  bulletText: {
    ...FONTS.body10,
    color: COLORS.secondary,
    flex: 1, // Permite que o texto quebre a linha corretamente
    lineHeight: 20,
  },
  // --- FIM DOS ESTILOS ---
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
