import React, { useMemo, useCallback } from 'react';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { styles } from './DiagnosticScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useUsers } from '@/hooks/useUsers';
import type { UserWithPhoto } from '@/data/usersStore';

import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import HomeSection from '@/components/features/HomeSection';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';
import { formatUserName } from '@/utils/nameUtils';
import RiskAssessmentCard from '@/components/features/RiskAssessmentCard';

export default function DiagnosticScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.28;

  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { list } = useUsers();
  const patient = useMemo<UserWithPhoto | undefined>(
    () => list.find((u) => String(u.id) === String(patientId) && u.type === 'patient'),
    [list, patientId]
  );

  useFocusEffect(
    useCallback(() => {
      if (!patient) return;
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: false,
        userName: `Diagnóstico de ${formatUserName(patient.name)}`,
        UserImageSvg: patient.image || UserPlaceholder,
        userPhotoUri: patient.photoUri ?? null,
        riskLevel: patient.riskLevel,
        showDeleteIcon: false,
      });
    }, [patient, setHeaderConfig])
  );

  const historyButtons = [
    {
      id: 'saude_bucal',
      title: 'Saúde Bucal',
      onPress: () => {
        if (patient) {
          router.push({
            pathname: '/(app)/saude-bucal',
            params: { patientId: String(patient.id) },
          });
        }
      },
    },
    {
      id: 'saude_geral',
      title: 'Saúde Geral',
      onPress: () => {
        if (patient) {
          router.push({
            pathname: '/(app)/saude-geral',
            params: { patientId: String(patient.id) },
          });
        }
      },
    },
  ];

  const preventionButtons = [
    {
      id: 'primaria',
      title: 'Primária',
      onPress: () => {
        if (patient) {
          router.push({
            pathname: '/(app)/prevencao/[type]',
            params: { patientId: String(patient.id), type: 'primaria' },
          });
        }
      },
    },
    {
      id: 'secundaria',
      title: 'Secundária',
      onPress: () => {
        if (patient) {
          router.push({
            pathname: '/(app)/prevencao/[type]',
            params: { patientId: String(patient.id), type: 'secundaria' },
          });
        }
      },
    },
    {
      id: 'terciaria',
      title: 'Terciária',
      onPress: () => {
        if (patient) {
          router.push({
            pathname: '/(app)/prevencao/[type]',
            params: { patientId: String(patient.id), type: 'terciaria' },
          });
        }
      },
    },
    {
      id: 'quaternaria',
      title: 'Quaternária',
      onPress: () => {
        if (patient) {
          router.push({
            pathname: '/(app)/prevencao/[type]',
            params: { patientId: String(patient.id), type: 'quaternaria' },
          });
        }
      },
    },
    { id: 'imagens', title: 'Imagens', onPress: () => console.log('Imagens') },
    { id: 'raio_x', title: 'Raio-X', onPress: () => console.log('Raio-X') },
    {
      id: 'plano_de_tratamento',
      title: 'Plano de Tratamento',
      onPress: () => {
        if (patient) {
          router.push({
            pathname: '/(app)/plano-de-tratamento',
            params: { patientId: String(patient.id) },
          });
        }
      },
    },
  ];

  const specialtyButtons = ALL_SPECIALTIES.map((specialty) => ({
    id: specialty.toLowerCase().replace(/\s/g, '_'),
    title: specialty,
    onPress: () => {
      if (patient) {
        router.push({
          pathname: '/(app)/diagnosticos/[specialty]',
          params: { patientId: String(patient.id), specialty },
        });
      }
    },
  }));

  if (!patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Paciente não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <HomeSection title="Históricos" buttons={historyButtons} />
        <HomeSection title="Diagnóstico Primário" buttons={preventionButtons} />
        <HomeSection title="Especialidades" buttons={specialtyButtons} />
        <View style={{ marginTop: 24 }}>
          <RiskAssessmentCard initialRiskLevel={patient?.riskLevel} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
