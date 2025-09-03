import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, useWindowDimensions, View, Text, FlatList } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './RequestsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FullAppointmentListItem from '@/components/features/FullAppointmentListItem';
import { getUsers } from '@/data/mockUsers';
import { getPendingAppointments, Appointment } from '@/data/mockAppointments';

export default function RequestsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const router = useRouter();

  const [requests, setRequests] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setRequests(getPendingAppointments());
  }, []);

  const filteredRequests = useMemo(() => {
    const patients = getUsers('patient');
    let requestsWithPatientData = requests.map(req => {
        const patient = patients.find(p => p.id === req.patientId);
        return {
            ...req,
            patientName: patient?.name || 'Paciente não encontrado',
            patientImage: patient?.image || null,
            hasAllergies: (patient?.allergies && patient.allergies.length > 0) || false,
        }
    });

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      requestsWithPatientData = requestsWithPatientData.filter(req =>
        req.patientName.toLowerCase().includes(lowercasedQuery)
      );
    }

    return requestsWithPatientData;
  }, [requests, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Solicitações`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleRequestPress = (id: string) => {
   router.push(`/appointment/${id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Pesquisar por paciente..."
            onSearchChange={setSearchQuery}
            onFilterPress={() => {}}
          />
          <FlatList
            data={filteredRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FullAppointmentListItem item={item} onPress={() => handleRequestPress(item.id)} />
            )}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma solicitação encontrada.</Text>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}