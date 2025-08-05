import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getStyledMultiSelectStyles } from './styles';
import { COLORS } from '@/constants/theme';
import StyledButton from '../StyledButton';

export interface MultiSelectItem {
  label: string;
  value: string;
}

interface StyledMultiSelectProps {
  label: string;
  iconName: string;
  items: MultiSelectItem[];
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  error?: string | null;
  reserveErrorSpace?: boolean;
}

export default function StyledMultiSelect({
  label,
  iconName,
  items,
  selectedItems,
  onSelectionChange,
  placeholder = 'Selecione',
  error,
  reserveErrorSpace = false,
}: StyledMultiSelectProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const styles = getStyledMultiSelectStyles(height, width);

  const [tempSelected, setTempSelected] = useState<string[]>(selectedItems);

  const selectedLabels = items
    .filter((item) => selectedItems.includes(item.value))
    .map((item) => item.label)
    .join(', ');

  const borderColor = error ? COLORS.red : COLORS.gray_200;

  const toggleOption = (value: string) => {
    setTempSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleApply = () => {
    onSelectionChange(tempSelected);
    setModalVisible(false);
  };
  
  const handleOpen = () => {
    setTempSelected(selectedItems);
    setModalVisible(true);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={handleOpen}
        style={[styles.inputContainer, { borderColor }]}
      >
        <Feather
          name={iconName}
          size={24}
          color={COLORS.gray_400}
          style={styles.icon}
        />
        <Text style={selectedLabels ? styles.valueText : styles.placeholder} numberOfLines={1}>
          {selectedLabels || placeholder}
        </Text>
        <Feather
          name="chevron-down"
          size={20}
          color={COLORS.gray_400}
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
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => toggleOption(item.value)}
                >
                  <Feather
                    name={tempSelected.includes(item.value) ? 'check-square' : 'square'}
                    size={24}
                    color={COLORS.secondary}
                  />
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: height * 0.4 }}
            />
            <View style={styles.modalFooter}>
                <StyledButton title="Aplicar" onPress={handleApply} />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}