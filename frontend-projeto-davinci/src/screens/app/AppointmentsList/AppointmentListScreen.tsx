import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './AppointmentListScreen.styles';
import { useUIStore } from '@/state/uiStore';

import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import AppointmentListItem from '@/components/features/AppointmentListItem';

import { getUsers, findUserById } from '@/data/mockUsers';
import { getAllAppointments, getPendingAppointments, getAppointmentsByPatientId, getAppointmentsByDentistName, Appointment } from '@/data/mockAppointments';

import Chefinho from '@/assets/characters/chefinho.svg';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { formatUserName } from '@/utils/nameUtils';

const listTypeConfig = {
  all: {
    title: 'Consultas',
    fetchData: () => getAllAppointments().filter(a => a.status !== 'pendente'),
    itemVariant: 'full' as const,
    searchPlaceholder: 'Pesquisar por paciente...',
    showFooter: true,
    footerButtonTitle: 'Agendar Consulta',
  },
  pending: {
    title: 'Solicitações',
    fetchData: getPendingAppointments,
    itemVariant: 'full' as const,
    searchPlaceholder: 'Pesquisar por paciente...',
    showFooter: false,
  },
  patient: {
    title: 'Prontuário de',
    fetchData: getAppointmentsByPatientId,
    itemVariant: 'compact' as const,
    searchPlaceholder: 'Pesquisar por procedimento...',
    showFooter: true,
    footerButtonTitle: 'Nova Consulta',
  },
  dentist: {
    title: 'Consultas de',
    fetchData: getAppointmentsByDentistName,
    itemVariant: 'compact' as const,
    searchPlaceholder: 'Pesquisar por procedimento...',
    showFooter: true,
    footerButtonTitle: 'Nova Consulta',
  },
};

export default function AppointmentListScreen() {
  const router = useRouter();
  const { listType, id } = useLocalSearchParams<{ listType: keyof typeof listTypeConfig, id?: string }>();

  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const headerHeight = useUIStore((state) => state.headerConfig.headerHeight);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
  useCallback(() => {
    const config = listType ? listTypeConfig[listType] : listTypeConfig.all;
    const isProfileLayout = config.itemVariant === 'compact';
    const user = (isProfileLayout && id) ? findUserById(id) : null;

    const commonConfig = {
      visible: true,
      showBackground: true,        // mantém a faixa laranja
      showNotificationIcon: true,
    } as const;

    if (user) {
      // PRONTUÁRIO / CONSULTAS DENTISTA -> layout 'profile'
      setHeaderConfig({
        ...commonConfig,
        layout: 'profile',
        userName: `${config.title} ${formatUserName(user.name)}`,
        UserImageSvg: user.image || UserPlaceholder, // <-- use componente SVG aqui
        riskLevel: user.riskLevel,
        // NÃO envie pageTitle nesse layout
        // NÃO use imageUrl (não é string e ProfileHeader não usa)
        // CharacterSvg não é necessário em 'profile'
      });
    } else {
      // CONSULTAS / SOLICITAÇÕES -> layout 'page'
      setHeaderConfig({
        ...commonConfig,
        layout: 'page',
        pageTitle: config.title,    // "Consultas" ou "Solicitações"
        CharacterSvg: Chefinho,     // garante mascote
        // Limpa campos de perfil
        userName: undefined,
        UserImageSvg: undefined,
        riskLevel: undefined,
        // NÃO envie imageUrl
      });
    }

    let fetchedAppointments: Appointment[] = [];
    if (listType === 'patient' && id) {
      // @ts-ignore
      fetchedAppointments = config.fetchData(id);
    } else if (listType === 'dentist' && user) {
      // @ts-ignore
      fetchedAppointments = config.fetchData(user.name);
    } else {
      // @ts-ignore
      fetchedAppointments = config.fetchData();
    }
    setAppointments(fetchedAppointments || []);

  }, [listType, id, setHeaderConfig])
);

  const processedAppointments = useMemo(() => {
    const patients = getUsers('patient');
    let appointmentsData = appointments.map(appt => {
      const patient = patients.find(p => p.id === appt.patientId);
      return { ...appt, patientName: patient?.name || 'Paciente não encontrado', patientImage: patient?.image || null, hasAllergies: !!patient?.allergies?.length };
    });
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const config = listType ? listTypeConfig[listType] : listTypeConfig.all;
      if (config.itemVariant === 'full') {
        appointmentsData = appointmentsData.filter(a => a.patientName?.toLowerCase().includes(lowerQuery));
      } else {
        appointmentsData = appointmentsData.filter(a => a.procedures?.some(p => p.toLowerCase().includes(lowerQuery)));
      }
    }
    return appointmentsData;
  }, [appointments, searchQuery, listType]);

  const handleItemPress = (item: Appointment) => {
    router.push({ pathname: '/(app)/appointment/[appointmentId]', params: { appointmentId: item.id } });
  };

  const handleFooterButtonPress = () => {
    const params = listType === 'patient' ? { patientId: id } : { dentistId: id };
    router.push({ pathname: '/(app)/schedule-appointment', params });
  };

  const config = listType ? listTypeConfig[listType] : listTypeConfig.all;

  return (
    <SafeAreaView key={listType || 'all'} style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder={config.searchPlaceholder}
            onSearchChange={setSearchQuery}
            onFilterPress={() => { }}
          />
          <FlatList
            data={processedAppointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AppointmentListItem item={item} variant={config.itemVariant} onPress={() => handleItemPress(item)} />
            )}
            contentContainerStyle={styles.listContentContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma consulta encontrada.</Text>}
          />
        </View>
        {config.showFooter && (
          <ScreenFooter
            buttons={[{
              title: config.footerButtonTitle || '',
              onPress: handleFooterButtonPress,
              variant: 'primary',
            }]}
          />
        )}
      </View>
    </SafeAreaView>
  );
}