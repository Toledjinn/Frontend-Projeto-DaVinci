import React from 'react';
import { View, Text, TextInput, TextInputProps, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyledInputStyles } from './styles';
import { COLORS } from '@/constants/theme';

interface StyledInputProps extends TextInputProps {
  label: string;
  iconName: string;
  error?: string | null;
  reserveErrorSpace?: boolean;
}

export default function StyledInput({
  label,
  iconName,
  error,
  reserveErrorSpace, 
  ...rest
}: StyledInputProps) {
  const { height, width } = useWindowDimensions();
  const styles = getStyledInputStyles(height, width);
  const borderColor = error ? COLORS.red : COLORS.gray_200;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container, { borderColor }]}>
        <Icon
          name={iconName}
          size={24}
          color={COLORS.gray_400}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.gray_400}
          {...rest}
        />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : reserveErrorSpace ? (
        <View style={styles.errorPlaceholder} />
      ) : null}
    </View>
  );
}
