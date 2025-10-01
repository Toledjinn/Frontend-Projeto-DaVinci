import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'; 
import QuestionCard from '../QuestionCard';
import StyledInput from '@/components/common/StyledInput';
import ToggleButtonGroup from '@/components/common/ToggleButtonGroup';
import Checkbox from '@/components/common/Checkbox';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import StyledPicker from '@/components/common/StyledPicker';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

const INITIAL_STATE = {
  q1: { haQuantoTempo: '', motivo: '' },
  q2: { data: null, qual: '' },
  q3: { quantidade: null, porQuantoTempo: '' },
  q4: { selected: [] },
  q5: { value: null, selected: [], outros: '' },
  q6: { value: null, frequencia: '' },
  q7: { value: null, onde: '' },
  q8: { value: null, qual: '' },
  q9: { value: null, motivo: '' },
  q10: { value: null, frequencia: '' },
  q11: { value: null, qual: '', frequencia: '' },
  q12: { value: null, quantidade: null },
  q13: { quantidade: null },
  q14: { value: null, quantidade: null },
  q15: { value: null, motivo: '' },
  q16: { value: null },
  q17: { value: null, qual: '' },
  q18: { value: null },
  q19: { value: null },
  q20: { value: null, onde: '' },
  q21: { nivel: null },
  q22: { value: null, qual: '' },
  q23: { value: null },
  q24: { value: null, oQueMudar: '' },
  q25: { nivel: null },
  q26: { value: null, qual: '' },
  examesSolicitados: [{ id: Date.now(), value: '' }],
  observacoes: '',
  avaliacaoRisco: { nivel: null },
};

export default function SaudeBucalForm() {
  const [formData, setFormData] = useState<any>(INITIAL_STATE);

  const handleValueChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleCheckboxChange = (section: string, value: string) => {
  setFormData((prevData: any) => {
    const currentSelection = prevData[section]?.selected || [];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item: string) => item !== value) 
      : [...currentSelection, value];
    return { ...prevData, [section]: { ...prevData[section], selected: newSelection } };
  });
};

  const handleRadioCheckboxChange = (section: string, field: string, value: string) => {
     setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleExameChange = (text: string, id: number) => {
    setFormData((prev: any) => ({
      ...prev,
      examesSolicitados: prev.examesSolicitados.map((exame: any) =>
        exame.id === id ? { ...exame, value: text } : exame
      ),
    }));
  };

  const addExameInput = () => {
    setFormData((prev: any) => ({
      ...prev,
      examesSolicitados: [...prev.examesSolicitados, { id: Date.now(), value: '' }],
    }));
  };

  const removeExameInput = (id: number) => {
    setFormData((prev: any) => ({
      ...prev,
      examesSolicitados: prev.examesSolicitados.filter((exame: any) => exame.id !== id),
    }));
  };

  return (
    <View style={styles.formContainer}>
      <QuestionCard number={1} title="A quanto tempo foi ao dentista?">
        <StyledInput label="Há quanto tempo?" iconName="calendar" value={formData.q1.haQuantoTempo} onChangeText={text => handleValueChange('q1', 'haQuantoTempo', text)} />
        <View style={styles.conditionalInput}><StyledInput label="Motivo" iconName="info" value={formData.q1.motivo} onChangeText={text => handleValueChange('q1', 'motivo', text)} /></View>
      </QuestionCard>

      <QuestionCard number={2} title="Último exame radiográfico completo?">
        <StyledDatePicker label="" value={formData.q2.data} onChange={date => handleValueChange('q2', 'data', date)} />
        <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.q2.qual} onChangeText={text => handleValueChange('q2', 'qual', text)} /></View>
      </QuestionCard>

      <QuestionCard number={3} title="Quantas vezes você escova os dentes por dia?">
        <StyledPicker label="" iconName="hash" items={[{label: '1x', value: '1'}, {label: '2x', value: '2'}, {label: '3x ou mais', value: '3+'}]} selectedValue={formData.q3.quantidade} onValueChange={val => handleValueChange('q3', 'quantidade', val)} />
        <View style={styles.conditionalInput}><StyledInput label="Por quanto tempo?" iconName="clock" value={formData.q3.porQuantoTempo} onChangeText={text => handleValueChange('q3', 'porQuantoTempo', text)} /></View>
      </QuestionCard>

      <QuestionCard number={4} title="Preferência de escova">
        <View style={styles.checkboxContainer}>
          <Checkbox label="Dura" checked={formData.q4.selected.includes('Dura')} onPress={()=>handleCheckboxChange('q4', 'Dura')}/>
          <Checkbox label="Média" checked={formData.q4.selected.includes('Média')} onPress={()=>handleCheckboxChange('q4', 'Média')}/>
          <Checkbox label="Extra macia" checked={formData.q4.selected.includes('Extra macia')} onPress={()=>handleCheckboxChange('q4', 'Extra macia')}/>
          <Checkbox label="Macia" checked={formData.q4.selected.includes('Macia')} onPress={()=>handleCheckboxChange('q4', 'Macia')}/>
        </View>
      </QuestionCard>
      
      <QuestionCard number={5} title="Sensibilidade em algum dente provocado por:">
        <ToggleButtonGroup label="" value={formData.q5.value} onSelect={val => handleValueChange('q5', 'value', val)} />
        {formData.q5.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <View style={styles.checkboxContainer}>
              <Checkbox label="Gelado" checked={formData.q5.selected.includes('Gelado')} onPress={()=>handleCheckboxChange('q5', 'Gelado')}/>
              <Checkbox label="Quente" checked={formData.q5.selected.includes('Quente')} onPress={()=>handleCheckboxChange('q5', 'Quente')}/>
              <Checkbox label="Mastigar" checked={formData.q5.selected.includes('Mastigar')} onPress={()=>handleCheckboxChange('q5', 'Mastigar')}/>
              <Checkbox label="Escovar" checked={formData.q5.selected.includes('Escovar')} onPress={()=>handleCheckboxChange('q5', 'Escovar')}/>
            </View>
            <Checkbox label="Outros:" checked={formData.q5.selected.includes('Outros')} onPress={()=>handleCheckboxChange('q5', 'Outros')}/>
            {formData.q5.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.q5.outros} onChangeText={text => handleValueChange('q5', 'outros', text)} /></View>}
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={6} title="Usa fio dental?">
        <ToggleButtonGroup label="" value={formData.q6.value} onSelect={val => handleValueChange('q6', 'value', val)} />
        {formData.q6.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Frequência:" iconName="info" value={formData.q6.frequencia} onChangeText={text => handleValueChange('q6', 'frequencia', text)} /></View>}
      </QuestionCard>

      <QuestionCard number={7} title="O fio dental agarra ou desfia?">
        <ToggleButtonGroup label="" value={formData.q7.value} onSelect={val => handleValueChange('q7', 'value', val)} />
        {formData.q7.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Onde?" iconName="info" value={formData.q7.onde} onChangeText={text => handleValueChange('q7', 'onde', text)} /></View>}
      </QuestionCard>
      
      <QuestionCard number={8} title="Usa pasta dental?">
        <ToggleButtonGroup label="" value={formData.q8.value} onSelect={val => handleValueChange('q8', 'value', val)} />
        {formData.q8.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.q8.qual} onChangeText={text => handleValueChange('q8', 'qual', text)} /></View>}
      </QuestionCard>
      
      <QuestionCard number={9} title="Escovar os dentes é:">
        <View style={styles.checkboxContainer}>
          <Checkbox label="Fácil" checked={formData.q9.value === 'Fácil'} onPress={() => handleRadioCheckboxChange('q9', 'value', 'Fácil')} />
          <Checkbox label="Difícil" checked={formData.q9.value === 'Difícil'} onPress={() => handleRadioCheckboxChange('q9', 'value', 'Difícil')} />
          <Checkbox label="Um pouco difícil" checked={formData.q9.value === 'Um pouco difícil'} onPress={() => handleRadioCheckboxChange('q9', 'value', 'Um pouco difícil')} />
        </View>
        {(formData.q9.value === 'Difícil' || formData.q9.value === 'Um pouco difícil') && <View style={styles.conditionalInput}><StyledInput label="Por quê?" iconName="info" value={formData.q9.motivo} onChangeText={text => handleValueChange('q9', 'motivo', text)} /></View>}
      </QuestionCard>
      
      <QuestionCard number={10} title="Usa palito?">
        <ToggleButtonGroup label="" value={formData.q10.value} onSelect={val => handleValueChange('q10', 'value', val)} />
        {formData.q10.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Frequência:" iconName="info" value={formData.q10.frequencia} onChangeText={text => handleValueChange('q10', 'frequencia', text)} /></View>}
      </QuestionCard>

      <QuestionCard number={11} title="Usa bochecho?">
        <ToggleButtonGroup label="" value={formData.q11.value} onSelect={val => handleValueChange('q11', 'value', val)} />
        {formData.q11.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput label="Qual?" iconName="info" value={formData.q11.qual} onChangeText={text => handleValueChange('q11', 'qual', text)} />
            <View style={styles.conditionalInput}><StyledInput label="Frequência:" iconName="clock" value={formData.q11.frequencia} onChangeText={text => handleValueChange('q11', 'frequencia', text)} /></View>
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={12} title="Seus dentes possuem restaurações de resina, coroas, prótese fixa ou outros?">
        <ToggleButtonGroup label="" value={formData.q12.value} onSelect={val => handleValueChange('q12', 'value', val)} />
        {formData.q12.value === 'sim' && (
          <View style={[styles.checkboxContainer, styles.conditionalInput]}>
            <Checkbox label="Pouco" checked={formData.q12.quantidade === 'Pouco'} onPress={() => handleRadioCheckboxChange('q12', 'quantidade', 'Pouco')} />
            <Checkbox label="Moderado" checked={formData.q12.quantidade === 'Moderado'} onPress={() => handleRadioCheckboxChange('q12', 'quantidade', 'Moderado')} />
            <Checkbox label="Muito" checked={formData.q12.quantidade === 'Muito'} onPress={() => handleRadioCheckboxChange('q12', 'quantidade', 'Muito')} />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={13} title="Quantos dentes naturais já perdeu?">
        <StyledPicker label="" iconName="hash" items={[{label: 'Nenhum', value: '0'}, {label: '1 a 3', value: '1-3'}, {label: '4 a 7', value: '4-7'}, {label: 'Mais de 8', value: '8+'}]} selectedValue={formData.q13.quantidade} onValueChange={val => handleValueChange('q13', 'quantidade', val)} />
      </QuestionCard>

      <QuestionCard number={14} title="Tem implante?">
        <ToggleButtonGroup label="" value={formData.q14.value} onSelect={val => handleValueChange('q14', 'value', val)} />
        {formData.q14.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledPicker label="Quantos?" iconName="hash" items={[{label: '1 a 3', value: '1-3'}, {label: '4 a 7', value: '4-7'}, {label: 'Mais de 8', value: '8+'}]} selectedValue={formData.q14.quantidade} onValueChange={val => handleValueChange('q14', 'quantidade', val)} />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={15} title="Mastiga com os dois lados da boca?">
        <ToggleButtonGroup label="" value={formData.q15.value} onSelect={val => handleValueChange('q15', 'value', val)} />
        {formData.q15.value === 'não' && <View style={styles.conditionalInput}><StyledInput label="Se não, qual o motivo?" iconName="info" value={formData.q15.motivo} onChangeText={text => handleValueChange('q15', 'motivo', text)} /></View>}
      </QuestionCard>
      
      <QuestionCard number={16} title="Range ou aperta os dentes?">
        <ToggleButtonGroup label="" value={formData.q16.value} onSelect={val => handleValueChange('q16', 'value', val)} />
      </QuestionCard>
      
      <QuestionCard number={17} title="Já fez alguma cirurgia na boca?">
        <ToggleButtonGroup label="" value={formData.q17.value} onSelect={val => handleValueChange('q17', 'value', val)} />
        {formData.q17.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.q17.qual} onChangeText={text => handleValueChange('q17', 'qual', text)} /></View>}
      </QuestionCard>

      <QuestionCard number={18} title="Sente dor ou estalo na ATM?">
        <ToggleButtonGroup label="" value={formData.q18.value} onSelect={val => handleValueChange('q18', 'value', val)} />
      </QuestionCard>

      <QuestionCard number={19} title="Tem dente(s) mole(s)?">
        <ToggleButtonGroup label="" value={formData.q19.value} onSelect={val => handleValueChange('q19', 'value', val)} />
      </QuestionCard>

      <QuestionCard number={20} title="Os alimentos ficam presos entre os dentes durante a alimentação?">
        <ToggleButtonGroup label="" value={formData.q20.value} onSelect={val => handleValueChange('q20', 'value', val)} />
        {formData.q20.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Onde?" iconName="info" value={formData.q20.onde} onChangeText={text => handleValueChange('q20', 'onde', text)} /></View>}
      </QuestionCard>

      <QuestionCard number={21} title="Açúcar na alimentação?">
        <View style={styles.checkboxContainer}>
          <Checkbox label="Pouco" checked={formData.q21.nivel === 'Pouco'} onPress={() => handleRadioCheckboxChange('q21', 'nivel', 'Pouco')} />
          <Checkbox label="Médio" checked={formData.q21.nivel === 'Médio'} onPress={() => handleRadioCheckboxChange('q21', 'nivel', 'Médio')} />
          <Checkbox label="Muito" checked={formData.q21.nivel === 'Muito'} onPress={() => handleRadioCheckboxChange('q21', 'nivel', 'Muito')} />
        </View>
      </QuestionCard>

      <QuestionCard number={22} title="Possui hábito ou vício de alguma coisa como roer unhas, fumar, etc?">
        <ToggleButtonGroup label="" value={formData.q22.value} onSelect={val => handleValueChange('q22', 'value', val)} />
        {formData.q22.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.q22.qual} onChangeText={text => handleValueChange('q22', 'qual', text)} /></View>}
      </QuestionCard>

      <QuestionCard number={23} title="Normalmente você dorme de boca fechada?">
        <ToggleButtonGroup label="" value={formData.q23.value} onSelect={val => handleValueChange('q23', 'value', val)} />
      </QuestionCard>

      <QuestionCard number={24} title="Você está satisfeito com a estética do seu sorriso?">
        <ToggleButtonGroup label="" value={formData.q24.value} onSelect={val => handleValueChange('q24', 'value', val)} />
        {formData.q24.value === 'não' && <View style={styles.conditionalInput}><StyledInput label="O que gostaria de mudar?" iconName="info" value={formData.q24.oQueMudar} onChangeText={text => handleValueChange('q24', 'oQueMudar', text)} /></View>}
      </QuestionCard>

      <QuestionCard number={25} title="Você tem disponibilidade de tempo para o tratamento?">
        <View style={styles.checkboxContainer}>
          <Checkbox label="Sim" checked={formData.q25.nivel === 'Sim'} onPress={() => handleRadioCheckboxChange('q25', 'nivel', 'Sim')} />
          <Checkbox label="Mais ou menos" checked={formData.q25.nivel === 'Mais ou menos'} onPress={() => handleRadioCheckboxChange('q25', 'nivel', 'Mais ou menos')} />
          <Checkbox label="Pouco tempo" checked={formData.q25.nivel === 'Pouco tempo'} onPress={() => handleRadioCheckboxChange('q25', 'nivel', 'Pouco tempo')} />
        </View>
      </QuestionCard>

      <QuestionCard number={26} title="Tem algum outro problema não mencionado que você gostaria de relatar?">
        <ToggleButtonGroup label="" value={formData.q26.value} onSelect={val => handleValueChange('q26', 'value', val)} />
        {formData.q26.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.q26.qual} onChangeText={text => handleValueChange('q26', 'qual', text)} /></View>}
      </QuestionCard>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exames Solicitados</Text>
        {formData.examesSolicitados.map((exame: any, index: number) => (
          <View key={exame.id} style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <StyledInput
                label={index === 0 ? '' : ''} 
                iconName="file-text"
                placeholder="Digite o exame solicitado"
                value={exame.value}
                onChangeText={(text) => handleExameChange(text, exame.id)}
              />
            </View>
            {formData.examesSolicitados.length > 1 && (
              <TouchableOpacity onPress={() => removeExameInput(exame.id)} style={styles.removeButton}>
                <Feather name="x-circle" size={24} color={COLORS.red} />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity onPress={addExameInput} style={styles.addButton}>
          <Feather name="plus" size={20} color={COLORS.secondary} />
          <Text style={styles.addButtonText}>Adicionar Exame</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observações</Text>
        <StyledInput label="" iconName="file-text" multiline numberOfLines={5} value={formData.observacoes} onChangeText={text => setFormData({...formData, observacoes: text})} />
      </View>
      <QuestionCard title="Avaliação de Risco">
        <View style={styles.checkboxContainer}>
          <Checkbox label="Baixo" checked={formData.avaliacaoRisco.nivel === 'Baixo'} onPress={() => handleRadioCheckboxChange('avaliacaoRisco', 'nivel', 'Baixo')} />
          <Checkbox label="Médio" checked={formData.avaliacaoRisco.nivel === 'Médio'} onPress={() => handleRadioCheckboxChange('avaliacaoRisco', 'nivel', 'Médio')} />
          <Checkbox label="Alto" checked={formData.avaliacaoRisco.nivel === 'Alto'} onPress={() => handleRadioCheckboxChange('avaliacaoRisco', 'nivel', 'Alto')} />
        </View>
      </QuestionCard>
    </View>
  );
}