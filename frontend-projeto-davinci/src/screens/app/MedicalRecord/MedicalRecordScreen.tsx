import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useWindowDimensions, View, Text, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { styles } from './MedicalRecordScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import AppointmentListItem from '@/components/features/AppointmentListItem';
import RecordFilterModal from '@/components/features/RecordFilterModal';
import { findUserById, UserProfile, getUsers } from '@/data/mockUsers';
import { getAppointmentsByPatientId, Appointment } from '@/data/mockAppointments';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

export default function MedicalRecordScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const MOCK_DENTISTS = getUsers('dentist');
  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDentists, setSelectedDentists] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  
  type FilterItem = { label: string; value: string }

  type Filters = {
    start: Date | null;
    end: Date | null;
    dentists: string[];
    specialties: string[];
    status: string[]; 
  };

  useEffect(() => {
    if (patientId) {
      const foundPatient = findUserById(patientId);
      setPatient(foundPatient || null);

      const patientAppointments = getAppointmentsByPatientId(patientId);
      setAllAppointments(patientAppointments);
    }
  }, [patientId]);

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
    if (selectedDentists.length > 0) {
      appointments = appointments.filter(appt => selectedDentists.includes(appt.dentist));
    }
    if (selectedSpecialties.length > 0) {
      appointments = appointments.filter(appt => selectedSpecialties.includes(appt.specialty));
    }
    if (selectedStatuses.length > 0) { 
      appointments = appointments.filter(appt => selectedStatuses.includes(appt.status));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      appointments = appointments.filter(appt =>
        appt.procedures.some(proc => proc.toLowerCase().includes(q))
      );
    }

    return appointments.map(appt => {
        const dentistProfile = MOCK_DENTISTS.find(d => d.name === appt.dentist);
        const isFeminino =
          dentistProfile?.details.find(d => d.label === 'Gênero')?.value === 'Feminino';
        const prefix = isFeminino ? 'Dra.' : 'Dr.';
        return { ...appt, dentist: `${prefix} ${appt.dentist}` };
      });
    }, [allAppointments, searchQuery, startDate, endDate, selectedDentists, selectedSpecialties, selectedStatuses]); 

  const dentistOptions = useMemo(
    () => [...new Set(allAppointments.map(a => a.dentist))],
    [allAppointments]
  );

  const specialtyOptions = useMemo(
    () => [...new Set(allAppointments.map(a => a.specialty))],
    [allAppointments]
  );

  const statusOptions: FilterItem[] = useMemo(() => {
    const labelMap = {
      agendada: 'Agendada',
      pendente: 'Pendente',
      realizada: 'Realizada',
      cancelada: 'Cancelada',
    } as const;

    const order: Array<keyof typeof labelMap> = ['agendada', 'pendente', 'realizada', 'cancelada'];
    const present = new Set(allAppointments.map(a => a.status));
    return order
      .filter(s => present.has(s))
      .map(s => ({ label: labelMap[s], value: s }));
  }, [allAppointments]);

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        const formattedName = formatUserName(patient.name);
        setHeaderConfig({
          layout: 'profile', 
          showBackground: true,
          userName: `Prontuário de ${formattedName}`, 
          UserImageSvg: patient.image || UserPlaceholder, 
          riskLevel: patient.riskLevel, 
          showNotificationIcon: true,
        });
      }
    }, [patient])
  );

  const handleApplyFilter = (filters: Filters) => {
    setStartDate(filters.start);
    setEndDate(filters.end);
    setSelectedDentists(filters.dentists);
    setSelectedSpecialties(filters.specialties);
    setSelectedStatuses(filters.status);
  };

  const handleNewAppointment = () => { 
    router.push({
      pathname: '/(app)/schedule-appointment',
      params: { patientId: patientId },
    });
  };

  const handleAppointmentPress = (id: string) => {
    router.push({
        pathname: '/(app)/appointment/[appointmentId]',
        params: { appointmentId: id, mode: 'review' },
    });  
  };
  
  return (
    <SafeAreaProvider style={styles.safeArea}>
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
        dentistOptions={dentistOptions}
        specialtyOptions={specialtyOptions}
        statusOptions={statusOptions} 
        initialFilters={{
          start: startDate,
          end: endDate,
          dentists: selectedDentists,
          specialties: selectedSpecialties,
          status: selectedStatuses, 
        }}
      />
    </SafeAreaProvider>
  );
}