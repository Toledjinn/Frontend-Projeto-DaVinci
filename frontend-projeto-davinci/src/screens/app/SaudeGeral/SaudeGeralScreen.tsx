import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Alert, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import { styles } from './SaudeGeralScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

import QuestionCard from '@/components/features/QuestionCard';
import StyledInput from '@/components/common/StyledInput';
import ToggleButtonGroup from '@/components/common/ToggleButtonGroup';
import Checkbox from '@/components/common/Checkbox';

import { useUsers } from '@/hooks/useUsers';
import { UserWithPhoto } from '@/data/usersStore';

import { useDiagnostics } from '@/hooks/useDiagnostics';
import { GENERAL_HEALTH_INITIAL, type GeneralHealthForm } from '@/data/diagnosticsStore';

const disableProps = (isEditing: boolean) => ({
  editable: isEditing,
  disabled: !isEditing,
});

const deepClone = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

const withDefaults = <T extends object>(defaults: T, value?: Partial<T>): T => {
  const base: any = deepClone(defaults);
  if (!value) return base;
  const v: any = value;
  for (const k of Object.keys(v)) {
    const incoming = v[k];
    if (incoming && typeof incoming === 'object' && !Array.isArray(incoming)) {
      base[k] = { ...(base[k] ?? {}), ...incoming };
    } else if (incoming !== undefined) {
      base[k] = incoming;
    }
  }
  return base;
};

export default function SaudeGeralScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.22;

  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { list } = useUsers();
  const patient = useMemo<UserWithPhoto | undefined>(
    () => list.find((u) => String(u.id) === String(patientId)),
    [list, patientId]
  );

  const { getOrCreateGeneralHealth, saveGeneralHealth } = useDiagnostics();
  const [formData, setFormData] = useState<GeneralHealthForm>(GENERAL_HEALTH_INITIAL);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (!patient) return;
    const saved = getOrCreateGeneralHealth(String(patient.id));
    const merged = withDefaults(GENERAL_HEALTH_INITIAL, saved ?? undefined);
    const isNew = !saved?.createdAt;
    setFormData(merged);
    setIsEditing(isNew);
  }, [patient, getOrCreateGeneralHealth]);

  useFocusEffect(
    React.useCallback(() => {
      if (!patient) return;
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: false,
        userId: String(patient.id),
        userName: `Saúde Geral de ${formatUserName(patient.name)}`,
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
    saveGeneralHealth(String(patient.id), {
      ...formData,
      updatedAt: new Date().toISOString(),
      createdAt: formData.createdAt || new Date().toISOString(),
    });
    setIsEditing(false);
    Alert.alert('Sucesso', 'Ficha de Saúde Geral salva.');
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
            <SaudeGeralFormInline
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

type Props = {
  formData: GeneralHealthForm;
  setFormData: React.Dispatch<React.SetStateAction<GeneralHealthForm>>;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
};

function SaudeGeralFormInline({ formData, setFormData, isEditing, setIsEditing }: Props) {
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (
    section: keyof GeneralHealthForm,
    field: string,
    value: any
  ) => {
    setFormData((prev: any) => {
      const sectionPrev = (prev as any)[section] ?? {};
      return { ...prev, [section]: { ...sectionPrev, [field]: value } };
    });
  };

  const handleToggleChange = (
    section: keyof GeneralHealthForm,
    field: string,
    value: 'sim' | 'não' | null
  ) => {
    setFormData((prev: any) => {
      const sectionPrev = (prev as any)[section] ?? {};
      return { ...prev, [section]: { ...sectionPrev, [field]: value } };
    });
  };

  const handleCheckboxChange = (section: keyof GeneralHealthForm, value: string) => {
    setFormData((prev: any) => {
      const sectionPrev = (prev as any)[section] ?? {};
      const current: string[] = sectionPrev.selected ?? [];
      const next = current.includes(value) ? current.filter((i) => i !== value) : [...current, value];
      return { ...prev, [section]: { ...sectionPrev, selected: next } };
    });
  };

  const handleNeoplasiaTypeChange = (value: string) => {
    setFormData((prev: any) => {
      const neoPrev = (prev as any).neoplasia ?? {};
      const current: string[] = neoPrev.tipo ?? [];
      const next = current.includes(value) ? current.filter((i) => i !== value) : [...current, value];
      return { ...prev, neoplasia: { ...neoPrev, tipo: next } };
    });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Anamnese</Text>

        <QuestionCard number={1} title="História Médica" isEditing={isEditing} onEdit={toggleEdit}>
          <StyledInput
            label=""
            iconName="file-text"
            placeholder="Descrição da história médica do paciente"
            multiline
            numberOfLines={4}
            value={formData.historiaMedica ?? ''}
            onChangeText={(t) => setFormData((p: any) => ({ ...p, historiaMedica: t }))}
            {...disableProps(isEditing)}
          />
        </QuestionCard>

        <QuestionCard number={2} title="Está em tratamento médico atualmente?" isEditing={isEditing} onEdit={toggleEdit}>
          <ToggleButtonGroup
            label=""
            value={formData.tratamentoMedico?.value ?? null}
            onSelect={(val) => handleToggleChange('tratamentoMedico', 'value', val)}
            disabled={!isEditing}
          />
          {formData.tratamentoMedico?.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label="Finalidade:"
                iconName="info"
                value={formData.tratamentoMedico?.finalidade ?? ''}
                onChangeText={(t) => handleInputChange('tratamentoMedico', 'finalidade', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={3} title="Faz uso de algum medicamento?" isEditing={isEditing} onEdit={toggleEdit}>
          <ToggleButtonGroup
            label=""
            value={formData.usoMedicamento?.value ?? null}
            onSelect={(val) => handleToggleChange('usoMedicamento', 'value', val)}
            disabled={!isEditing}
          />
          {formData.usoMedicamento?.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label="Finalidade:"
                iconName="info"
                value={formData.usoMedicamento?.finalidade ?? ''}
                onChangeText={(t) => handleInputChange('usoMedicamento', 'finalidade', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inventário de Saúde</Text>

        <QuestionCard number={4} title="Sistema Cardiovascular" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Hipertensão', 'Febre Reumática', 'Angina', 'Endocardite Bacteriana', 'Infarto', 'Prótese Valvular'].map(
              (opt) => (
                <Checkbox
                  key={opt}
                  label={opt}
                  checked={(formData.cardiovascular?.selected ?? []).includes(opt)}
                  onPress={() => handleCheckboxChange('cardiovascular', opt)}
                  disabled={!isEditing}
                />
              )
            )}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.cardiovascular?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('cardiovascular', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.cardiovascular?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.cardiovascular?.outros ?? ''}
                onChangeText={(t) => handleInputChange('cardiovascular', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={5} title="Sistema Respiratório" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Asma', 'Efisema', 'Bronquite'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.respiratorio?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('respiratorio', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.respiratorio?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('respiratorio', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.respiratorio?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.respiratorio?.outros ?? ''}
                onChangeText={(t) => handleInputChange('respiratorio', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={6} title="Sistema Gastrointestinal" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Úlcera', 'Gastrite', 'Refluxo', 'Colite', 'Cirrose'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.gastrointestinal?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('gastrointestinal', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.gastrointestinal?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('gastrointestinal', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.gastrointestinal?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.gastrointestinal?.outros ?? ''}
                onChangeText={(t) => handleInputChange('gastrointestinal', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={7} title="Sistema Neuromuscular" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Epilepsia', 'Convulsão', 'Desmaio', 'Mialgia'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.neuromuscular?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('neuromuscular', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.neuromuscular?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('neuromuscular', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.neuromuscular?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.neuromuscular?.outros ?? ''}
                onChangeText={(t) => handleInputChange('neuromuscular', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={8} title="Sistema Ósteo-Articular" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Artrites', 'Osteoporose'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.osteoArticular?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('osteoArticular', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.osteoArticular?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('osteoArticular', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.osteoArticular?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.osteoArticular?.outros ?? ''}
                onChangeText={(t) => handleInputChange('osteoArticular', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={9} title="Sistema Gênito-Urinário" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Cistites', 'Cálculo Renal'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.genitoUrinario?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('genitoUrinario', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.genitoUrinario?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('genitoUrinario', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.genitoUrinario?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.genitoUrinario?.outros ?? ''}
                onChangeText={(t) => handleInputChange('genitoUrinario', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={10} title="Sistema Endócrino" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Diabetes', 'Hiper, Hipo ou Paratireoidismo'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.endocrino?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('endocrino', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>

          <View style={styles.conditionalInput}>
            <ToggleButtonGroup
              label="Fome Excessiva?"
              value={formData.endocrino?.fome ?? null}
              onSelect={(val) => handleToggleChange('endocrino', 'fome', val)}
              disabled={!isEditing}
            />
            <ToggleButtonGroup
              label="Sede, Boca Seca?"
              value={formData.endocrino?.sede ?? null}
              onSelect={(val) => handleToggleChange('endocrino', 'sede', val)}
              disabled={!isEditing}
            />
            <ToggleButtonGroup
              label="Fadiga?"
              value={formData.endocrino?.fadiga ?? null}
              onSelect={(val) => handleToggleChange('endocrino', 'fadiga', val)}
              disabled={!isEditing}
            />
            <ToggleButtonGroup
              label="Cicatrização Deficiente?"
              value={formData.endocrino?.cicatrizacao ?? null}
              onSelect={(val) => handleToggleChange('endocrino', 'cicatrizacao', val)}
              disabled={!isEditing}
            />
            <ToggleButtonGroup
              label="Visão Alterada?"
              value={formData.endocrino?.visao ?? null}
              onSelect={(val) => handleToggleChange('endocrino', 'visao', val)}
              disabled={!isEditing}
            />
            <ToggleButtonGroup
              label="Rins Alterados?"
              value={formData.endocrino?.rins ?? null}
              onSelect={(val) => handleToggleChange('endocrino', 'rins', val)}
              disabled={!isEditing}
            />
          </View>
        </QuestionCard>

        <QuestionCard number={11} title="Alterações Hormonais" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {[
              'Boca seca',
              'Contraceptivos',
              'Insônia',
              'Ondas de calor',
              'Ardência',
              'Formigamento',
              'Sudorese',
              'Menopausa',
              'Reposição Hormonal',
              'Osteoporose',
            ].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.alteracoesHormonais?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('alteracoesHormonais', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.alteracoesHormonais?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('alteracoesHormonais', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.alteracoesHormonais?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.alteracoesHormonais?.outros ?? ''}
                onChangeText={(t) => handleInputChange('alteracoesHormonais', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={12} title="Doenças Infectocontagiosas" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['DST', 'Tuberculose', 'AIDS', 'Hepatite'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.infectocontagiosas?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('infectocontagiosas', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.infectocontagiosas?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('infectocontagiosas', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.infectocontagiosas?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.infectocontagiosas?.outros ?? ''}
                onChangeText={(t) => handleInputChange('infectocontagiosas', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={13} title="Alergias" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Medicamentos', 'Alimentos', 'Substâncias Químicas'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.alergias?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('alergias', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.alergias?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('alergias', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.alergias?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.alergias?.outros ?? ''}
                onChangeText={(t) => handleInputChange('alergias', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={14} title="Já teve ou tem Neoplasia?" isEditing={isEditing} onEdit={toggleEdit}>
          <ToggleButtonGroup
            label=""
            value={formData.neoplasia?.value ?? null}
            onSelect={(val) => handleToggleChange('neoplasia', 'value', val)}
            disabled={!isEditing}
          />
          {formData.neoplasia?.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <View style={styles.checkboxContainer}>
                {['Benigna', 'Maligna'].map((opt) => (
                  <Checkbox
                    key={opt}
                    label={opt}
                    checked={(formData.neoplasia?.tipo ?? []).includes(opt)}
                    onPress={() => handleNeoplasiaTypeChange(opt)}
                    disabled={!isEditing}
                  />
                ))}
              </View>
              <StyledInput
                label="Qual?"
                iconName="info"
                value={formData.neoplasia?.qual ?? ''}
                onChangeText={(t) => handleInputChange('neoplasia', 'qual', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={15} title="Distúrbios Sanguíneos" isEditing={isEditing} onEdit={toggleEdit}>
          <View style={styles.checkboxContainer}>
            {['Anemia', 'Hemorragia', 'Trombose', 'Púrpura'].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={(formData.disturbiosSanguineos?.selected ?? []).includes(opt)}
                onPress={() => handleCheckboxChange('disturbiosSanguineos', opt)}
                disabled={!isEditing}
              />
            ))}
          </View>
          <Checkbox
            label="Outros:"
            checked={(formData.disturbiosSanguineos?.selected ?? []).includes('Outros')}
            onPress={() => handleCheckboxChange('disturbiosSanguineos', 'Outros')}
            disabled={!isEditing}
          />
          {(formData.disturbiosSanguineos?.selected ?? []).includes('Outros') && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label=""
                iconName="plus"
                value={formData.disturbiosSanguineos?.outros ?? ''}
                onChangeText={(t) => handleInputChange('disturbiosSanguineos', 'outros', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={16} title="Síndromes e Transplantes" isEditing={isEditing} onEdit={toggleEdit}>
          <ToggleButtonGroup
            label=""
            value={formData.sindromesTransplantes?.value ?? null}
            onSelect={(val) => handleToggleChange('sindromesTransplantes', 'value', val)}
            disabled={!isEditing}
          />
          {formData.sindromesTransplantes?.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label="Qual?"
                iconName="info"
                value={formData.sindromesTransplantes?.qual ?? ''}
                onChangeText={(t) => handleInputChange('sindromesTransplantes', 'qual', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={17} title="Cirurgia" isEditing={isEditing} onEdit={toggleEdit}>
          <ToggleButtonGroup
            label="Já fez alguma cirurgia na boca?"
            value={formData.cirurgia?.value ?? null}
            onSelect={(val) => handleToggleChange('cirurgia', 'value', val)}
            disabled={!isEditing}
          />
          <ToggleButtonGroup
            label="Teve hemorragia ou sangramento exagerado?"
            value={formData.cirurgia?.hemorragia ?? null}
            onSelect={(val) => handleToggleChange('cirurgia', 'hemorragia', val)}
            disabled={!isEditing}
          />
          <View style={styles.conditionalInput}>
            <StyledInput
              label="Como foi a cicatrização?"
              iconName="info"
              multiline
              value={formData.cirurgia?.cicatrizacao ?? ''}
              onChangeText={(t) => handleInputChange('cirurgia', 'cicatrizacao', t)}
              {...disableProps(isEditing)}
            />
          </View>
        </QuestionCard>

        <QuestionCard
          number={18}
          title="Tem alergia a anestésicos odontológicos?"
          isEditing={isEditing}
          onEdit={toggleEdit}
        >
          <ToggleButtonGroup
            label=""
            value={formData.alergiaAnestesico?.value ?? null}
            onSelect={(val) => handleToggleChange('alergiaAnestesico', 'value', val)}
            disabled={!isEditing}
          />
          {formData.alergiaAnestesico?.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label="Qual?"
                iconName="info"
                value={formData.alergiaAnestesico?.qual ?? ''}
                onChangeText={(t) => handleInputChange('alergiaAnestesico', 'qual', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard number={19} title="Tem sinusite?" isEditing={isEditing} onEdit={toggleEdit}>
          <ToggleButtonGroup
            label=""
            value={formData.sinusite?.value ?? null}
            onSelect={(val) => handleToggleChange('sinusite', 'value', val)}
            disabled={!isEditing}
          />
          {formData.sinusite?.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label="Qual?"
                iconName="info"
                value={formData.sinusite?.qual ?? ''}
                onChangeText={(t) => handleInputChange('sinusite', 'qual', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>

        <QuestionCard
          number={20}
          title="Sente dores de cabeça com frequência?"
          isEditing={isEditing}
          onEdit={toggleEdit}
        >
          <ToggleButtonGroup
            label=""
            value={formData.dorDeCabeca?.value ?? null}
            onSelect={(val) => handleToggleChange('dorDeCabeca', 'value', val)}
            disabled={!isEditing}
          />
        </QuestionCard>

        <QuestionCard
          number={21}
          title="Tem algum outro problema de saúde não relacionado neste questionário?"
          isEditing={isEditing}
          onEdit={toggleEdit}
        >
          <ToggleButtonGroup
            label=""
            value={formData.outroProblema?.value ?? null}
            onSelect={(val) => handleToggleChange('outroProblema', 'value', val)}
            disabled={!isEditing}
          />
          {formData.outroProblema?.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput
                label="Qual?"
                iconName="info"
                value={formData.outroProblema?.qual ?? ''}
                onChangeText={(t) => handleInputChange('outroProblema', 'qual', t)}
                {...disableProps(isEditing)}
              />
            </View>
          )}
        </QuestionCard>
      </View>
    </View>
  );
}
