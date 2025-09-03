import React, { useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './NotificationsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import NotificationItem from '@/components/features/NotificationItem';
import { useNotificationStore, Notification } from '@/state/notificationStore';

export default function NotificationsScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const notifications = useNotificationStore((state) => state.notifications);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'NOTIFICAÇÕES',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [])
  );

  const handleItemPress = (item: Notification) => {
    console.log(`Notificação ${item.id} foi clicada.`);

    if (item.type === 'news' && item.linkId) {
      router.push(`/novidades/${item.linkId}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={() => handleItemPress(item)}
          />
        )}
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
      />
    </SafeAreaView>
  );
}

