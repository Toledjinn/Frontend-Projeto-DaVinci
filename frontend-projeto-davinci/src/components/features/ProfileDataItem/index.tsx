import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

type ProfileDataItemProps = {
  label: string;
  value: string;
};

const ProfileDataItem = React.memo(({ label, value }: ProfileDataItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
    </View>
  );
});

export default ProfileDataItem;
