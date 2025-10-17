import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import QuestionCard from '../QuestionCard';
import Checkbox from '@/components/common/Checkbox';
import { styles } from './styles';

type LowerRisk = 'baixo' | 'moderado' | 'alto' | 'a_definir';
type TitleRisk = 'Baixo' | 'Médio' | 'Alto';

type RiskAssessmentCardProps = {
  initialRiskLevel?: LowerRisk | null;
  isEditing?: boolean;
  onToggleEdit?: () => void;
  onChange?: (level: LowerRisk) => void;
  onSave?: () => void;                       
};

const toTitle = (lvl: LowerRisk | null | undefined): TitleRisk | null => {
  if (lvl === 'baixo') return 'Baixo';
  if (lvl === 'moderado') return 'Médio';
  if (lvl === 'alto') return 'Alto';
  return null; 
};
const toLower = (title: TitleRisk | null): LowerRisk => {
  if (title === 'Baixo') return 'baixo';
  if (title === 'Médio') return 'moderado';
  if (title === 'Alto') return 'alto';
  return 'a_definir';
};

export default function RiskAssessmentCard({
  initialRiskLevel,
  isEditing: isEditingProp,
  onToggleEdit,
  onChange,
  onSave,
}: RiskAssessmentCardProps) {
  const [riskLevel, setRiskLevel] = useState<TitleRisk | null>(toTitle(initialRiskLevel ?? null));
  const [internalEditing, setInternalEditing] = useState(false);
  const isEditing = isEditingProp ?? internalEditing;

  useEffect(() => {
    setRiskLevel(toTitle(initialRiskLevel ?? null));
  }, [initialRiskLevel]);

  const setAndNotify = (titleRisk: TitleRisk) => {
    setRiskLevel(titleRisk);
    onChange?.(toLower(titleRisk));
  };

  const handleHeaderAction = () => {
    if (isEditing) {
      onSave?.();
    } else if (onToggleEdit) {
      onToggleEdit();
    } else {
      setInternalEditing((prev) => !prev);
    }
  };

  return (
    <QuestionCard
      title="Avaliação de Risco"
      onEdit={handleHeaderAction}              
      isEditing={isEditing}                 
    >
      <View style={styles.checkboxContainer}>
        <Checkbox
          label="Baixo"
          checked={riskLevel === 'Baixo'}
          onPress={() => isEditing && setAndNotify('Baixo')}
          disabled={!isEditing}
        />
        <Checkbox
          label="Médio"
          checked={riskLevel === 'Médio'}
          onPress={() => isEditing && setAndNotify('Médio')}
          disabled={!isEditing}
        />
        <Checkbox
          label="Alto"
          checked={riskLevel === 'Alto'}
          onPress={() => isEditing && setAndNotify('Alto')}
          disabled={!isEditing}
        />
      </View>
    </QuestionCard>
  );
}
