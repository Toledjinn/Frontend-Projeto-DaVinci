import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './AppointmentListScreen.styles';
import { useUIStore } from '@/state/uiStore';

import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import AppointmentListItem from '@/components/features/AppointmentListItem';
import RecordFilterModal from '@/components/features/RecordFilterModal';

import { getUsers, findUserById, UserProfile } from '@/data/mockUsers';
import { getAllAppointments, getPendingAppointments, getAppointmentsByPatientId, getAppointmentsByDentistName, Appointment, APPOINTMENT_STATUSES } from '@/data/mockAppointments';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';

import Chefinho from '@/assets/characters/chefinho.svg';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { formatUserName } from '@/utils/nameUtils';

const listTypeConfig = {
  all: {
    title: 'Consultas',
    fetchData: () => getAllAppointments().filter(a => a.status !== 'pendente'),
    searchPlaceholder: 'Pesquisar por paciente...',
    showFooter: true,
    footerButtonTitle: 'Agendar Consulta',
    headerLayout: 'page' as const,
  },
  pending: {
    title: 'Solicitações',
    fetchData: getPendingAppointments,
    searchPlaceholder: 'Pesquisar por paciente...',
    showFooter: false,
    footerButtonTitle: '', 
    headerLayout: 'page' as const,
  },
  patient: {
    title: 'Prontuário de',
    fetchData: getAppointmentsByPatientId,
    searchPlaceholder: 'Pesquisar por procedimento...',
    showFooter: true,
    footerButtonTitle: 'Nova Consulta',
    headerLayout: 'profile' as const,
  },
  dentist: {
    title: 'Consultas de',
    fetchData: getAppointmentsByDentistName,
    searchPlaceholder: 'Pesquisar por procedimento...',
    showFooter: true,
    footerButtonTitle: 'Nova Consulta',
    headerLayout: 'profile' as const,
  },
};

type ListType = keyof typeof listTypeConfig;

const isValidListType = (value: any): value is ListType => {
  return value in listTypeConfig;
};

export default function AppointmentListScreen() {
  const router = useRouter();
  const { listType: rawListType, id } = useLocalSearchParams<{ listType?: string, id?: string }>();
  
  const listType: ListType = isValidListType(rawListType)
    ? rawListType
    : id ? 'patient' : 'all';

  const config = listTypeConfig[listType];

  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const headerHeight = height * 0.27;

  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDentists, setSelectedDentists] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      const user = (config.headerLayout === 'profile' && id) ? findUserById(id) : null;

      if (user) {
        const formattedName = formatUserName(user.name);
        setHeaderConfig({
          layout: 'profile',
          userName: `${config.title} ${formattedName}`,
          UserImageSvg: user.image || UserPlaceholder,
          riskLevel: user.riskLevel,
          showNotificationIcon: true,
          showBackground: true,
        });
      } else {
        setHeaderConfig({
          layout: 'page',
          showPageHeaderElements: true, 
          pageTitle: config.title,
          CharacterSvg: Chefinho,
          showNotificationIcon: true,
          showBackground: true,
        });
      }

      let fetchedAppointments: Appointment[] = [];
      if (listType === 'patient' && id) {
        fetchedAppointments = (config.fetchData as (id: string) => Appointment[])(id);
      } else if (listType === 'dentist' && user) {
        fetchedAppointments = (config.fetchData as (name: string) => Appointment[])(user.name);
      } else {
        fetchedAppointments = (config.fetchData as () => Appointment[])();
      }
      setAllAppointments(fetchedAppointments || []);
    }, [listType, id, config])
  );

  const filteredAppointments = useMemo(() => {
    const patients = getUsers('patient');
    let appointmentsWithData = allAppointments.map(appt => {
      const patient = patients.find(p => p.id === appt.patientId);
      return {
          ...appt,
          patientName: patient?.name || 'Paciente não encontrado',
          patientImage: patient?.image || null,
          hasAllergies: !!patient?.allergies?.length,
      }
    });

    if (startDate) {
        appointmentsWithData = appointmentsWithData.filter(appt => new Date(appt.date.split('/').reverse().join('-')) >= startDate);
    }
    if (endDate) {
        const inclusiveEndDate = new Date(endDate);
        inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
        appointmentsWithData = appointmentsWithData.filter(appt => new Date(appt.date.split('/').reverse().join('-')) < inclusiveEndDate);
    }
    if (selectedDentists.length > 0) {
        appointmentsWithData = appointmentsWithData.filter(appt => selectedDentists.includes(appt.dentist));
    }
    if (selectedSpecialties.length > 0) {
        appointmentsWithData = appointmentsWithData.filter(appt => selectedSpecialties.includes(appt.specialty));
    }
    if (selectedStatus.length > 0) {
        appointmentsWithData = appointmentsWithData.filter(appt => selectedStatus.includes(appt.status));
    }
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      appointmentsWithData = appointmentsWithData.filter(a => a.patientName?.toLowerCase().includes(lowerQuery));
    }
    return appointmentsWithData;
  }, [allAppointments, searchQuery, startDate, endDate, selectedDentists, selectedSpecialties, selectedStatus, listType]);
  
  const dentistOptions = useMemo(() => [...new Set(getAllAppointments().map(a => a.dentist))], []);
  
  const handleApplyFilter = (filters: any) => {
    setStartDate(filters.start);
    setEndDate(filters.end);
    setSelectedDentists(filters.dentists);
    setSelectedSpecialties(filters.specialties);
    setSelectedStatus(filters.status);
    setFilterModalVisible(false);
  };
  
  const handleItemPress = (item: Appointment) => {
    router.push(`/(app)/appointment/${item.id}`);
  };

  const handleFooterButtonPress = () => {
    const params: { patientId?: string; dentistId?: string } = {};
    if (id) {
        if (listType === 'patient') params.patientId = id;
        if (listType === 'dentist') params.dentistId = id;
    }
    router.push({ pathname: '/(app)/schedule-appointment', params });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentListItem item={item} onPress={() => handleItemPress(item)} />
        )}
        contentContainerStyle={[styles.listContentContainer, { paddingTop: headerHeight }]}
        ListHeaderComponent={
          <SearchAndFilterBar
            value={searchQuery}
            placeholder={config.searchPlaceholder}
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
        }
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma consulta encontrada.</Text>}
      />
      {config.showFooter && (
        <ScreenFooter
          buttons={[{
            title: config.footerButtonTitle, 
            onPress: handleFooterButtonPress,
            variant: 'secondary',
          }]}
        />
      )}
      <RecordFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        dentistOptions={listType === 'all' ? dentistOptions : []}
        specialtyOptions={ALL_SPECIALTIES}
        statusOptions={APPOINTMENT_STATUSES} 
        initialFilters={{ 
          start: startDate, 
          end: endDate, 
          dentists: selectedDentists, 
          specialties: selectedSpecialties, 
          status: selectedStatus 
        }}
      />
    </SafeAreaView>
  );
}

