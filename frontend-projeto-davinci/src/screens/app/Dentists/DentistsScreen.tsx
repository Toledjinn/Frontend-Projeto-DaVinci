import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './DentistsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Dentista from '@/assets/characters/chefinho.svg';
import UserList, { User } from '@/components/features/UserList';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FilterModal from '@/components/features/FilterModal';

const MOCK_DENTISTS: User[] = [
  { id: '1', name: 'José Maria Gratone', detailLine1: 'Periodontia | Prótese', specialties: ['Periodontia', 'Prótese'], image: FotoPerfil },
  { id: '2', name: 'Ana Costa', detailLine1: 'Ortodontia', specialties: ['Ortodontia'], image: null },
  { id: '3', name: 'Carlos Dias', detailLine1: 'Endodontia', specialties: ['Endodontia'], image: null },
  { id: '4', name: 'Mariana Lima', detailLine1: 'Implantodontia', specialties: ['Implantodontia'], image: null },
  { id: '5', name: 'Pedro Alves', detailLine1: 'Odontopediatria', specialties: ['Odontopediatria'], image: null },
  { id: '6', name: 'Juliana Santos', detailLine1: 'Clínica Geral', specialties: ['Clínica Geral'], image: null },
  { id: '7', name: 'Maurício Shiguedomi Mochida', detailLine1: 'Implantodontia | Harmonização Facial', specialties: ['Implantodontia', 'Harmonização Facial'], image: null },
];

const availableSpecialties = Array.from(
  new Set(MOCK_DENTISTS.flatMap((dentist) => dentist.specialties || []))
).sort();

export default function DentistsScreen() {
  const router = useRouter();
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
        pageTitle: 'Dentistas',
        CharacterSvg: Dentista,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleApplyFilter = (specialties: string[]) => {
    setSelectedSpecialties(specialties);
    setFilterModalVisible(false);
  };

  const handleRegisterPress = () => {
    router.push({
      pathname: '/register',
      params: { userType: 'dentist' },
    });
  };
  const filteredDentists = useMemo(() => {
    return MOCK_DENTISTS.filter((dentist) => {
      const nameMatch = dentist.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const specialtyMatch =
        selectedSpecialties.length === 0 ||
        (dentist.specialties && selectedSpecialties.some((spec) => dentist.detailLine1.includes(spec)));

      return nameMatch && specialtyMatch;
    });
  }, [searchQuery, selectedSpecialties]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Digite o nome do dentista"
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <UserList data={filteredDentists} />
          </ScrollView>
        </View>
        <ScreenFooter
          primaryButtonTitle="Cadastrar Dentista"
          onPrimaryButtonPress={handleRegisterPress}
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
