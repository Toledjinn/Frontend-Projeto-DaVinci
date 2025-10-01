import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type ToggleButtonGroupProps = {
  label: string;
  value: 'sim' | 'não' | null;
  onSelect: (value: 'sim' | 'não') => void;
};

export default function ToggleButtonGroup({ label, value, onSelect }: ToggleButtonGroupProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            value === 'sim' ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => onSelect('sim')}
        >
          <Text style={value === 'sim' ? styles.textSelected : styles.textUnselected}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            value === 'não' ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => onSelect('não')}
        >
          <Text style={value === 'não' ? styles.textSelected : styles.textUnselected}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}