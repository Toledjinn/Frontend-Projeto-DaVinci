import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, Alert, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import { styles } from './SaudeBucalScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

import QuestionCard from '@/components/features/QuestionCard';
import StyledInput from '@/components/common/StyledInput';
import ToggleButtonGroup from '@/components/common/ToggleButtonGroup';
import Checkbox from '@/components/common/Checkbox';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import StyledPicker from '@/components/common/StyledPicker';
import ScreenFooter from '@/components/common/ScreenFooter';

import { useDiagnostics } from '@/hooks/useDiagnostics';
import { ORAL_HEALTH_INITIAL, type OralHealthForm } from '@/data/diagnosticsStore';
import { useUsers } from '@/hooks/useUsers';
import { UserWithPhoto } from '@/data/usersStore';

const disableProps = (isEditing: boolean) => ({
  editable: isEditing,
  disabled: !isEditing,
});

export default function SaudeBucalScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.30;

  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { list } = useUsers();
  const patient = useMemo<UserWithPhoto | undefined>(
    () => list.find((u) => String(u.id) === String(patientId)),
    [list, patientId]
  );

  const { getOrCreateOralHealth, saveOralHealth } = useDiagnostics();
  const [formData, setFormData] = useState<OralHealthForm>(ORAL_HEALTH_INITIAL);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (!patient) return;
    const saved = getOrCreateOralHealth(String(patient.id));
    const isNew = saved === ORAL_HEALTH_INITIAL || !saved?.createdAt;
    setFormData(saved);
    setIsEditing(isNew);
  }, [patient, getOrCreateOralHealth]);

  useFocusEffect(
    React.useCallback(() => {
      if (!patient) return;

      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: false,
        userId: String(patient.id),
        userName: `Saúde Bucal de ${formatUserName(patient.name)}`,
        UserImageSvg: patient.image || UserPlaceholder,
        userPhotoUri: patient.photoUri ?? null,
        riskLevel: patient.riskLevel,
      });
    }, [patient, setHeaderConfig])
  );

  if (!patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = () => {
    if (!patient) {
      Alert.alert('Paciente não encontrado', 'Volte e selecione o paciente.');
      return;
    }
    saveOralHealth(String(patient.id), {
      ...formData,
      updatedAt: new Date().toISOString(),
      createdAt: formData.createdAt || new Date().toISOString(),
    });
    setIsEditing(false);
    Alert.alert('Sucesso', 'Ficha de Saúde Bucal salva.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <SaudeBucalFormInline
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </ScrollView>
        </View>

        <ScreenFooter
          buttons={[
            isEditing
              ? { title: 'Salvar Ficha', onPress: handleSave, variant: 'secondary' }
              : { title: 'Editar', onPress: () => setIsEditing(true), variant: 'secondary' },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

type SaudeBucalFormInlineProps = {
  formData: OralHealthForm;
  setFormData: React.Dispatch<React.SetStateAction<OralHealthForm>>;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
};

function SaudeBucalFormInline({
  formData,
  setFormData,
  isEditing,
  setIsEditing,
}: SaudeBucalFormInlineProps) {
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleValueChange = (section: keyof OralHealthForm, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [field]: value },
    }));
  };

  const handleCheckboxChange = (section: keyof OralHealthForm, value: string) => {
    setFormData((prev: any) => {
      const current: string[] = (prev as any)[section]?.selected || [];
      const next = current.includes(value) ? current.filter((i) => i !== value) : [...current, value];
      return { ...prev, [section]: { ...(prev as any)[section], selected: next } };
    });
  };

  const handleRadioCheckboxChange = (section: keyof OralHealthForm, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [field]: value },
    }));
  };

  return (
    <View style={styles.formContainer}>
      <QuestionCard number={1} title="A quanto tempo foi ao dentista?" isEditing={isEditing} onEdit={toggleEdit}>
        <StyledInput
          label="Há quanto tempo?"
          iconName="calendar"
          value={formData.q1.haQuantoTempo}
          onChangeText={(t) => handleValueChange('q1', 'haQuantoTempo', t)}
          {...disableProps(isEditing)}
        />
        <View style={styles.conditionalInput}>
          <StyledInput
            label="Motivo"
            iconName="info"
            value={formData.q1.motivo}
            onChangeText={(t) => handleValueChange('q1', 'motivo', t)}
            {...disableProps(isEditing)}
          />
        </View>
      </QuestionCard>

      <QuestionCard number={2} title="Último exame radiográfico completo?" isEditing={isEditing} onEdit={toggleEdit}>
        <StyledDatePicker
          label=""
          value={formData.q2.data ? new Date(formData.q2.data) : null}
          onChange={(d) => handleValueChange('q2', 'data', d ? d.toISOString() : null)}
          {...disableProps(isEditing)}
        />
        <View style={styles.conditionalInput}>
          <StyledInput
            label="Qual?"
            iconName="info"
            value={formData.q2.qual}
            onChangeText={(t) => handleValueChange('q2', 'qual', t)}
            {...disableProps(isEditing)}
          />
        </View>
      </QuestionCard>

      <QuestionCard number={3} title="Quantas vezes você escova os dentes por dia?" isEditing={isEditing} onEdit={toggleEdit}>
        <StyledPicker
          label=""
          iconName="hash"
          items={[
            { label: '1x', value: '1' },
            { label: '2x', value: '2' },
            { label: '3x ou mais', value: '3+' },
          ]}
          selectedValue={formData.q3.quantidade}
          onValueChange={(v) => handleValueChange('q3', 'quantidade', v)}
          {...disableProps(isEditing)}
        />
        <View style={styles.conditionalInput}>
          <StyledInput
            label="Por quanto tempo?"
            iconName="clock"
            value={formData.q3.porQuantoTempo}
            onChangeText={(t) => handleValueChange('q3', 'porQuantoTempo', t)}
            {...disableProps(isEditing)}
          />
        </View>
      </QuestionCard>

      <QuestionCard number={4} title="Preferência de escova" isEditing={isEditing} onEdit={toggleEdit}>
        <View style={styles.checkboxContainer}>
          {['Dura', 'Média', 'Extra macia', 'Macia'].map((opt) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={formData.q4.selected.includes(opt)}
              onPress={() => handleCheckboxChange('q4', opt)}
              disabled={!isEditing}
            />
          ))}
        </View>
      </QuestionCard>

      <QuestionCard number={5} title="Sensibilidade em algum dente provocado por:" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q5.value}
          onSelect={(v) => handleValueChange('q5', 'value', v)}
          disabled={!isEditing}
        />
        {formData.q5.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <View style={styles.checkboxContainer}>
              {['Gelado', 'Quente', 'Mastigar', 'Escovar'].map((opt) => (
                <Checkbox
                  key={opt}
                  label={opt}
                  checked={formData.q5.selected.includes(opt)}
                  onPress={() => handleCheckboxChange('q5', opt)}
                  disabled={!isEditing}
                />
              ))}
            </View>
            <Checkbox
              label="Outros:"
              checked={formData.q5.selected.includes('Outros')}
              onPress={() => handleCheckboxChange('q5', 'Outros')}
              disabled={!isEditing}
            />
            {formData.q5.selected.includes('Outros') && (
              <View style={styles.conditionalInput}>
                <StyledInput
                  label=""
                  iconName="plus"
                  value={formData.q5.outros}
                  onChangeText={(t) => handleValueChange('q5', 'outros', t)}
                  {...disableProps(isEditing)}
                />
              </View>
            )}
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={6} title="Usa fio dental?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q6.value}
          onSelect={(val) => handleValueChange('q6', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q6.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Frequência:"
              iconName="info"
              value={formData.q6.frequencia}
              onChangeText={(text) => handleValueChange('q6', 'frequencia', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={7} title="O fio dental agarra ou desfia?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q7.value}
          onSelect={(val) => handleValueChange('q7', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q7.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Onde?"
              iconName="info"
              value={formData.q7.onde}
              onChangeText={(text) => handleValueChange('q7', 'onde', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={8} title="Usa pasta dental?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q8.value}
          onSelect={(val) => handleValueChange('q8', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q8.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Qual?"
              iconName="info"
              value={formData.q8.qual}
              onChangeText={(text) => handleValueChange('q8', 'qual', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={9} title="Escovar os dentes é:" isEditing={isEditing} onEdit={toggleEdit}>
        <View style={styles.checkboxContainer}>
          {['Fácil', 'Difícil', 'Um pouco difícil'].map((opt) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={formData.q9.value === opt}
              onPress={() => handleRadioCheckboxChange('q9', 'value', opt)}
              disabled={!isEditing}
            />
          ))}
        </View>
        {(formData.q9.value === 'Difícil' || formData.q9.value === 'Um pouco difícil') && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Por quê?"
              iconName="info"
              value={formData.q9.motivo}
              onChangeText={(text) => handleValueChange('q9', 'motivo', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={10} title="Usa palito?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q10.value}
          onSelect={(val) => handleValueChange('q10', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q10.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Frequência:"
              iconName="info"
              value={formData.q10.frequencia}
              onChangeText={(text) => handleValueChange('q10', 'frequencia', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={11} title="Usa bochecho?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q11.value}
          onSelect={(val) => handleValueChange('q11', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q11.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Qual?"
              iconName="info"
              value={formData.q11.qual}
              onChangeText={(text) => handleValueChange('q11', 'qual', text)}
              {...disableProps(isEditing)}
            />
            <View style={styles.conditionalInput}>
              <StyledInput
                label="Frequência:"
                iconName="clock"
                value={formData.q11.frequencia}
                onChangeText={(text) => handleValueChange('q11', 'frequencia', text)}
                {...disableProps(isEditing)}
              />
            </View>
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={12} title="Seus dentes possuem restaurações de resina, coroas, prótese fixa ou outros?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q12.value}
          onSelect={(val) => handleValueChange('q12', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q12.value === 'sim' && (
          <View style={[styles.checkboxContainer, styles.conditionalInput]}>
            {['Pouco', 'Moderado', 'Muito'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={formData.q12.quantidade === opt}
                onPress={() => handleRadioCheckboxChange('q12', 'quantidade', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={13} title="Quantos dentes naturais já perdeu?" isEditing={isEditing} onEdit={toggleEdit}>
        <StyledPicker
          label=""
          iconName="hash"
          items={[
            { label: 'Nenhum', value: '0' },
            { label: '1 a 3', value: '1-3' },
            { label: '4 a 7', value: '4-7' },
            { label: 'Mais de 8', value: '8+' },
          ]}
          selectedValue={formData.q13.quantidade}
          onValueChange={(val) => handleValueChange('q13', 'quantidade', val)}
          {...disableProps(isEditing)}
        />
      </QuestionCard>

      <QuestionCard number={14} title="Tem implante?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q14.value}
          onSelect={(val) => handleValueChange('q14', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q14.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledPicker
              label="Quantos?"
              iconName="hash"
              items={[
                { label: '1 a 3', value: '1-3' },
                { label: '4 a 7', value: '4-7' },
                { label: 'Mais de 8', value: '8+' },
              ]}
              selectedValue={formData.q14.quantidade}
              onValueChange={(val) => handleValueChange('q14', 'quantidade', val)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={15} title="Mastiga com os dois lados da boca?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q15.value}
          onSelect={(val) => handleValueChange('q15', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q15.value === 'não' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Se não, qual o motivo?"
              iconName="info"
              value={formData.q15.motivo}
              onChangeText={(text) => handleValueChange('q15', 'motivo', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={16} title="Range ou aperta os dentes?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q16.value}
          onSelect={(val) => handleValueChange('q16', 'value', val)}
          disabled={!isEditing}
        />
      </QuestionCard>

      <QuestionCard number={17} title="Já fez alguma cirurgia na boca?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q17.value}
          onSelect={(val) => handleValueChange('q17', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q17.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Qual?"
              iconName="info"
              value={formData.q17.qual}
              onChangeText={(text) => handleValueChange('q17', 'qual', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={18} title="Sente dor ou estalo na ATM?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q18.value}
          onSelect={(val) => handleValueChange('q18', 'value', val)}
          disabled={!isEditing}
        />
      </QuestionCard>

      <QuestionCard number={19} title="Tem dente(s) mole(s)?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q19.value}
          onSelect={(val) => handleValueChange('q19', 'value', val)}
          disabled={!isEditing}
        />
      </QuestionCard>

      <QuestionCard number={20} title="Os alimentos ficam presos entre os dentes durante a alimentação?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q20.value}
          onSelect={(val) => handleValueChange('q20', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q20.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Onde?"
              iconName="info"
              value={formData.q20.onde}
              onChangeText={(text) => handleValueChange('q20', 'onde', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={21} title="Açúcar na alimentação?" isEditing={isEditing} onEdit={toggleEdit}>
        <View style={styles.checkboxContainer}>
          {['Pouco', 'Médio', 'Muito'].map((opt) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={formData.q21.nivel === opt}
              onPress={() => handleRadioCheckboxChange('q21', 'nivel', opt)}
              disabled={!isEditing}
            />
          ))}
        </View>
      </QuestionCard>

      <QuestionCard number={22} title="Possui hábito ou vício de alguma coisa como roer unhas, fumar, etc?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q22.value}
          onSelect={(val) => handleValueChange('q22', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q22.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Qual?"
              iconName="info"
              value={formData.q22.qual}
              onChangeText={(text) => handleValueChange('q22', 'qual', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={23} title="Normalmente você dorme de boca fechada?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q23.value}
          onSelect={(val) => handleValueChange('q23', 'value', val)}
          disabled={!isEditing}
        />
      </QuestionCard>

      <QuestionCard number={24} title="Você está satisfeito com a estética do seu sorriso?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q24.value}
          onSelect={(val) => handleValueChange('q24', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q24.value === 'não' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="O que gostaria de mudar?"
              iconName="info"
              value={formData.q24.oQueMudar}
              onChangeText={(text) => handleValueChange('q24', 'oQueMudar', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>

      <QuestionCard number={25} title="Você tem disponibilidade de tempo para o tratamento?" isEditing={isEditing} onEdit={toggleEdit}>
        <View style={styles.checkboxContainer}>
          {['Sim', 'Mais ou menos', 'Pouco tempo'].map((opt) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={formData.q25.nivel === opt}
              onPress={() => handleRadioCheckboxChange('q25', 'nivel', opt)}
              disabled={!isEditing}
            />
          ))}
        </View>
      </QuestionCard>

      <QuestionCard number={26} title="Tem algum outro problema não mencionado que você gostaria de relatar?" isEditing={isEditing} onEdit={toggleEdit}>
        <ToggleButtonGroup
          label=""
          value={formData.q26.value}
          onSelect={(val) => handleValueChange('q26', 'value', val)}
          disabled={!isEditing}
        />
        {formData.q26.value === 'sim' && (
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Qual?"
              iconName="info"
              value={formData.q26.qual}
              onChangeText={(text) => handleValueChange('q26', 'qual', text)}
              {...disableProps(isEditing)}
            />
          </View>
        )}
      </QuestionCard>
    </View>
  );
}
