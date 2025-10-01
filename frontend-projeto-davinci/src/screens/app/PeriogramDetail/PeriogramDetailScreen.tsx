import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { styles } from './PeriogramDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { getPeriogramById, SavedPeriogram } from '@/data/mockPeriograms';
import ToothMeasurementDetail from '@/components/features/ToothMeasurementDetail';
import { SafeAreaView } from 'react-native-safe-area-context';

const upperArchTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerArchTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

export default function PeriogramDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { id } = useLocalSearchParams<{ id: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [periogram, setPeriogram] = useState<SavedPeriogram | null>(null);
  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [openTooth, setOpenTooth] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const foundPeriogram = getPeriogramById(id);
      setPeriogram(foundPeriogram ?? null);
      if (foundPeriogram) {
        setPatient(findUserById(foundPeriogram.patientId) ?? null);
      }
    }
  }, [id]);

  useFocusEffect(useCallback(() => {
    if (patient && periogram) {
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        userName: `Periograma de ${periogram.date}`,
        UserImageSvg: patient.image || UserPlaceholder,
        riskLevel: patient.riskLevel,
      });
    }
  }, [patient, periogram]));

  const handleToggleTooth = (toothNumber: number) => {
    setOpenTooth(current => (current === toothNumber ? null : toothNumber));
  };

  if (!periogram || !patient) return <SafeAreaView style={styles.safeArea}><Text>Carregando...</Text></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}>
        <Text style={styles.sectionTitle}>Arco Superior</Text>
        {upperArchTeeth.map(tooth => (
          <ToothMeasurementDetail
            key={tooth}
            toothNumber={tooth}
            isOpen={openTooth === tooth}
            onToggle={() => handleToggleTooth(tooth)}
            data={periogram.data[tooth] || {}}
          />
        ))}
        <Text style={styles.sectionTitle}>Arco Inferior</Text>
        {lowerArchTeeth.map(tooth => (
          <ToothMeasurementDetail
            key={tooth}
            toothNumber={tooth}
            isOpen={openTooth === tooth}
            onToggle={() => handleToggleTooth(tooth)}
            data={periogram.data[tooth] || {}}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}