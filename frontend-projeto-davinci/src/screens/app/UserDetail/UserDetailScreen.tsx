import React, { useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './UserDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ProfileDataList from '@/components/features/ProfileDataList';
import ScreenFooter from '@/components/common/ScreenFooter';
import { findUserById, UserProfile } from '@/data/mockUsers';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';
import StyledButton from '@/components/common/StyledButton';

export default function UserDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.32;
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
          userName: user.name,
          UserImageSvg: user.image || UserPlaceholder,
          riskLevel: user.riskLevel,
        });
      }
    }, [user])
  );

  const handleViewRecord = () => {
    if (user) {
      router.push({
        pathname: '/(app)/consultas-list',
        params: { listType: 'patient', id: user.id } 
      });
    }
  };

  const handleViewAppointments = () => {
    if (user) {
      router.push({
        pathname: '/(app)/consultas-list', 
        params: { listType: 'dentist', id: user.id }, 
      });
    }
  };

  const handleEditData = () => {
    if (user) {
      router.push({
        pathname: '/(app)/register', 
        params: {
          userType: user.type,
          userId: user.id
        },
      });
    }
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
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight  }]}
        showsVerticalScrollIndicator={false}
      >
        {isPatient && (
          <View style={styles.buttonActionsContainer}>
            <StyledButton
              title="Diagnósticos"
              variant="primary"
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
        buttons={[
          {
            title: isPatient ? "Prontuário" : "Consultas",
            onPress: isPatient ? handleViewRecord : (isDentist ? handleViewAppointments : () => {}),
            variant: 'primary',
          },
          {
            title: isDentist ? "Editar Dados" : undefined,
            onPress: handleEditData,
            variant: 'secondary',
          }
        ]}
      />
    </SafeAreaView>
  );
}