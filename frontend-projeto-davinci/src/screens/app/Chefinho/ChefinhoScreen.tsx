
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
import { styles } from './ChefinhoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import Escova from '@/assets/characters/escova1.svg';
import Pasta from '@/assets/characters/pasta.svg';
import FioDental from '@/assets/characters/fio.svg';
import Fluor from '@/assets/characters/fluor.svg';
import Revelador from '@/assets/characters/revelador.svg';



const carouselItems = [

  {
    id: '1',
    image: require('@/assets/images/peter-dawson.jpg'),
    quote:
      '“Qualquer condição que impeça uma limpeza detalhada de qualquer superfície dentária ou de qualquer porção do sulco gengival deve ser considerado um fator causador que pode levar a perda dentária.“',
    author: '- Peter Dawson',
  },

  {
    id: '2',
    image: require('@/assets/images/kit-box.png'), 
    text1: 'Nós somos promotores da saúde, na verdade manejadores de conhecimentos, recursos e estratégias que visam a promoção da saúde, o controle das doenças, o tratamento adequado a manutenção de longo prazo e admiradores da estética do sorriso.',
    text2: 'Criamos o kit (missão cumprida) que funcionará como um link entre nós e vocês como lembranças entre as revisões.',
  },

  {
    id: '3',
    listTitle: 'Autocuidado, manutenção e produtos de higiene oral.',
    bulletPoints: [
      'A escolha dos produtos de higiene oral será baseada nos benefícios que pretendemos alcançar e a individualização é a chave para uma prescrição adequada.',
      'É comum o paciente seguir os cuidados propostos logo após o tratamento e, ao longo do tempo, retornar aos hábitos de higienização anteriormente praticados.',
      
    ],
  },

  {
    id: '4',
    listTitle: 'Autocuidado, manutenção e produtos de higiene oral.',
    bulletPoints: [
      'A consulta preventiva tem, assim, grande importância na recuperação da motivação inicial.',
      'O protocolo tem que ser simples e executável.',
      'A resposta da saúde oral atestará a efetividade da manutenção preventiva proposta.',
    ],
  },
];

export default function ChefinhoScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Chefinho',
        CharacterSvg: Chefinho,
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
                
                {item.quote && (
                  <>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.quote}>{item.quote}</Text>
                    <Text style={styles.author}>{item.author}</Text>
                  </>
                )}

                {item.text1 && (
                  <>
                    <Text style={styles.text1}>{item.text1}</Text>
                    <Text style={styles.text2}>{item.text2}</Text>
                    <Image source={item.image} style={styles.newImage} />
                  </>
                )}

                {item.listTitle && (
                  <>
                    <View style={styles.iconRow}>
                      <Chefinho width={50} height={50} style={styles.smallIcon} />
                      <Escova width={50} height={50} style={styles.smallIcon} />
                      <Pasta width={50} height={50} style={styles.smallIcon} />
                      <FioDental width={50} height={50} style={styles.smallIcon} />
                      <Revelador width={50} height={50} style={styles.smallIcon} />
                    </View>
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
