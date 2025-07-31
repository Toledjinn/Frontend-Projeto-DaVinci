import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, useWindowDimensions, ViewStyle, TextStyle } from 'react-native';
import { getStyledButtonStyles } from './styles';

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary'; 
}

export default function StyledButton({
  title,
  style,
  variant = 'secondary', 
  ...rest
}: StyledButtonProps) {
  const { height } = useWindowDimensions();
  const styles = getStyledButtonStyles(height);

  const containerStyle: ViewStyle = variant === 'primary' ? styles.primaryContainer : styles.secondaryContainer;
  const textStyle: TextStyle = variant === 'primary' ? styles.primaryText : styles.secondaryText;

  return (
    <TouchableOpacity style={[styles.container, containerStyle, style]} {...rest}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
