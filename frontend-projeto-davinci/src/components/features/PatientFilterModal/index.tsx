import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledButton from '@/components/common/StyledButton';
import { COLORS } from '@/constants/theme';

type AllergyFilter = 'all' | 'yes' | 'no';

type PatientFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    genders: string[];
    specialties: string[];
    allergy: AllergyFilter;
  }) => void;
  specialtyOptions: string[];
  initialFilters: {
    genders: string[];
    specialties: string[];
    allergy: AllergyFilter;
  };
};

type SingleSelectSection = {
  title: 'Alergia';
  type: 'singleselect';
  options: { label: string; value: AllergyFilter }[];
  selected: AllergyFilter;
  onSelect: React.Dispatch<React.SetStateAction<AllergyFilter>>;
};

type MultiSelectSection = {
  title: string;
  type: 'multiselect';
  options: { label: string; value: string }[];
  selected: string[];
  onSelect: (value: string) => void;
};

type Section = SingleSelectSection | MultiSelectSection;

export default function PatientFilterModal({
  visible,
  onClose,
  onApply,
  specialtyOptions,
  initialFilters,
}: PatientFilterModalProps) {
  const [tempGenders, setTempGenders] = useState<string[]>(initialFilters.genders);
  const [tempSpecialties, setTempSpecialties] = useState<string[]>(initialFilters.specialties);
  const [tempAllergy, setTempAllergy] = useState<AllergyFilter>(initialFilters.allergy);

  const genderOptions = ['Feminino', 'Masculino', 'Outro'];
  const allergyOptions: SingleSelectSection['options'] = [
    { label: 'Todos', value: 'all' },
    { label: 'Com Alergia', value: 'yes' },
    { label: 'Sem Alergia', value: 'no' },
  ];

  useEffect(() => {
    setTempGenders(initialFilters.genders);
    setTempSpecialties(initialFilters.specialties);
    setTempAllergy(initialFilters.allergy);
  }, [visible, initialFilters]);

  const toggleSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const handleClear = () => {
    setTempGenders([]);
    setTempSpecialties([]);
    setTempAllergy('all');
    onApply({ genders: [], specialties: [], allergy: 'all' });
    onClose();
  };

  const handleApply = () => {
    onApply({ genders: tempGenders, specialties: tempSpecialties, allergy: tempAllergy });
    onClose();
  };

  const sections: Section[] = [
    {
      title: 'Alergia',
      type: 'singleselect',
      options: allergyOptions,
      selected: tempAllergy,
      onSelect: setTempAllergy,
    },
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
            <Text style={styles.modalTitle}>Filtrar Pacientes</Text>
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
                  index < sections.length - 1 && styles.sectionSeparator,
                ]}
              >
                <Text style={styles.sectionTitle}>{section.title}</Text>

                {section.options.map(({ label, value }) => (
                  <TouchableOpacity
                    key={value}
                    style={styles.optionButton}
                    onPress={() =>
                      section.type === 'singleselect'
                        ? section.onSelect(value as AllergyFilter)
                        : section.onSelect(value)
                    }
                  >
                    <Feather
                      name={
                        section.type === 'singleselect'
                          ? section.selected === (value as AllergyFilter)
                            ? 'check-square'
                            : 'square'
                          : section.selected.includes(value)
                          ? 'check-square'
                          : 'square'
                      }
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
