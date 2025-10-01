import React, { useState, useMemo, useCallback } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './DentistsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Dentista from '@/assets/characters/chefinho.svg';
import UserList from '@/components/features/UserList';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import DentistFilterModal from '@/components/features/DentistFilterModal';
import { getUsers } from '@/data/mockUsers';

const MOCK_DENTISTS = getUsers('dentist');

const availableSpecialties = Array.from(
  new Set(MOCK_DENTISTS.flatMap((dentist) => dentist.specialties || []))
).sort();

export default function DentistsScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.204;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]); 


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

  const handleApplyFilter = (filters: { genders: string[]; specialties: string[] }) => {
    setSelectedGenders(filters.genders);
    setSelectedSpecialties(filters.specialties);
    setFilterModalVisible(false);
  };
  
  const handleRegisterPress = () => {
    router.push({
      pathname: '/register',
      params: { userType: 'dentist' },
    });
  };

  const filteredDentists = useMemo(() => {
    const filtered = MOCK_DENTISTS
      .filter(user => {
        if (selectedGenders.length === 0) return true;
        const genderDetail = user.details.find(d => d.label === 'Gênero');
        return genderDetail && selectedGenders.includes(genderDetail.value);
      })
      .filter(user => {
        if (selectedSpecialties.length === 0) return true;
        return user.specialties && selectedSpecialties.some(spec => user.specialties!.includes(spec));
      })
      .filter(user => {
        const fullNameWithPrefix = `Dr. ${user.name}`.toLowerCase(); 
        return user.name.toLowerCase().includes(searchQuery.toLowerCase()) || fullNameWithPrefix.includes(searchQuery.toLowerCase());
      });

    return filtered.map(user => {
      let prefix = 'Dr.';
      const genderDetail = user.details.find(detail => detail.label === 'Gênero');
      if (genderDetail?.value === 'Feminino') {
        prefix = 'Dra.';
      }
      return {
        ...user,
        name: `${prefix} ${user.name}`,
        detailLine1: user.specialties?.join(' | ') || 'Clínica Geral'
      };
    });
  }, [searchQuery, selectedSpecialties, selectedGenders]);

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
          buttons={[
            {
              title: "Cadastrar Dentista",
              onPress: handleRegisterPress,
              variant: 'secondary',
            }
          ]}
        />
      </View>
      <DentistFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        specialtyOptions={availableSpecialties}
        initialFilters={{
          genders: selectedGenders,
          specialties: selectedSpecialties,
        }}
      />
    </SafeAreaView>
  );
}