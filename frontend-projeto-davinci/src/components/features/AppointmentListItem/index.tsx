import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles, getStatusStyle } from './styles';
import { Appointment } from '@/data/mockAppointments';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

export type AppointmentListItemProps = {
  item: Appointment & { patientName?: string; patientImage?: any };
  onPress: () => void;
};

export default function AppointmentListItem({ item, onPress }: AppointmentListItemProps) {
  const { icon, color } = getStatusStyle(item.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {item.patientImage ? (
          <Image source={item.patientImage} style={styles.image} />
        ) : (
          <UserPlaceholder width="100%" height="100%" />
        )}
      </View>

      <View style={styles.contentContainer}>
        {/* Informações Principais */}
        <View>
          <Text style={styles.patientName} numberOfLines={1}>{item.patientName || 'Paciente'}</Text>
          <Text style={styles.detailText}>{item.dentist}</Text>
          <Text style={styles.detailText}>{item.specialty}</Text>
        </View>

        {/* Rodapé do Card */}
        <View style={styles.footer}>
          <View style={styles.statusContainer}>
            <Feather name={icon} size={14} color={color} />
            <Text style={[styles.statusText, { color }]}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chevronContainer}>
        <Feather name="chevron-right" size={24} color={styles.chevron.color} />
      </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.timeText}> - </Text> 
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
    </TouchableOpacity>
  );
}

