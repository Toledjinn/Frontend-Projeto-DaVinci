import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './AdminsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Administrador from '@/assets/characters/chefinho.svg';
import UserList, { User } from '@/components/features/UserList';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FilterModal from '@/components/features/FilterModal';


const MOCK_ADMINS: User[] = [
  { id: '1', name: 'Fernanda Lima', detailLine1: 'Secretária', image: null, role: 'Secretaria' },
  { id: '2', name: 'Ricardo Souza', detailLine1: 'Auxiliar de consultório', image: null, role: 'Auxiliar de consultório' },
  { id: '3', name: 'Amanda Borges', detailLine1: 'Administrador', image: null, role: 'Administrador' },
  { id: '4', name: 'Lucas Martins', detailLine1: 'Secretária', image: null, role: 'Secretaria' },
];

const availableRoles = Array.from(
  new Set(MOCK_ADMINS.flatMap((admin) => admin.role || []))
).sort();

export default function AdminsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Administradores',
        CharacterSvg: Administrador,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleApplyFilter = (roles: string[]) => {
    setSelectedRoles(roles);
    setFilterModalVisible(false);
  };

  const filteredAdmins = useMemo(() => {
    return MOCK_ADMINS.filter((admin) => {
      const nameMatch = admin.name.toLowerCase().includes(searchQuery.toLowerCase());

      const roleMatch =
        selectedRoles.length === 0 ||
        (admin.role && selectedRoles.includes(admin.role));

      return nameMatch && roleMatch;
    });
  }, [searchQuery, selectedRoles]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Digite o nome do administrador"
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <UserList data={filteredAdmins} />
          </ScrollView>
        </View>
        <ScreenFooter
          primaryButtonTitle="Cadastrar Administrador"
          onPrimaryButtonPress={() => console.log('Cadastrar Administrador')}
        />
      </View>
      <FilterModal
        title="Filtrar por Cargo"
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        options={availableRoles}
        initialSelectedOptions={selectedRoles}
      />
    </SafeAreaView>
  );
}