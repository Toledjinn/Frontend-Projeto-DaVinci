import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { AppointmentStatus } from '@/data/mockAppointments';

export const getStatusStyle = (status: AppointmentStatus) => {
  switch (status) {
    case 'realizada':
      return { color: '#10B981', icon: 'check-circle' as const };
    case 'agendada':
      return { color: '#F59E0B', icon: 'calendar' as const };
    case 'cancelada':
      return { color: '#EF4444', icon: 'x-circle' as const };
    case 'pendente':
    default:
      return { color: COLORS.gray_400, icon: 'alert-circle' as const };
  }
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.base * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray_100,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray_200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: SIZES.base * 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 70, // Garante altura mínima para o alinhamento
  },
  patientName: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  detailText: {
    ...FONTS.body11,
    color: COLORS.gray_400,
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    ...FONTS.body8,
    marginLeft: 6,
    fontWeight: '500',
  },
  dateTimeContainer: {
    position: 'absolute',
    bottom: SIZES.padding / 2,
    right: SIZES.padding / 2,
    flexDirection: 'row',   // Adiciona esta linha para alinhar na horizontal
    alignItems: 'center',     // Altera de 'flex-end' para 'center' para o alinhamento vertical
  },
  dateText: {
    ...FONTS.body8,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  timeText: {
    ...FONTS.body13,
    color: COLORS.gray_400,
  },
  chevronContainer: {
    paddingLeft: SIZES.base,
  },
  chevron: {
    color: COLORS.gray_400,
  },
});

