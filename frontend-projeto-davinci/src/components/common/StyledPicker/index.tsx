import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyledPickerStyles } from './styles';
import { COLORS } from '@/constants/theme';

export interface PickerItem {
  label: string;
  value: string;
}

interface StyledPickerProps {
  label: string;
  iconName: string;
  items: PickerItem[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  reserveErrorSpace?: boolean;
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
}: StyledPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const styles = getStyledPickerStyles(height, width);

  const selectedLabel = items.find((item) => item.value === selectedValue)?.label;
  const borderColor = error ? COLORS.red : COLORS.gray_200;

  const handleSelect = (item: PickerItem) => {
    onValueChange(item.value);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.inputContainer, { borderColor }]}
      >
        <Icon
          name={iconName}
          size={24}
          color={COLORS.gray_400}
          style={styles.icon}
        />
        <Text style={selectedLabel ? styles.valueText : styles.placeholder}>
          {selectedLabel || placeholder}
        </Text>
        <Icon
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