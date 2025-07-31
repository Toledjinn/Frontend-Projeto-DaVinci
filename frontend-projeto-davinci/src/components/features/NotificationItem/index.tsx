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
    text: React.ReactNode;
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

    </View>
  );
});

export default NotificationItem;
