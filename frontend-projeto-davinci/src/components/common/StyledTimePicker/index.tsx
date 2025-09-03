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
import { getStyledTimePickerStyles } from './styles';
import { COLORS } from '@/constants/theme';

interface StyledTimePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string | null;
  reserveErrorSpace?: boolean;
  placeholder?: string;
}

export default function StyledTimePicker({
  label,
  value,
  onChange,
  error,
  reserveErrorSpace = false,
  placeholder = '--:--',
}: StyledTimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const { height, width } = useWindowDimensions();
  const styles = getStyledTimePickerStyles(height, width);

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formattedTime = value ? value.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
  const borderColor = error ? COLORS.red : COLORS.gray_200;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[styles.inputContainer, { borderColor }]}
      >
        <Icon
          name="clock"
          size={24}
          color={COLORS.gray_400}
          style={styles.icon}
        />
        <Text style={formattedTime ? styles.timeText : styles.placeholder}>
          {formattedTime || placeholder}
        </Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : reserveErrorSpace ? (
        <View style={styles.errorPlaceholder} />
      ) : null}

      {showPicker && (
        <DateTimePicker
          testID="timePicker"
          value={value || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}