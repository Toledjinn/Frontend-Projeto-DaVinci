import React from 'react';
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './NotificationsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';

const MOCK_NOTIFICATIONS = [
  { id: '1', text: 'LISTA DE NOTIFICAÇÕES' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
  { id: '4', text: 'Item 4' },
  { id: '5', text: 'Item 5' },
  { id: '6', text: 'Item 6' },  
  { id: '7', text: 'Item 7' },
  { id: '8', text: 'Item 8' },
  { id: '10', text: 'Item 10' },
  { id: '11', text: 'Item 11' },
  { id: '12', text: 'Item 12' },
  { id: '13', text: 'Item 13' },
  { id: '14', text: 'Item 14' },
  { id: '15', text: 'Item 15' },
  { id: '16', text: 'Item 16' },
  { id: '17', text: 'Item 17' },
  { id: '18', text: 'Item 18' },
];

export default function NotificationsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.27;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Notificações',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingTop: headerHeight + 9 },
        ]}
      />
    </View>
  );
}
