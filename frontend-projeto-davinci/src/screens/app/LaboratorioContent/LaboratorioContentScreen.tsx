import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { styles } from './LaboratorioContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLaboratorioStore, PageName } from '@/state/laboratorioStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

const isValidPageName = (name: any): name is PageName => {
  return ['nossaFilosofia', 'trabalhos', 'parceiros'].includes(name);
};

export default function LaboratorioContentScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { pageName } = useLocalSearchParams<{ pageName: string }>();

  const page = isValidPageName(pageName) ? pageName : 'nossaFilosofia';
  const { title, slides: carouselItems } = useLaboratorioStore((state) => state.pages[page]);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: title,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [title])
  );

  const convertToEmbedUrl = (url?: string) => {
    if (!url) return '';
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleEditPress = () => {
    router.push({
      pathname: '/(app)/edit-laboratorio/[pageName]',
      params: { pageName: page },
    });
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
          contentContainerStyle={[
            styles.carouselContent,
            { paddingTop: height * 0.29 }, 
          ]}
        >

          {carouselItems &&
            carouselItems.map((item) => (
              <View key={item.id} style={[styles.slide, { width: windowWidth }]}>
                <View style={styles.card}>
                  <Text style={styles.title}>{item.title}</Text>

                  <View style={styles.divider} />
                  {item.videoUrl ? (
                    <View style={styles.videoContainer}>
                      <WebView
                        style={styles.video}
                        javaScriptEnabled
                        domStorageEnabled
                        source={{ uri: convertToEmbedUrl(item.videoUrl) }}
                      />
                    </View>
                  ) : (
                    item.image && (
                      <Image source={item.image} style={styles.image} resizeMode="contain" />
                    )
                  )}

                  <Text style={styles.paragraph}>{item.text}</Text>
                </View>
              </View>
            ))}
        </ScrollView>

        <View style={styles.paginationContainer}>
          {carouselItems &&
            carouselItems.map((_, index) => (
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

      {userType === 'admin' && (
        <ScreenFooter
          buttons={[
            {
              title: 'Editar Conteúdo',
              onPress: handleEditPress,
              variant: 'secondary',
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}
