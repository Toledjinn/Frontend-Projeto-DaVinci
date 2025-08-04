import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  halfInputWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  cepLoading: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
});