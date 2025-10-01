import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import { TreatmentPlanStep } from '@/data/mockTreatmentPlans';
import { findUserById } from '@/data/mockUsers';
import { ALL_PROCEDURES } from '@/data/mockProcedures';

type TreatmentPlanStepItemProps = {
  item: TreatmentPlanStep;
  stepNumber: number;
  isLocked: boolean;
  onPress: () => void;
};

const statusInfo: { [key in TreatmentPlanStep['status']]: { text: string; color: string; icon: any } } = {
    agendada: { text: 'Agendada', color: COLORS.primary, icon: 'calendar' },
    realizada: { text: 'Realizada', color: COLORS.green, icon: 'check-circle' },
    pendente: { text: 'Pendente', color: COLORS.gray_400, icon: 'alert-circle' },
};

export default function TreatmentPlanStepItem({ item, stepNumber, isLocked, onPress }: TreatmentPlanStepItemProps) {
  const dentist = findUserById(item.dentistId);
  const currentStatus = statusInfo[item.status];
  const procedureLabels = item.procedures
    .map(procValue => ALL_PROCEDURES.find(p => p.value === procValue)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={isLocked} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title}>Etapa {stepNumber}</Text>
        <TouchableOpacity>
          <Feather name="edit-2" size={20} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Dentista:</Text><Text style={styles.infoValue}>{dentist?.name}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Especialidade:</Text><Text style={styles.infoValue}>{item.specialty}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Procedimentos:</Text><Text style={styles.infoValue}>{procedureLabels}</Text></View>
      </View>
      <View style={styles.statusContainer}>
        <Feather name={currentStatus.icon} size={14} color={currentStatus.color} />
        <Text style={[styles.statusText, { color: currentStatus.color }]}>{currentStatus.text}</Text>
      </View>

      {isLocked && (
        <View style={styles.lockedOverlay}>
          <Feather name="lock" size={32} color={COLORS.secondary} />
        </View>
      )}
    </TouchableOpacity>
  );
}