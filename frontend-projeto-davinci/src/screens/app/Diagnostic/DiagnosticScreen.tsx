import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions, Text, View, Alert } from 'react-native';
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

type LowerRisk = 'baixo' | 'moderado' | 'alto' | 'a_definir';

export default function DiagnosticScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const bodyOffset = headerHeight + 8;

  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { list, save } = useUsers();
  const patient = useMemo<UserWithPhoto | undefined>(
    () => list.find((u) => String(u.id) === String(patientId) && u.type === 'patient'),
    [list, patientId]
  );

  const [isEditingRisk, setIsEditingRisk] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<LowerRisk>('a_definir');

  useEffect(() => {
    const current = (patient?.riskLevel ?? 'a_definir') as LowerRisk;
    setSelectedRisk(current);
  }, [patient?.riskLevel]);

  useFocusEffect(
    useCallback(() => {
      if (!patient) return;
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: false,
        userName: `Diagnósticos de ${formatUserName(patient.name)}`,
        UserImageSvg: patient.image || UserPlaceholder,
        userPhotoUri: patient.photoUri ?? null,
        riskLevel: patient.riskLevel as any,
        showDeleteIcon: false,
      });
    }, [patient, setHeaderConfig])
  );

  const historyButtons = [
    {
      id: 'saude_bucal',
      title: 'Saúde Bucal',
      onPress: () => patient && router.push({ pathname: '/(app)/saude-bucal', params: { patientId: String(patient.id) } }),
    },
    {
      id: 'saude_geral',
      title: 'Saúde Geral',
      onPress: () => patient && router.push({ pathname: '/(app)/saude-geral', params: { patientId: String(patient.id) } }),
    },
  ];

  const preventionButtons = [
    {
      id: 'primaria',
      title: 'Primária',
      onPress: () => patient && router.push({ pathname: '/(app)/prevencao/[type]', params: { patientId: String(patient.id), type: 'primaria' } }),
    },
    {
      id: 'secundaria',
      title: 'Secundária',
      onPress: () => patient && router.push({ pathname: '/(app)/prevencao/[type]', params: { patientId: String(patient.id), type: 'secundaria' } }),
    },
    {
      id: 'terciaria',
      title: 'Terciária',
      onPress: () => patient && router.push({ pathname: '/(app)/prevencao/[type]', params: { patientId: String(patient.id), type: 'terciaria' } }),
    },
    {
      id: 'quaternaria',
      title: 'Quaternária',
      onPress: () => patient && router.push({ pathname: '/(app)/prevencao/[type]', params: { patientId: String(patient.id), type: 'quaternaria' } }),
    },
    {
      id: 'imagens',
      title: 'Imagens',
      onPress: () =>
        patient &&
        router.push({ pathname: '/(app)/media-gallery', params: { patientId: String(patient.id), kind: 'image' } }),
    },
    {
      id: 'raio_x',
      title: 'Raio-X',
      onPress: () =>
        patient &&
        router.push({ pathname: '/(app)/media-gallery', params: { patientId: String(patient.id), kind: 'xray' } }),
    },
    {
      id: 'plano_de_tratamento',
      title: 'Plano de Tratamento',
      onPress: () =>
        patient &&
        router.push({ pathname: '/(app)/plano-de-tratamento', params: { patientId: String(patient.id) } }),
    },
  ];

  const specialtyButtons = ALL_SPECIALTIES.map((specialty) => ({
    id: specialty.toLowerCase().replace(/\s/g, '_'),
    title: specialty,
    onPress: () =>
      patient &&
      router.push({
        pathname: '/(app)/diagnosticos/[specialty]',
        params: { patientId: String(patient.id), specialty },
      }),
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

  const handleSaveRisk = async () => {
    const current = (patient.riskLevel ?? 'a_definir') as LowerRisk;
    if (selectedRisk === current) {
      setIsEditingRisk(false);
      Alert.alert('Sem alterações', 'Nenhuma mudança de risco para salvar.');
      return;
    }
    await save({ ...patient, riskLevel: selectedRisk });
    setIsEditingRisk(false);
    Alert.alert('Risco salvo', 'O nível de risco do paciente foi atualizado.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[styles.bodyScroll, { marginTop: bodyOffset }]}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeSection title="Históricos" buttons={historyButtons} />
        <HomeSection title="Diagnóstico Primário" buttons={preventionButtons} />
        <HomeSection title="Especialidades" buttons={specialtyButtons} />
        <View style={{ marginTop: 24 }}>
          <RiskAssessmentCard
            initialRiskLevel={selectedRisk}
            isEditing={isEditingRisk}
            onToggleEdit={() => setIsEditingRisk((v) => !v)}
            onSave={handleSaveRisk}
            onChange={(lvl) => setSelectedRisk(lvl as LowerRisk)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
