import React from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './HomeScreen.styles';
import { useUIStore } from '@/state/uiStore';
import HomeSection from '@/components/features/HomeSection';

const SECTIONS = [
  {
    id: 'principais',
    title: 'PRINCIPAIS',
    buttons: [
      { id: 'pacientes', title: 'Pacientes' },
      { id: 'dentistas', title: 'Dentistas' },
      { id: 'administradores', title: 'Administradores' },
    ],
  },
  {
    id: 'agendamentos',
    title: 'AGENDAMENTOS',
    buttons: [
      { id: 'agendar', title: 'Agendar Consulta' },
      { id: 'consultas', title: 'Consultas' },
      { id: 'solicitacoes', title: 'Solicitações' },
    ],
  },
  {
    id: 'conteudos',
    title: 'CONTEÚDOS',
    buttons: [
      { id: 'social', title: 'DaVinci Social' },
      { id: 'educacional', title: 'DaVinci Educacional' },
      { id: 'laboratorio', title: 'Laboratório' },
      { id: 'novidades', title: 'Novidades' },
    ],
  },
  {
    id: 'loja',
    title: 'LOJA',
    buttons: [
      { id: 'pedidos', title: 'Pedidos' },
      { id: 'estoque', title: 'Estoque' },
    ],
  },
];

export default function HomeScreen() {
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const router = useRouter();
  const headerHeight = height * 0.24; 

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
    if (buttonId === 'dentistas') {
      router.push('/(app)/dentists');
    } else if (buttonId === 'pacientes') {
      router.push('/(app)/patients');
    } else if (buttonId === 'administradores') {
      router.push('/(app)/admins');
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
