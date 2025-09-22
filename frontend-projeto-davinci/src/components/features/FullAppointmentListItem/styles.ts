import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    padding: 16,
    marginBottom: 12,
    minHeight: 88, 
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray_100,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 65, 
  },
  patientName: {
    ...FONTS.body7,
    color: COLORS.secondary,
  },
  dentistName: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginVertical: 2,
  },
  specialty: {
    ...FONTS.body11,
    color: COLORS.gray_400,
  },
  statusContainer: {
    position: 'absolute', 
    bottom: 8,           
    right: 8,          
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    ...FONTS.body8, 
    fontSize: 11,
    marginLeft: 5,
    textTransform: 'capitalize',
  },
  alertIcon: {
    marginLeft: 12,
  },
});