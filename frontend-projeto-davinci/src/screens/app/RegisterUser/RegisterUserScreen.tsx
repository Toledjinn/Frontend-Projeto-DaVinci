import React, { useCallback } from 'react';
import { View, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './RegisterUserScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import Administrador from '@/assets/characters/chefinho.svg';
import RegisterForm from '@/components/features/RegisterForm';

const getTitle = (userType?: string, isEditing?: boolean) => {
  const action = isEditing ? 'Editar' : 'Cadastrar';
  switch (userType) {
    case 'admin':
      return `${action} Administrador`;
    case 'dentist':
      return `${action} Dentista`;
    case 'patient':
      return `${action} Paciente`;
    default:
      return `${action} Usuário`;
  }
};

export default function RegisterUserScreen() {
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const router = useRouter();
  const { userType, userId } = useLocalSearchParams<{ userType: string, userId?: string }>();
  
  const isEditing = !!userId; 

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'register',
        pageTitle: getTitle(userType, isEditing),
        showNotificationIcon: false,
        showBackground: true,
      });
    }, [userType, isEditing])
  );

  const handleCancel = () => {
    router.back();
  };

  const handleSave = () => {
    console.log(isEditing ? 'Salvando alterações...' : 'Registrando usuário...');
    router.back(); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContentContainer, { paddingTop: headerHeight }]}
          keyboardShouldPersistTaps="handled"
        >
          <RegisterForm />
        </ScrollView>
        <ScreenFooter
          secondaryButtonTitle="Cancelar"
          onSecondaryButtonPress={handleCancel}
          primaryButtonTitle={isEditing ? "Salvar" : "Cadastrar"}
          onPrimaryButtonPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
}