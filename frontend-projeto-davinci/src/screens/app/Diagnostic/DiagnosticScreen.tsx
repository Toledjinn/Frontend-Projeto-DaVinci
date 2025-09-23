import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './DiagnosticScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import HomeSection from '@/components/features/HomeSection';
import { SPECIALTIES } from '@/data/mockSpecialties';

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
          userName: patient.name,
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
        });
      }
    }, [patient])
  );

  const mainButtons = [
    { id: 'saude_bucal', title: 'Saúde Bucal', onPress: () => console.log('Saúde Bucal') },
    { id: 'historico_saude', title: 'Histórico de saúde', onPress: () => console.log('Histórico de saúde') },
    { id: 'prevencao', title: 'Prevenção', onPress: () => console.log('Prevenção') },
  ];

  const specialtyButtons = SPECIALTIES.map(specialty => ({
    id: specialty.toLowerCase().replace(/\s/g, '_'),
    title: specialty,
    onPress: () => console.log(`Especialidade: ${specialty}`),
  }));

  if (!patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Carregando...</Text>
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
        <HomeSection title="DIAGNÓSTICO PRINCIPAL" buttons={mainButtons} />
        <HomeSection title="ESPECIALIDADES" buttons={specialtyButtons} />
      </ScrollView>
    </SafeAreaView>
  );
}