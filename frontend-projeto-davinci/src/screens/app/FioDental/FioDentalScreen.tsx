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
import { styles } from './FioDentalScreen.styles';
import { useUIStore } from '@/state/uiStore';
import FioDental from '@/assets/characters/fio.svg';


const carouselItems = [
  {
    id: '1',
    title: 'Sou o Fio Dental!',
    text: [
      'E meu papel é remover restos alimentares e desorganizar a placa bacteriana da região interproximal (entre os dentes), área que as cerdas da escova não alcançam.',
    ],
    image: require('@/assets/images/espaco-biologico.png'),
  },

  {
    id: '2',
    title: 'Sou o Fio Dental!',
    text: [
      'Como minha ação é mecânica, devo, após ser inserido entre dois dentes, ser arrastado contra a face lateral de um dente e, depois, contra a face lateral do dente vizinho. Importante me levar até dentro do sulco gengival.',
      'A recomendação é que eu seja utilizado uma vez ao dia.',
    ],
    image: require('@/assets/images/espaco-biologico.png'),
  },

  {
    id: '3',
    imageGrid: [
      require('@/assets/images/fio-dental-img-1.png'),
      require('@/assets/images/fio-dental-img-2.png'),
      require('@/assets/images/fio-dental-img-3.png'),
      require('@/assets/images/fio-dental-img-4.png'),
      require('@/assets/images/fio-dental-img-5.png'),
      require('@/assets/images/fio-dental-img-6.png'),
      require('@/assets/images/fio-dental-img-7.png'),
    ]
  }
];

export default function FioDentalScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Fio Dental',
        CharacterSvg: FioDental,
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
                
                {item.title && (
                  <>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.text.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                    <Image source={item.image} style={styles.image} />
                  </>
                )}

                {item.imageGrid && (
                  <View style={styles.imageGridContainer}>
                    <View style={styles.imageRow}>
                      <Image source={item.imageGrid[0]} style={styles.gridImage} />
                      <Image source={item.imageGrid[1]} style={styles.gridImage} />
                    </View>
                    <View style={styles.imageRow}>
                      <Image source={item.imageGrid[2]} style={styles.gridImage} />
                      <Image source={item.imageGrid[3]} style={styles.gridImage} />
                    </View>
                    <View style={styles.imageRow}>
                      <Image source={item.imageGrid[4]} style={styles.gridImage} />
                      <Image source={item.imageGrid[5]} style={styles.gridImage} />
                    </View>
                    <View style={styles.imageRow}>
                      <Image source={item.imageGrid[6]} style={styles.gridImageBottom} />
                    </View>
                  </View>
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
            
