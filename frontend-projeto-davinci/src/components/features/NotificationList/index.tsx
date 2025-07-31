import React from 'react';
import { FlatList } from 'react-native';
import NotificationItem from '../NotificationItem';

type Notification = {
  id: string;
  date: string;
  time: string;
  text: React.ReactNode;
};

type NotificationListProps = {
  data: Notification[];
};

export default function NotificationList({ data }: NotificationListProps) {
  const handleItemPress = (id: string) => {
    console.log('Notification pressed:', id);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationItem item={item} onPress={() => handleItemPress(item.id)} />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false} 
    />
  );
}
