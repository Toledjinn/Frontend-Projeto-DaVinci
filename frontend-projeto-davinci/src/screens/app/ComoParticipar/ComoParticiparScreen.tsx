import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './ComoParticiparScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useSocialStore } from '@/state/socialStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

export default function ComoParticiparScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const comoParticiparContent = useSocialStore((state) => state.comoParticipar);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'COMO PARTICIPAR?',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleEditPress = () => {
    router.push({ pathname: '/(app)/editar-conteudo-simples', params: { page: 'comoParticipar' } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        {comoParticiparContent.paragraphs.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </ScrollView>

      {(userType === 'admin' || userType === 'dentista') && (
        <ScreenFooter
          primaryButtonTitle="Editar Conteúdo"
          onPrimaryButtonPress={handleEditPress}
        />
      )}
    </SafeAreaView>
  );
}
