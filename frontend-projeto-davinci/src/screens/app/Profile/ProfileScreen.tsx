import React from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './ProfileScreen.styles';
import { useUIStore } from '@/state/uiStore';
import FotoPerfil from '@/assets/images/FotoPerfil.svg'; 
import ProfileDataList from '@/components/features/ProfileDataList';
import ScreenFooter from '@/components/common/ScreenFooter'; 

const MOCK_PROFILE_DATA = [
  { id: '1', label: 'Gênero', value: 'Masculino' },
  { id: '2', label: 'Data de Nascimento', value: '05/04/1961' },
  { id: '3', label: 'Estado Civil', value: 'Solteiro' },
  { id: '4', label: 'CPF', value: '217.497.441-04' },
  { id: '5', label: 'CRO', value: '0000 - DF' },
  { id: '6', label: 'Especialidades', value: 'Periodontia / Prótese' },
  { id: '7', label: 'Telefone', value: '(61) 98201 - 0910' },
  { id: '8', label: 'E-mail', value: 'rafael.f.resende@iesb.edu.br' },
  { id: '9', label: 'CEP', value: '70711-903' },
  { id: '10', label: 'Endereço', value: 'SCN, Asa Norte Quadra 01 Bloco E' },
  { id: '11', label: 'Número / Complemento', value: '-' },
  { id: '12', label: 'Cidade / Estado', value: 'Brasília / DF' },
  { id: '13', label: 'Nacionalidade', value: 'Brasileira' },
];

export default function ProfileScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.275;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const handleEditData = () => {
    console.log('Botão "Editar Dados" pressionado');
  };

  useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: false,
        userName: 'José Maria Gratone', 
        UserImageSvg: FotoPerfil,   
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 9 }]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileDataList data={MOCK_PROFILE_DATA} />
      </ScrollView>

      <ScreenFooter 
        secondaryButtonTitle="Editar Dados"
        onSecondaryButtonPress={handleEditData}
        primaryButtonTitle="Sair"
        onPrimaryButtonPress={handleLogout}
      />
    </SafeAreaView>
  );
}
