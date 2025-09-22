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
import { WebView } from 'react-native-webview'; 
import { styles } from './ParceirosScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLaboratorioStore } from '@/state/laboratorioStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

const convertYouTubeUrl = (url: string) => {
  if (!url) return '';
  let videoId = '';
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  }
  return `https://www.youtube.com/embed/${videoId}`;
};

export default function ParceirosScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const carouselItems = useLaboratorioStore((state) => state.pages.parceiros?.slides || []);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Parceiros',
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
    router.push({ pathname: '/(app)/editar-laboratorio', params: { page: 'parceiros' } });
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
                <Text style={styles.title}>{item.title}</Text>
                {item.videoUrl ? (
                  <View style={styles.videoContainer}>
                    <WebView
                      source={{ uri: convertYouTubeUrl(item.videoUrl) }}
                      style={styles.video}
                      allowsFullscreenVideo
                    />
                  </View>
                ) : (
                  item.image && <Image source={item.image} style={styles.image} />
                )}

                <Text style={styles.paragraph}>{item.text}</Text>
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
