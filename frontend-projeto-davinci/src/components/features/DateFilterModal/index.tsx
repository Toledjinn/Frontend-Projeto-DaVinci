import React, { useState, useEffect } from 'react';
import { Modal, View, Text } from 'react-native';
import { styles } from './styles';
import StyledButton from '@/components/common/StyledButton';
import StyledDatePicker from '@/components/common/StyledDatePicker';

type DateFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (dates: { start: Date | null; end: Date | null }) => void;
  initialStartDate: Date | null;
  initialEndDate: Date | null;
};

export default function DateFilterModal({
  visible,
  onClose,
  onApply,
  initialStartDate,
  initialEndDate,
}: DateFilterModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onApply({ start: null, end: null });
    onClose();
  };

  const handleApply = () => {
    onApply({ start: startDate, end: endDate });
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
          <Text style={styles.modalTitle}>Filtrar por Data</Text>
          <View style={styles.datePickerContainer}>
            <StyledDatePicker
              label="Data de Início"
              value={startDate}
              onChange={setStartDate}
            />
          </View>
          <View style={styles.datePickerContainer}>
            <StyledDatePicker
              label="Data de Fim"
              value={endDate}
              onChange={setEndDate}
            />
          </View>
          <View style={styles.footer}>
            <StyledButton title="Limpar" onPress={handleClear} variant="primary" style={styles.button} />
            <StyledButton title="Aplicar" onPress={handleApply} variant="secondary" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
} 