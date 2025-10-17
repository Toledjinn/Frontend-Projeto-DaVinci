import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SvgProps } from 'react-native-svg';

import { getUserListItemStyles } from './styles';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { COLORS } from '@/constants/theme';
import type { User } from '../UserList';

type UserListItemProps = {
  item: User;
  onPressItem?: (user: User) => void;
};

const UserListItem = React.memo(({ item, onPressItem }: UserListItemProps) => {
  const { height } = useWindowDimensions();
  const styles = getUserListItemStyles(height);
  const router = useRouter();

  const ImageComponent = (item.image as React.FC<SvgProps>) || UserPlaceholder;

  const handlePress = () => {
    if (onPressItem) {
      onPressItem(item);
      return;
    }
    router.push({
      pathname: '/user/[id]',
      params: { id: item.id },
    });
  };

  const hasPhoto = !!item.photoUri;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {hasPhoto ? (
          <Image source={{ uri: item.photoUri! }} style={styles.image} resizeMode="cover" />
        ) : (
          <ImageComponent width="100%" height="100%" />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.name}</Text>

        <Text style={styles.detailText}>
          {item.detailLabel ? (
            <>
              <Text style={styles.detailLabel}>{item.detailLabel} </Text>
              {item.detailValue}
            </>
          ) : (
            item.detailLine1
          )}
        </Text>
      </View>

      {item.hasAllergies && (
        <Feather name="alert-triangle" size={24} color={COLORS.red} style={styles.alertIcon} />
      )}

      <View style={styles.iconContainer}>
        <Feather name="chevron-right" size={28} color={COLORS.gray_400} />
      </View>
    </TouchableOpacity>
  );
});

export default UserListItem;
