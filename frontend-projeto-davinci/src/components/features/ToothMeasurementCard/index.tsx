import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

type ToothMeasurementCardProps = {
  toothNumber: number;
  data: { [key: string]: string };
  isOpen: boolean;
  onToggle: () => void;
  onDataChange: (tooth: number, column: string, value: string) => void;
};

const columns = ['MV', 'V', 'DV', 'MP/ML', 'P/L', 'DP/DL', 'RE-V', 'RE-P/L', 'MO', 'FM', 'FV', 'FL', 'M-CER'];

export default function ToothMeasurementCard({ toothNumber, data, isOpen, onToggle, onDataChange }: ToothMeasurementCardProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.8}>
        <Text style={styles.title}>Dente {toothNumber}</Text>
        <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={24} color={COLORS.secondary} />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          <View style={styles.inputGrid}>
            {columns.map(col => {
              const value = data?.[col] || '';
              const numericValue = parseFloat(value);
              const textStyle = numericValue > 3 ? styles.textAlert : styles.textNormal;

              return (
                <View key={col} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{col}</Text>
                  <TextInput
                    style={[styles.textInput, textStyle]}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={text => onDataChange(toothNumber, col, text)}
                    maxLength={4}
                  />
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}