import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './PeriogramasListScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { getPeriogramsForPatient, SavedPeriogram } from '@/data/mockPeriograms';
import CollapsiblePeriogramItem from '@/components/features/CollapsiblePeriogramItem';
import ScreenFooter from '@/components/common/ScreenFooter';

export default function PeriogramasListScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [periograms, setPeriograms] = useState<SavedPeriogram[]>([]);
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  useEffect(() => {
    if (patientId) {
      setPatient(findUserById(patientId) ?? null);
      setPeriograms(getPeriogramsForPatient(patientId));
    }
  }, [patientId]);

  useFocusEffect(useCallback(() => {
    if (patient) {
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        userName: `Periogramas de ${formatUserName(patient.name)}`,
        UserImageSvg: patient.image || UserPlaceholder,
        riskLevel: patient.riskLevel,
        showNotificationIcon: false
      });
    }
  }, [patient]));

  const handleToggleItem = (itemId: string) => {
    setOpenItemId(currentId => (currentId === itemId ? null : itemId));
  };

  const handleNewPeriogram = () => {
    if (patient) {
      router.push({
        pathname: '/(app)/novo-periograma',
        params: { patientId: patient.id },
      });
    }
  };

  if (!patient) return <SafeAreaView style={styles.safeArea}><Text>Carregando...</Text></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={periograms}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        renderItem={({ item }) => (
          <CollapsiblePeriogramItem
            item={item}
            isOpen={openItemId === item.id}
            onToggle={() => handleToggleItem(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum periograma encontrado.</Text>}
      />
      
      <ScreenFooter
        buttons={[
          {
            title: "Novo Periograma",
            onPress: handleNewPeriogram,
            variant: 'secondary',  
          }
        ]}
      />
    </SafeAreaView>
  );
}