import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions, Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './PrevencaoScreen.styles'; 
import { useUIStore } from '@/state/uiStore';
import { findUserById, UserProfile } from '@/data/mockUsers';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import { COLORS } from '@/constants/theme';

const preventionTitles: { [key: string]: string } = {
  primaria: 'Prevenção Primária',
  secundaria: 'Prevenção Secundária',
  terciaria: 'Prevenção Terciária',
  quaternaria: 'Prevenção Quaternária',
};


export default function PrevencaoScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const { patientId, type } = useLocalSearchParams<{ patientId: string, type: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [patient, setPatient] = useState<UserProfile | null>(null);
  const [items, setItems] = useState([{ id: Date.now(), value: '' }]);

  useEffect(() => {
    console.log(`Carregando dados para: ${type}`);
  }, [type]);

  useEffect(() => {
    if (patientId) {
      const foundUser = findUserById(patientId);
      setPatient(foundUser || null);
    }
  }, [patientId]);

  useFocusEffect(
    useCallback(() => {
      if (patient && type) {
        const title = preventionTitles[type] || 'Prevenção';
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: `${title} de ${formatUserName(patient.name)}`,
          UserImageSvg: patient.image || UserPlaceholder,
          showNotificationIcon: true,
          riskLevel: patient.riskLevel,
        });
      }
    }, [patient, type])
  );
  
  const handleItemChange = (text: string, id: number) => {
    setItems(currentItems =>
      currentItems.map(item => (item.id === id ? { ...item, value: text } : item))
    );
  };

  const addItemInput = () => {
    setItems([...items, { id: Date.now(), value: '' }]);
  };

  const removeItemInput = (id: number) => {
    if (items.length > 1) {
      setItems(currentItems => currentItems.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    console.log("Salvando dados de Prevenção Primária:", items);
    router.back();
  };

 if (!patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <View style={styles.card}>
            <Text style={styles.title}>Diagnóstico</Text>
            {items.map((item, index) => (
            <View key={item.id} style={styles.inputRow}>
                <View style={{ flex: 1 }}>
                <StyledInput
                    label=""
                    iconName="check-square"
                    placeholder={`Diagnóstico ${index + 1}`}
                    value={item.value}
                    onChangeText={(text) => handleItemChange(text, item.id)}
                />
                </View>
                {items.length > 1 && (
                <TouchableOpacity onPress={() => removeItemInput(item.id)} style={styles.removeButton}>
                    <Feather name="x-circle" size={24} color={COLORS.red} />
                </TouchableOpacity>
                )}
            </View>
            ))}
            <TouchableOpacity onPress={addItemInput} style={styles.addButton}>
            <Feather name="plus" size={20} color={COLORS.secondary} />
            <Text style={styles.addButtonText}>Adicionar item</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      <ScreenFooter
        secondaryButtonTitle="Salvar"
        onSecondaryButtonPress={handleSave}
        primaryButtonTitle="Cancelar"
        onPrimaryButtonPress={() => router.back()}
      />
    </SafeAreaView>
  );
}