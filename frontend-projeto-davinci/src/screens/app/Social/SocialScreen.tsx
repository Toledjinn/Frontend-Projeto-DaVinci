import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
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


const actionButtons = [
  { id: '1', title: 'O que é?', SvgComponent: Escova4, route: '/(app)/o-que-e' },
  { id: '2', title: 'Como Participar', SvgComponent: Escova2, route: '/(app)/como-participar' },
];

export default function SocialScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'DAVINCI SOCIAL',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleButtonPress = (item: (typeof actionButtons)[0]) => {
    if (item.route) {
      router.push(item.route as any);
    } else {
      console.log(`Botão "${item.title}" pressionado.`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <Text style={styles.paragraph}>
          Um dos maiores escritores da literatura russa e mundial, Fiódor Dostoiévski, disse um dia que:
        </Text>
        <Text style={styles.quote}>
          "A BELEZA SALVARÁ O MUNDO".
        </Text>
        <Text style={styles.paragraph}>
          Beleza essa, não só a de um sorriso bonito, mas num sentido mais amplo como, a atitude da Gratone Odontologia Especializada com o projeto Da Vinci Social.
        </Text>
        <Text style={styles.salutation}>
          Salve a odontologia!
        </Text>

        <View style={styles.buttonsContainer}>
          {actionButtons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={styles.buttonItem}
              onPress={() => handleButtonPress(button)}
            >
              <View style={styles.itemCircle}>
                <button.SvgComponent width="70%" height="70%" />
              </View>
              <Text style={styles.itemText}>{button.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
