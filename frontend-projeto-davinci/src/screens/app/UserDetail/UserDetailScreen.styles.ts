import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    top: -20
  },
  contentContainer: {
    paddingBottom: 40,
  },
  centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  mainContent: {
    paddingHorizontal: 24,
    top: -32
  },
  inlineFooter: {
    paddingTop: 0, 
    paddingBottom: 16, 
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  }
});
