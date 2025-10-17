import React, { memo } from 'react';
import { FlatList, StyleProp, ViewStyle } from 'react-native';
import UserListItem from '../UserListItem';
import { SvgProps } from 'react-native-svg';

export type User = {
  id: string;
  name: string;
  detailLine1?: string;
  detailLabel?: string;
  detailValue?: string;
  image: React.FC<SvgProps> | null;
  hasAllergies?: boolean;
  specialties?: string[];
  role?: string;
  photoUri?: string | null;
};

type UserListProps = {
  data: User[];
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  onPressItem?: (user: User) => void;
  showsVerticalScrollIndicator?: boolean;
};

function keyExtractor(item: User) {
  return item.id;
}

function _UserList({
  data,
  style,
  contentContainerStyle,
  keyboardShouldPersistTaps = 'handled',
  onPressItem,
  showsVerticalScrollIndicator = false,
}: UserListProps) {
  const renderItem = ({ item }: { item: User }) => (
    <UserListItem item={item} onPressItem={onPressItem} />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={style ?? { flex: 1 }}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
}

export default memo(_UserList);
