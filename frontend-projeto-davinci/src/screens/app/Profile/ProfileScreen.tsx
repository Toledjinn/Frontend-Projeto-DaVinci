import React from 'react';
import {
  FlatList,
  ScrollView,
  useWindowDimensions,
  View,
  LayoutChangeEvent,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './ProfileScreen.styles';
import { useUIStore } from '@/state/uiStore';

import ProfileDataList from '@/components/features/ProfileDataList';
import ProfileDataItem from '@/components/features/ProfileDataItem';
import ScreenFooter from '@/components/common/ScreenFooter';

import { findUserById } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';

type ProfileDataItemType = { id: string; label: string; value: string; };
type ProfileDataListProps = { data: ProfileDataItemType[]; };

export default function ProfileScreen({ data }: ProfileDataListProps) {
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const router = useRouter();
  const { height } = useWindowDimensions();

  const headerHeight = height * 0.21;
  const bodyOffset = headerHeight + 8;

  const [footerHeight, setFooterHeight] = React.useState(88);
  const onFooterLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setFooterHeight(h);
  };

  const user = findUserById('dentist-1');

  const handleLogout = () => router.replace('/(auth)/login');
  const handleEditData = () =>
    router.push({ pathname: '/register', params: { userType: user?.type, userId: user?.id } });

  const listData = React.useMemo<ProfileDataItemType[]>(() => {
    if (!user) return data || [];
    return [{ id: 'full-name', label: 'Nome', value: user.name }, ...(data || [])];
  }, [user, data]);

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
    }, [user, setHeaderConfig])
  );

  if (!user) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.pageBody, { marginTop: headerHeight }]}>
        <View style={styles.card}>
          <ScrollView
            style={styles.cardScroll}
            contentContainerStyle={[
              styles.cardScrollContent,
              { paddingBottom: footerHeight + 16 },
            ]}
            showsVerticalScrollIndicator
          >
            <FlatList
              data={listData}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
            <ProfileDataList data={user.details} />
          </ScrollView>
        </View>
      </View>

      <View onLayout={onFooterLayout}>
        <ScreenFooter
          buttons={[
            { title: 'Sair', onPress: handleLogout, variant: 'secondary' },
            { title: 'Editar Dados', onPress: handleEditData, variant: 'primary' },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
