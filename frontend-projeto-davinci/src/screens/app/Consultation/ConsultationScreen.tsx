import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, useWindowDimensions, Text, View, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import ExamRequestInput from '@/components/features/ExamRequestInput';

export default function ConsultationScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [xrays, setXrays] = useState<string[]>([]);

  const specialty = appointment?.specialty;
  const normalizedSpecialty = (specialty ?? '').toLowerCase();
  const isPrimeiraConsulta = normalizedSpecialty === 'primeira consulta';
  const isSegundaConsulta  = normalizedSpecialty === 'segunda consulta';
  const isPeriodontia      = normalizedSpecialty === 'periodontia';

  useEffect(() => {
    if (!appointmentId) {
      setAppointment(null);
      setPatient(null);
      return;
    }

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
            const uri = result.assets[0].uri;
            type === 'image'
              ? setImages(prev => [...prev, uri])
              : setXrays(prev => [...prev, uri]);
          }
        },
      },
      {
        text: 'Escolher da Galeria',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
          if (!result.canceled) {
            const uri = result.assets[0].uri;
            type === 'image'
              ? setImages(prev => [...prev, uri])
              : setXrays(prev => [...prev, uri]);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };


  if (!appointment || !patient) {
    return <SafeAreaProvider style={styles.safeArea}><Text>Carregando...</Text></SafeAreaProvider>;
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 9 }]}
      >

        <View style={styles.topButtonContainer}>
          {isPrimeiraConsulta ? (
            <View style={styles.buttonRow}>
              <StyledButton title="Saúde Geral" variant="secondary" style={[styles.buttonInRow, { marginRight: 8 }]} />
              <StyledButton title="Saúde Bucal" variant="secondary" style={[styles.buttonInRow, { marginLeft: 8 }]} />
            </View>
          ) : isPeriodontia ? (
            <View style={styles.buttonRow}>
              <StyledButton
                title="Diagnósticos"
                variant="secondary"
                style={[styles.buttonInRow, { marginRight: 8 }]}
                onPress={() => router.push({ pathname: '/(app)/diagnostico', params: { patientId: patient.id } })}
              />
              <StyledButton title="Periograma" variant="secondary" style={[styles.buttonInRow, { marginLeft: 8 }]} />
            </View>
          ) : (
            <StyledButton
              title="Diagnósticos"
              variant="secondary"
              onPress={() => router.push({ pathname: '/(app)/diagnostico', params: { patientId: patient.id } })}
            />
          )}
        </View>

        {patient.allergies?.length ? <AllergyWarning allergies={patient.allergies} /> : null}

        {(isPrimeiraConsulta || isSegundaConsulta) ? <ExamRequestInput /> : <ProcedureInputList />}

        <View style={styles.mediaButtonsContainer}>
          <StyledButton
            title="Adicionar Imagens"
            variant="primary"
            onPress={() => handleImagePick('image')}
            style={[styles.mediaButton, !isPrimeiraConsulta && { marginRight: 8 }]}
          />
          {!isPrimeiraConsulta && (
            <StyledButton
              title="Adicionar Raios-X"
              variant="primary"
              onPress={() => handleImagePick('xray')}
              style={[styles.mediaButton, { marginLeft: 8 }]}
            />
          )}
        </View>
      </ScrollView>

      <ScreenFooter
        primaryButtonTitle="Finalizar Atendimento"
        onPrimaryButtonPress={() => {
          Alert.alert('Atendimento Finalizado', 'Os dados foram salvos com sucesso (simulação).');
          router.back();
        }}
      />
    </SafeAreaProvider>
  );
}