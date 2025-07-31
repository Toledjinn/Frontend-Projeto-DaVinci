import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  useWindowDimensions
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { getStyledDatePickerStyles } from './styles';
import { COLORS } from '@/constants/theme';

interface StyledDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string | null;
  reserveErrorSpace?: boolean;
  placeholder?: string;
}

export default function StyledDatePicker({
  label,
  value,
  onChange,
  error,
  reserveErrorSpace = false,
  placeholder = '--/--/----',
}: StyledDatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const { height, width } = useWindowDimensions(); 
  const styles = getStyledDatePickerStyles(height, width);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowPicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formattedDate = value ? value.toLocaleDateString('pt-BR') : '';
  const borderColor = error ? COLORS.red : COLORS.gray_200;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[styles.inputContainer, { borderColor }]}
      >
        <Icon
          name="calendar"
          size={24}
          color={COLORS.gray_400}
          style={styles.icon}
        />
        <Text style={formattedDate ? styles.dateText : styles.placeholder}>
          {formattedDate || placeholder}
        </Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : reserveErrorSpace ? (
        <View style={styles.errorPlaceholder} />
      ) : null}

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
