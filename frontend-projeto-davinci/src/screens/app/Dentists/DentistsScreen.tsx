import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './DentistsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Dentista from '@/assets/characters/chefinho.svg';
import UserList, { User } from '@/components/features/UserList';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FilterModal from '@/components/features/FilterModal';

const MOCK_DENTISTS: User[] = [
  { id: '1', name: 'José Maria Gratone', cro: '0000 - DF', specialties: ['Periodontia', 'Prótese'], image: FotoPerfil },
  { id: '2', name: 'Ana Costa', cro: '1234 - SP', specialties: ['Ortodontia'], image: null },
  { id: '3', name: 'Carlos Dias', cro: '5678 - RJ', specialties: ['Endodontia'], image: null },
  { id: '4', name: 'Mariana Lima', cro: '9101 - MG', specialties: ['Implantodontia'], image: null },
  { id: '5', name: 'Pedro Alves', cro: '1121 - BA', specialties: ['Odontopediatria'], image: null },
  { id: '6', name: 'Juliana Santos', cro: '3141 - RS', specialties: ['Clínica Geral'], image: null },
  { id: '7', name: 'Maurício Shiguedomi Mochida', cro: '1122 - DF', specialties: ['Implantodontia', 'Harmonização Facial'], image: null },
];

const availableSpecialties = Array.from(
  new Set(MOCK_DENTISTS.flatMap((dentist) => dentist.specialties))
).sort();

export default function DentistsScreen() {
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

  const filteredDentists = useMemo(() => {
    return MOCK_DENTISTS.filter((dentist) => {
      const nameMatch = dentist.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const specialtyMatch =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.some((spec) => dentist.specialties.includes(spec));

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
          onPrimaryButtonPress={() => console.log('Cadastrar Dentista')}
        />
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        options={availableSpecialties}
        initialSelectedOptions={selectedSpecialties}
      />
    </SafeAreaView>
  );
}