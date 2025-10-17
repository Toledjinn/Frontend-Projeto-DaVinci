import React, { useState, useMemo, useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './UserListScreen.styles';
import { useUIStore } from '@/state/uiStore';
import UserList from '@/components/features/UserList';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import PatientFilterModal from '@/components/features/PatientFilterModal';
import DentistFilterModal from '@/components/features/DentistFilterModal';
import AdminFilterModal from '@/components/features/AdminFilterModal';

import { useUsers } from '@/hooks/useUsers';
import type { UserProfile } from '@/data/mockUsers';

import { getAppointmentsByPatientId, getAllAppointments } from '@/data/mockAppointments';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';

import Paciente from '@/assets/characters/chefinho.svg';
import Dentista from '@/assets/characters/chefinho.svg';
import Administrador from '@/assets/characters/chefinho.svg';

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day));
};

const ALL_APPOINTMENTS = getAllAppointments();

const userTypeConfig = {
  patient: {
    title: 'Pacientes',
    searchPlaceholder: 'Digite o nome do paciente',
    registerButtonTitle: 'Cadastrar Paciente',
    CharacterSvg: Paciente,
    getDetailLine: (user: UserProfile) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const appointments = getAppointmentsByPatientId(user.id);

      const futureAppointments = appointments
        .filter((appt) => appt.status === 'agendada' && parseDate(appt.date) >= now)
        .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

      if (futureAppointments.length > 0) return `Próxima consulta: ${futureAppointments[0].date}`;

      const pastAppointments = appointments
        .filter((appt) => appt.status === 'realizada')
        .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

      if (pastAppointments.length > 0) return `Última consulta: ${pastAppointments[0].date}`;

      return 'Nenhuma consulta';
    },
  },
  dentist: {
    title: 'Dentistas',
    searchPlaceholder: 'Digite o nome do dentista',
    registerButtonTitle: 'Cadastrar Dentista',
    CharacterSvg: Dentista,
    getDetailLine: (user: UserProfile) => user.specialties?.join(' | ') || 'Clínica Geral',
  },
  admin: {
    title: 'Administradores',
    searchPlaceholder: 'Digite o nome do administrador',
    registerButtonTitle: 'Cadastrar Administrador',
    CharacterSvg: Administrador,
    getDetailLine: (user: UserProfile) => user.role || 'N/A',
  },
};

export default function UserListScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.28;
  const { userType } = useLocalSearchParams<{ userType: 'patient' | 'dentist' | 'admin' }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { list } = useUsers();

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<any>({
    genders: [],
    specialties: [],
    roles: [],
    allergy: 'all',
  });

  const config = userType ? userTypeConfig[userType] : userTypeConfig.patient;

  const SOURCE_USERS = useMemo(
    () => list.filter((u) => u.type === (userType || 'patient')),
    [list, userType]
  );

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: config.title,
        CharacterSvg: config.CharacterSvg,
        showNotificationIcon: true,
      });
    }, [config, setHeaderConfig])
  );

  const handleRegisterPress = () => {
    router.push({ pathname: '/(app)/register', params: { userType } });
  };

  const handleApplyFilter = (newFilters: any) => {
    setFilters((prev: any) => ({ ...prev, ...newFilters }));
  };

  const filteredUsers = useMemo(() => {
    let users = SOURCE_USERS as UserProfile[];

    if (userType === 'patient') {
      users = users
        .filter(
          (u) =>
            filters.allergy === 'all' ||
            (filters.allergy === 'yes' && u.allergies && u.allergies.length > 0) ||
            (filters.allergy === 'no' && (!u.allergies || u.allergies.length === 0))
        )
        .filter(
          (u) =>
            filters.genders.length === 0 ||
            filters.genders.includes(u.details.find((d) => d.label === 'Gênero')?.value)
        )
        .filter((u) => {
          if (filters.specialties.length === 0) return true;
          const patientAppointments = ALL_APPOINTMENTS.filter((a) => a.patientId === u.id);
          const patientSpecialties = [...new Set(patientAppointments.map((a) => a.specialty))];
          return patientSpecialties.some((spec) => filters.specialties.includes(spec));
        });
    } else if (userType === 'dentist') {
      users = users
        .filter(
          (u) =>
            filters.genders.length === 0 ||
            filters.genders.includes(u.details.find((d) => d.label === 'Gênero')?.value)
        )
        .filter(
          (u) => filters.specialties.length === 0 || u.specialties?.some((s) => filters.specialties.includes(s))
        );
    } else if (userType === 'admin') {
      users = users
        .filter(
          (u) =>
            filters.genders.length === 0 ||
            filters.genders.includes(u.details.find((d) => d.label === 'Gênero')?.value)
        )
        .filter((u) => filters.roles.length === 0 || (u.role && filters.roles.includes(u.role)));
    }

    if (searchQuery) {
      users = users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return users.map((user) => ({
      ...user,
      detailLine1: config.getDetailLine(user),
      hasAllergies: user.type === 'patient' && user.allergies && user.allergies.length > 0,
    }));
  }, [SOURCE_USERS, searchQuery, filters, userType, config]);

  const specialtyOptionsForDentist = useMemo(
    () => [...new Set(SOURCE_USERS.flatMap((d: any) => d.specialties || []))],
    [SOURCE_USERS]
  );
  const roleOptionsForAdmin = useMemo(
    () => [...new Set(SOURCE_USERS.map((a: any) => a.role || '').filter(Boolean))],
    [SOURCE_USERS]
  );

  const renderFilterModal = () => {
    switch (userType) {
      case 'patient':
        return (
          <PatientFilterModal
            visible={isFilterModalVisible}
            onClose={() => setFilterModalVisible(false)}
            onApply={handleApplyFilter}
            specialtyOptions={ALL_SPECIALTIES}
            initialFilters={filters}
          />
        );
      case 'dentist':
        return (
          <DentistFilterModal
            visible={isFilterModalVisible}
            onClose={() => setFilterModalVisible(false)}
            onApply={handleApplyFilter}
            specialtyOptions={specialtyOptionsForDentist}
            initialFilters={filters}
          />
        );
      case 'admin':
        return (
          <AdminFilterModal
            visible={isFilterModalVisible}
            onClose={() => setFilterModalVisible(false)}
            onApply={handleApplyFilter}
            roleOptions={roleOptionsForAdmin}
            initialFilters={filters}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            value={searchQuery}
            placeholder={config.searchPlaceholder}
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />

          <View style={{ flex: 1 }}>
           <UserList
              data={filteredUsers}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 120 }}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </View>

        <ScreenFooter
          buttons={[
            {
              title: config.registerButtonTitle,
              onPress: handleRegisterPress,
              variant: 'secondary',
            },
          ]}
        />
      </View>

      {renderFilterModal()}
    </SafeAreaView>
  );
}
