

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
import { styles } from './EscovaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Escova from '@/assets/characters/escova1.svg';

const carouselItems = [
  {
    id: '1',
    image: require('@/assets/images/gengivite-periodontite.png'), 
    title: 'Olá, sou a Escova!',
    text: [
      'Minha principal função é remover restos de alimentos, pigmentos e, principalmente, desorganizar a placa bacteriana que se acumula sobre as superfícies livres (da frente e de trás) e oclusal dos dentes.',
    ],
  },
  {
    id: '2',
    image: require('@/assets/images/gengivite-periodontite.png'), 
    title: 'Olá, sou a Escova!',
    text: [
      'Essa desorganização constante que faço da placa dificulta que os microorganismos se organizem a ponto dela se tornar cariogênica e de provocar danos aos dentes e ao periodonto (gengiva e osso que circundam os dentes).',
    ],
  },
  {
    id: '3',
    text: [
      'Minhas cerdas devem ser preferencialmente macias e utilizadas de forma a alcançar todas as áreas dos dentes possíveis, inclusive a entrada do sulco gengival.',
    ],
    beforeAfterImages: {
      before: require('@/assets/images/antes.png'),
      after: require('@/assets/images/depois.png'),
    }
  },
  {
    id: '4',
    text: [
      'Deve-se ressaltar que as características das cerdas e tufos das escovas (quantidade, distribuição, material e dureza) influenciam no potencial abrasivo.',
      'A maior quantidade de cerdas, distribuição mais homogênea e cerdas mais macias podem diminuir o potencial abrasivo da escova, pois aumentam a área de contato e ainda melhora a capacidade de limpeza.',
    ],
    beforeAfterImages: {
      before: require('@/assets/images/antes.png'),
      after: require('@/assets/images/depois.png'),
    }
  },
  {
    id: '5',
    image: require('@/assets/images/escova-sorriso.png'), 
    text: [
      'Devo ser utilizada de 2 a 3 vezes por dia, com técnica e tempos adequados, sempre acompanhada de uma pasta de dentes que contenha flúor.',
    ],
  },

  {
    id: '6',
    listTitle: 'O que é importante e devemos entender!',
    bulletPoints: [
      'Cerdas sempre macias ou extras macias.',
      'Revezamento diário.',
      'Não escovar imediatamente após as refeições.',
      'Aguardar 25 min após lavar a boca com H²O corrente de manhã.',
      'Usar a pasta dental com o RDA correto (Informe com seu dentista).',
      
    ],
  },

  {
    id: '7',
    listTitle: 'O que é importante e devemos entender!',
    bulletPoints: [
      'A escova elétrica é uma boa opção para todas as situações.',
      'Escovas unitufos, são recomendadas para pacientes com dentes mal posicionados.',
      'Pacientes com problemas periodontais ou implantes dentários pode ser indicado escovas interdentais devendo selecionar o calibrador correto para cada caso.',
      'A troca da escova deverá acontecer a cada três meses.',
    ],
  },
];

export default function EscovaScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Escova',
        CharacterSvg: Escova,
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
                
                {item.beforeAfterImages && (
                  <>
                    {item.text.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                    <View style={styles.imageRow}>
                      <View style={styles.imageContainer}>
                        <Image source={item.beforeAfterImages.before} style={styles.sideImage} />
                        <Text style={styles.imageLabel}>Antes</Text>
                      </View>
                      <View style={styles.imageContainer}>
                        {/* CORREÇÃO: O nome do estilo estava incompleto */}
                        <Image source={item.beforeAfterImages.after} style={styles.sideImage} />
                        <Text style={styles.imageLabel}>Depois</Text>
                      </View>
                    </View>
                  </>
                )}

                
                {item.image && !item.beforeAfterImages && (
                  <>
                    {/* Renderiza o título apenas se ele existir */}
                    {item.title && <Text style={styles.title}>{item.title}</Text>}
                    {item.text.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                    <Image source={item.image} style={styles.image} />
                  </>
                )}

                
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
