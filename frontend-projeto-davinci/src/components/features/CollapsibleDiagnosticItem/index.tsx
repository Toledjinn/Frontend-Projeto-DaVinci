import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import { ConsultationRecord } from '@/data/mockConsultationRecords';
import StyledButton from '@/components/common/StyledButton';

type CollapsibleDiagnosticItemProps = {
  record: ConsultationRecord;
  isOpen: boolean;
  onToggle: () => void;
};

export default function CollapsibleDiagnosticItem({ record, isOpen, onToggle }: CollapsibleDiagnosticItemProps) {
  const router = useRouter();

  const getRiskColor = (riskLevel?: 'Baixo' | 'Médio' | 'Alto' | null) => {
    switch (riskLevel) {
      case 'Alto':
        return COLORS.red;
      case 'Médio':
        return COLORS.primary; 
      case 'Baixo':
        return '#3B82F6'; 
      default:
        return COLORS.gray_400;
    }
  };

  const renderContent = () => {
    const specialty = record.specialty.toLowerCase();
    const riskColor = getRiskColor(record.riskAssessment);

    const handleNavigateToForm = (formType: 'saude-geral' | 'saude-bucal') => {
      router.push({
        pathname: `/(app)/${formType}`,
        params: { 
          patientId: record.patientId,
          recordId: record.appointmentId, 
        },
      });
    };

    switch (specialty) {
      case 'primeira consulta':
        return (
          <>
            <View style={[styles.buttonRow, { marginTop: 16 }]}>
              <StyledButton 
                title="Saúde Bucal" 
                variant="primary" 
                style={[styles.buttonInRow, { marginRight: 8 }]}
                onPress={() => handleNavigateToForm('saude-bucal')}
              />
              <StyledButton 
                title="Saúde Geral" 
                variant="secondary" 
                style={[styles.buttonInRow, { marginLeft: 8 }]}
                onPress={() => handleNavigateToForm('saude-geral')}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.subSectionTitle}>Exames Solicitados:</Text>
              {record.examRequests?.map(exam => (
                <Text key={exam.id} style={styles.listItem}>• {exam.value}</Text>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.subSectionTitle}>Avaliação de Risco:</Text>
              <View style={styles.riskContainer}>
                  <Feather name="shield" size={24} color={riskColor}/>
                  <Text style={[styles.riskText, { color: riskColor }]}>{record.riskAssessment}</Text>
              </View>
            </View>
          </>
        );

      case 'segunda consulta':
        return (
          <>
            <Text>Layout da Segunda Consulta</Text>
          </>
        );

      case 'periodontia':
        return (
          <>
            <View style={styles.section}>
                <Text style={styles.subSectionTitle}>Procedimentos Realizados:</Text>
                {record.proceduresPerformed?.map((proc, index) => (
                    <Text key={index} style={styles.listItem}>
                        • <Text style={styles.procedureTitle}>{proc.procedure}:</Text> {proc.description}
                    </Text>
                ))}
            </View>
            <View style={{marginTop: 16}}>
              <StyledButton 
                  title="Periograma" 
                  variant="secondary" 
                  onPress={() => console.log('Navegar para o periograma:', record.periogramId)} 
              />
            </View>
              <View style={[styles.buttonRow, styles.section]}>
                <StyledButton title="Imagens" variant="primary" style={[styles.buttonInRow, { marginRight: 8 }]} />
                <StyledButton title="Raios-X" variant="secondary" style={[styles.buttonInRow, { marginLeft: 8 }]} />
            </View>
          </>
        );

      default:
        return (
          <>
              <View style={styles.section}>
                <Text style={styles.subSectionTitle}>Procedimentos Realizados:</Text>
                {record.proceduresPerformed?.map((proc, index) => (
                    <Text key={index} style={styles.listItem}>
                        • <Text style={styles.procedureTitle}>{proc.procedure}:</Text> {proc.description}
                    </Text>
                ))}
            </View>
              <View style={[styles.buttonRow, styles.section]}>
                <StyledButton title="Imagens" variant="primary" style={[styles.buttonInRow, { marginRight: 8 }]} />
                <StyledButton title="Raios-X" variant="primary" style={[styles.buttonInRow, { marginLeft: 8 }]} />
            </View>
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.7}>
        <Text style={styles.dateText}>Consulta do dia: {record.date}</Text>
        <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={28} color={COLORS.gray_400} />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          {renderContent()}
        </View>
      )}
    </View>
  );
}