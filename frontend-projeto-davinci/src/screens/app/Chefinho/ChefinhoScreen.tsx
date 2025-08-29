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
import { styles } from './ChefinhoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore } from '@/state/educationalContentStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import Escova from '@/assets/characters/escova1.svg';
import Pasta from '@/assets/characters/pasta.svg';
import FioDental from '@/assets/characters/fio.svg';
import Revelador from '@/assets/characters/revelador.svg';

const userType = 'admin';

export default function ChefinhoScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const carouselItems = useEducationalContentStore((state) => state.pages.chefinho);

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

  const handleEditPress = () => {
    router.push({ pathname: '/(app)/editar-conteudo-educacional', params: { page: 'chefinho' } });
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
                    <Image source={item.image!} style={styles.image} />
                    <Text style={styles.quote}>{item.quote}</Text>
                    <Text style={styles.author}>{item.author}</Text>
                  </>
                )}

                {item.text1 && (
                  <>
                    <Text style={styles.text1}>{item.text1}</Text>
                    <Text style={styles.text2}>{item.text2}</Text>
                    <Image source={item.image!} style={styles.newImage} />
                  </>
                )}

                {item.listTitle && (
                  <>
                    <View style={styles.iconRow}>
                      <Chefinho width={55} height={55} style={styles.smallIcon} />
                      <Escova width={55} height={55} style={styles.smallIcon} />
                      <Pasta width={55} height={55} style={styles.smallIcon} />
                      <FioDental width={55} height={55} style={styles.smallIcon} />
                      <Revelador width={55} height={55} style={styles.smallIcon} />
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

      {(userType === 'admin' || userType === 'dentista') && (
        <ScreenFooter
          primaryButtonTitle="Editar Conteúdo"
          onPrimaryButtonPress={handleEditPress}
        />
      )}
    </SafeAreaView>
  );
}
