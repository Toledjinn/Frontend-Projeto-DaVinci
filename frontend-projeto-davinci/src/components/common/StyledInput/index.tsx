import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyledInputStyles } from './styles';
import { COLORS } from '@/constants/theme';

interface StyledInputProps extends TextInputProps {
  label: string;
  iconName: string;
  error?: string | null;
  reserveErrorSpace?: boolean;
  disabled?: boolean;
}

const StyledInput = React.forwardRef<TextInput, StyledInputProps>(
  (
    {
      label,
      iconName,
      error,
      reserveErrorSpace,
      style,
      multiline,
      numberOfLines,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const { height, width } = useWindowDimensions();
    const styles = getStyledInputStyles(height, width);

    const borderColor = error ? COLORS.red : COLORS.gray_200;

    return (
      <View style={styles.wrapper}>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <View
          style={[
            styles.container,
            multiline && styles.multilineContainer,
            disabled && styles.disabledContainer,
            { borderColor, opacity: disabled ? 0.6 : 1 },
          ]}
        >
          <Icon
            name={iconName}
            size={24}
            color={COLORS.gray_400}
            style={styles.icon}
          />
          <TextInput
            ref={ref}
            style={[styles.input, multiline && styles.multilineInput, style]}
            placeholderTextColor={COLORS.gray_400}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={!disabled}
            selectTextOnFocus={!disabled}
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
);

export default StyledInput;
