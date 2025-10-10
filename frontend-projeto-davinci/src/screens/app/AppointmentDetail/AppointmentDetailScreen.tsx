import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, useWindowDimensions, Text, View, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './AppointmentDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import AllergyWarning from '@/components/features/AllergyWarning';
import ProfileDataItem from '@/components/features/ProfileDataItem';
import StyledButton from '@/components/common/StyledButton';
import { COLORS } from '@/constants/theme';
import { formatUserName } from '@/utils/nameUtils';

import { useAppointments } from '@/hooks/useAppointments';
import { useUsers } from '@/hooks/useUsers';
import type { Appointment } from '@/data/appointmentsStore';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

export default function AppointmentDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.28;
  const { appointmentId, mode } = useLocalSearchParams<{ appointmentId: string; mode?: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { list: appointments, update, remove } = useAppointments();
  const { list: users } = useUsers();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<any | null>(null);
  const [dentist, setDentist] = useState<any | null>(null);

  const isReviewMode = mode === 'review';
  const isCancelled = appointment?.status === 'cancelada';
  const isPendente = appointment?.status === 'pendente';
  const isRealizada = appointment?.status === 'realizada';

  useEffect(() => {
    if (!appointmentId) return;
    const found = appointments.find((a) => a.id === appointmentId);
    setAppointment(found || null);

    if (found) {
      const p = users.find((u) => u.id === found.patientId);
      const d = users.find((u) => u.id === found.dentistId);
      setPatient(p || null);
      setDentist(d || null);
    }
  }, [appointmentId, appointments, users]);

  const hasAllergies = !!patient?.allergies?.length;

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        const firstName = formatUserName(patient.name);
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: isReviewMode ? `Revisar Solicitação` : `Consulta de ${firstName}`,
          userPhotoUri: patient.photoUri ?? null,
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
          showNotificationIcon: false,
        });
      }
    }, [patient, isReviewMode])
  );

  const handleCancelAppointment = () => {
    if (!appointment) return;
    Alert.alert(
      'Confirmar cancelamento',
      'Tem certeza que deseja cancelar esta consulta?',
      [
        { text: 'Voltar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: async () => {
            await update(appointment.id, { status: 'cancelada' });
            Alert.alert('Consulta cancelada.');
            router.back();
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    if (!appointment || !patient) return;
    router.push({
      pathname: '/(app)/schedule-appointment',
      params: {
        mode: 'reschedule',
        appointmentId: appointment.id,
        patientId: patient.id,
        dentistId: appointment.dentistId,
        specialty: appointment.specialty,
        date: appointment.date,
        time: appointment.time,
        observations: appointment.observations || '',
      },
    });
  };

  if (!appointment || !patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>Carregando consulta...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusInfo: Record<
    Appointment['status'],
    { text: string; color: string; icon: keyof typeof Feather.glyphMap }
  > = {
    agendada: { text: 'Agendada', color: COLORS.primary, icon: 'calendar' },
    realizada: { text: 'Realizada', color: COLORS.green, icon: 'check-circle' },
    cancelada: { text: 'Cancelada', color: COLORS.red, icon: 'x-circle' },
    pendente: { text: 'Pendente', color: COLORS.gray_400, icon: 'alert-circle' },
  };
  const currentStatus = statusInfo[appointment.status];

  const appointmentDetails = [
    { id: 'paciente', label: 'Paciente', value: patient.name },
    { id: 'dentista', label: 'Dentista', value: dentist?.name || 'Não informado' },
    {
      id: 'status',
      label: 'Status',
      value: (
        <View style={styles.statusContainer}>
          <Feather name={currentStatus.icon} size={14} color={currentStatus.color} />
          <Text style={[styles.statusText, { color: currentStatus.color }]}>{currentStatus.text}</Text>
        </View>
      ),
    },
    { id: 'especialidade', label: 'Especialidade', value: appointment.specialty },
    { id: 'data', label: 'Data', value: appointment.date },
    { id: 'hora', label: 'Horário', value: appointment.time },
    { id: 'obs', label: 'Observações', value: appointment.observations || 'Nenhuma' },
  ];

  const RenderAppointmentDetails = () => (
    <>
      {hasAllergies && <AllergyWarning allergies={patient.allergies} />}
      {appointmentDetails.map((detail) => (
        <ProfileDataItem key={detail.id} label={detail.label} value={detail.value} />
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <RenderAppointmentDetails />
      </ScrollView>

      {!isRealizada && !isCancelled && !isPendente && (
        <View style={styles.actionButtonContainer}>
          <StyledButton
            title="Iniciar Atendimento"
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: '/(app)/consultation',
                params: { appointmentId: appointment.id },
              })
            }
          />
        </View>
      )}

      {!isRealizada && (
        <ScreenFooter
          buttons={[
            {
              title: 'Cancelar',
              onPress: handleCancelAppointment,
              variant: 'secondary',
            },
            {
              title: 'Reagendar',
              onPress: handleReschedule,
              variant: 'primary',
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}
