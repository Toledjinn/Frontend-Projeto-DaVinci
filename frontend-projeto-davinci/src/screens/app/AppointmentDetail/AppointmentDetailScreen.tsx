import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, useWindowDimensions, Text, View, Alert, StyleProp, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './AppointmentDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import { findUserById, UserProfile, getUsers } from '@/data/mockUsers';
import { getAppointmentById, Appointment, updateAppointmentStatus } from '@/data/mockAppointments';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';
import ProfileDataItem from '@/components/features/ProfileDataItem';
import { ALL_PROCEDURES } from '@/data/mockProcedures';
import StyledButton from '@/components/common/StyledButton';
import { formatUserName } from '@/utils/nameUtils';
import { COLORS, FONTS } from '@/constants/theme';
import { getRecordForAppointment, ConsultationRecord } from '@/data/mockConsultationRecords';

const MOCK_DENTISTS = getUsers('dentist');

export default function AppointmentDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.208;
  const { appointmentId, mode } = useLocalSearchParams<{ appointmentId: string, mode?: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [record, setRecord] = useState<ConsultationRecord | null>(null);

  const isReviewMode = mode === 'review';
  const isCancelled = appointment?.status === 'cancelada';
  const isPendente = appointment?.status === 'pendente';
  const isRealizada = appointment?.status === 'realizada';

  useEffect(() => {
  if (appointmentId) {
    const foundAppointment = getAppointmentById(appointmentId);
    setAppointment(foundAppointment ?? null); 

    if (foundAppointment) {
      const foundPatient = findUserById(foundAppointment.patientId);
      setPatient(foundPatient ?? null); 

      if (foundAppointment.status === 'realizada') {
        const foundRecord = getRecordForAppointment(appointmentId);
        setRecord(foundRecord ?? null); 
      } else {
        setRecord(null);
      }
    } else {
      setPatient(null);
      setRecord(null);
    }
  } else {
    setAppointment(null);
    setPatient(null);
    setRecord(null);
  }
}, [appointmentId]);


  const hasAllergies = patient?.allergies && patient.allergies.length > 0;

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        const firstName = patient.name.split(' ')[0];
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: isReviewMode ? `Revisar Solicitação` : `Agendamento de ${firstName}`,
          UserImageSvg: patient.image || UserPlaceholder,
          showNotificationIcon: false,
          riskLevel: patient.riskLevel,
        });
      }
    }, [patient, isReviewMode])
  );

  const handleGoToDiagnostic = () => {
    if (patient) {
      router.push({
        pathname: '/(app)/diagnostico',
        params: { patientId: patient.id },
      });
    }
  };

  const handleCancelAppointment = () => {
    Alert.alert(
      "Confirmar Cancelamento",
      "Tem certeza que deseja cancelar esta consulta? Esta ação não pode ser desfeita.",
      [
        { text: "Voltar", onPress: () => console.log("Cancelamento abortado"), style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            if (appointmentId) {
              updateAppointmentStatus(appointmentId, 'cancelada');
              router.push('/(app)/consultas');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleReschedule = () => {
    if (!appointment || !patient) return;
    const dentist = MOCK_DENTISTS.find(d => d.name === appointment.dentist);
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
  
  const handleApproveRequest = () => {
    if (!appointmentId) return;
    updateAppointmentStatus(appointmentId, 'agendada');
    Alert.alert('Sucesso!', 'Solicitação aprovada e agendamento confirmado.');
    router.push('/(app)/solicitacoes');
  };
  
  const handleRejectRequest = () => {
    if (!appointment || !patient) return;
    const dentist = MOCK_DENTISTS.find(d => d.name === appointment.dentist);
    router.push({
        pathname: '/(app)/schedule-appointment',
        params: {
            mode: 'repropose',
            patientId: patient.id,
            dentistId: dentist?.id || '',
            specialty: appointment.specialty,
            procedures: JSON.stringify(ALL_PROCEDURES.filter(p => appointment.procedures.includes(p.label)).map(p => p.value)),
            observations: appointment.observations || '',
            date: appointment.date,
            time: appointment.time,
        },
    });
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
  
  const statusInfo: { [key in Appointment['status']]: { text: string; color: string; icon: React.ComponentProps<typeof Feather>['name'] } } = {
    agendada: { text: 'Agendada', color: COLORS.primary, icon: 'calendar' },
    realizada: { text: 'Realizada', color: COLORS.green, icon: 'check-circle' },
    cancelada: { text: 'Cancelada', color: COLORS.red, icon: 'x-circle' },
    pendente: { text: 'Pendente', color: COLORS.gray_400, icon: 'alert-circle' },
  };
  
  const currentStatus = statusInfo[appointment.status];
  const appointmentDetails: Array<{
    id: string;
    label: string;
    value: string | React.ReactNode;
  }> = [
    { id: '1', label: 'Paciente', value: patient.name },
    { id: '2', label: 'Dentista', value: appointment.dentist },
    {
      id: 'status',
      label: 'Status',
      value: (
        <View style={styles.statusContainer}>
          <Feather name={currentStatus.icon} size={14} color={currentStatus.color} />
          <Text style={[styles.statusText, { color: currentStatus.color }]}>
            {currentStatus.text}
          </Text>
        </View>
      ),
    },
    { id: '3', label: 'Especialidade', value: appointment.specialty },
    { id: '4', label: 'Procedimentos', value: appointment.procedures.join(', ') },
    { id: '5', label: 'Data', value: appointment.date },
    { id: '6', label: 'Horário', value: appointment.time },
    { id: '7', label: 'Observações', value: appointment.observations || 'Nenhuma' },
  ];

  const RenderRealizadaView = () => (
    <View>
      {record ? (
        <>
          <View style={styles.recordContainer}>
            <Text style={styles.recordSectionTitle}>Procedimentos Realizados</Text>
            {record.proceduresPerformed.map((proc, index) => (
              <View 
                key={index} 
                style={[
                  styles.procedureItem,
                  index < record.proceduresPerformed.length - 1 && styles.procedureSeparator
                ]}
              >
                <Text style={styles.procedureTitle}>{proc.procedure}</Text>
                <Text style={styles.procedureDescription}>{proc.description}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text>Nenhum registro detalhado para este atendimento.</Text>
      )}
      {appointment.specialty === 'Periodontia' && (
        <StyledButton title="Periograma" variant="secondary" style={{top: 8}} />
      )}
      <View style={{ flexDirection: 'row', top: 24 }}>
        <StyledButton title="Imagens" variant="primary" style={{ flex: 1, marginRight: 8 }} />
        <StyledButton title="Raios-X" variant="primary" style={{ flex: 1, marginLeft: 8 }} />
      </View>
    </View>
  );

  const RenderDefaultView = () => (
    <>
      {appointment?.specialty !== 'Primeira Consulta' && (
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Diagnósticos"
          variant="secondary"
          onPress={handleGoToDiagnostic}
        />
      </View>
    )}
    
    {hasAllergies && <AllergyWarning allergies={patient.allergies!} />}
    {appointmentDetails.map(detail => (
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
        {isRealizada ? <RenderRealizadaView /> : <RenderDefaultView />}
      </ScrollView>

      {!isRealizada && !isCancelled && !isPendente && (
        <View style={styles.actionButtonContainer}>
          <StyledButton
              title="Iniciar Atendimento"
              variant="primary"
              onPress={() => {
                if (appointment) {
                  router.push({
                    pathname: '/(app)/consultation',
                    params: { appointmentId: appointment.id },
                  });
                }
              }}
          />
        </View>
      )}

      {!isRealizada && (
        isReviewMode ? (
          <ScreenFooter
            buttons={[
              {
                title: "Aprovar",
                onPress: handleApproveRequest,
                variant: 'primary',
              },
              {
                title: "Reprovar",
                onPress: handleRejectRequest,
                variant: 'secondary', 
              }
            ]}
          />
        ) : !isCancelled ? (
          <ScreenFooter
            buttons={[
              {
                title: "Reagendar",
                onPress: handleReschedule,
                variant: 'primary',
              },
              {
                title: "Cancelar",
                onPress: handleCancelAppointment,
                variant: 'secondary', 
              }
            ]}
          />
        ) : null
      )}
    </SafeAreaView>
  );
}