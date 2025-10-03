import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './HomeScreen.styles';
import { useUIStore } from '@/state/uiStore';
import HomeSection from '@/components/features/HomeSection';

const SECTIONS = [
  {
    id: 'principais',
    title: 'Principais',
    buttons: [
      { id: 'pacientes', title: 'Pacientes' },
      { id: 'dentistas', title: 'Dentistas' },
      { id: 'administradores', title: 'Administradores' },
    ],
  },
  {
    id: 'agendamentos',
    title: 'Agendamentos',
    buttons: [
      { id: 'agendar', title: 'Agendar Consulta' },
      { id: 'consultas', title: 'Consultas' },
      { id: 'solicitacoes', title: 'Solicitações' },
    ],
  },
  {
    id: 'conteudos',
    title: 'Conteúdos',
    buttons: [
      { id: 'social', title: 'DaVinci Social' },
      { id: 'educacional', title: 'DaVinci Educacional' },
      { id: 'laboratorio', title: 'Laboratório' },
      { id: 'novidades', title: 'Novidades' },
    ],
  },
  {
    id: 'loja',
    title: 'Loja',
    buttons: [
      { id: 'pedidos', title: 'Pedidos' },
      { id: 'estoque', title: 'Estoque' },
      { id: 'loja', title: 'Loja' },
    ],
  },
];

export default function HomeScreen() {
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const router = useRouter();
  const headerHeight = height * 0.15;

  useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        layout: 'home',
        showNotificationIcon: true,
        showBackground: true,
        userName: 'Gratone',
      });
    }, [])
  );

  const handleButtonPress = (sectionId: string, buttonId: string) => {
    if (buttonId === 'consultas') {
      router.push({
        pathname: '/(app)/consultas-list',
        params: { listType: 'all' }
      });
    } 
    else if (buttonId === 'solicitacoes') {
      router.push({
        pathname: '/(app)/consultas-list',
        params: { listType: 'pending' }
      });
    }
    else if (buttonId === 'agendar') {
      router.push('/(app)/schedule-appointment');
    } else if (buttonId === 'dentistas') {
      router.push({pathname: '/(app)/users/[userType]', params: { userType: 'dentist'}});
    } else if (buttonId === 'pacientes') {
      router.push({pathname: '/(app)/users/[userType]', params: { userType: 'patient' }});
    } else if (buttonId === 'administradores') {
      router.push({pathname: '/(app)/users/[userType]', params: { userType: 'admin'}});
    } else if (buttonId === 'social') {
      router.push('/(app)/social');
    } else if (buttonId === 'educacional') {
      router.push('/(app)/educational');
    } else if (buttonId === 'novidades') {
      router.push('/(app)/novidades');
    } else if (buttonId === 'laboratorio') {
      router.push('/(app)/laboratorio');
    } else if (buttonId === 'estoque') {
      router.push('/(app)/estoque');
    } else if (buttonId === 'pedidos') {
      router.push('/(app)/pedidos');
    } else if (buttonId === 'loja') {
      router.push('/(app)/loja');
    } else {
      console.log(`Botão pressionado: ${sectionId} - ${buttonId}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <HomeSection
            key={section.id}
            title={section.title}
            buttons={section.buttons.map(button => ({
              ...button,
              onPress: () => handleButtonPress(section.id, button.id),
            }))}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}