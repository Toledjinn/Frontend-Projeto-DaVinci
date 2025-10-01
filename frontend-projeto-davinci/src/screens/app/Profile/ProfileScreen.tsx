import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './ProfileScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ProfileDataList from '@/components/features/ProfileDataList';
import ScreenFooter from '@/components/common/ScreenFooter';
import { findUserById } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const router = useRouter();

  const user = findUserById('dentist-1');

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const handleEditData = () => {
     router.push({
        pathname: '/register',
        params: { 
            userType: user?.type, 
            userId: user?.id 
        },})
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          showNotificationIcon: false,
          userName: formatUserName(user.name),
          UserImageSvg: user.image,
        });
      }
    }, [user])
  );
  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: 160}]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileDataList data={user.details} />
      </ScrollView>

      <ScreenFooter
        buttons={[
          {
            title: "Editar Dados",
            onPress: handleEditData,
            variant: 'primary',  
          },
          {
            title: "Sair",
            onPress: handleLogout,
            variant: 'secondary',  
          }
        ]}
      />
      
    </SafeAreaView>
  );
}