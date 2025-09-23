import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledButton from '@/components/common/StyledButton';
import { COLORS } from '@/constants/theme';

type AdminFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    genders: string[];
    roles: string[];
  }) => void;
  roleOptions: string[];
  initialFilters: {
    genders: string[];
    roles: string[];
  };
};

export default function AdminFilterModal({
  visible,
  onClose,
  onApply,
  roleOptions,
  initialFilters,
}: AdminFilterModalProps) {
  const [tempGenders, setTempGenders] = useState<string[]>(initialFilters.genders);
  const [tempRoles, setTempRoles] = useState<string[]>(initialFilters.roles);
  const genderOptions = ['Feminino', 'Masculino', 'Outro'];

  useEffect(() => {
    setTempGenders(initialFilters.genders);
    setTempRoles(initialFilters.roles);
  }, [visible, initialFilters]);

  const toggleSelection = (list: string[], setList: Function, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleClear = () => {
    setTempGenders([]);
    setTempRoles([]);
    onApply({ genders: [], roles: [] });
    onClose();
  };

  const handleApply = () => {
    onApply({ genders: tempGenders, roles: tempRoles });
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
      title: 'Cargo',
      type: 'multiselect',
      options: roleOptions.map(o => ({ label: o, value: o })),
      selected: tempRoles,
      onSelect: (value: string) => toggleSelection(tempRoles, setTempRoles, value),
    },
  ];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <View style={{ width: 24 }} />
            <Text style={styles.modalTitle}>Filtrar Admins.</Text>
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
            <StyledButton title="Limpar" onPress={handleClear} variant="primary" style={styles.button} />
            <StyledButton title="Aplicar" onPress={handleApply} variant="secondary" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
}