import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '19.3%',
    paddingBottom: '61%',
  },
  form: {
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: width * 0.25, 
    height: height * 0.05,
    zIndex: 10,
  },
  changeButton: {
    marginVertical: 20,
    top: 12,
  },
  inputWrapper: {
    marginBottom: 4,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  icon: {
    marginRight: 20,
  },
  placeholder: {
    ...FONTS.body12,
    color: COLORS.gray_400,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  errorPlaceholder: {
    height: 16,
  },
});
