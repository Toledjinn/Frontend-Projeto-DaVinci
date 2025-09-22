import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import { Appointment } from '@/data/mockAppointments';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

type FullAppointmentListItemProps = {
  item: Appointment & {
    patientName: string;
    patientImage: React.FC<SvgProps> | null;
    hasAllergies: boolean;
  };
  onPress: () => void;
};

const FullAppointmentListItem = React.memo(({ item, onPress }: FullAppointmentListItemProps) => {
  const PatientImage = item.patientImage || UserPlaceholder;

  const statusInfo = {
    realizada: { text: 'Realizada', color: COLORS.green, icon: 'check-circle' as const },
    agendada: { text: 'Agendada', color: COLORS.primary, icon: 'calendar' as const },
    cancelada: { text: 'Cancelada', color: COLORS.red, icon: 'x-circle' as const },
    pendente: { text: 'Pendente', color: COLORS.gray_400, icon: 'alert-circle' as const },
  };

  const currentStatus = statusInfo[item.status];

  if (!currentStatus) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <PatientImage width="100%" height="100%" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.patientName} numberOfLines={1}>{item.patientName}</Text>
        <Text style={styles.dentistName} numberOfLines={1}>{item.dentist}</Text>
        <Text style={styles.specialty} numberOfLines={1}>{item.specialty}</Text>
      </View>
      
      {item.hasAllergies && (
        <Feather name="alert-triangle" size={24} color={COLORS.red} style={styles.alertIcon} />
      )}

      {currentStatus && (
        <View style={styles.statusContainer}>
            <Feather name={currentStatus.icon} size={12} color={currentStatus.color} />
            <Text style={[styles.statusText, { color: currentStatus.color }]}>
                {currentStatus.text}
            </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

export default FullAppointmentListItem;