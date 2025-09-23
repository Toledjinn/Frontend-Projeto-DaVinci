import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useWindowDimensions, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { formatUserName } from '@/utils/nameUtils';


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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  type Filters = {
    start: Date | null;
    end: Date | null;
    dentists: string[];
    specialties: string[];
    status: string[];
  };

  type FilterItem = { label: string; value: string };

  const specialtyOptions = useMemo(
    () => [...new Set(allAppointments.map(a => a.specialty))],
    [allAppointments]
  );

  const statusOptions: FilterItem[] = useMemo(() => {
    const labelMap: Record<Appointment['status'], string> = {
      agendada: 'Agendada',
      pendente: 'Pendente',
      realizada: 'Realizada',
      cancelada: 'Cancelada',
    };
  
  const order: Appointment['status'][] = ['agendada', 'pendente', 'realizada', 'cancelada'];

  const present = new Set<Appointment['status']>(
    allAppointments.map(a => a.status)
  );

  return order
    .filter(s => present.has(s))
    .map(s => ({ label: labelMap[s], value: s }));
}, [allAppointments]);


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

  useFocusEffect(
    useCallback(() => {
      if (dentist) { 
        const formattedName = formatUserName(dentist.name);
        setHeaderConfig({
          layout: 'profile', 
          showBackground: true, 
          showPageHeaderElements: true,
          pageTitle: `Consultas de ${formattedName}`,
          UserImageSvg: dentist.image || UserPlaceholder,
          showNotificationIcon: true,
          userName: formattedName,
          riskLevel: dentist.riskLevel, 
        });
      }
    }, [dentist])
  );
  
  const filteredAppointments = useMemo(() => {
    let appointments = [...allAppointments];

    if (startDate) {
      appointments = appointments.filter(
        appt => new Date(appt.date.split('/').reverse().join('-')) >= startDate
      );
    }
    if (endDate) {
      const inclusiveEndDate = new Date(endDate);
      inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
      appointments = appointments.filter(
        appt => new Date(appt.date.split('/').reverse().join('-')) < inclusiveEndDate
      );
    }
    if (selectedSpecialties.length > 0) {
      appointments = appointments.filter(appt => selectedSpecialties.includes(appt.specialty));
    }
    if (selectedStatuses.length > 0) {
      appointments = appointments.filter(appt => selectedStatuses.includes(appt.status));
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      appointments = appointments.filter(appt =>
        appt.procedures.some(proc => proc.toLowerCase().includes(lowercasedQuery))
      );
    }

    return appointments;

  }, [allAppointments, searchQuery, startDate, endDate, selectedSpecialties, selectedStatuses]);
  

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

  const handleApplyFilter = (filters: Filters) => {
    setStartDate(filters.start);
    setEndDate(filters.end);
    setSelectedSpecialties(filters.specialties);
    setSelectedStatuses(filters.status); 
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
    router.push({
      pathname: '/(app)/appointment/[appointmentId]',
      params: { appointmentId: id, mode: 'review' },
  });
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
        dentistOptions={[] as string[]}
        specialtyOptions={specialtyOptions}
        statusOptions={statusOptions}           
        initialFilters={{
          start: startDate,
          end: endDate,
          dentists: [] as string[],
          specialties: selectedSpecialties,
          status: selectedStatuses,
        }}
      />
    </SafeAreaView>
  );
}