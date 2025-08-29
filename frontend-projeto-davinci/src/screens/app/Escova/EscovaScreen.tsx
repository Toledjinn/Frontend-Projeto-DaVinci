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
import { styles } from './EscovaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore } from '@/state/educationalContentStore';
import Escova from '@/assets/characters/escova1.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

export default function EscovaScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const carouselItems = useEducationalContentStore((state) => state.pages.escova);

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

  const handleEditPress = () => {
    router.push({ pathname: '/(app)/editar-conteudo-educacional', params: { page: 'escova' } });
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
                {item.beforeAfterImages ? (
                   <>
                    {item.text?.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                    <View style={styles.imageRow}>
                      <View style={styles.imageContainer}>
                        <Image source={item.beforeAfterImages.before} style={styles.sideImage} />
                        <Text style={styles.imageLabel}>Antes</Text>
                      </View>
                      <View style={styles.imageContainer}>
                        <Image source={item.beforeAfterImages.after} style={styles.sideImage} />
                        <Text style={styles.imageLabel}>Depois</Text>
                      </View>
                    </View>
                  </>
                ) : item.listTitle ? (
                  <>
                    <Text style={styles.listTitle}>{item.listTitle}</Text>
                    {item.bulletPoints?.map((point, index) => (
                      <View key={index} style={styles.bulletPointContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}
                  </>
                ) : (
                  <>
                    {item.title && <Text style={styles.title}>{item.title}</Text>}
                    {item.text?.map((paragraph, index) => (
                      <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                    {item.image && <Image source={item.image} style={styles.image} />}
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
