import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import { SavedPeriogram } from '@/data/mockPeriograms';

type PeriogramListItemProps = {
  item: SavedPeriogram;
  onPress: () => void;
};

export default function PeriogramListItem({ item, onPress }: PeriogramListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>Data: {item.date}</Text>
        <Text style={styles.dentistText}>Responsável: {item.dentistName}</Text>
      </View>
      <Feather name="chevron-right" size={28} color={COLORS.gray_200} />
    </TouchableOpacity>
  );
}