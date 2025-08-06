import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './PatientsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Paciente from '@/assets/characters/chefinho.svg'; 
import UserList, { User } from '@/components/features/UserList';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FilterModal from '@/components/features/FilterModal';
import FotoPerfil from '@/assets/images/FotoPerfil.svg'
import { getUsers as getPatients } from '@/data/mockUsers';

const MOCK_PATIENTS = getPatients('patient');

export default function PatientsScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Pacientes',
        CharacterSvg: require('@/assets/characters/chefinho.svg').default,
        showNotificationIcon: true,
      });
    }, [])
  );
  
  const handleRegisterPress = () => {
    router.push({
      pathname: '/register',
      params: { userType: 'patient' },
    });
  };

  const filteredPatients = useMemo(() => {
    const patients = MOCK_PATIENTS.map(user => ({
        ...user,
        detailLine1: user.details.find(d => d.label === 'Última consulta')?.value || 'Nenhuma consulta'
    }));

    return patients.filter((patient) => {
      return patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1}}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Digite o nome do paciente"
            onSearchChange={setSearchQuery}
            onFilterPress={() => { /* Lógica de filtro */ }}
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
          onPrimaryButtonPress={handleRegisterPress}
        />
      </View>
    </SafeAreaView>
  );
}
