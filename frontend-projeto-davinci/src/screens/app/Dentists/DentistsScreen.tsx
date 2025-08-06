import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './DentistsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Dentista from '@/assets/characters/chefinho.svg';
import UserList, { User } from '@/components/features/UserList';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FilterModal from '@/components/features/FilterModal';
import { getUsers } from '@/data/mockUsers'; 

const MOCK_DENTISTS = getUsers('dentist');

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
    const dentists = MOCK_DENTISTS.map(user => ({
        ...user,
        detailLine1: user.specialties?.join(' | ') || 'Clínica Geral'
    }));

    return dentists.filter((dentist) => {
      const nameMatch = dentist.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const specialtyMatch =
        selectedSpecialties.length === 0 ||
        (dentist.specialties && selectedSpecialties.some((spec) => dentist.specialties!.includes(spec)));

      return nameMatch && specialtyMatch;
    });
  }, [searchQuery, selectedSpecialties]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1}}>
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