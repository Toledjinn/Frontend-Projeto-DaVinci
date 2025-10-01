import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import QuestionCard from '../QuestionCard';
import Checkbox from '@/components/common/Checkbox';
import { styles } from '../SaudeGeralForm/styles';

type RiskAssessmentCardProps = {
  initialRiskLevel?: 'baixo' | 'moderado' | 'alto' | null;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function RiskAssessmentCard({ initialRiskLevel }: RiskAssessmentCardProps) {
  const [riskLevel, setRiskLevel] = useState<string | null>(
    initialRiskLevel ? capitalize(initialRiskLevel) : null
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRiskLevel(initialRiskLevel ? capitalize(initialRiskLevel) : null);
  }, [initialRiskLevel]);

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <QuestionCard 
      title="Avaliação de Risco"
      onEdit={handleEditToggle}
      isEditing={isEditing}
    >
      <View style={styles.checkboxContainer}>
        <Checkbox 
          label="Baixo" 
          checked={riskLevel === 'Baixo'} 
          onPress={() => setRiskLevel('Baixo')} 
          disabled={!isEditing}
        />
        <Checkbox 
          label="Médio" 
          checked={riskLevel === 'Médio'} 
          onPress={() => setRiskLevel('Médio')} 
          disabled={!isEditing}
        />
        <Checkbox 
          label="Alto" 
          checked={riskLevel === 'Alto'} 
          onPress={() => setRiskLevel('Alto')} 
          disabled={!isEditing}
        />
      </View>
    </QuestionCard>
  );
}