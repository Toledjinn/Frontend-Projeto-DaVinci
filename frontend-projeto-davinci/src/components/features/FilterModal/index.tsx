import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import StyledButton from '@/components/common/StyledButton';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (selected: string[]) => void;
  options: string[];
  initialSelectedOptions: string[];
};

export default function FilterModal({
  visible,
  onClose,
  onApply,
  options,
  initialSelectedOptions,
}: FilterModalProps) {
  const [selected, setSelected] = useState<string[]>(initialSelectedOptions);

  useEffect(() => {
    setSelected(initialSelectedOptions);
  }, [initialSelectedOptions]);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleClear = () => {
    setSelected([]);
    onApply([]);
    onClose();
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Filtrar por Especialidade</Text>
          <ScrollView style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionButton}
                onPress={() => toggleOption(option)}
              >
                <Feather
                  name={selected.includes(option) ? 'check-square' : 'square'}
                  size={24}
                  color={COLORS.secondary}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <StyledButton title="Limpar" onPress={handleClear} variant="primary" style={styles.button} />
            <StyledButton title="Aplicar" onPress={handleApply} variant="secondary" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
}