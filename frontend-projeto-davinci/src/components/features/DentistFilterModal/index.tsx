import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledButton from '@/components/common/StyledButton';
import { COLORS } from '@/constants/theme';

type DentistFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    genders: string[];
    specialties: string[];
  }) => void;
  specialtyOptions: string[];
  initialFilters: {
    genders: string[];
    specialties: string[];
  };
};

export default function DentistFilterModal({
  visible,
  onClose,
  onApply,
  specialtyOptions,
  initialFilters,
}: DentistFilterModalProps) {
  const [tempGenders, setTempGenders] = useState<string[]>(initialFilters.genders);
  const [tempSpecialties, setTempSpecialties] = useState<string[]>(initialFilters.specialties);
  const genderOptions = ['Feminino', 'Masculino', 'Outro'];

  useEffect(() => {
    setTempGenders(initialFilters.genders);
    setTempSpecialties(initialFilters.specialties);
  }, [visible, initialFilters]);

  const toggleSelection = (list: string[], setList: Function, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleClear = () => {
    setTempGenders([]);
    setTempSpecialties([]);
    onApply({ genders: [], specialties: [] });
    onClose();
  };

  const handleApply = () => {
    onApply({ genders: tempGenders, specialties: tempSpecialties });
    onClose();
  };

  const sections = [
    {
      title: 'Sexo',
      type: 'multiselect',
      options: genderOptions.map(o => ({ label: o, value: o })),
      selected: tempGenders,
      onSelect: (value: string) => toggleSelection(tempGenders, setTempGenders, value),
    },
    {
      title: 'Especialidades',
      type: 'multiselect',
      options: specialtyOptions.map(o => ({ label: o, value: o })),
      selected: tempSpecialties,
      onSelect: (value: string) => toggleSelection(tempSpecialties, setTempSpecialties, value),
    },
  ];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <View style={{ width: 24 }} />
            <Text style={styles.modalTitle}>Filtrar Dentistas</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer}>
            {sections.map((section, index) => (
              <View 
                key={section.title} 
                style={[
                  styles.sectionContainer, 
                  index < sections.length - 1 && styles.sectionSeparator
                ]}
              >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.options.map(({ label, value }) => (
                  <TouchableOpacity key={value} style={styles.optionButton} onPress={() => section.onSelect(value)}>
                    <Feather 
                      name={section.selected.includes(value) ? 'check-square' : 'square'}
                      size={24} 
                      color={COLORS.secondary} 
                    />
                    <Text style={styles.optionText}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
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