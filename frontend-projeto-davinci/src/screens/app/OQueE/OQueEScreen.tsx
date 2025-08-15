// src/screens/app/OQueE/OQueEScreen.tsx

import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './OQueEScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';

export default function OQueEScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'O QUE É?',
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
          O DaVinci Social é uma extensão do Projeto DaVinci, realizado pela Gratone Odontologia Especializada.
        </Text>
        <Text style={styles.paragraph}>
          Sua finalidade é atender pacientes que não possuem condições de pagar por um tratamento odontológico adequado, visando restabelecer a estética e a função bucal de forma digna.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
