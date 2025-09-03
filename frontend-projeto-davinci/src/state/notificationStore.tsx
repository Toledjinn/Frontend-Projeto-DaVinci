import React from 'react';
import { create } from 'zustand';
import { FONTS } from '@/constants/theme';
import { Text } from 'react-native';

export type Notification = {
  id: string;
  date: string;
  time: string;
  text: React.ReactNode;
  type: 'news' | 'appointment' | 'store' | 'generic'; 
  linkId?: string; 
};

type NotificationState = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'time'>) => void;
};

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '9', date: '22/05/2025', time: '10:00', text: <>Nova Dica! <Text style={{fontFamily: FONTS.body4.fontFamily}}>A importância do Flúor</Text> foi publicada. Clique para ler!</>, type: 'news', linkId: '1' },
    { id: '1', date: '21/05/2025', time: '11:07', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>reagendamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Rafael Ferreira</Text></>, type: 'appointment' },
    { id: '2', date: '21/05/2025', time: '09:01', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>cancelamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Luiz Toledo</Text></>, type: 'appointment' },
    { id: '3', date: '20/05/2025', time: '08:30', text: 'Novo pedido na loja!', type: 'store' },
    { id: '4', date: '20/05/2025', time: '18:00', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>agendamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Rafael Ferreira</Text></>, type: 'appointment' },
    { id: '5', date: '19/05/2025', time: '17:00', text: 'Novo pedido na loja!', type: 'store' },
    { id: '6', date: '19/05/2025', time: '13:00', text: 'Novo pedido na loja!', type: 'store' },
    { id: '7', date: '18/05/2025', time: '09:03', text: <>Solicitação de <Text style={{fontFamily: FONTS.body4.fontFamily}}>cancelamento</Text> de consulta de <Text style={{fontFamily: FONTS.body4.fontFamily}}>Bruce Wayne</Text></>, type: 'appointment' },
    { id: '8', date: '18/05/2025', time: '09:01', text: 'Novo pedido na loja!', type: 'store' },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: MOCK_NOTIFICATIONS,

  addNotification: (notification) => {
    const now = new Date();
    const newNotification: Notification = {
      id: now.toISOString(),
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      ...notification,
    };
    set((state) => ({ notifications: [newNotification, ...state.notifications] }));
  },
}));

