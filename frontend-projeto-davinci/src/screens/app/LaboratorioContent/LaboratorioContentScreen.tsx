import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

import { styles } from './LaboratorioContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLaboratorioStore, PageName } from '@/state/laboratorioStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import Chefinho from '@/assets/characters/chefinho.svg';

const DOT_SIZE = 16;

const isValidPageName = (name: any): name is PageName =>
  ['nossaFilosofia', 'trabalhos', 'parceiros'].includes(name);

function SlideContent({
  title,
  image,
  text,
  videoUrl,
}: {
  title?: string;
  image?: any;
  text?: string;
  videoUrl?: string;
}) {
  const toEmbed = (url?: string) => {
    if (!url) return '';
    const m = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return m?.[1] ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

  return (
    <ScrollView
      style={styles.slideScroll}
      contentContainerStyle={styles.slideScrollContent}
      showsVerticalScrollIndicator
    >
      {title ? <Text style={styles.title}>{title}</Text> : null}

      <View style={styles.divider} />

      {videoUrl ? (
        <View style={styles.videoContainer}>
          <WebView style={styles.video} javaScriptEnabled domStorageEnabled source={{ uri: toEmbed(videoUrl) }} />
        </View>
      ) : image ? (
        <Image source={image} style={styles.image} resizeMode="contain" />
      ) : null}

      {text ? <Text style={styles.paragraph}>{text}</Text> : null}
    </ScrollView>
  );
}

export default function LaboratorioContentScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const topOffset = headerHeight + 8;

  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const { pageName } = useLocalSearchParams<{ pageName: string }>();

  const hydrate = useLaboratorioStore((s) => s.hydrate);
  const isHydrated = useLaboratorioStore((s) => s.isHydrated);

  const page: PageName = isValidPageName(pageName) ? pageName! : 'nossaFilosofia';
  const pageData = useLaboratorioStore((s) => s.pages[page]);
  const slides = pageData?.slides ?? [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useFocusEffect(
    useCallback(() => {
      hydrate();
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: pageData?.title ?? 'Laboratório',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [pageData?.title])
  );

  if (!isHydrated) return <SafeAreaView style={styles.safeArea} />;

  const onPagerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const w = e.nativeEvent.layoutMeasurement.width;
    const idx = Math.round(e.nativeEvent.contentOffset.x / w);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  const contentWidth = Math.max(0, cardWidth - 32);
  const empty = slides.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.pageBody, styles.pageBodySidePadding, { paddingTop: topOffset }]}>

        <View style={styles.card} onLayout={(e: LayoutChangeEvent) => setCardWidth(e.nativeEvent.layout.width)}>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onPagerScroll}
            scrollEventThrottle={16}
            style={{ flex: 1 }}
          >
            {empty ? (
              <View style={[styles.slidePage, { width: contentWidth }]}>
                <View
                  style={[
                    styles.slideScroll,
                    { justifyContent: 'center', alignItems: 'center' },
                  ]}
                >
                  <Text style={styles.paragraph}>Nenhum conteúdo encontrado.</Text>
                </View>
              </View>
            ) : (
              slides.map((slide) => (
                <View key={slide.id} style={[styles.slidePage, { width: contentWidth }]}>
                  <SlideContent
                    title={slide.title}
                    image={slide.image}
                    text={slide.text}
                    videoUrl={slide.videoUrl}
                  />
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {!empty && (
          <View style={styles.paginationContainer}>
            <View style={styles.dotsRow}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dotBase,
                    {
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderRadius: DOT_SIZE / 2,
                      backgroundColor: i === activeIndex ? '#FFC045' : '#D1D5DB',
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        )}
      </View>

      <ScreenFooter
        buttons={[
          {
            title: 'Editar Conteúdo',
            onPress: () =>
              router.push({
                pathname: '/(app)/edit-laboratorio/[pageName]',
                params: { pageName: page },
              }),
            variant: 'secondary',
          },
        ]}
      />
    </SafeAreaView>
  );
}
