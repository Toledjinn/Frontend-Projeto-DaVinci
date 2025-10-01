import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS } from '@/constants/theme';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
  disabled?: boolean; 
};

export default function Checkbox({ label, checked, onPress, disabled = false }: CheckboxProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, disabled && styles.disabled]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Feather name={checked ? "check-square" : "square"} size={24} color={COLORS.secondary} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    width: '50%',
  },
  label: {
    ...FONTS.body10,
    color: COLORS.secondary,
    marginLeft: 12,
  },
  disabled: {
    opacity: 0.5,
  },
});