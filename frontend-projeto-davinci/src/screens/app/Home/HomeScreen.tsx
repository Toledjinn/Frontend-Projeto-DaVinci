import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './HomeScreen.styles';
import Header from '@/components/common/Header'; 

export default function HomeScreen() {
  const userName = 'Gratone';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
      <Header
        isHomeScreen={true}
        userName={userName}
        showNotifications={true}
        hasNewNotification={true}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Conteúdo da Home</Text>
      </View>
    </SafeAreaView>
  );
}
