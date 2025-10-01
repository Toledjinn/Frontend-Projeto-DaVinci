import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

type ToothMeasurementDetailProps = {
  toothNumber: number;
  data: { [key: string]: string };
  isOpen: boolean;
  onToggle: () => void;
};

const columns = ['MV', 'V', 'DV', 'MP/ML', 'P/L', 'DP/DL', 'RE-V', 'RE-P/L', 'MO', 'FM', 'FV', 'FL', 'M-CER'];

export default function ToothMeasurementDetail({ toothNumber, data, isOpen, onToggle }: ToothMeasurementDetailProps) {
  const filledColumns = columns.filter(col => data?.[col]);

  if (filledColumns.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.8}>
        <Text style={styles.title}>Dente {toothNumber}</Text>
        <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={24} color={COLORS.secondary} />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          <View style={styles.grid}>
            {filledColumns.map(col => {
              const value = data[col];
              const numericValue = parseFloat(value);
              const textStyle = numericValue > 3 ? styles.textAlert : styles.textNormal;

              return (
                <View key={col} style={styles.item}>
                  <Text style={styles.label}>{col}</Text>
                  <Text style={[styles.value, textStyle]}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}