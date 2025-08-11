// src/screens/app/Fluor/FluorScreen.tsx

import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './FluorScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Fluor from '@/assets/characters/fluor.svg';

// --- ALTERAÇÃO 1: ATUALIZAÇÃO DOS DADOS ---
const carouselItems = [
  // Slide 1
  {
    id: '1',
    text: [
      'Sou importante demais na prevenção da cárie e meu principal papel é fazer com que os dentes sejam mais resistentes aos ácidos produzidos pelas bactérias do biofilme. Se estou presente no meio bucal consigo reduzir a perda de mineral nos momentos em que o ambiente fica ácido (após a ingestão de alimentos, por exemplo) e acelerar o processo de remineralização entre as refeições/lanches.',
    ],
  },

  {
    id: '2',
    text: [
      'Assim, sou incorporado na água de abastecimento e nas pastas de dente para estar a toda hora disponível. Nas pastas, sempre devo ter uma concentração de ao menos 1000ppm de flúor. Para a maioria dos pacientes, minha baixa concentração e alta frequência de uso (na água e na pasta) garantem boa proteção frente à doença cárie.',
    ],
  },

  {
    id: '3',
    text: [
      'Em alguns casos, eu, flúor, também posso ser utilizado sob a forma de bochechos, géis ou vernizes aplicados sobre os dentes. Converse com seu dentista sobre a melhor forma como eu posso lhe ajudar a manter uma ótima saúde bucal!',
    ],
  },

  {
    id: '4',
    listTitle: 'O que é importante e devemos entender!',
    bulletPoints: [
      'A cárie é profundamente influenciada pela exposição do fluoreto, que reduz a desmineralização e aumenta a remineralização.',
      'O fluoreto reduz a progressão da cárie (desde os estágios iniciais até os estágios mais avançados), independente do fator da taxa de progressão ser lenta, moderada ou rápida.',
    ],
  },

  {
    id: '5',
    listTitle: 'O que é importante e devemos entender!',
    bulletPoints: [
      'A cárie não é a única doença oral relacionada à desmineralização. A erosão dentária, causada pela ação direta de ácidos sobre as superfícies dentárias sem ação de bactérias, resultada em desgaste aumentado.',
      'Mesmo com o uso de dentifrícios fluoretados pela maior parte das pessoas, a incidência de bio corrosão tem aumentado, devido à ação de ácidos, de origem endogena e exogena, no meio bucal.',
    ],
  },
];

export default function FluorScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Flúor',
        CharacterSvg: Fluor,
        showNotificationIcon: true,
      });
    }, [])
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.carousel}
          contentContainerStyle={styles.carouselContent}
        >
          {carouselItems.map((item) => (
            <View key={item.id} style={[styles.slide, { width: windowWidth }]}>
              <View style={styles.card}>
                {/* --- ALTERAÇÃO 2: LÓGICA DE RENDERIZAÇÃO --- */}

                {/* Layout 1: Apenas parágrafos */}
                {item.text && (
                  <>
                    {item.text.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                  </>
                )}

                {/* Layout 2: Lista de Tópicos */}
                {item.listTitle && (
                  <>
                    <Text style={styles.listTitle}>{item.listTitle}</Text>
                    {item.bulletPoints?.map((point, index) => (
                      <View key={index} style={styles.bulletPointContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}
                  </>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.paginationContainer}>
          {carouselItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: activeIndex === index ? '#FFC045' : '#D1D5DB' },
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
