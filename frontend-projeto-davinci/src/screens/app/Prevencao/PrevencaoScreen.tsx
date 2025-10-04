import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './PrevencaoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import DynamicInputList from '@/components/features/DynamicInputList';

const preventionTitles: { [key: string]: string } = {
  primaria: 'Prevenção Primária',
  secundaria: 'Prevenção Secundária',
  terciaria: 'Prevenção Terciária',
  quaternaria: 'Prevenção Quaternária',
};


export default function PrevencaoScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { patientId, type } = useLocalSearchParams<{ patientId: string, type: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [patient, setPatient] = useState<UserProfile | null>(null);

  useEffect(() => {
    console.log(`Carregando dados para: ${type}`);
  }, [type]);

  useEffect(() => {
    if (patientId) {
      const foundUser = findUserById(patientId);
      setPatient(foundUser || null);
    }
  }, [patientId]);

  useFocusEffect(
    useCallback(() => {
      if (patient && type) {
        const title = preventionTitles[type] || 'Prevenção';
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: `${title} de ${formatUserName(patient.name)}`,
          UserImageSvg: patient.image || UserPlaceholder,
          showNotificationIcon: false,
          riskLevel: patient.riskLevel,
        });
      }
    }, [patient, type])
  );
  
  const handleSave = () => {
    console.log("Salvando dados de Prevenção:", {type});
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
        <DynamicInputList
            title="Diagnóstico"
            inputIcon="check-square"
            placeholder="Diagnóstico"
            addMoreText="Adicionar Item"
        />
      </ScrollView>

      <ScreenFooter
        buttons={[
          {
            title: "Cancelar",
            onPress: () => router.back(),
            variant: 'secondary',  
          },
          {
            title: "Salvar",
            onPress: handleSave,
            variant: 'primary',  
          },
        ]}
      />
    </SafeAreaView>
  );
}