import React, { useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './UserDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ProfileDataList from '@/components/features/ProfileDataList';
import ScreenFooter from '@/components/common/ScreenFooter'; 
import { findUserById, UserProfile } from '@/data/mockUsers';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';
import StyledButton from '@/components/common/StyledButton';
import { formatUserName } from '@/utils/nameUtils';

export default function UserDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.31;
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (id) {
      const foundUser = findUserById(id);
      setUser(foundUser || null);
    }
  }, [id]);

  const isPatient = user?.type === 'patient';
  const isDentist = user?.type === 'dentist';
  const hasAllergies = isPatient && user.allergies && user.allergies.length > 0;

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          showNotificationIcon: false,
          userName: formatUserName(user.name),
          UserImageSvg: user.image || UserPlaceholder,
          riskLevel: user.riskLevel,
        });
      }
    }, [user])
  );

  const handleViewRecord = () => {
    if (user) {
      router.push({
        pathname: "/record/[patientId]",
        params: { patientId: user.id },
      });
    }
  };

  const handleViewAppointments = () => {
    if (user) {
      router.push({
        pathname: "/dentist-appointments/[dentistId]",
        params: { dentistId: user.id },
      });
    }
  };

  const handleEditData = () => {
    if (user) {
      router.push({
        pathname: '/register',
        params: { 
            userType: user.type, 
            userId: user.id 
        },
      });
    }
  };

  if (!user) {
    return (
        <SafeAreaProvider style={styles.safeArea}>
            <View style={styles.centered}>
                <Text>Usuário não encontrado.</Text>
            </View>
        </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 9 }]}
        showsVerticalScrollIndicator={false}
      >
        {isPatient && (
          <View style={styles.buttonActionsContainer}>
            <StyledButton
              title="Diagnósticos"
              variant="secondary" 
              onPress={() => router.push({ 
              pathname: '/(app)/diagnostico', 
              params: { patientId: user.id } 
            })}
          />
          </View>
        )}
        
        <View style={styles.mainContent}>
            {hasAllergies && <AllergyWarning allergies={user.allergies!} />}
            <ProfileDataList data={user.details} />
        </View>
      </ScrollView>

      <ScreenFooter
        primaryButtonTitle={isPatient ? "Prontuário" : "Ver Agendamentos"}
        onPrimaryButtonPress={isPatient ? handleViewRecord : (isDentist ? handleViewAppointments : () => {})}
        secondaryButtonTitle={!isDentist ? "Editar Dados" : undefined}
        onSecondaryButtonPress={!isDentist ? handleEditData : undefined}
      />
    </SafeAreaProvider>
  );
}