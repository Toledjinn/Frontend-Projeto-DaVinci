import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, useWindowDimensions, View, Text, FlatList } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { styles } from './DentistAppointmentsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import AppointmentListItem from '@/components/features/AppointmentListItem';
import RecordFilterModal from '@/components/features/RecordFilterModal';
import { findUserById, UserProfile } from '@/data/mockUsers'; 
import { getAppointmentsByDentistName, Appointment } from '@/data/mockAppointments';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg'; 

export default function DentistAppointmentsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { dentistId } = useLocalSearchParams<{ dentistId: string }>();

  const [dentist, setDentist] = useState<UserProfile | null>(null); 
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    if (dentistId) {
      const foundDentist = findUserById(dentistId);
      if (foundDentist) {
        setDentist(foundDentist);
        const dentistAppointments = getAppointmentsByDentistName(foundDentist.name);
        setAllAppointments(dentistAppointments);
      }
    }
  }, [dentistId]);

  const filteredAppointments = useMemo(() => {
    let appointments = [...allAppointments];

    if (startDate) {
        appointments = appointments.filter(appt => new Date(appt.date.split('/').reverse().join('-')) >= startDate);
    }
    if (endDate) {
        const inclusiveEndDate = new Date(endDate);
        inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
        appointments = appointments.filter(appt => new Date(appt.date.split('/').reverse().join('-')) < inclusiveEndDate);
    }
    if (selectedSpecialties.length > 0) {
        appointments = appointments.filter(appt => selectedSpecialties.includes(appt.specialty));
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      appointments = appointments.filter(appt =>
        appt.procedures.some(proc => proc.toLowerCase().includes(lowercasedQuery))
      );
    }

    return appointments;
  }, [allAppointments, searchQuery, startDate, endDate, selectedSpecialties]);

  const specialtyOptions = useMemo(() => [...new Set(allAppointments.map(a => a.specialty))], [allAppointments]);

  useFocusEffect(
    useCallback(() => {
      if (dentist) { 
        setHeaderConfig({
          layout: 'profile', 
          showBackground: true, 
          showPageHeaderElements: true,
          pageTitle: `Consultas de ${dentist.name}`,
          UserImageSvg: dentist.image || UserPlaceholder,
          showNotificationIcon: true,
          userName: dentist.name,
          riskLevel: dentist.riskLevel, 
        });
      }
    }, [dentist])
  );

  const handleApplyFilter = (filters: any) => {
    setStartDate(filters.start);
    setEndDate(filters.end);
    setSelectedSpecialties(filters.specialties);
  };

  if (!dentist) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.outerContainer}>
                <Text style={styles.emptyText}>Carregando informações do dentista...</Text>
            </View>
        </SafeAreaView>
    );
  }
  
  const handleNewAppointment = () => { 
    router.push({
        pathname: '/(app)/schedule-appointment',
        params: { dentistId: dentist?.id }
    });
  };

  const handleAppointmentPress = (id: string) => {
    router.push(`/(app)/appointment/${id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Pesquisar por procedimento..."
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
           <FlatList
            data={filteredAppointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AppointmentListItem item={item} onPress={() => handleAppointmentPress(item.id)} /> 
            )}
            contentContainerStyle={styles.scrollContentContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma consulta encontrada.</Text>}
          />
        </View>
        <ScreenFooter
          primaryButtonTitle="Nova Consulta"
          onPrimaryButtonPress={handleNewAppointment}
        />
      </View>
      <RecordFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        dentistOptions={[]}
        specialtyOptions={specialtyOptions}
        initialFilters={{ start: startDate, end: endDate, dentists: [], specialties: selectedSpecialties }}
      />
    </SafeAreaView>
  );
}