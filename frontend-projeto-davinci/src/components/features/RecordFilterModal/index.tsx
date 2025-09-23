import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledButton from '@/components/common/StyledButton';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import { COLORS } from '@/constants/theme';

type FilterItem = { label: string; value: string };

type RecordFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    start: Date | null;
    end: Date | null;
    dentists: string[];
    specialties: string[];
    status: string[]; 
  }) => void;
  dentistOptions: string[];
  specialtyOptions: string[];
  statusOptions: FilterItem[]; 
  initialFilters: {
    start: Date | null;
    end: Date | null;
    dentists: string[];
    specialties: string[];
    status: string[]; 
  };
};

export default function RecordFilterModal({
  visible,
  onClose,
  onApply,
  dentistOptions,
  specialtyOptions,
  statusOptions, 
  initialFilters,
}: RecordFilterModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(initialFilters.start);
  const [endDate, setEndDate] = useState<Date | null>(initialFilters.end);
  const [selectedDentists, setSelectedDentists] = useState<string[]>(initialFilters.dentists);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(initialFilters.specialties);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(initialFilters.status); 

  useEffect(() => {
    setStartDate(initialFilters.start);
    setEndDate(initialFilters.end);
    setSelectedDentists(initialFilters.dentists);
    setSelectedSpecialties(initialFilters.specialties);
    setSelectedStatus(initialFilters.status); 
  }, [visible, initialFilters]);

  const toggleSelection = (list: string[], setList: Function, item: string) => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    setList(newList);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDentists([]);
    setSelectedSpecialties([]);
    setSelectedStatus([]); 
    onApply({ start: null, end: null, dentists: [], specialties: [], status: [] });
    onClose();
  };

  const handleApply = () => {
    onApply({ start: startDate, end: endDate, dentists: selectedDentists, specialties: selectedSpecialties, status: selectedStatus });
    onClose();
  };

  const renderMultiSelect = (title: string, options: string[] | FilterItem[], selected: string[], onToggle: (item: string) => void) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {options.map((option) => {
        const label = typeof option === 'string' ? option : option.label;
        const value = typeof option === 'string' ? option : option.value;
        return (
          <TouchableOpacity
            key={value}
            style={styles.optionButton}
            onPress={() => onToggle(value)}
          >
            <Feather
              name={selected.includes(value) ? 'check-square' : 'square'}
              size={24}
              color={COLORS.secondary}
            />
            <Text style={styles.optionText}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
           <View style={styles.modalHeader}>
            <View style={{ width: 24 }} />
            <Text style={styles.modalTitle}>Filtrar Consultas</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Período</Text>
              <StyledDatePicker label="Data de Início" value={startDate} onChange={setStartDate} />
              <View style={{ height: 16 }} />
              <StyledDatePicker label="Data de Fim" value={endDate} onChange={setEndDate} />
            </View>
            {renderMultiSelect('Status', statusOptions, selectedStatus, (item) => toggleSelection(selectedStatus, setSelectedStatus, item))}
            {renderMultiSelect('Dentistas', dentistOptions, selectedDentists, (item) => toggleSelection(selectedDentists, setSelectedDentists, item))}
            {renderMultiSelect('Especialidades', specialtyOptions, selectedSpecialties, (item) => toggleSelection(selectedSpecialties, setSelectedSpecialties, item))}
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