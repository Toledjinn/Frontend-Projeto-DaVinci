import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, useWindowDimensions, View, Text, FlatList } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './AppointmentsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FullAppointmentListItem from '@/components/features/FullAppointmentListItem';
import RecordFilterModal from '@/components/features/RecordFilterModal';
import { getUsers } from '@/data/mockUsers';
import { getAllAppointments, Appointment } from '@/data/mockAppointments';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';

export default function AppointmentsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const router = useRouter();

  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDentists, setSelectedDentists] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    setAllAppointments(getAllAppointments());
  }, []);

  const filteredAppointments = useMemo(() => {
    const patients = getUsers('patient');
    let appointmentsWithPatientData = allAppointments.map(appt => {
        const patient = patients.find(p => p.id === appt.patientId);
        return {
            ...appt,
            patientName: patient?.name || 'Paciente não encontrado',
            patientImage: patient?.image || null,
            hasAllergies: (patient?.allergies && patient.allergies.length > 0) || false,
        }
    });

    if (startDate) {
        appointmentsWithPatientData = appointmentsWithPatientData.filter(appt => new Date(appt.date.split('/').reverse().join('-')) >= startDate);
    }
    if (endDate) {
        const inclusiveEndDate = new Date(endDate);
        inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
        appointmentsWithPatientData = appointmentsWithPatientData.filter(appt => new Date(appt.date.split('/').reverse().join('-')) < inclusiveEndDate);
    }
    if (selectedDentists.length > 0) {
        appointmentsWithPatientData = appointmentsWithPatientData.filter(appt => selectedDentists.includes(appt.dentist));
    }
    if (selectedSpecialties.length > 0) {
        appointmentsWithPatientData = appointmentsWithPatientData.filter(appt => selectedSpecialties.includes(appt.specialty));
    }
    
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      appointmentsWithPatientData = appointmentsWithPatientData.filter(appt =>
        appt.patientName.toLowerCase().includes(lowercasedQuery)
      );
    }

    return appointmentsWithPatientData;
  }, [allAppointments, searchQuery, startDate, endDate, selectedDentists, selectedSpecialties]);

  const dentistOptions = useMemo(() => [...new Set(allAppointments.map(a => a.dentist))], [allAppointments]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Consultas`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleApplyFilter = (filters: any) => {
    setStartDate(filters.start);
    setEndDate(filters.end);
    setSelectedDentists(filters.dentists);
    setSelectedSpecialties(filters.specialties);
  };
  
  const handleNewAppointment = () => {
    router.push('/(app)/schedule-appointment');
  };

  const handleAppointmentPress = (id: string) => { 
    router.push(`/(app)/appointment/${id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Pesquisar por paciente..."
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
          <FlatList
            data={filteredAppointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FullAppointmentListItem item={item} onPress={() => handleAppointmentPress(item.id)} /> 
            )}
            contentContainerStyle={styles.scrollContentContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma consulta encontrada.</Text>}
          />
        </View>
        <ScreenFooter
          primaryButtonTitle="Agendar Consulta"
          onPrimaryButtonPress={handleNewAppointment}
        />
      </View>
      <RecordFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        dentistOptions={dentistOptions}
        specialtyOptions={ALL_SPECIALTIES}
        initialFilters={{ start: startDate, end: endDate, dentists: selectedDentists, specialties: selectedSpecialties }}
      />
    </SafeAreaView>
  );
}