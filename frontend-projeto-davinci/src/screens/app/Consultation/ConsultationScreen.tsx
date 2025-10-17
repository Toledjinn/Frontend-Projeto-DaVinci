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
import { setPlanForPatient, toStepsFromForm, updateStepStatus } from '@/data/treatmentPlansStore';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';
import StyledButton from '@/components/common/StyledButton';
import ScreenFooter from '@/components/common/ScreenFooter';
import ProcedureInputList, { ProcedureEntry } from '@/components/features/ProcedureInputList';
import DynamicInputList, { Item as ExamItem } from '@/components/features/DynamicInputList';
import RiskAssessmentCard from '@/components/features/RiskAssessmentCard';
import TreatmentPlanForm, { PlanItem } from '@/components/features/TreatmentPlanForm';
import { useDiagnostics } from '@/hooks/useDiagnostics';

type LowerRisk = 'baixo' | 'moderado' | 'alto' | 'a_definir';

export default function ConsultationScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { list: appointments, update, getById } = useAppointments();
  const { list: users, save: saveUser } = useUsers();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<any | null>(null);

  const specialty = appointment?.specialty;
  const isPrimeiraConsulta = specialty === 'Primeira Consulta';
  const isSegundaConsulta = specialty === 'Segunda Consulta';
  const isPeriodontia = specialty === 'Periodontia';

  const { getOrCreateAppointmentDiagnostics, saveAppointmentDiagnostics } = useDiagnostics();

  const [requestedExams, setRequestedExams] = useState<ExamItem[]>([{ id: Date.now(), value: '' }]);
  const [procedures, setProcedures] = useState<ProcedureEntry[]>([]);
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [xrays, setXrays] = useState<string[]>([]);

  const [riskForThisConsult, setRiskForThisConsult] = useState<LowerRisk>('a_definir');

  useEffect(() => {
    if (!appointmentId) return;
    const found = appointments.find((a) => a.id === appointmentId);
    setAppointment(found || null);

    if (found) {
      const foundPatient = users.find((u) => u.id === found.patientId);
      setPatient(foundPatient || null);
    }
  }, [appointmentId, appointments, users]);

  useEffect(() => {
    if (!appointment || !patient) return;
    const ad = getOrCreateAppointmentDiagnostics(appointment.id, String(patient.id));
    setRequestedExams(
      ad.requestedExams && ad.requestedExams.length ? ad.requestedExams : [{ id: Date.now(), value: '' }]
    );
    setProcedures(ad.procedures || []);
    setPlan(ad.treatmentPlan || []);
    const imgs = (ad.media || []).filter((m) => m.type === 'image').map((m) => m.uri);
    const rxs = (ad.media || []).filter((m) => m.type === 'xray').map((m) => m.uri);
    setImages(imgs);
    setXrays(rxs);

    const previousRisk = (ad as any)?.riskAssessment as ('Baixo'|'Médio'|'Alto'|null|undefined);
    if (previousRisk === 'Baixo') setRiskForThisConsult('baixo');
    else if (previousRisk === 'Médio') setRiskForThisConsult('moderado');
    else if (previousRisk === 'Alto') setRiskForThisConsult('alto');
    else setRiskForThisConsult('a_definir');
  }, [appointment, patient, getOrCreateAppointmentDiagnostics]);

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
          riskLevel: patient.riskLevel as any,
          showNotificationIcon: false,
        });
      }
    }, [patient, setHeaderConfig])
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
            if (type === 'image') setImages((prev) => [...prev, result.assets[0].uri]);
            else setXrays((prev) => [...prev, result.assets[0].uri]);
          }
        },
      },
      {
        text: 'Escolher da Galeria',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
          if (!result.canceled) {
            if (type === 'image') setImages((prev) => [...prev, result.assets[0].uri]);
            else setXrays((prev) => [...prev, result.assets[0].uri]);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleFinishConsultation = async () => {
    if (!appointment || !patient) return;

    const mediaPacked = [
      ...images.map((uri) => ({ id: `${Date.now()}-${Math.random()}`, uri, type: 'image' as const })),
      ...xrays.map((uri) => ({ id: `${Date.now()}-${Math.random()}`, uri, type: 'xray' as const })),
    ];

    const riskTitle =
      riskForThisConsult === 'baixo' ? 'Baixo' :
      riskForThisConsult === 'moderado' ? 'Médio' :
      riskForThisConsult === 'alto' ? 'Alto' : null;

    if (isSegundaConsulta && plan && plan.length > 0) {
      const steps = toStepsFromForm(plan);
      await setPlanForPatient(String(patient.id), steps);
    }

    saveAppointmentDiagnostics(appointment.id, {
      appointmentId: appointment.id,
      patientId: String(patient.id),
      requestedExams,
      procedures,
      treatmentPlan: plan,          
      riskAssessment: riskTitle,    
      media: mediaPacked,
      updatedAt: new Date().toISOString(),
    });

    if (isPrimeiraConsulta) {
      const currentPatientRisk: LowerRisk = (patient.riskLevel ?? 'a_definir') as LowerRisk;
      if (riskForThisConsult !== 'a_definir' && riskForThisConsult !== currentPatientRisk) {
        await saveUser({ ...patient, riskLevel: riskForThisConsult });
      }
    }

    await update(appointment.id, { status: 'realizada', updatedAt: new Date().toISOString() });

    const latest = getById(appointment.id) || appointment;
    if (latest.planStepId) {
      await updateStepStatus(latest.patientId, latest.planStepId, 'realizada', latest.id);
    }

    Alert.alert('Atendimento Finalizado', 'A consulta foi marcada como realizada.');
    router.push({ pathname: '/(app)/consultas-list', params: { listType: 'all' } });
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
              initialItems={requestedExams}
              onChangeItems={setRequestedExams}
            />

            <View style={{ marginTop: 24, marginBottom: 24 }}>
              <RiskAssessmentCard
                initialRiskLevel={(patient.riskLevel ?? 'a_definir') as any}
                onChange={(lvl) => setRiskForThisConsult(lvl as LowerRisk)}
              />
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
                        params: { patientId: patient.id, appointmentId: appointment.id },
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

            {isSegundaConsulta ? (
              <TreatmentPlanForm value={plan} onChange={setPlan} disabled={false} />
            ) : (
              <ProcedureInputList value={procedures} onChange={setProcedures} />
            )}

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

        {(images.length > 0 || xrays.length > 0) && (
          <View style={{ marginTop: 24 }}>
            {images.length > 0 && (
              <>
                <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Imagens capturadas:</Text>
                <ScrollView horizontal>
                  {images.map((uri, i) => (
                    <Image
                      key={`img-${i}`}
                      source={{ uri }}
                      style={{ width: 100, height: 100, borderRadius: 8, marginRight: 8 }}
                    />
                  ))}
                </ScrollView>
              </>
            )}
            {xrays.length > 0 && (
              <>
                <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>Raios-X:</Text>
                <ScrollView horizontal>
                  {xrays.map((uri, i) => (
                    <Image
                      key={`rx-${i}`}
                      source={{ uri }}
                      style={{ width: 100, height: 100, borderRadius: 8, marginRight: 8 }}
                    />
                  ))}
                </ScrollView>
              </>
            )}
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
