
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
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { id } = useLocalSearchParams<{ id: string }>();

  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (id) {
      const foundUser = findUserById(id);
      setUser(foundUser || null);
    }
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          showNotificationIcon: false,
          userName: user.name, 
          UserImageSvg: user.image || UserPlaceholder,   
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

  const hasAllergies = user.type === 'patient' && user.allergies && user.allergies.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 9 }]}
        showsVerticalScrollIndicator={false}
      >
        {hasAllergies && <AllergyWarning allergies={user.allergies!} />}

        <ProfileDataList data={user.details} />
      </ScrollView>

      <ScreenFooter 
        primaryButtonTitle="Ver Agendamentos"
        onPrimaryButtonPress={() => console.log(`Ver agendamentos de ${user.name}`)}
      />
    </SafeAreaView>
  );
}