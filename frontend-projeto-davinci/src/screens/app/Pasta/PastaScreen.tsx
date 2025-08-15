

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
import { styles } from './PastaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Pasta from '@/assets/characters/pasta.svg';


const carouselItems = [
  {
    id: '1',
    title: 'Sou a Pasta de Dente!',
    text: 'E, levada e esfregada pela escova, tenho a função de facilitar a remoção do excesso de placa dental e remover os pigmentos da superfície do dente. Também, e principalmente, ao incorporar o parceiro flúor em minha composição, ajudo na proteção dos dentes contra a desmineralização.',
    
    images: [
      require('@/assets/images/dentes-pigmentados.png'),
      require('@/assets/images/mm2-placa.png'),
      require('@/assets/images/escova-com-pasta.png'),
    ],
  },

  {
    id: '2',
    textTop: 'Além de colaborar na saúde bucal, promovo uma sensação de boca limpa agradável e ajudo a combater o mau hálito. De acordo com necessidades especiais de cada um, posso ter minha formulação alterada para combater outros problemas específicos (excesso de tártaro, hipersensibilidade dentinária,...)',
    textBottom: 'Não esqueça de conversar sobre qual a minha composição ideal para o seu caso com o seu dentista.',
  
    collageImages: [
      require('@/assets/images/juliana-paes.png'),
      require('@/assets/images/sorriso-1.png'),
      require('@/assets/images/sorriso-2.png'),
    ]
  },

  {
    id: '3',
    listTitle: 'O que é importante e devemos entender!',
    bulletPoints: [
      'O flúor é imprescindível na pasta.',
      'O RDA é um índice de abrasividade que não pode ser maior que 250 (capacidade de limpeza). Em pacientes com restaurações deve ser inferior a 100.',
      'Importante também o RDA baixo em lesões de mancha branca, LCNC ou após alimentações acidas.',
    ]
  },

  {
    id: '4',
    listTitle: 'O que é importante e devemos entender!',
    bulletPoints: [
      'O RDA é apenas um dos fatores a serem considerados.',
      'Cuidado com as superfícies parcialmente desmineralizadas.',
      'Pastas com 5000 PPM de flúor são recomendadas para pacientes com alto índice de cárie ou pacientes com xerostomia e alto índice carie radicular.',
    ]
  },
 
];

export default function PastaScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  
  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Pasta de Dente',
        CharacterSvg: Pasta,
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
           
                {item.images && (
                  <>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.paragraph}>{item.text}</Text>
                    <View style={styles.imageGrid}>
                      <Image source={item.images[0]} style={styles.gridImageTop} />
                      <Image source={item.images[1]} style={styles.gridImageTop} />
                      <Image source={item.images[2]} style={styles.gridImageBottom} />
                    </View>
                  </>
                )}

           
                {item.collageImages && (
                  <>
                    <Text style={styles.paragraph}>{item.textTop}</Text>
                    <View style={styles.collageContainer}>
                      <Image source={item.collageImages[0]} style={styles.collageMainImage} />
                      <View style={styles.collageSideContainer}>
                      <Image source={item.collageImages[1]} style={styles.collageSideImageTop} />
                      <Image source={item.collageImages[2]} style={styles.collageSideImageBottom} />
                      </View>
                    </View>
                    <Text style={styles.paragraph}>{item.textBottom}</Text>
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
