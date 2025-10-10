import React, { useMemo } from 'react';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { styles } from './UserDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ProfileDataList from '@/components/features/ProfileDataList';
import ScreenFooter from '@/components/common/ScreenFooter';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';
import StyledButton from '@/components/common/StyledButton';

import { useUsers } from '@/hooks/useUsers';
import type { UserWithPhoto } from '@/data/usersStore';

type ButtonConfig = {
  title: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
};

export default function UserDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.31;

  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { list } = useUsers();

  const user = useMemo<UserWithPhoto | undefined>(
    () => list.find((u) => String(u.id) === String(id)),
    [list, id]
  );

  const isPatient = user?.type === 'patient';
  const hasAllergies = !!(isPatient && user?.allergies && user.allergies.length > 0);

  const displayDetails = useMemo(() => {
    if (!user) return [];
    const base = Array.isArray(user.details) ? [...user.details] : [];
    const hasDetail = (label: string) =>
      base.some((d) => d.label?.trim().toLowerCase() === label.trim().toLowerCase());
    const pushDetail = (label: string, value?: string | null) => {
      if (!value) return;
      const idSuffix = label.toLowerCase().replace(/\s+/g, '-');
      const detailId = `${user.id}-${idSuffix}`;
      base.push({ id: detailId, label, value });
    };

    if (user.type === 'admin' && user.role && !hasDetail('Cargo')) {
      pushDetail('Cargo', user.role);
    }
    if (user.type === 'dentist' && user.specialties?.length && !hasDetail('Especialidades')) {
      pushDetail('Especialidades', user.specialties.join(', '));
    }
    if (user.type === 'patient' && user.allergies && !hasDetail('Alergias')) {
      pushDetail('Alergias', user.allergies.length ? user.allergies.join(', ') : 'Nenhuma');
    }

    return base;
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      if (!user) return;
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: false,
        showDeleteIcon: true,
        userId: String(user.id),
        userName: user.name,
        UserImageSvg: user.image || UserPlaceholder,
        userPhotoUri: user.photoUri ?? null,
        riskLevel: user.riskLevel,
      });
    }, [user, setHeaderConfig])
  );

  const handleViewRecord = () => {
    if (!user) return;
    router.push({ pathname: '/(app)/consultas-list', params: { listType: 'patient', id: user.id } });
  };

  const handleViewAppointments = () => {
    if (!user) return;
    router.push({ pathname: '/(app)/consultas-list', params: { listType: 'dentist', id: user.id } });
  };

  const handleEditData = () => {
    if (!user) return;
    router.push({ pathname: '/(app)/register', params: { userType: user.type, userId: String(user.id) } });
  };

  const getFooterButtons = (): ButtonConfig[] => {
    if (!user) return [];
    const editDataButton: ButtonConfig = { title: 'Editar Dados', onPress: handleEditData, variant: 'secondary' };
    if (user.type === 'admin') return [editDataButton];
    if (user.type === 'patient' || user.type === 'dentist') {
      return [
        editDataButton,
        {
          title: 'Consultas',
          onPress: user.type === 'patient' ? handleViewRecord : handleViewAppointments,
          variant: 'primary',
        },
      ];
    }
    return [];
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>Usuário não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
      >
        {isPatient && (
          <View style={styles.buttonActionsContainer}>
            <StyledButton
              title="Diagnósticos"
              variant="primary"
              onPress={() =>
                router.push({ pathname: '/(app)/diagnostico', params: { patientId: String(user.id) } })
              }
            />
          </View>
        )}

        <View style={styles.mainContent}>
          {hasAllergies && <AllergyWarning allergies={user.allergies!} />}
          <ProfileDataList data={displayDetails} />
        </View>
      </ScrollView>

      <ScreenFooter buttons={getFooterButtons()} />
    </SafeAreaView>
  );
}
