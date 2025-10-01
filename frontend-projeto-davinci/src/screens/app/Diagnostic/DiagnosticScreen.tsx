import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './DiagnosticScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import HomeSection from '@/components/features/HomeSection';
import { SPECIALTIES } from '@/data/mockSpecialties';
import { formatUserName } from '@/utils/nameUtils';

export default function DiagnosticScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [patient, setPatient] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (patientId) {
      const foundUser = findUserById(patientId);
      setPatient(foundUser || null);
    }
  }, [patientId]);

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          showNotificationIcon: false,
          userName: `Diagnóstico de ${formatUserName(patient.name)}`, 
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
        });
      }
    }, [patient])
  );

 const historyButtons = [
  { 
    id: 'saude_bucal', 
    title: 'Saúde Bucal', 
    onPress: () => {
      if (patient) {
        router.push({ 
          pathname: '/(app)/saude-bucal',
          params: { patientId: patient.id }
        });
      }
    }
  },
    { id: 'saude_geral', title: 'Saúde Geral', onPress: () => {
      if (patient) {
        router.push({
          pathname: '/(app)/saude-geral',
          params: { patientId: patient.id },
        });
      }
    }
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
          params: { patientId: patient.id, type: 'primaria' }
        });
      }
    }
  },
  { 
    id: 'secundaria', 
    title: 'Secundária', 
    onPress: () => {
      if (patient) {
        router.push({
          pathname: '/(app)/prevencao/[type]',
          params: { patientId: patient.id, type: 'secundaria' }
        });
      }
    }
  },
  { 
    id: 'terciaria', 
    title: 'Terciária', 
    onPress: () => {
      if (patient) {
        router.push({
          pathname: '/(app)/prevencao/[type]',
          params: { patientId: patient.id, type: 'terciaria' }
        });
      }
    }
  },
  { 
    id: 'quaternaria', 
    title: 'Quaternária', 
    onPress: () => {
      if (patient) {
        router.push({
          pathname: '/(app)/prevencao/[type]',
          params: { patientId: patient.id, type: 'quaternaria' }
        });
      }
    }
  },
    { id: 'imagens', title: 'Imagens', onPress: () => console.log('Imagens') },
    { id: 'raio_x', title: 'Raio-X', onPress: () => console.log('Raio-X') },
    { id: 'plano_de_tratamento', title: 'Plano de Tratamento', onPress: () => console.log('Plano de Tratamento') },
];

  const specialtyButtons = SPECIALTIES.map(specialty => ({
    id: specialty.toLowerCase().replace(/\s/g, '_'),
    title: specialty,
    onPress: () => console.log(`Especialidade: ${specialty}`),
  }));


  if (!patient) {
    return (
      <SafeAreaProvider style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <HomeSection title="Históricos" buttons={historyButtons} />
        <HomeSection title="Diagnóstico Primário" buttons={preventionButtons} />
        <HomeSection title="Especialidades" buttons={specialtyButtons} />
      </ScrollView>
    </SafeAreaProvider>
  );
}