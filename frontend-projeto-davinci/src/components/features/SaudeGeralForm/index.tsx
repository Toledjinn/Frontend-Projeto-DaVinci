import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import QuestionCard from '../QuestionCard';
import StyledInput from '@/components/common/StyledInput';
import ToggleButtonGroup from '@/components/common/ToggleButtonGroup';
import Checkbox from '@/components/common/Checkbox';

const INITIAL_STATE = {
  historiaMedica: '',
  tratamentoMedico: { value: null, finalidade: '' },
  usoMedicamento: { value: null, finalidade: '' },
  cardiovascular: { selected: [], outros: '' },
  respiratorio: { selected: [], outros: '' },
  gastrointestinal: { selected: [], outros: '' },
  neuromuscular: { selected: [], outros: '' },
  osteoArticular: { selected: [], outros: '' },
  genitoUrinario: { selected: [], outros: '' },
  endocrino: {
    selected: [],
    fome: null,
    sede: null,
    fadiga: null,
    cicatrizacao: null,
    visao: null,
    rins: null,
  },
  alteracoesHormonais: { selected: [], outros: '' },
  infectocontagiosas: { selected: [], outros: '' },
  alergias: { selected: [], outros: '' },
  neoplasia: { value: null, tipo: [], qual: '' },
  disturbiosSanguineos: { selected: [], outros: '' },
  sindromesTransplantes: { value: null, qual: '' },
  cirurgia: { value: null, hemorragia: null, cicatrizacao: '' },
  alergiaAnestesico: { value: null, qual: '' },
  sinusite: { value: null, qual: '' },
  dorDeCabeca: { value: null },
  outroProblema: { value: null, qual: '' },
};

export default function SaudeGeralForm() {
  const [formData, setFormData] = useState<any>(INITIAL_STATE);

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleToggleChange = (section: string, field: string, value: 'sim' | 'não' | null) => {
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
      return {
        ...prevData,
        [section]: { ...prevData[section], selected: newSelection },
      };
    });
  };

  const handleNeoplasiaTypeChange = (value: string) => {
     setFormData((prevData: any) => {
      const currentSelection = prevData.neoplasia?.tipo || [];
      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter((item: string) => item !== value)
        : [...currentSelection, value];
      return {
        ...prevData,
        neoplasia: { ...prevData.neoplasia, tipo: newSelection },
      };
    });
  }


  return (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Anamnese</Text>
        <QuestionCard number={1} title="História Médica">
          <StyledInput
            label=""
            iconName="file-text"
            placeholder="Descrição da história médica do paciente"
            multiline
            numberOfLines={4}
            value={formData.historiaMedica}
            onChangeText={(text) => setFormData({...formData, historiaMedica: text})}
          />
        </QuestionCard>
        <QuestionCard number={2} title="Está em tratamento médico atualmente?">
          <ToggleButtonGroup label="" value={formData.tratamentoMedico.value} onSelect={(val) => handleToggleChange('tratamentoMedico', 'value', val)} />
          {formData.tratamentoMedico.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput label="Finalidade:" iconName="info" value={formData.tratamentoMedico.finalidade} onChangeText={(text) => handleInputChange('tratamentoMedico', 'finalidade', text)} />
            </View>
          )}
        </QuestionCard>
        <QuestionCard number={3} title="Faz uso de algum medicamento?">
          <ToggleButtonGroup label="" value={formData.usoMedicamento.value} onSelect={(val) => handleToggleChange('usoMedicamento', 'value', val)} />
          {formData.usoMedicamento.value === 'sim' && (
            <View style={styles.conditionalInput}>
              <StyledInput label="Finalidade:" iconName="info" value={formData.usoMedicamento.finalidade} onChangeText={(text) => handleInputChange('usoMedicamento', 'finalidade', text)} />
            </View>
          )}
        </QuestionCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inventário de Saúde</Text>
        
        <QuestionCard number={4} title="Sistema Cardiovascular">
          <View style={styles.checkboxContainer}>
            <Checkbox label="Hipertensão" checked={formData.cardiovascular.selected.includes('Hipertensão')} onPress={() => handleCheckboxChange('cardiovascular', 'Hipertensão')} />
            <Checkbox label="Febre Reumática" checked={formData.cardiovascular.selected.includes('Febre Reumática')} onPress={() => handleCheckboxChange('cardiovascular', 'Febre Reumática')} />
            <Checkbox label="Angina" checked={formData.cardiovascular.selected.includes('Angina')} onPress={() => handleCheckboxChange('cardiovascular', 'Angina')} />
            <Checkbox label="Endocardite Bacteriana" checked={formData.cardiovascular.selected.includes('Endocardite Bacteriana')} onPress={() => handleCheckboxChange('cardiovascular', 'Endocardite Bacteriana')} />
            <Checkbox label="Infarto" checked={formData.cardiovascular.selected.includes('Infarto')} onPress={() => handleCheckboxChange('cardiovascular', 'Infarto')} />
            <Checkbox label="Prótese Valvular" checked={formData.cardiovascular.selected.includes('Prótese Valvular')} onPress={() => handleCheckboxChange('cardiovascular', 'Prótese Valvular')} />
          </View>
          <Checkbox label="Outros:" checked={formData.cardiovascular.selected.includes('Outros')} onPress={() => handleCheckboxChange('cardiovascular', 'Outros')} />
          {formData.cardiovascular.selected.includes('Outros') &&
            <View style={styles.conditionalInput}>
              <StyledInput label="" iconName="plus" value={formData.cardiovascular.outros} onChangeText={(text) => handleInputChange('cardiovascular', 'outros', text)} />
            </View>
          }
        </QuestionCard>
        
        
        <QuestionCard number={5} title="Sistema Respiratório">
          <View style={styles.checkboxContainer}>
            <Checkbox label="Asma" checked={formData.respiratorio.selected.includes('Asma')} onPress={() => handleCheckboxChange('respiratorio', 'Asma')} />
            <Checkbox label="Efisema" checked={formData.respiratorio.selected.includes('Efisema')} onPress={() => handleCheckboxChange('respiratorio', 'Efisema')} />
            <Checkbox label="Bronquite" checked={formData.respiratorio.selected.includes('Bronquite')} onPress={() => handleCheckboxChange('respiratorio', 'Bronquite')} />
          </View>
          <Checkbox label="Outros:" checked={formData.respiratorio.selected.includes('Outros')} onPress={() => handleCheckboxChange('respiratorio', 'Outros')} />
          {formData.respiratorio.selected.includes('Outros') &&
            <View style={styles.conditionalInput}>
              <StyledInput label="" iconName="plus" value={formData.respiratorio.outros} onChangeText={(text) => handleInputChange('respiratorio', 'outros', text)} />
            </View>
          }
        </QuestionCard>
        
        <QuestionCard number={6} title="Sistema Gastrointestinal"><View style={styles.checkboxContainer}><Checkbox label="Úlcera" checked={formData.gastrointestinal.selected.includes('Úlcera')} onPress={() => handleCheckboxChange('gastrointestinal', 'Úlcera')} /><Checkbox label="Gastrite" checked={formData.gastrointestinal.selected.includes('Gastrite')} onPress={() => handleCheckboxChange('gastrointestinal', 'Gastrite')} /><Checkbox label="Refluxo" checked={formData.gastrointestinal.selected.includes('Refluxo')} onPress={() => handleCheckboxChange('gastrointestinal', 'Refluxo')} /><Checkbox label="Colite" checked={formData.gastrointestinal.selected.includes('Colite')} onPress={() => handleCheckboxChange('gastrointestinal', 'Colite')} /><Checkbox label="Cirrose" checked={formData.gastrointestinal.selected.includes('Cirrose')} onPress={() => handleCheckboxChange('gastrointestinal', 'Cirrose')} /></View><Checkbox label="Outros:" checked={formData.gastrointestinal.selected.includes('Outros')} onPress={() => handleCheckboxChange('gastrointestinal', 'Outros')} />{formData.gastrointestinal.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.gastrointestinal.outros} onChangeText={(text) => handleInputChange('gastrointestinal', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={7} title="Sistema Neuromuscular"><View style={styles.checkboxContainer}><Checkbox label="Epilepsia" checked={formData.neuromuscular.selected.includes('Epilepsia')} onPress={() => handleCheckboxChange('neuromuscular', 'Epilepsia')} /><Checkbox label="Convulsão" checked={formData.neuromuscular.selected.includes('Convulsão')} onPress={() => handleCheckboxChange('neuromuscular', 'Convulsão')} /><Checkbox label="Desmaio" checked={formData.neuromuscular.selected.includes('Desmaio')} onPress={() => handleCheckboxChange('neuromuscular', 'Desmaio')} /><Checkbox label="Mialgia" checked={formData.neuromuscular.selected.includes('Mialgia')} onPress={() => handleCheckboxChange('neuromuscular', 'Mialgia')} /></View><Checkbox label="Outros:" checked={formData.neuromuscular.selected.includes('Outros')} onPress={() => handleCheckboxChange('neuromuscular', 'Outros')} />{formData.neuromuscular.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.neuromuscular.outros} onChangeText={(text) => handleInputChange('neuromuscular', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={8} title="Sistema Ósteo-Articular"><View style={styles.checkboxContainer}><Checkbox label="Artrites" checked={formData.osteoArticular.selected.includes('Artrites')} onPress={() => handleCheckboxChange('osteoArticular', 'Artrites')} /><Checkbox label="Osteoporose" checked={formData.osteoArticular.selected.includes('Osteoporose')} onPress={() => handleCheckboxChange('osteoArticular', 'Osteoporose')} /></View><Checkbox label="Outros:" checked={formData.osteoArticular.selected.includes('Outros')} onPress={() => handleCheckboxChange('osteoArticular', 'Outros')} />{formData.osteoArticular.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.osteoArticular.outros} onChangeText={(text) => handleInputChange('osteoArticular', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={9} title="Sistema Gênito-Urinário"><View style={styles.checkboxContainer}><Checkbox label="Cistites" checked={formData.genitoUrinario.selected.includes('Cistites')} onPress={() => handleCheckboxChange('genitoUrinario', 'Cistites')} /><Checkbox label="Cálculo Renal" checked={formData.genitoUrinario.selected.includes('Cálculo Renal')} onPress={() => handleCheckboxChange('genitoUrinario', 'Cálculo Renal')} /></View><Checkbox label="Outros:" checked={formData.genitoUrinario.selected.includes('Outros')} onPress={() => handleCheckboxChange('genitoUrinario', 'Outros')} />{formData.genitoUrinario.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.genitoUrinario.outros} onChangeText={(text) => handleInputChange('genitoUrinario', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={10} title="Sistema Endócrino"><View style={styles.checkboxContainer}><Checkbox label="Diabetes" checked={formData.endocrino.selected.includes('Diabetes')} onPress={() => handleCheckboxChange('endocrino', 'Diabetes')} /><Checkbox label="Hiper, Hipo ou Paratireoidismo" checked={formData.endocrino.selected.includes('Hiper, Hipo ou Paratireoidismo')} onPress={() => handleCheckboxChange('endocrino', 'Hiper, Hipo ou Paratireoidismo')} /></View><View style={styles.conditionalInput}><ToggleButtonGroup label="Fome Excessiva?" value={formData.endocrino.fome} onSelect={(val) => handleToggleChange('endocrino', 'fome', val)} /><ToggleButtonGroup label="Sede, Boca Seca?" value={formData.endocrino.sede} onSelect={(val) => handleToggleChange('endocrino', 'sede', val)} /><ToggleButtonGroup label="Fadiga?" value={formData.endocrino.fadiga} onSelect={(val) => handleToggleChange('endocrino', 'fadiga', val)} /><ToggleButtonGroup label="Cicatrização Deficiente?" value={formData.endocrino.cicatrizacao} onSelect={(val) => handleToggleChange('endocrino', 'cicatrizacao', val)} /><ToggleButtonGroup label="Visão Alterada?" value={formData.endocrino.visao} onSelect={(val) => handleToggleChange('endocrino', 'visao', val)} /><ToggleButtonGroup label="Rins Alterados?" value={formData.endocrino.rins} onSelect={(val) => handleToggleChange('endocrino', 'rins', val)} /></View></QuestionCard>
        <QuestionCard number={11} title="Alterações Hormonais"><View style={styles.checkboxContainer}><Checkbox label="Boca seca" checked={formData.alteracoesHormonais.selected.includes('Boca seca')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Boca seca')} /><Checkbox label="Contraceptivos" checked={formData.alteracoesHormonais.selected.includes('Contraceptivos')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Contraceptivos')} /><Checkbox label="Insônia" checked={formData.alteracoesHormonais.selected.includes('Insônia')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Insônia')} /><Checkbox label="Ondas de calor" checked={formData.alteracoesHormonais.selected.includes('Ondas de calor')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Ondas de calor')} /><Checkbox label="Ardência" checked={formData.alteracoesHormonais.selected.includes('Ardência')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Ardência')} /><Checkbox label="Formigamento" checked={formData.alteracoesHormonais.selected.includes('Formigamento')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Formigamento')} /><Checkbox label="Sudorese" checked={formData.alteracoesHormonais.selected.includes('Sudorese')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Sudorese')} /><Checkbox label="Menopausa" checked={formData.alteracoesHormonais.selected.includes('Menopausa')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Menopausa')} /><Checkbox label="Reposição Hormonal" checked={formData.alteracoesHormonais.selected.includes('Reposição Hormonal')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Reposição Hormonal')} /><Checkbox label="Osteoporose" checked={formData.alteracoesHormonais.selected.includes('Osteoporose')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Osteoporose')} /></View><Checkbox label="Outros:" checked={formData.alteracoesHormonais.selected.includes('Outros')} onPress={() => handleCheckboxChange('alteracoesHormonais', 'Outros')} />{formData.alteracoesHormonais.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.alteracoesHormonais.outros} onChangeText={(text) => handleInputChange('alteracoesHormonais', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={12} title="Doenças Infectocontagiosas"><View style={styles.checkboxContainer}><Checkbox label="DST" checked={formData.infectocontagiosas.selected.includes('DST')} onPress={() => handleCheckboxChange('infectocontagiosas', 'DST')} /><Checkbox label="Tuberculose" checked={formData.infectocontagiosas.selected.includes('Tuberculose')} onPress={() => handleCheckboxChange('infectocontagiosas', 'Tuberculose')} /><Checkbox label="AIDS" checked={formData.infectocontagiosas.selected.includes('AIDS')} onPress={() => handleCheckboxChange('infectocontagiosas', 'AIDS')} /><Checkbox label="Hepatite" checked={formData.infectocontagiosas.selected.includes('Hepatite')} onPress={() => handleCheckboxChange('infectocontagiosas', 'Hepatite')} /></View><Checkbox label="Outros:" checked={formData.infectocontagiosas.selected.includes('Outros')} onPress={() => handleCheckboxChange('infectocontagiosas', 'Outros')} />{formData.infectocontagiosas.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.infectocontagiosas.outros} onChangeText={(text) => handleInputChange('infectocontagiosas', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={13} title="Alergias"><View style={styles.checkboxContainer}><Checkbox label="Medicamentos" checked={formData.alergias.selected.includes('Medicamentos')} onPress={() => handleCheckboxChange('alergias', 'Medicamentos')} /><Checkbox label="Alimentos" checked={formData.alergias.selected.includes('Alimentos')} onPress={() => handleCheckboxChange('alergias', 'Alimentos')} /><Checkbox label="Substâncias Químicas" checked={formData.alergias.selected.includes('Substâncias Químicas')} onPress={() => handleCheckboxChange('alergias', 'Substâncias Químicas')} /></View><Checkbox label="Outros:" checked={formData.alergias.selected.includes('Outros')} onPress={() => handleCheckboxChange('alergias', 'Outros')} />{formData.alergias.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.alergias.outros} onChangeText={(text) => handleInputChange('alergias', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={14} title="Já teve ou tem Neoplasia?"><ToggleButtonGroup label="" value={formData.neoplasia.value} onSelect={(val) => handleToggleChange('neoplasia', 'value', val)} />{formData.neoplasia.value === 'sim' && <View style={styles.conditionalInput}><View style={styles.checkboxContainer}><Checkbox label="Benigna" checked={formData.neoplasia.tipo.includes('Benigna')} onPress={() => handleNeoplasiaTypeChange('Benigna')} /><Checkbox label="Malígna" checked={formData.neoplasia.tipo.includes('Malígna')} onPress={() => handleNeoplasiaTypeChange('Malígna')} /></View><StyledInput label="Qual?" iconName="info" value={formData.neoplasia.qual} onChangeText={(text) => handleInputChange('neoplasia', 'qual', text)} /></View>}</QuestionCard>
        <QuestionCard number={15} title="Distúrbios Sanguíneos"><View style={styles.checkboxContainer}><Checkbox label="Anemia" checked={formData.disturbiosSanguineos.selected.includes('Anemia')} onPress={() => handleCheckboxChange('disturbiosSanguineos', 'Anemia')} /><Checkbox label="Hemorragia" checked={formData.disturbiosSanguineos.selected.includes('Hemorragia')} onPress={() => handleCheckboxChange('disturbiosSanguineos', 'Hemorragia')} /><Checkbox label="Trombose" checked={formData.disturbiosSanguineos.selected.includes('Trombose')} onPress={() => handleCheckboxChange('disturbiosSanguineos', 'Trombose')} /><Checkbox label="Púrpura" checked={formData.disturbiosSanguineos.selected.includes('Púrpura')} onPress={() => handleCheckboxChange('disturbiosSanguineos', 'Púrpura')} /></View><Checkbox label="Outros:" checked={formData.disturbiosSanguineos.selected.includes('Outros')} onPress={() => handleCheckboxChange('disturbiosSanguineos', 'Outros')} />{formData.disturbiosSanguineos.selected.includes('Outros') && <View style={styles.conditionalInput}><StyledInput label="" iconName="plus" value={formData.disturbiosSanguineos.outros} onChangeText={(text) => handleInputChange('disturbiosSanguineos', 'outros', text)} /></View>}</QuestionCard>
        <QuestionCard number={16} title="Síndromes e Transplantes"><ToggleButtonGroup label="" value={formData.sindromesTransplantes.value} onSelect={(val) => handleToggleChange('sindromesTransplantes', 'value', val)} />{formData.sindromesTransplantes.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.sindromesTransplantes.qual} onChangeText={(text) => handleInputChange('sindromesTransplantes', 'qual', text)} /></View>}</QuestionCard>
        <QuestionCard number={17} title="Cirurgia"><ToggleButtonGroup label="Já fez alguma cirurgia na boca?" value={formData.cirurgia.value} onSelect={(val) => handleToggleChange('cirurgia', 'value', val)} /><ToggleButtonGroup label="Teve hemorragia ou sangramento exagerado?" value={formData.cirurgia.hemorragia} onSelect={(val) => handleToggleChange('cirurgia', 'hemorragia', val)} /><View style={styles.conditionalInput}><StyledInput label="Como foi a cicatrização?" iconName="info" multiline value={formData.cirurgia.cicatrizacao} onChangeText={(text) => handleInputChange('cirurgia', 'cicatrizacao', text)} /></View></QuestionCard>
        <QuestionCard number={18} title="Tem alergia a anestésicos odontológicos?"><ToggleButtonGroup label="" value={formData.alergiaAnestesico.value} onSelect={(val) => handleToggleChange('alergiaAnestesico', 'value', val)} />{formData.alergiaAnestesico.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.alergiaAnestesico.qual} onChangeText={(text) => handleInputChange('alergiaAnestesico', 'qual', text)} /></View>}</QuestionCard>
        <QuestionCard number={19} title="Tem sinusite?"><ToggleButtonGroup label="" value={formData.sinusite.value} onSelect={(val) => handleToggleChange('sinusite', 'value', val)} />{formData.sinusite.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.sinusite.qual} onChangeText={(text) => handleInputChange('sinusite', 'qual', text)} /></View>}</QuestionCard>
        <QuestionCard number={20} title="Sente dores de cabeça com frequência?"><ToggleButtonGroup label="" value={formData.dorDeCabeca.value} onSelect={(val) => handleToggleChange('dorDeCabeca', 'value', val)} /></QuestionCard>
        <QuestionCard number={21} title="Tem algum outro problema de saúde não relacionado neste questionário?"><ToggleButtonGroup label="" value={formData.outroProblema.value} onSelect={(val) => handleToggleChange('outroProblema', 'value', val)} />{formData.outroProblema.value === 'sim' && <View style={styles.conditionalInput}><StyledInput label="Qual?" iconName="info" value={formData.outroProblema.qual} onChangeText={(text) => handleInputChange('outroProblema', 'qual', text)} /></View>}</QuestionCard>

        
        <QuestionCard number={18} title="Tem alergia a anestésicos odontológicos?">
            <ToggleButtonGroup label="" value={formData.alergiaAnestesico.value} onSelect={(val) => handleToggleChange('alergiaAnestesico', 'value', val)} />
            {formData.alergiaAnestesico.value === 'sim' &&
              <View style={styles.conditionalInput}>
                <StyledInput label="Qual?" iconName="info" value={formData.alergiaAnestesico.qual} onChangeText={(text) => handleInputChange('alergiaAnestesico', 'qual', text)} />
              </View>
            }
        </QuestionCard>

        <QuestionCard number={19} title="Tem sinusite?">
            <ToggleButtonGroup label="" value={formData.sinusite.value} onSelect={(val) => handleToggleChange('sinusite', 'value', val)} />
        </QuestionCard>

        <QuestionCard number={20} title="Sente dores de cabeça com frequência?">
            <ToggleButtonGroup label="" value={formData.dorDeCabeca.value} onSelect={(val) => handleToggleChange('dorDeCabeca', 'value', val)} />
        </QuestionCard>
        
        <QuestionCard number={21} title="Tem algum outro problema de saúde não relacionado neste questionário?">
            <ToggleButtonGroup label="" value={formData.outroProblema.value} onSelect={(val) => handleToggleChange('outroProblema', 'value', val)} />
            {formData.outroProblema.value === 'sim' &&
              <View style={styles.conditionalInput}>
                <StyledInput label="Qual?" iconName="info" value={formData.outroProblema.qual} onChangeText={(text) => handleInputChange('outroProblema', 'qual', text)} />
              </View>
            }
        </QuestionCard>

      </View>
    </View>
  );
}