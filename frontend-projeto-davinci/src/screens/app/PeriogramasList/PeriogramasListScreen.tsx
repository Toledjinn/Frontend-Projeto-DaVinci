import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, useWindowDimensions } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { styles } from './PeriogramasListScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useUsers } from '@/hooks/useUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

import CollapsiblePeriogramItem from '@/components/features/CollapsiblePeriogramItem';
import ScreenFooter from '@/components/common/ScreenFooter';

import { usePeriograms } from '@/data/periogramsStore';
import { useAuth } from '@/hooks/useAuth';

export default function PeriogramasListScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.30;

  const { patientId, appointmentId } =
    useLocalSearchParams<{ patientId: string; appointmentId?: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { list, fetchForPatient, loading } = usePeriograms();
  const { list: users } = useUsers();
  const { canManagePeriogram } = useAuth();

  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const patient = useMemo(
    () => users.find((u) => String(u.id) === String(patientId)),
    [users, patientId]
  );
  const patientName = patient?.name ?? '';

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        userName: `Periogramas de ${formatUserName(patientName)}`,
        UserImageSvg: patient?.image || UserPlaceholder,
        userPhotoUri: patient?.photoUri ?? null,
        riskLevel: patient?.riskLevel,
        showNotificationIcon: false,
      });
    }, [patientName, patient?.image, patient?.photoUri, patient?.riskLevel, setHeaderConfig])
  );

  useFocusEffect(
    useCallback(() => {
      if (patientId) fetchForPatient(String(patientId));
    }, [patientId, fetchForPatient])
  );

  const handleToggleItem = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (periogramId: string) => {
    router.push({
      pathname: '/(app)/novo-periograma', 
      params: { patientId, periogramId, appointmentId },
    });
  };

  const handleNewPeriogram = () => {
    router.push({
      pathname: '/(app)/novo-periograma',
      params: { patientId, appointmentId }, 
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        refreshing={loading}
        onRefresh={() => fetchForPatient(String(patientId))}
        renderItem={({ item }) => (
          <CollapsiblePeriogramItem
            item={item}
            isOpen={openItemId === item.id}
            onToggle={() => handleToggleItem(item.id)}
            canEdit={canManagePeriogram}
            onEdit={() => handleEdit(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum periograma encontrado.</Text>
        }
      />

      <ScreenFooter
        buttons={[
          { title: 'Novo Periograma', onPress: handleNewPeriogram, variant: 'secondary' },
        ]}
      />
    </SafeAreaView>
  );
}
