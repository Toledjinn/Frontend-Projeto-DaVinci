import React from 'react';
import { View, Text } from 'react-native';
import { getRiskLevelIndicatorStyles } from './styles';

type RiskLevel = 'baixo' | 'moderado' | 'alto';

type RiskLevelIndicatorProps = {
  level: RiskLevel;
};

export default function RiskLevelIndicator({ level }: RiskLevelIndicatorProps) {
  const styles = getRiskLevelIndicatorStyles();
  
  const levelInfo = {
    baixo: { text: 'Baixo Risco', style: styles.baixo },
    moderado: { text: 'Risco Moderado', style: styles.moderado },
    alto: { text: 'Alto Risco', style: styles.alto },
  };

  return (
    <View style={[styles.container, levelInfo[level].style]}>
      <Text style={styles.text}>{levelInfo[level].text}</Text>
    </View>
  );
}