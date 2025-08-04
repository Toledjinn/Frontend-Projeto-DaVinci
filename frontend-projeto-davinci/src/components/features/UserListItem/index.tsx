import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { getUserListItemStyles } from './styles';
import { COLORS } from '@/constants/theme';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { User } from '../UserList';

type UserListItemProps = {
  item: User;
  onPress: () => void;
};

const UserListItem = React.memo(({ item, onPress }: UserListItemProps) => {
  const { height } = useWindowDimensions();
  const styles = getUserListItemStyles(height);
  const ImageComponent = item.image || UserPlaceholder;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <ImageComponent width="100%" height="100%" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.detailText} numberOfLines={1}>{item.detailLine1}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Feather name="eye" size={28} color={COLORS.gray_400} />
      </View>
    </TouchableOpacity>
  );
});

export default UserListItem;