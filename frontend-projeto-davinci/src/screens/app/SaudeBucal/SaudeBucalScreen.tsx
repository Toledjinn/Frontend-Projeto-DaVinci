import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './SaudeBucalScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SaudeGeralForm from '@/components/features/SaudeBucalForm'; 

export default function SaudeBucalScreen() {
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
          userName: `Saúde Bucal de ${formatUserName(patient.name)}`,
          UserImageSvg: patient.image || UserPlaceholder,
          showNotificationIcon: false,
          riskLevel: patient.riskLevel,
        });
      }
    }, [patient])
  );
  
  const handleSave = () => {
    console.log("Salvando formulário de Saúde Geral...");
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
        <SaudeGeralForm />
      </ScrollView>
      <ScreenFooter buttons={[
        {
          title: "Salvar",
          onPress: router.back,
          variant: 'secondary', 
        }

      ]}/>
    </SafeAreaView>
  );
}