import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { styles } from './SpecialtyDiagnosticsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { getRecordsForPatientBySpecialty, ConsultationRecord } from '@/data/mockConsultationRecords';
import CollapsibleDiagnosticItem from '@/components/features/CollapsibleDiagnosticItem';

export default function SpecialtyDiagnosticsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { patientId, specialty } = useLocalSearchParams<{ patientId: string, specialty: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  useEffect(() => {
    if (patientId && specialty) {
      setPatient(findUserById(patientId) ?? null);
      setRecords(getRecordsForPatientBySpecialty(patientId, specialty));
    }
  }, [patientId, specialty]);

  useFocusEffect(useCallback(() => {
    if (patient) {
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        userName: `Diagnósticos de ${specialty}`,
        UserImageSvg: patient.image || UserPlaceholder,
        riskLevel: patient.riskLevel,
        showNotificationIcon: false
      });
    }
  }, [patient, specialty]));
  
  const handleToggleItem = (recordId: string) => {
    setOpenItemId(currentId => (currentId === recordId ? null : recordId));
  };

  if (!patient) return <SafeAreaView style={styles.safeArea}><Text>Carregando...</Text></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={records}
        keyExtractor={item => item.appointmentId}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        renderItem={({ item }) => (
          <CollapsibleDiagnosticItem
            record={item}
            isOpen={openItemId === item.appointmentId}
            onToggle={() => handleToggleItem(item.appointmentId)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum diagnóstico encontrado para esta especialidade.</Text>}
      />
    </SafeAreaView>
  );
}