import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, useWindowDimensions } from 'react-native';
import { getStyledButtonStyles } from './styles';

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function StyledButton({
  title,
  style,
  ...rest
}: StyledButtonProps) {
  const { height } = useWindowDimensions();
  const styles = getStyledButtonStyles(height);

  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
