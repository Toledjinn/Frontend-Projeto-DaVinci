import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

type AllergyWarningProps = {
  allergies: string[];
};

export default function AllergyWarning({ allergies }: AllergyWarningProps) {
  return (
    <View style={styles.container}>
      <Feather name="alert-triangle" size={24} color={COLORS.red} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Atenção: Paciente possui alergias!</Text>
        {allergies.map((allergy, index) => (
          <Text key={index} style={styles.allergyItem}>• {allergy}</Text>
        ))}
      </View>
    </View>
  );
}
