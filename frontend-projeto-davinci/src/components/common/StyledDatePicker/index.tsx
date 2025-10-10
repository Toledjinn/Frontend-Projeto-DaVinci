import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  AccessibilityState,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { getStyledDatePickerStyles } from './styles';
import { COLORS } from '@/constants/theme';

interface StyledDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string | null;
  reserveErrorSpace?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
}

export default function StyledDatePicker({
  label,
  value,
  onChange,
  error,
  reserveErrorSpace = false,
  placeholder = '--/--/----',
  disabled = false,
  maximumDate,
  minimumDate,
}: StyledDatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const { height, width } = useWindowDimensions();
  const styles = getStyledDatePickerStyles(height, width);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (event.type === 'dismissed') return;
    onChange(selectedDate ?? null);
  };

  const formattedDate = value ? value.toLocaleDateString('pt-BR') : '';
  const hasError = !!error;
  const borderColor = hasError ? COLORS.red : disabled ? COLORS.gray_200 : COLORS.gray_200;

  const accessibilityState: AccessibilityState = { disabled };

  const iconColor = disabled ? COLORS.gray_400 : COLORS.gray_400;
  const textStyle = formattedDate ? (disabled ? styles.dateTextDisabled : styles.dateText) : (disabled ? styles.placeholderDisabled : styles.placeholder);

  return (
    <View style={styles.wrapper}>
      {!!label && (
        <Text style={disabled ? styles.labelDisabled : styles.label}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.7}
        onPress={() => !disabled && setShowPicker(true)}
        disabled={disabled}
        accessibilityState={accessibilityState}
        style={[
          styles.inputContainer,
          { borderColor },
          disabled && styles.inputContainerDisabled,
        ]}
      >
        <Icon
          name="calendar"
          size={24}
          color={iconColor}
          style={styles.icon}
        />
        <Text style={textStyle}>
          {formattedDate || placeholder}
        </Text>
      </TouchableOpacity>

      {hasError ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : reserveErrorSpace ? (
        <View style={styles.errorPlaceholder} />
      ) : null}

      {showPicker && !disabled && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
}
