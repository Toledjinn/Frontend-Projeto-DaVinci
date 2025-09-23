import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledPicker from '@/components/common/StyledPicker';
import { ALL_PROCEDURES } from '@/data/mockProcedures';
import { COLORS } from '@/constants/theme';

type ProcedureEntry = {
  id: number;
  procedure: string | null;
  description: string;
};

export default function ProcedureInputList() {
  const [procedures, setProcedures] = useState<ProcedureEntry[]>([
    { id: Date.now(), procedure: null, description: '' },
  ]);

  const handleProcedureChange = (value: string | null, id: number, field: 'procedure' | 'description') => {
    const newProcedures = procedures.map(proc =>
      proc.id === id ? { ...proc, [field]: value } : proc
    );
    setProcedures(newProcedures);
  };

  const addProcedureInput = () => {
    setProcedures([...procedures, { id: Date.now(), procedure: null, description: '' }]);
  };

  const removeProcedureInput = (id: number) => {
    if (procedures.length > 1) {
      setProcedures(procedures.filter(proc => proc.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.procedureItemContainer}>
        <Text style={styles.title}>Procedimentos Realizados</Text>

        {procedures.map((proc, index) => (
          <View 
            key={proc.id} 
            style={[
              styles.procedureEntry, 
              index === procedures.length - 1 && styles.lastProcedureEntry
            ]}
          >
            <View style={styles.inputsContainer}>
              <View style={styles.pickerWrapper}>
                <StyledPicker
                  iconName="clipboard"
                  items={ALL_PROCEDURES}
                  selectedValue={proc.procedure}
                  onValueChange={(value) => handleProcedureChange(value, proc.id, 'procedure')}
                  placeholder="Selecione o procedimento"
                />
              </View>
              <TextInput
                style={styles.descriptionInput}
                value={proc.description}
                onChangeText={(text) => handleProcedureChange(text, proc.id, 'description')}
                placeholder="Descreva o que foi feito..."
                multiline
              />
            </View>
            
            {procedures.length > 1 && (
              <TouchableOpacity onPress={() => removeProcedureInput(proc.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remover Procedimento</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      
      <TouchableOpacity onPress={addProcedureInput} style={styles.addButton}>
        <Feather name="plus" size={20} color={COLORS.secondary} />
        <Text style={styles.addButtonText}>Adicionar Procedimento</Text>
      </TouchableOpacity>
    </View>
  );
}