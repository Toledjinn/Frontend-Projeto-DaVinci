import React from 'react';
import { FlatList, ScrollView, useWindowDimensions, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './ProfileScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ProfileDataList from '@/components/features/ProfileDataList';
import ScreenFooter from '@/components/common/ScreenFooter';
import { findUserById } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileDataItem from '@/components/features/ProfileDataItem';

type ProfileDataItemType = {
  id: string;
  label: string;
  value: string;
};

type ProfileDataListProps = {
  data: ProfileDataItemType[];
};

export default function ProfileScreen({ data }: ProfileDataListProps) {
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.30;
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

  const renderItem = ({ item }: { item: ProfileDataItemType }) => (
      <ProfileDataItem label={item.label} value={item.value} />
    );

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
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight}]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
          <ProfileDataList data={user.details} />
        </View>
      </ScrollView>

      <ScreenFooter
        buttons={[
          {
            title: "Sair",
            onPress: handleLogout,
            variant: 'secondary',  
          },
          {
            title: "Editar Dados",
            onPress: handleEditData,
            variant: 'primary',  
          },
        ]}
      />
      
    </SafeAreaView>
  );
}