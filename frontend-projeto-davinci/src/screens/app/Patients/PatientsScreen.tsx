import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './PatientsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Paciente from '@/assets/characters/chefinho.svg'; 
import UserList, { User } from '@/components/features/UserList';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FilterModal from '@/components/features/FilterModal';
import FotoPerfil from '@/assets/images/FotoPerfil.svg'

const MOCK_PATIENTS: User[] = [
  { id: '1', name: 'Rafael Ferreira', detailLine1: 'Última consulta: 21/05/2025', image: null, specialties: ['Periodontia', 'Prótese'] },
  { id: '2', name: 'Luiz Toledo', detailLine1: 'Última consulta: 15/04/2025', image: null, specialties: ['Ortodontia'] },
  { id: '3', name: 'Bruce Wayne', detailLine1: 'Última consulta: 01/03/2025', image: null, specialties: ['Endodontia'] },
  { id: '4', name: 'Clark Kent', detailLine1: 'Última consulta: 18/02/2025', image: null, specialties: ['Implantodontia'] },
  { id: '5', name: 'Diana Prince', detailLine1: 'Última consulta: 10/01/2025', image: null, specialties: ['Odontopediatria', 'Clínica Geral'] },
];

const availableSpecialties = Array.from(
  new Set(MOCK_PATIENTS.flatMap((patient) => patient.specialties || []))
).sort();

export default function PatientsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Pacientes',
        CharacterSvg: Paciente,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleApplyFilter = (specialties: string[]) => {
    setSelectedSpecialties(specialties);
    setFilterModalVisible(false);
  };

  const filteredPatients = useMemo(() => {
    return MOCK_PATIENTS.filter((patient) => {
      const nameMatch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());

      const specialtyMatch =
        selectedSpecialties.length === 0 ||
        (patient.specialties && selectedSpecialties.some((spec) => patient.specialties!.includes(spec)));

      return nameMatch && specialtyMatch;
    });
  }, [searchQuery, selectedSpecialties]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Digite o nome do paciente"
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <UserList data={filteredPatients} />
          </ScrollView>
        </View>
        <ScreenFooter
          primaryButtonTitle="Cadastrar Paciente"
          onPrimaryButtonPress={() => console.log('Cadastrar Paciente')}
        />
      </View>
      <FilterModal
        title="Filtrar por Especialidade" 
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        options={availableSpecialties}
        initialSelectedOptions={selectedSpecialties}
      />
    </SafeAreaView>
  );
}