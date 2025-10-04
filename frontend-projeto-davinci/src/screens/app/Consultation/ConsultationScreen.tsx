import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, useWindowDimensions, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './ConsultationScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { getAppointmentById, Appointment } from '@/data/mockAppointments';
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
  const headerHeight = height * 0.30;
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [images, setImages] = useState<string[]>([]);
  
  const specialty = appointment?.specialty;
  const isPrimeiraConsulta = specialty === 'Primeira Consulta';
  const isSegundaConsulta  = specialty === 'Segunda Consulta';
  const isPeriodontia      = specialty === 'Periodontia';

  useEffect(() => {
    if (!appointmentId) return;

    const foundAppointment = getAppointmentById(appointmentId) ?? null;
    setAppointment(foundAppointment);

    if (foundAppointment) {
      const foundPatient = findUserById(foundAppointment.patientId) ?? null;
      setPatient(foundPatient);
    } else {
      setPatient(null);
    }
  }, [appointmentId]);

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        const firstName = patient.name.split(' ')[0];
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: `Atendimento de ${firstName}`,
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
          showNotificationIcon: false
        });
      }
    }, [patient])
  );
  
  const handleImagePick = async (type: 'image' | 'xray') => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa conceder permissão para usar a câmera e a galeria.');
      return;
    }

    Alert.alert('Selecionar Imagem', 'Escolha uma opção', [
      {
        text: 'Tirar Foto',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
          if (!result.canceled) {
            setImages(prev => [...prev, result.assets[0].uri]);
          }
        },
      },
      {
        text: 'Escolher da Galeria',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
          if (!result.canceled) {
            setImages(prev => [...prev, result.assets[0].uri]);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  if (!appointment || !patient) {
    return <SafeAreaView style={styles.safeArea}><Text>Carregando...</Text></SafeAreaView>;
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
                onPress={() => router.push({ pathname: '/(app)/saude-geral', params: { patientId: patient.id } })}
              />
              <StyledButton 
                title="Saúde Bucal" 
                variant="secondary" 
                style={[styles.buttonInRow, { marginLeft: 8 }]}
                onPress={() => router.push({ pathname: '/(app)/saude-bucal', params: { patientId: patient.id } })}
              />
            </View>
            

            <DynamicInputList 
              title="Exames Solicitados" 
              inputIcon="file-text"
              placeholder="Digite o exame"
              addMoreText="Adicionar Exame"
            />
            
            <View style={{marginTop: 24, marginBottom: 24}}>
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
                  <StyledButton title="Diagnósticos" variant="secondary" style={[styles.buttonInRow, { marginRight: 8 }]} onPress={() => router.push({ pathname: '/(app)/diagnostico', params: { patientId: patient.id } })} />
                  <StyledButton 
                    title="Periograma" 
                    variant="primary" 
                    style={[styles.buttonInRow, { marginLeft: 8 }]} 
                    onPress={() => router.push({
                    pathname: '/(app)/periogramas',
                    params: { patientId: patient.id }
                  })}
                  />
                </View>
              ) : (
                <StyledButton title="Diagnósticos" variant="secondary" onPress={() => router.push({ pathname: '/(app)/diagnostico', params: { patientId: patient.id } })} />
              )}
            </View>
            

            {isSegundaConsulta ? <TreatmentPlanForm  /> : <ProcedureInputList />}

            <View style={styles.mediaButtonsContainer}>
              <StyledButton title="Imagens" variant="secondary" onPress={() => handleImagePick('image')} style={[styles.mediaButton, { marginRight: 8 }]} />
              <StyledButton title="Raios-X" variant="primary" onPress={() => handleImagePick('xray')} style={[styles.mediaButton, { marginLeft: 8 }]} />
            </View>
          </>
        )}
      </ScrollView>
      <ScreenFooter
        buttons={[
          {
            title: "Finalizar Atendimento",
            onPress: () => {
              Alert.alert('Atendimento Finalizado', 'Os dados foram salvos com sucesso (simulação).');
              router.back();
            },
            variant: 'secondary',
          }
        ]}
      />
    </SafeAreaView>
  );
}