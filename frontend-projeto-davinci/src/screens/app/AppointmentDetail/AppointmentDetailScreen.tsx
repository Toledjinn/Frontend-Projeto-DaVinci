import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './AppointmentDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import { findUserById, UserProfile, getUsers } from '@/data/mockUsers';
import { getAppointmentById, Appointment } from '@/data/mockAppointments';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';
import ProfileDataItem from '@/components/features/ProfileDataItem';
import { ALL_PROCEDURES } from '@/data/mockProcedures'; 


export default function AppointmentDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { appointmentId, mode } = useLocalSearchParams<{ appointmentId: string, mode?: string }>(); 
  const isReviewMode = mode === 'review'; 
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (appointmentId) {
      const foundAppointment = getAppointmentById(appointmentId);
      if (foundAppointment) {
        setAppointment(foundAppointment);
        const foundPatient = findUserById(foundAppointment.patientId);
        if (foundPatient) {
          setPatient(foundPatient);
        }
      }
    }
  }, [appointmentId]);

  const hasAllergies = patient?.allergies && patient.allergies.length > 0;

  useFocusEffect(
    React.useCallback(() => {
      if (patient) {
        const firstName = patient.name.split(' ')[0];
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: `Agendamento de ${firstName}`,
          UserImageSvg: patient.image || UserPlaceholder,
          showNotificationIcon: false,
          riskLevel: patient.riskLevel,
        });
      }
    }, [patient])
  );

  const handleCancelAppointment = () => {
    alert('Consulta cancelada (simulação)');
    router.back();
  };

  const handleReschedule = () => {
    if (!appointment || !patient) return;

    const dentists = getUsers('dentist');
    const dentist = dentists.find(d => d.name === appointment.dentist);

    const procedureValues = appointment.procedures.map(procLabel => {
        const foundProc = ALL_PROCEDURES.find(p => p.label === procLabel);
        return foundProc ? foundProc.value : null;
    }).filter(Boolean); 

    router.push({
        pathname: '/(app)/schedule-appointment',
        params: {
            mode: 'reschedule',
            appointmentId: appointment.id,
            patientId: patient.id,
            dentistId: dentist?.id || '',
            specialty: appointment.specialty,
            procedures: JSON.stringify(procedureValues), 
            date: appointment.date,
            time: appointment.time,
            observations: appointment.observations || '',
        },
    });
  };

 const handleAcceptRequest = () => {
    alert('Solicitação ACEITA (simulação)');
    router.back();
  };

  const handleDeclineRequest = () => {
    alert('Solicitação RECUSADA (simulação)');
    router.back();
  };

  if (!appointment || !patient) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.centered}>
                <Text>Carregando agendamento...</Text>
            </View>
        </SafeAreaView>
    );
  }

  const appointmentDetails = [
      { id: '1', label: 'Paciente', value: patient.name },
      { id: '2', label: 'Dentista', value: appointment.dentist },
      { id: '3', label: 'Especialidade', value: appointment.specialty },
      { id: '4', label: 'Procedimentos', value: appointment.procedures.join(', ') },
      { id: '5', label: 'Data', value: appointment.date },
      { id: '6', label: 'Horário', value: appointment.time },
      { id: '7', label: 'Observações', value: appointment.observations || 'Nenhuma' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 9 }]}
      >
        {hasAllergies && <AllergyWarning allergies={patient.allergies!} />}
        {appointmentDetails.map(detail => (
            <ProfileDataItem key={detail.id} label={detail.label} value={detail.value} />
        ))}
      </ScrollView>

{isReviewMode ? (
        <ScreenFooter
          secondaryButtonTitle="Recusar"
          onSecondaryButtonPress={handleDeclineRequest}
          primaryButtonTitle="Aceitar"
          onPrimaryButtonPress={handleAcceptRequest}
        />
      ) : (
        <ScreenFooter
          secondaryButtonTitle="Cancelar"
          onSecondaryButtonPress={handleCancelAppointment}
          primaryButtonTitle="Reagendar"
          onPrimaryButtonPress={handleReschedule}
        />
      )}
    </SafeAreaView>
  );
}