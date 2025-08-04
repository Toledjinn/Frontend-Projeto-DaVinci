import React from 'react';
import { FlatList, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import UserListItem from '../UserListItem';

export type User = {
  id: string;
  name: string;
  detailLine1: string;
  image: React.FC<SvgProps> | null;
  specialties?: string[];
  role?: string;
};

type UserListProps = {
  data: User[];
};

export default function UserList({ data }: UserListProps) {
  const handleItemPress = (id: string) => {
    console.log('User pressed:', id);
  };

  const renderItem = ({ item }: { item: User }) => (
    <UserListItem item={item} onPress={() => handleItemPress(item.id)} />
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