import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, useWindowDimensions, Text, View, Alert } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './PeriogramScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import ToothMeasurementCard from '@/components/features/ToothMeasurementCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const upperArchTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerArchTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const columns = ['MV', 'V', 'DV', 'MP/ML', 'P/L', 'DP/DL', 'RE-V', 'RE-P/L', 'MO', 'FM', 'FV', 'FL', 'M-CER'];

const generateInitialState = () => {
  const allTeeth = [...upperArchTeeth, ...lowerArchTeeth];
  const state: { [key: number]: { [key: string]: string } } = {};
  allTeeth.forEach(tooth => {
    state[tooth] = {};
    columns.forEach(col => {
      state[tooth][col] = '';
    });
  });
  return state;
};

export default function PeriogramScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [periogramData, setPeriogramData] = useState(generateInitialState());
  const [openTooth, setOpenTooth] = useState<number | null>(null);

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
          userName: 'Novo Periograma',
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
          showNotificationIcon: false
        });
      }
    }, [patient])
  );

  const handleToggleTooth = (toothNumber: number) => {
    setOpenTooth(currentOpenTooth => (currentOpenTooth === toothNumber ? null : toothNumber));
  };

  const handleDataChange = (tooth: number, column: string, value: string) => {
    setPeriogramData(prevData => ({
      ...prevData,
      [tooth]: {
        ...prevData[tooth],
        [column]: value,
      },
    }));
  };
  
  const handleSave = () => {
    console.log("Salvando Periograma:", periogramData);
    Alert.alert('Sucesso', 'Periograma salvo com sucesso (simulação).');
    router.back();
  };

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
        <Text style={styles.sectionTitle}>Arco Superior</Text>
        {upperArchTeeth.map(tooth => (
          <ToothMeasurementCard
            key={tooth}
            toothNumber={tooth}
            isOpen={openTooth === tooth}
            onToggle={() => handleToggleTooth(tooth)}
            data={periogramData[tooth]}
            onDataChange={handleDataChange}
          />
        ))}

        <Text style={styles.sectionTitle}>Arco Inferior</Text>
        {lowerArchTeeth.map(tooth => (
          <ToothMeasurementCard
            key={tooth}
            toothNumber={tooth}
            isOpen={openTooth === tooth}
            onToggle={() => handleToggleTooth(tooth)}
            data={periogramData[tooth]}
            onDataChange={handleDataChange}
          />
        ))}
      </ScrollView>

      <ScreenFooter
        buttons={[
          {
            title: "Salvar",
            onPress: handleSave,
            variant: 'primary',  
          },
          {
            title: "Cancelar",
            onPress: () => router.back(),
            variant: 'secondary',  
          }
        ]}
      />
    </SafeAreaView>
  );
}