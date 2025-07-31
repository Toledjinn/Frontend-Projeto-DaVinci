import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './HomeScreen.styles';
import { useUIStore } from '@/state/uiStore';

export default function HomeScreen() {
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        layout: 'home',
        showNotificationIcon: true,
        showPageHeaderElements: false, 
        pageTitle: '',
        CharacterSvg: null,
      });
    }, [])
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
      <View style={styles.container}>
        <Text style={styles.title}>Conteúdo da Home</Text>
      </View>
    </SafeAreaView>
  );
}
