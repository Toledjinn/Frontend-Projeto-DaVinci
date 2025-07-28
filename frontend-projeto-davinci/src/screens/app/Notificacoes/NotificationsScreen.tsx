import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { styles } from './NotificationsScreen.styles';
import Header from '@/components/common/Header';



export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header showBackButton={true} screenName="Notificações"/>
      
    </SafeAreaView>
  );
}
