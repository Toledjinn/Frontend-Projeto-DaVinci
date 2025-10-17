import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledUserPicker, { UserPickerItem } from '@/components/common/StyledUserPicker';
import StyledPicker from '@/components/common/StyledPicker';
import StyledInput from '@/components/common/StyledInput';
import { getUsers } from '@/data/mockUsers';
import { SPECIALTIES } from '@/data/mockSpecialties';
import { COLORS } from '@/constants/theme';

export type PlanItem = {
  id: number;
  dentistId: string | null;
  specialty: string | null;
  observations: string;
};

type Props = {
  value?: PlanItem[];
  onChange?: (items: PlanItem[]) => void;
  disabled?: boolean;
  title?: string;
};

const MOCK_DENTISTS: UserPickerItem[] = getUsers('dentist');
const specialtyItems = SPECIALTIES.map((s) => ({ label: s, value: s })) as {
  label: string;
  value: string;
}[];

function isSamePlan(a: PlanItem[] = [], b: PlanItem[] = []) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const ai = a[i];
    const bi = b[i];
    if (
      ai.id !== bi.id ||
      ai.dentistId !== bi.dentistId ||
      ai.specialty !== bi.specialty ||
      ai.observations !== bi.observations
    ) {
      return false;
    }
  }
  return true;
}

export default function TreatmentPlanForm({
  value,
  onChange,
  disabled = false,
  title = 'Plano de Tratamento',
}: Props) {
  const defaultItem = useMemo<PlanItem>(
    () => ({
      id: Date.now(),
      dentistId: null,
      specialty: null,
      observations: '',
    }),
    []
  );

  const [planItems, setPlanItems] = useState<PlanItem[]>(
    value && value.length ? value : [defaultItem]
  );

  const skipEmitRef = useRef(false);

  useEffect(() => {
    if (!value) return;
    if (!isSamePlan(value, planItems)) {
      skipEmitRef.current = true;
      setPlanItems(value.length ? value : [defaultItem]);
    }
  }, [value]);

  useEffect(() => {
    if (skipEmitRef.current) {
      skipEmitRef.current = false;
      return;
    }
    onChange?.(planItems);
  }, [planItems, onChange]);

  const handleItemChange = <K extends keyof PlanItem>(id: number, field: K, v: PlanItem[K]) => {
    setPlanItems((curr) => curr.map((it) => (it.id === id ? { ...it, [field]: v } : it)));
  };

  const addItem = () => {
    if (disabled) return;
    setPlanItems((curr) => [
      ...curr,
      { id: Date.now(), dentistId: null, specialty: null, observations: '' },
    ]);
  };

  const removeItem = (id: number) => {
    if (disabled) return;
    setPlanItems((curr) => (curr.length > 1 ? curr.filter((it) => it.id !== id) : curr));
  };

  return (
    <View style={[styles.card, disabled && styles.disabled]}>
      <Text style={styles.title}>{title}</Text>

      {planItems.map((item, index) => (
        <View key={item.id} style={[styles.itemContainer, index === 0 && { paddingTop: 0 }]}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>Etapa {index + 1}</Text>
            {!disabled && planItems.length > 1 && (
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Feather name="x-circle" size={24} color={COLORS.red} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <StyledUserPicker
              label="Dentista"
              iconName="user"
              items={MOCK_DENTISTS}
              selectedValue={item.dentistId}
              onValueChange={(v) => handleItemChange(item.id, 'dentistId', v)}
              placeholder="Selecione o dentista"
              disabled={disabled}
            />
          </View>

          <View style={styles.inputWrapper}>
            <StyledPicker
              label="Especialidade"
              iconName="star"
              items={specialtyItems}
              selectedValue={item.specialty}
              onValueChange={(v) => handleItemChange(item.id, 'specialty', v)}
              placeholder="Selecione a especialidade"
              disabled={disabled}
            />
          </View>

          <View style={styles.inputWrapper}>
            <StyledInput
              label="Observações (opcional)"
              iconName="file-text"
              value={item.observations}
              onChangeText={(v) => handleItemChange(item.id, 'observations', v)}
              multiline
              editable={!disabled}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity
        onPress={addItem}
        style={[styles.addButton, disabled && styles.disabled]}
        disabled={disabled}
      >
        <Feather name="plus-circle" size={22} color={COLORS.secondary} />
        <Text style={styles.addButtonText}>Adicionar Etapa</Text>
      </TouchableOpacity>
    </View>
  );
}
