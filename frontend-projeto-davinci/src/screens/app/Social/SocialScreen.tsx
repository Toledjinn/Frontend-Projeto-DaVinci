import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './SocialScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import Escova2 from '@/assets/characters/escova2.svg';
import Escova4 from '@/assets/characters/escova4.svg';
import Escova3 from '@/assets/characters/escova3.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoBadge from '@/components/common/LogoBadge';
import { badge } from '@/ui/badgePresets';

const actionButtons = [
  { id: 'oQueE', title: 'O que é?', SvgComponent: Escova4 },
  { id: 'comoParticipar', title: 'Como Participar', SvgComponent: Escova2 },
  { id: 'depoimentos', title: 'Depoimentos', SvgComponent: Escova3 },
];

export default function SocialScreen() {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const headerHeight = height * 0.30;

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'DaVinci Social',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleButtonPress = (buttonId: string) => {
    router.push({
      pathname: '/(app)/social/[pageName]',
      params: { pageName: buttonId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <View style={styles.cardContainer}>

          <Text style={styles.subtitle}>
            Um dos maiores escritores da literatura russa e mundial, disse um dia:
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>{'“ A beleza salvará o mundo ”'}</Text>
          </View>
          <Text style={styles.title}>
            - Fiódor Dostoiévski
          </Text>

          <Text style={styles.paragraph}>
            Beleza essa, não só a de um sorriso bonito, mas num sentido mais amplo, como a atitude da Gratone Odontologia Especializada com o projeto Da Vinci Social.
          </Text>

          <Text style={styles.salutation}>Salve a Odontologia!</Text>
        </View>

        <View style={styles.buttonsContainer}>
          {actionButtons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={styles.buttonItem}
              onPress={() => handleButtonPress(button.id)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={button.title}
            >
              <LogoBadge {...badge.educationalButton(button.SvgComponent)} />
              <Text style={styles.itemText}>{button.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
