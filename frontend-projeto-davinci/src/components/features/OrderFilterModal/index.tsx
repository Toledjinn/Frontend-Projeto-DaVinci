import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledButton from '@/components/common/StyledButton';
import { COLORS } from '@/constants/theme';
import { OrderStatus } from '@/state/pedidosStore';

type OrderFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: { statuses: OrderStatus[] }) => void;
  statusOptions: { label: string; value: OrderStatus }[];
  initialFilters: {
    statuses: OrderStatus[];
  };
};

export default function OrderFilterModal({
  visible,
  onClose,
  onApply,
  statusOptions,
  initialFilters,
}: OrderFilterModalProps) {
  const [tempStatuses, setTempStatuses] = useState<OrderStatus[]>(initialFilters.statuses);

  useEffect(() => {
    if (visible) {
      setTempStatuses(initialFilters.statuses);
    }
  }, [visible, initialFilters]);

  const toggleSelection = (item: OrderStatus) => {
    setTempStatuses((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleClear = () => {
    setTempStatuses([]);
    onApply({ statuses: [] });
    onClose();
  };

  const handleApply = () => {
    onApply({ statuses: tempStatuses });
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <View style={{ width: 24 }} />
            <Text style={styles.modalTitle}>Filtrar por Status</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.sectionContainer}>
              {statusOptions.map(({ label, value }) => (
                <TouchableOpacity key={value} style={styles.optionButton} onPress={() => toggleSelection(value)}>
                  <Feather
                    name={tempStatuses.includes(value) ? 'check-square' : 'square'}
                    size={24}
                    color={COLORS.secondary}
                  />
                  <Text style={styles.optionText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <StyledButton title="Aplicar" onPress={handleApply} variant="primary" style={styles.button} />
            <StyledButton title="Limpar" onPress={handleClear} variant="secondary" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

