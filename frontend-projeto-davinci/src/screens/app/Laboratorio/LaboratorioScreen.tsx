import React, { useCallback } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './LaboratorioScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import HomeSection from '@/components/features/HomeSection';

export default function LaboratorioScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.324;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const router = useRouter(); 

 
  const labButtons = [
    { id: 'produtos',  title: 'Nossa Filosofia', onPress: () => router.push('/(app)/produtos') },
    { id: 'trabalhos', title: 'Trabalhos', onPress: () => router.push('/(app)/trabalhos') },
    { id: 'parceiros', title: 'Parceiros', onPress: () => router.push('/(app)/parceiros') },
  ];


  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'Laboratório',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <Text style={styles.paragraph}>
          Bem-vindo à nossa seção de laboratório. Aqui você pode encontrar informações sobre os produtos que utilizamos, ver exemplos de nossos trabalhos e conhecer os nossos parceiros.
        </Text>
        
        <HomeSection title="" buttons={labButtons} />

      </ScrollView>
    </SafeAreaView>
  );
}
