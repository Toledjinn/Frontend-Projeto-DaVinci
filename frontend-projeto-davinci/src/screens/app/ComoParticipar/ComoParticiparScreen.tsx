

import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './ComoParticiparScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';

export default function ComoParticiparScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <Text style={styles.paragraph}>
          É realizado um sorteio entre os pacientes ativos na clínica, onde o selecionado indica uma pessoa de seu convívio, que não teria condições financeiras de fazer um tratamento odontológico completo.
        </Text>
        <Text style={styles.paragraph}>
          Esse paciente será atendido por todos os profissionais que atuam na clínica (atendimento interdisciplinar) ou que são parceiros indiretos, com apoio de toda a nossa infraestrutura, equipamentos e materiais, como qualquer paciente que paga por um tratamento particular.
        </Text>
        <Text style={styles.paragraph}>
          Assim que finalizarmos cada caso, fazemos um novo sorteio e inicia-se outro gratuitamente.
        </Text>
        <Text style={styles.paragraph}>
          Essa é uma pequena contribuição que fazemos com muito amor e carinho, pois são pessoas trabalhadoras e gente do bem, porém, sem acesso pleno à saúde bucal, em razão de uma desigualdade social que afeta fortemente nosso amado Brasil
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
