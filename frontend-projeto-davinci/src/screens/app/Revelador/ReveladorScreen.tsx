// src/screens/app/Revelador/ReveladorScreen.tsx

import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './ReveladorScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Revelador from '@/assets/characters/revelador.svg';

// --- ALTERAÇÃO 1: ATUALIZAÇÃO DOS DADOS ---
const carouselItems = [
  // Slide 1
  {
    id: '1',
    title: 'Sou o Revelador de Placa!',
    text: [
      'Ainda pouco conhecido, o revelador ou evidenciador de placa bacteriana, tem função essencial na identificação da placa ou biofilme dental. A placa ou biofilme é uma camada fina, transparente que recobri todos os dentes do paciente. Tudo se resume a ela, seu acúmulo é capaz de causar cárie, gengivite e tártaro.',
    ],
    image: require('@/assets/images/revelador-antes-depois.png'),
  },

  {
    id: '2',
    title: 'Sou o Revelador de Placa!',
    text: [
      'O biofilme é uma aglomeração de bactérias e resíduos alimentares que combinados são muito prejudiciais a saúde bucal, causando mau hálito, gengivite, periodontite, e seu controle, deverá ser feito diariamente com o uso de acessórios de higiene bucal corretamente, como a escova e o fio dental.',
    ],
    image: require('@/assets/images/revelador-antes-depois.png'),
  },

  {
    id: '3',
    title: 'Sou o Revelador de Placa!',
    text: [
      'O revelador que indicamos, evidencia o biofilme com dois indicadores cromáticos, a placa antiga com a cor azul e a placa nova vermelho.',
    ],
    image: require('@/assets/images/revelador-antes-depois.png'),
  },
  
  {
    id: '4',
    listTitle: 'O que é importante e devemos entender!',
    bulletPoints: [
      'Se tiveres muitas restaurações usar inicialmente no dentista para ver o qual de manchamento.',
      'À medida que for melhorando a desfrise da escovação e tendo um melhor controle, espaçar mais as utilizações.',
      'Não deixe de frequentar as reconsultas para um acompanhamento profissional.',
    ],
  },
];

export default function ReveladorScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Revelador de Placa',
        CharacterSvg: Revelador,
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

                {/* Layout 1: Título, texto e imagem */}
                {item.title && (
                  <>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.text.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                    <Image source={item.image} style={styles.image} />
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
