import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export type ToggleValue = 'sim' | 'não';

type ToggleButtonGroupProps = {
  label: string;
  value: ToggleValue | null;
  onSelect: (value: ToggleValue) => void;
  disabled?: boolean;
};

export default function ToggleButtonGroup({
  label,
  value,
  onSelect,
  disabled = false,
}: ToggleButtonGroupProps) {
  const handlePress = (v: ToggleValue) => {
    if (disabled) return;
    onSelect(v);
  };

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.buttonRow,
          disabled && { opacity: 0.5 },
        ]}
        accessibilityState={{ disabled }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            value === 'sim' ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => handlePress('sim')}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel="Sim"
        >
          <Text style={value === 'sim' ? styles.textSelected : styles.textUnselected}>
            Sim
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            value === 'não' ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => handlePress('não')}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel="Não"
        >
          <Text style={value === 'não' ? styles.textSelected : styles.textUnselected}>
            Não
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
