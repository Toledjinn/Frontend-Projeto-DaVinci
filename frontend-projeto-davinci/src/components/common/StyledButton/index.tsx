import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function StyledButton({
  title,
  style,
  ...rest
}: StyledButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
