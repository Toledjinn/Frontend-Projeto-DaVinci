import React, { useCallback } from 'react';
import { View, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './RegisterUserScreen.styles';
import { useUIStore as useUIStoreRegister } from '@/state/uiStore'; 
import ScreenFooter from '@/components/common/ScreenFooter';
import RegisterForm from '@/components/features/RegisterForm';

const getTitle = (userType?: string) => {
  switch (userType) {
    case 'admin':
      return 'Cadastrar Administrador';
    case 'dentist':
      return 'Cadastrar Dentista';
    case 'patient':
      return 'Cadastrar Paciente';
    default:
      return 'Cadastrar Usuário';
  }
};

export default function RegisterUserScreen() {
  const setHeaderConfig = useUIStoreRegister((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const router = useRouter();
  const { userType } = useLocalSearchParams<{ userType: string }>();

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'register', 
        pageTitle: getTitle(userType),
        showNotificationIcon: false,
        showBackground: true,
      });
    }, [userType])
  );

  const handleCancel = () => {
    router.back();
  };

  const handleRegister = () => {
    console.log('Registrando usuário...');
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
          primaryButtonTitle="Cadastrar"
          onPrimaryButtonPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
}
