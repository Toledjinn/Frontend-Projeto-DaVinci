import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { styles } from './UserDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ProfileDataList from '@/components/features/ProfileDataList';
import ScreenFooter from '@/components/common/ScreenFooter'; 
import { findUserById, UserProfile } from '@/data/mockUsers';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import AllergyWarning from '@/components/features/AllergyWarning';

export default function UserDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (id) {
      const foundUser = findUserById(id);
      setUser(foundUser || null);
    }
  }, [id]);

  const isPatient = user?.type === 'patient';
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
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 9 }]}
        showsVerticalScrollIndicator={false}
      >
        {isPatient && (
            <ScreenFooter
                primaryButtonTitle="Histórico"
                onPrimaryButtonPress={() => console.log('Histórico Pressionado')}
                secondaryButtonTitle="Saúde Sistêmica"
                onSecondaryButtonPress={() => console.log('Saúde Sistêmica Pressionado')}
            />
        )}
        
        <View style={styles.mainContent}>
            {hasAllergies && <AllergyWarning allergies={user.allergies!} />}
            <ProfileDataList data={user.details} />
        </View>
      </ScrollView>

      <ScreenFooter 
        primaryButtonTitle={isPatient ? "Prontuário" : "Ver Agendamentos"}
        onPrimaryButtonPress={() => console.log('Prontuário pressionado')}
        secondaryButtonTitle={isPatient ? "Editar Dados" : undefined}
        onSecondaryButtonPress={isPatient ? () => console.log('Editar Dados Pressionado') : undefined}
      />
    </SafeAreaView>
  );
}