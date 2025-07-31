import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ProfileDataItem from '../ProfileDataItem'; 

type ProfileDataItemType = {
  id: string;
  label: string;
  value: string;
};

type ProfileDataListProps = {
  data: ProfileDataItemType[];
};

export default function ProfileDataList({ data }: ProfileDataListProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const renderItem = ({ item }: { item: ProfileDataItemType }) => (
    <ProfileDataItem label={item.label} value={item.value} />
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
