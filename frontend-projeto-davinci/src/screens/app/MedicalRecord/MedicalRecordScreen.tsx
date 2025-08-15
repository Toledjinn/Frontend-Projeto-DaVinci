import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, useWindowDimensions, View, Text, FlatList } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { styles } from './MedicalRecordScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Prontuario from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import AppointmentListItem from '@/components/features/AppointmentListItem';
import RecordFilterModal from '@/components/features/RecordFilterModal'; // <-- Importado
import { findUserById } from '@/data/mockUsers';
import { getAppointmentsByPatientId, Appointment } from '@/data/mockAppointments';

export default function MedicalRecordScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { patientId } = useLocalSearchParams<{ patientId: string }>();

  const [patientName, setPatientName] = useState('');
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDentists, setSelectedDentists] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    if (patientId) {
      const patient = findUserById(patientId);
      setPatientName(patient?.name || '');
      const patientAppointments = getAppointmentsByPatientId(patientId);
      setAllAppointments(patientAppointments);
    }
  }, [patientId]);

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
    if (selectedDentists.length > 0) {
        appointments = appointments.filter(appt => selectedDentists.includes(appt.dentist));
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
  }, [allAppointments, searchQuery, startDate, endDate, selectedDentists, selectedSpecialties]);

  const dentistOptions = useMemo(() => [...new Set(allAppointments.map(a => a.dentist))], [allAppointments]);
  const specialtyOptions = useMemo(() => [...new Set(allAppointments.map(a => a.specialty))], [allAppointments]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Prontuário de ${patientName}`,
        CharacterSvg: Prontuario,
        showNotificationIcon: true,
      });
    }, [patientName])
  );

  const handleApplyFilter = (filters: any) => {
    setStartDate(filters.start);
    setEndDate(filters.end);
    setSelectedDentists(filters.dentists);
    setSelectedSpecialties(filters.specialties);
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
              <AppointmentListItem item={item} onPress={() => console.log('Ver detalhes da consulta', item.id)} />
            )}
            contentContainerStyle={styles.scrollContentContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma consulta encontrada.</Text>}
          />
        </View>
        <ScreenFooter
          primaryButtonTitle="Nova Consulta"
          onPrimaryButtonPress={() => console.log('Nova Consulta')}
        />
      </View>
      <RecordFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        dentistOptions={dentistOptions}
        specialtyOptions={specialtyOptions}
        initialFilters={{ start: startDate, end: endDate, dentists: selectedDentists, specialties: selectedSpecialties }}
      />
    </SafeAreaView>
  );
}
