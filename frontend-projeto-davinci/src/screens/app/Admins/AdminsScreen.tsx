import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './AdminsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Administrador from '@/assets/characters/chefinho.svg';
import UserList, { User } from '@/components/features/UserList';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import FilterModal from '@/components/features/FilterModal';
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

  const handleApplyFilter = (roles: string[]) => {
    setSelectedRoles(roles);
    setFilterModalVisible(false);
  };

  const handleRegisterPress = () => {
    router.push({
      pathname: '/register',
      params: { userType: 'admin' },
    });
  };

  const filteredAdmins = useMemo(() => {
    const admins = MOCK_ADMINS.map(user => ({
        ...user,
        detailLine1: user.role || 'N/A'
    }));
    
    return admins.filter((admin) => {
      const nameMatch = admin.name.toLowerCase().includes(searchQuery.toLowerCase());

      const roleMatch =
        selectedRoles.length === 0 ||
        (admin.role && selectedRoles.includes(admin.role));

      return nameMatch && roleMatch;
    });
  }, [searchQuery, selectedRoles]);

  return (
    <SafeAreaView style={styles.safeArea}>
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