import React, { useState, useMemo, useCallback } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './AdminsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Administrador from '@/assets/characters/chefinho.svg';
import UserList, { User } from '@/components/features/UserList';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import AdminFilterModal from '@/components/features/AdminFilterModal';
import { getUsers as getAdmins } from '@/data/mockUsers';

const MOCK_ADMINS = getAdmins('admin');

const availableRoles = Array.from(
  new Set(MOCK_ADMINS.flatMap((admin) => admin.role || []))
).sort();

export default function AdminsScreen() { 
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]); 

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Administradores',
        CharacterSvg: require('@/assets/characters/chefinho.svg').default,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleApplyFilter = (filters: { genders: string[]; roles: string[] }) => {
    setSelectedGenders(filters.genders);
    setSelectedRoles(filters.roles);
    setFilterModalVisible(false);
  };

  const handleRegisterPress = () => {
    router.push({
      pathname: '/register',
      params: { userType: 'admin' },
    });
  };

  const filteredAdmins = useMemo(() => {
    return MOCK_ADMINS
      .filter(user => {
        if (selectedGenders.length === 0) return true;
        const genderDetail = user.details.find(d => d.label === 'Gênero');
        return genderDetail && selectedGenders.includes(genderDetail.value);
      })
      .filter(user => {
        if (selectedRoles.length === 0) return true;
        return user.role && selectedRoles.includes(user.role);
      })
      .filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map(user => ({
        ...user,
        detailLine1: user.role || 'N/A'
      }));
  }, [searchQuery, selectedRoles, selectedGenders]);


  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={{flex: 1}}>
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
          onPrimaryButtonPress={handleRegisterPress}
        />
      </View>
      <AdminFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        roleOptions={availableRoles}
        initialFilters={{
          genders: selectedGenders,
          roles: selectedRoles,
        }}
      />
    </SafeAreaProvider>
  );
}