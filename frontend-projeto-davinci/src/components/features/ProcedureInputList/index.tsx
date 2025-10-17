import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

export type ProcedureEntry = {
  id: number;
  description: string;
};

type Props = {
  value?: ProcedureEntry[];
  onChange?: (items: ProcedureEntry[]) => void;
  disabled?: boolean;
  title?: string;
};

function isSameList(a: ProcedureEntry[] = [], b: ProcedureEntry[] = []) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].description !== b[i].description) return false;
  }
  return true;
}

export default function ProcedureInputList({
  value,
  onChange,
  disabled = false,
  title = 'Procedimentos Realizados',
}: Props) {
  const defaultEntry = useMemo<ProcedureEntry>(() => ({ id: Date.now(), description: '' }), []);
  const [procedures, setProcedures] = useState<ProcedureEntry[]>(
    value && value.length ? value : [defaultEntry]
  );

  const skipEmitRef = useRef(false);
  useEffect(() => {
    if (!value) return;
    if (!isSameList(value, procedures)) {
      skipEmitRef.current = true;
      setProcedures(value.length ? value : [defaultEntry]);
    }
  }, [value]);

  useEffect(() => {
    if (skipEmitRef.current) {
      skipEmitRef.current = false;
      return;
    }
    onChange?.(procedures);
  }, [procedures, onChange]);

  const handleDescriptionChange = (text: string, id: number) => {
    setProcedures((curr) => curr.map((p) => (p.id === id ? { ...p, description: text } : p)));
  };

  const addProcedureInput = () => {
    if (disabled) return;
    setProcedures((curr) => [...curr, { id: Date.now(), description: '' }]);
  };

  const removeProcedureInput = (id: number) => {
    if (disabled) return;
    setProcedures((curr) => {
      if (curr.length <= 1) return [{ id: Date.now(), description: '' }];
      return curr.filter((p) => p.id !== id);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.procedureItemContainer}>
        <Text style={styles.title}>{title}</Text>

        {procedures.map((proc, index) => (
          <View
            key={proc.id}
            style={[
              styles.procedureEntry,
              index === procedures.length - 1 && styles.lastProcedureEntry,
            ]}
          >
            <TextInput
              style={[
                styles.descriptionInput,
                disabled && styles.disabledInput,
              ]}
              value={proc.description}
              onChangeText={(t) => handleDescriptionChange(t, proc.id)}
              placeholder="Descreva o que foi feito..."
              placeholderTextColor={COLORS.gray_400}
              editable={!disabled}
              multiline
            />

            {!disabled && procedures.length > 1 && (
              <TouchableOpacity
                onPress={() => removeProcedureInput(proc.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remover Procedimento</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={addProcedureInput}
        style={[styles.addButton, disabled && styles.disabledAddButton]}
        disabled={disabled}
      >
        <Feather name="plus" size={20} color={COLORS.secondary} />
        <Text style={styles.addButtonText}>Adicionar Procedimento</Text>
      </TouchableOpacity>
    </View>
  );
}
