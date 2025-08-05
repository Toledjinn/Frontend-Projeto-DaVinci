import React from 'react';
import { View, Text, Switch } from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

type StyledSwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function StyledSwitch({ label, value, onValueChange }: StyledSwitchProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: COLORS.gray_200, true: COLORS.primary }}
        thumbColor={value ? COLORS.secondary : COLORS.white}
        ios_backgroundColor={COLORS.gray_200}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}