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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Feather name="bell" size={24} color={COLORS.primary} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.notificationText} numberOfLines={2}>
            {item.text}
        </Text>
      </View>

      <View style={styles.chevronContainer}>
        <Feather name="chevron-right" size={24} color={styles.chevron.color} />
      </View>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}> - </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default NotificationItem;