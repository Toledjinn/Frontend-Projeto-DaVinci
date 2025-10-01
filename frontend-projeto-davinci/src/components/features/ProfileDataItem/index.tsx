import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

type ProfileDataItemProps = {
  label: string;
  value: React.ReactNode;
};

export default function ProfileDataItem({ label, value }: ProfileDataItemProps) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>{label}</Text>

        {typeof value === 'string' ? (
          <Text style={styles.itemValue} numberOfLines={2}>
            {value}
          </Text>
        ) : (
          <View style={styles.valueWrapper}>{value}</View>
        )}
      </View>
    </View>
  );
}
