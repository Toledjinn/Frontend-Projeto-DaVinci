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

import { useUsers } from '@/hooks/useUsers';
import { useAppointments } from '@/hooks/useAppointments';
import type { Appointment } from '@/data/appointmentsStore';
import { APPOINTMENT_STATUSES } from '@/data/appointmentsStore';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';

import Chefinho from '@/assets/characters/chefinho.svg';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { formatUserName } from '@/utils/nameUtils';

type ListType = 'all' | 'pending' | 'patient' | 'dentist';

export default function AppointmentListScreen() {
  const router = useRouter();
  const { listType: rawListType, id } = useLocalSearchParams<{ listType?: string; id?: string }>();
  const listType: ListType = (
    ['all', 'pending', 'patient', 'dentist'].includes(rawListType || '')
      ? rawListType
      : id
      ? 'patient'
      : 'all'
  ) as ListType;

  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const headerHeight = height * 0.27;

  const { list: users } = useUsers();
  const { list: appointments, refresh } = useAppointments();

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
      refresh();
    }, [refresh])
  );

  useFocusEffect(
    useCallback(() => {
      const user = id ? users.find((u) => u.id === id) : null;

      if (user) {
        const formatted = formatUserName(user.name);
        setHeaderConfig({
          layout: 'profile',
          userName: `${listType === 'patient' ? 'Prontuário de' : 'Consultas de'} ${formatted}`,
          userPhotoUri: user.photoUri ?? null,
          UserImageSvg: user.image || UserPlaceholder,
          showNotificationIcon: true,
          showBackground: true,
        });
      } else {
        setHeaderConfig({
          layout: 'page',
          showPageHeaderElements: true,
          pageTitle: listType === 'pending' ? 'Solicitações' : 'Consultas',
          CharacterSvg: Chefinho,
          showNotificationIcon: true,
          showBackground: true,
        });
      }

      let filtered: Appointment[] = [];
      if (listType === 'patient' && id) filtered = appointments.filter((a) => a.patientId === id);
      else if (listType === 'dentist' && id) filtered = appointments.filter((a) => a.dentistId === id);
      else if (listType === 'pending') filtered = appointments.filter((a) => a.status === 'pendente');
      else filtered = appointments.filter((a) => a.status !== 'pendente');

      setAllAppointments(filtered);
    }, [listType, id, users, appointments, setHeaderConfig])
  );

  const filteredAppointments = useMemo(() => {
    const patients = users.filter((u) => u.type === 'patient');
    const dentists = users.filter((u) => u.type === 'dentist');

    let enriched = allAppointments.map((appt) => {
      const patient = patients.find((p) => p.id === appt.patientId);
      const dentist = dentists.find((d) => d.id === appt.dentistId);

      const patientImage = patient?.photoUri
        ? { uri: patient.photoUri }
        : patient?.image || null;

      return {
        ...appt,
        patientName: patient?.name || 'Paciente não encontrado',
        patientImage,
        dentistName: dentist?.name || 'Dentista não encontrado',
        hasAllergies: !!patient?.allergies?.length,
      };
    });

    if (startDate) enriched = enriched.filter((a) => new Date(a.date.split('/').reverse().join('-')) >= startDate);
    if (endDate) {
      const inclusiveEnd = new Date(endDate);
      inclusiveEnd.setDate(inclusiveEnd.getDate() + 1);
      enriched = enriched.filter((a) => new Date(a.date.split('/').reverse().join('-')) < inclusiveEnd);
    }
    if (selectedDentists.length) enriched = enriched.filter((a) => selectedDentists.includes(a.dentistId));
    if (selectedSpecialties.length) enriched = enriched.filter((a) => selectedSpecialties.includes(a.specialty));
    if (selectedStatus.length) enriched = enriched.filter((a) => selectedStatus.includes(a.status));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      enriched = enriched.filter((a) => a.patientName.toLowerCase().includes(q));
    }

    enriched.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [hourA, minuteA] = a.time.split(':').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA);

      const [dayB, monthB, yearB] = b.date.split('/').map(Number);
      const [hourB, minuteB] = b.time.split(':').map(Number);
      const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB);

      return dateB.getTime() - dateA.getTime();
    });

    return enriched;
  }, [allAppointments, users, searchQuery, startDate, endDate, selectedDentists, selectedSpecialties, selectedStatus]);

  const dentistOptions = useMemo(
    () => users.filter((u) => u.type === 'dentist').map((u) => ({ label: u.name, value: u.id })),
    [users]
  );

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
      <View style={{ flex: 1, paddingTop: headerHeight }}>
        <View style={styles.fixedHeaderContainer}>
          <SearchAndFilterBar
            value={searchQuery}
            placeholder="Pesquisar consulta..."
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
        </View>

        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentListItem item={item} onPress={() => handleItemPress(item)} />
          )}
          style={{ flex: 1 }}
          contentContainerStyle={styles.listContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma consulta encontrada.</Text>}
        />
      </View>

      <ScreenFooter
        buttons={[
          {
            title: listType === 'pending' ? 'Ver Consultas' : 'Nova Consulta',
            onPress: handleFooterButtonPress,
            variant: 'secondary',
          },
        ]}
      />

      <RecordFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        dentistOptions={dentistOptions}
        specialtyOptions={ALL_SPECIALTIES}
        statusOptions={APPOINTMENT_STATUSES}
        initialFilters={{
          start: startDate,
          end: endDate,
          dentists: selectedDentists,
          specialties: selectedSpecialties,
          status: selectedStatus,
        }}
      />
    </SafeAreaView>
  );
}
