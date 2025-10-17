import React, { useCallback } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './LaboratorioScreen.styles';
import { useUIStore } from '@/state/uiStore';

import Chefinho from '@/assets/characters/chefinho.svg';
import Escova2 from '@/assets/characters/escova2.svg';
import Escova3 from '@/assets/characters/escova3.svg';
import Escova4 from '@/assets/characters/escova4.svg';

import LogoBadge from '@/components/common/LogoBadge';
import { badge } from '@/ui/badgePresets';

const labButtons = [
  { id: 'nossaFilosofia', title: 'Nossa Filosofia', SvgComponent: Escova4, pageName: 'nossaFilosofia' },
  { id: 'trabalhos',      title: 'Trabalhos',       SvgComponent: Escova2, pageName: 'trabalhos' },
  { id: 'parceiros',      title: 'Parceiros',       SvgComponent: Escova3, pageName: 'parceiros' },
];

export default function LaboratorioScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.22;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Laboratório',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleButtonPress = (pageName: string) => {
    router.push({
      pathname: '/(app)/laboratorio/[pageName]',
      params: { pageName },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo à nossa seção de laboratório!</Text>

          <View style={styles.divider} />

          <Text style={styles.cardParagraph}>
            Aqui você pode encontrar informações sobre os produtos que utilizamos,
            ver exemplos de nossos trabalhos e conhecer os nossos parceiros.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          {labButtons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={styles.buttonItem}
              onPress={() => handleButtonPress(button.pageName)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={button.title}
            >
              <LogoBadge
                {...badge.educationalButton(button.SvgComponent)}
                style={styles.badgeShadow}
              />
              <Text style={styles.itemText}>{button.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
