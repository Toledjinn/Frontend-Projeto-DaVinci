import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

type NotificationItemProps = {
  item: {
    id: string;
    date: string;
    time: string;
    text: React.ReactNode; // Permite texto com negrito
  };
  onPress: () => void;
};

const NotificationItem = React.memo(({ item, onPress }: NotificationItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.text}</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <Feather name="eye" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
});

export default NotificationItem;
