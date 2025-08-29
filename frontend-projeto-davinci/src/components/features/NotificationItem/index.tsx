import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

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
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default NotificationItem;
