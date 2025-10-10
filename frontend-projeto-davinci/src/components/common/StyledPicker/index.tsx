import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { getStyledPickerStyles } from './styles';
import { COLORS } from '@/constants/theme';

export interface PickerItem {
  label: string;
  value: string;
}

interface StyledPickerProps {
  label?: string;
  iconName: string;
  items: PickerItem[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  reserveErrorSpace?: boolean;
  disabled?: boolean;
}

export default function StyledPicker({
  label,
  iconName,
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Selecione',
  error,
  reserveErrorSpace = false,
  disabled = false,
}: StyledPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const styles = getStyledPickerStyles(height, width);

  const selectedLabel = items.find((item) => item.value === selectedValue)?.label;
  const borderColor = error
    ? COLORS.red
    : disabled
    ? COLORS.gray_200
    : COLORS.gray_200;

  const textStyle = disabled
    ? styles.valueTextDisabled
    : selectedLabel
    ? styles.valueText
    : styles.placeholder;

  const iconTint = COLORS.gray_400;

  const openModal = () => {
    if (!disabled) setModalVisible(true);
  };

  const handleSelect = (item: PickerItem) => {
    onValueChange(item.value);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        onPress={openModal}
        disabled={disabled}
        style={[
          styles.inputContainer,
          disabled && styles.inputContainerDisabled,
          { borderColor },
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <Icon
          name={iconName}
          size={24}
          color={iconTint}
          style={styles.icon}
        />

        <Text style={textStyle}>
          {selectedLabel || placeholder}
        </Text>

        <Icon
          name="chevron-down"
          size={20}
          color={iconTint}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : reserveErrorSpace ? (
        <View style={styles.errorPlaceholder} />
      ) : null}

      <Modal
        animationType="slide"
        transparent
        visible={!disabled && modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="x" size={24} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}
