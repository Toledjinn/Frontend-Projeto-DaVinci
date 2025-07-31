import React from 'react';
import { SafeAreaView, ScrollView, Text, useWindowDimensions } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './NotificationsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import NotificationList from '@/components/features/NotificationList';
import { FONTS } from '@/constants/theme';

const MOCK_NOTIFICATIONS = [
    { id: '1', date: '21/05/2025', time: '11:07', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>reagendamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Rafael Ferreira</Text></> },
    { id: '2', date: '21/05/2025', time: '09:01', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>cancelamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Luiz Toledo</Text></> },
    { id: '3', date: '20/05/2025', time: '08:30', text: 'Novo pedido na loja!' },
    { id: '4', date: '20/05/2025', time: '18:00', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>agendamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Rafael Ferreira</Text></> },
    { id: '5', date: '19/05/2025', time: '17:00', text: 'Novo pedido na loja!' },
    { id: '6', date: '19/05/2025', time: '13:00', text: 'Novo pedido na loja!' },
    { id: '7', date: '18/05/2025', time: '09:03', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>cancelamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Bruce Wayne</Text></> },
    { id: '8', date: '18/05/2025', time: '09:01', text: 'Novo pedido na loja!' },
    { id: '9', date: '17/05/2025', time: '19:00', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>agendamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Rafael Ferreira</Text></> },
];

export default function NotificationsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.27;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Notificações',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 9 }]}
      >
        <NotificationList data={MOCK_NOTIFICATIONS} />
      </ScrollView>
    </SafeAreaView>
  );
}
