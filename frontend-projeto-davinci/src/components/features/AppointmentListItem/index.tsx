import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import { Appointment } from '@/data/mockAppointments';

type AppointmentListItemProps = {
  item: Appointment;
  onPress: () => void;
};

const AppointmentListItem = React.memo(({ item, onPress }: AppointmentListItemProps) => {
  const statusInfo = {
    realizada: { text: 'Realizada', color: COLORS.green, icon: 'check-circle' as const },
    agendada: { text: 'Agendada', color: COLORS.primary, icon: 'calendar' as const },
    cancelada: { text: 'Cancelada', color: COLORS.red, icon: 'x-circle' as const },
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.dentistText}>{item.dentist}</Text>
        <Text style={styles.procedureText} numberOfLines={1}>
          {item.procedures.join(', ')}
        </Text>
        <View style={styles.statusContainer}>
          <Feather name={statusInfo[item.status].icon} size={14} color={statusInfo[item.status].color} />
          <Text style={[styles.statusText, { color: statusInfo[item.status].color }]}>
            {statusInfo[item.status].text}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Feather name="eye" size={28} color={COLORS.gray_400} />
      </View>
    </TouchableOpacity>
  );
});

export default AppointmentListItem;
