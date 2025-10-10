import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, useWindowDimensions, Text, View, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './ConsultationScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useAppointments } from '@/hooks/useAppointments';
import { useUsers } from '@/hooks/useUsers';
import type { Appointment } from '@/data/appointmentsStore';

import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';
import StyledButton from '@/components/common/StyledButton';
import ScreenFooter from '@/components/common/ScreenFooter';
import ProcedureInputList from '@/components/features/ProcedureInputList';
import DynamicInputList from '@/components/features/DynamicInputList';
import RiskAssessmentCard from '@/components/features/RiskAssessmentCard';
import TreatmentPlanForm from '@/components/features/TreatmentPlanForm';

export default function ConsultationScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { list: appointments, update } = useAppointments();
  const { list: users } = useUsers();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<any | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const specialty = appointment?.specialty;
  const isPrimeiraConsulta = specialty === 'Primeira Consulta';
  const isSegundaConsulta = specialty === 'Segunda Consulta';
  const isPeriodontia = specialty === 'Periodontia';

  useEffect(() => {
    if (!appointmentId) return;
    const found = appointments.find((a) => a.id === appointmentId);
    setAppointment(found || null);

    if (found) {
      const foundPatient = users.find((u) => u.id === found.patientId);
      setPatient(foundPatient || null);
    }
  }, [appointmentId, appointments, users]);

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        const firstName = patient.name.split(' ')[0];
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: `Atendimento de ${firstName}`,
          userPhotoUri: patient.photoUri ?? null,
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
          showNotificationIcon: false,
        });
      }
    }, [patient])
  );

  const handleImagePick = async (type: 'image' | 'xray') => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Conceda acesso à câmera e à galeria.');
      return;
    }

    Alert.alert('Selecionar Imagem', 'Escolha uma opção', [
      {
        text: 'Tirar Foto',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
          if (!result.canceled) {
            setImages((prev) => [...prev, result.assets[0].uri]);
          }
        },
      },
      {
        text: 'Escolher da Galeria',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
          if (!result.canceled) {
            setImages((prev) => [...prev, result.assets[0].uri]);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleFinishConsultation = async () => {
    if (!appointment) return;
    await update(appointment.id, { status: 'realizada', updatedAt: new Date().toISOString() });
    Alert.alert('Atendimento Finalizado', 'A consulta foi marcada como realizada.');
    router.push({
        pathname: '/(app)/consultas-list',
        params: { listType: 'all' }
      });
  };

  if (!appointment || !patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Carregando atendimento...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        {isPrimeiraConsulta ? (
          <>
            {patient.allergies?.length ? <AllergyWarning allergies={patient.allergies} /> : null}

            <View style={[styles.topButtonContainer, styles.buttonRow]}>
              <StyledButton
                title="Saúde Geral"
                variant="secondary"
                style={[styles.buttonInRow, { marginRight: 8 }]}
                onPress={() =>
                  router.push({ pathname: '/(app)/saude-geral', params: { patientId: patient.id } })
                }
              />
              <StyledButton
                title="Saúde Bucal"
                variant="secondary"
                style={[styles.buttonInRow, { marginLeft: 8 }]}
                onPress={() =>
                  router.push({ pathname: '/(app)/saude-bucal', params: { patientId: patient.id } })
                }
              />
            </View>

            <DynamicInputList
              title="Exames Solicitados"
              inputIcon="file-text"
              placeholder="Digite o exame"
              addMoreText="Adicionar Exame"
            />

            <View style={{ marginTop: 24, marginBottom: 24 }}>
              <RiskAssessmentCard />
            </View>

            <StyledButton
              title="Imagens"
              variant="secondary"
              onPress={() => handleImagePick('image')}
              style={styles.mediaButton}
            />
          </>
        ) : (
          <>
            {patient.allergies?.length ? <AllergyWarning allergies={patient.allergies} /> : null}
            <View style={styles.topButtonContainer}>
              {isPeriodontia ? (
                <View style={styles.buttonRow}>
                  <StyledButton
                    title="Diagnósticos"
                    variant="primary"
                    style={[styles.buttonInRow, { marginRight: 8 }]}
                    onPress={() =>
                      router.push({
                        pathname: '/(app)/diagnostico',
                        params: { patientId: patient.id },
                      })
                    }
                  />
                  <StyledButton
                    title="Periograma"
                    variant="primary"
                    style={[styles.buttonInRow, { marginLeft: 8 }]}
                    onPress={() =>
                      router.push({
                        pathname: '/(app)/periogramas',
                        params: { patientId: patient.id },
                      })
                    }
                  />
                </View>
              ) : (
                <StyledButton
                  title="Diagnósticos"
                  variant="primary"
                  onPress={() =>
                    router.push({
                      pathname: '/(app)/diagnostico',
                      params: { patientId: patient.id },
                    })
                  }
                />
              )}
            </View>

            {isSegundaConsulta ? <TreatmentPlanForm /> : <ProcedureInputList />}

            <View style={styles.mediaButtonsContainer}>
              <StyledButton
                title="Imagens"
                variant="secondary"
                onPress={() => handleImagePick('image')}
                style={[styles.mediaButton, { marginRight: 8 }]}
              />
              <StyledButton
                title="Raios-X"
                variant="primary"
                onPress={() => handleImagePick('xray')}
                style={[styles.mediaButton, { marginLeft: 8 }]}
              />
            </View>
          </>
        )}

        {images.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Imagens capturadas:</Text>
            <ScrollView horizontal>
              {images.map((uri, i) => (
                <Image
                  key={i}
                  source={{ uri }}
                  style={{ width: 100, height: 100, borderRadius: 8, marginRight: 8 }}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      <ScreenFooter
        buttons={[
          {
            title: 'Finalizar Atendimento',
            onPress: handleFinishConsultation,
            variant: 'primary',
          },
        ]}
      />
    </SafeAreaView>
  );
}
