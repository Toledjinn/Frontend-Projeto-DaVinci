import React, {useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledUserPicker from '@/components/common/StyledUserPicker';
import StyledPicker from '@/components/common/StyledPicker';
import StyledMultiSelect from '@/components/common/StyledMultiSelect';
import StyledInput from '@/components/common/StyledInput';
import { getUsers } from '@/data/mockUsers';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';
import { ALL_PROCEDURES } from '@/data/mockProcedures';
import { COLORS } from '@/constants/theme';

const MOCK_DENTISTS = getUsers('dentist');
const specialtyItems = ALL_SPECIALTIES.map(s => ({ label: s, value: s }));

type PlanItem = {
  id: number;
  dentistId: string | null;
  specialty: string | null;
  procedures: string[];
  observations: string;
};

export default function TreatmentPlanForm() {
  const [planItems, setPlanItems] = useState<PlanItem[]>([
    { id: Date.now(), dentistId: null, specialty: null, procedures: [], observations: '' },
  ]);

  const handleItemChange = (id: number, field: keyof PlanItem, value: any) => {
    setPlanItems(currentItems =>
      currentItems.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    setPlanItems([...planItems, { id: Date.now(), dentistId: null, specialty: null, procedures: [], observations: '' }]);
  };

  const removeItem = (id: number) => {
    if (planItems.length > 1) {
      setPlanItems(currentItems => currentItems.filter(item => item.id !== id));
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Plano de Tratamento</Text>
      {planItems.map((item, index) => (
        <View key={item.id} style={[styles.itemContainer, index === 0 && {paddingTop: 0}]}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>Etapa {index + 1}</Text>
            {planItems.length > 1 && (
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Feather name="x-circle" size={24} color={COLORS.red} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <StyledUserPicker label="Dentista" iconName="user" items={MOCK_DENTISTS} selectedValue={item.dentistId} onValueChange={value => handleItemChange(item.id, 'dentistId', value)} />
          </View>
          <View style={styles.inputWrapper}>
            <StyledPicker label="Especialidade" iconName="star" items={specialtyItems} selectedValue={item.specialty} onValueChange={value => handleItemChange(item.id, 'specialty', value)} />
          </View>
          <View style={styles.inputWrapper}>
            <StyledMultiSelect label="Procedimentos" iconName="clipboard" items={ALL_PROCEDURES} selectedItems={item.procedures} onSelectionChange={value => handleItemChange(item.id, 'procedures', value)} />
          </View>
          <View style={styles.inputWrapper}>
            <StyledInput label="Observações (opcional)" iconName="file-text" value={item.observations} onChangeText={value => handleItemChange(item.id, 'observations', value)} multiline />
          </View>
        </View>
      ))}
      <TouchableOpacity onPress={addItem} style={styles.addButton}>
        <Feather name="plus-circle" size={22} color={COLORS.secondary} />
        <Text style={styles.addButtonText}>Adicionar Etapa</Text>
      </TouchableOpacity>
    </View>
  );
}