import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  pageBody: {
    flex: 1,
    minHeight: 0,
  },

  pageBodySidePadding: {
    paddingHorizontal: 12,
  },
  
  scrollView: { flex: 1 },
  
  card: {
    flex: 1,               
    minHeight: 0,
    width: '100%',         
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12, 
    paddingVertical: 16,    

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  paragraph: {
    ...FONTS.body15,
    color: COLORS.secondary,
    lineHeight: 22,
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.black,
  },
  video: { flex: 1 },

  depoimentoText: {
    ...FONTS.body15,
    color: COLORS.secondary,
    marginBottom: SIZES.base,
  },
  author: {
    ...FONTS.body6,
    color: COLORS.gray_400,
    textAlign: 'right',
  },

  contentContainer: {
    paddingHorizontal: SIZES.padding,
  },
});
