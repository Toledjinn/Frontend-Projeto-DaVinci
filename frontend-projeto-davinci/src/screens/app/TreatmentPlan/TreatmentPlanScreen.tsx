import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, useWindowDimensions, Text } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './TreatmentPlanScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import TreatmentPlanStepItem from '@/components/features/TreatmentPlanStepItem';
import {
  getPlanForPatient,
  TreatmentPlan,
  TreatmentPlanStep,
} from '@/data/treatmentPlansStore';

export default function TreatmentPlanScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<TreatmentPlan | null>(null);

  useEffect(() => {
    if (!patientId) return;
    setPatient(findUserById(String(patientId)) ?? null);
  }, [patientId]);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!patientId) return;
      const p = await getPlanForPatient(String(patientId));
      if (alive) setPlan(p);
    })();
    return () => {
      alive = false;
    };
  }, [patientId]);

  useFocusEffect(
    useCallback(() => {
      let disposed = false;
      (async () => {
        if (!patientId) return;
        const p = await getPlanForPatient(String(patientId));
        if (!disposed) setPlan(p);
      })();
      return () => {
        disposed = true;
      };
    }, [patientId])
  );

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: `Plano de Tratamento de ${formatUserName(patient.name)}`,
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
          showNotificationIcon: false,
        });
      }
    }, [patient, setHeaderConfig])
  );

  const handleStepPress = (step: TreatmentPlanStep) => {
    if ((step.status === 'agendada' || step.status === 'realizada') && step.appointmentId) {
      router.push(`/(app)/appointment/${step.appointmentId}`);
      return;
    }

    router.push({
      pathname: '/(app)/schedule-appointment',
      params: {
        patientId: patient?.id,
        dentistId: step.dentistId,
        specialty: step.specialty,
        observations: step.observations,
        planStepId: step.id, 
      },
    });
  };

  const activeStepIndex = plan?.steps?.findIndex((s) => s.status !== 'realizada') ?? -1;

  if (!patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.emptyText}>Carregando paciente...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={plan?.steps ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        renderItem={({ item, index }) => (
          <TreatmentPlanStepItem
            item={item}
            stepNumber={index + 1}
            isLocked={
              item.status === 'pendente' &&
              activeStepIndex !== -1 &&
              index > activeStepIndex
            }
            onPress={() => handleStepPress(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum plano de tratamento encontrado para este paciente.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
