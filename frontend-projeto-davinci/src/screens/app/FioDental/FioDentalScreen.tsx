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
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './FioDentalScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore } from '@/state/educationalContentStore';
import FioDental from '@/assets/characters/fio.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

export default function FioDentalScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const carouselItems = useEducationalContentStore((state) => state.pages.fioDental);

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

  const handleEditPress = () => {
    router.push({ pathname: '/(app)/editar-conteudo-educacional', params: { page: 'fioDental' } });
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
                    {item.text?.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                    <Image source={item.image!} style={styles.image} />
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
      {(userType === 'admin' || userType === 'dentista') && (
        <ScreenFooter
          primaryButtonTitle="Editar Conteúdo"
          onPrimaryButtonPress={handleEditPress}
        />
      )}
    </SafeAreaView>
  );
}
