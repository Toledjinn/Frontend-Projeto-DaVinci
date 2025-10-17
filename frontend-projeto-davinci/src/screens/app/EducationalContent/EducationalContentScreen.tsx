import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './EducationalContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore, CarouselSlide } from '@/state/educationalContentStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import Chefinho from '@/assets/characters/chefinho.svg';
import Escova1 from '@/assets/characters/escova1.svg';
import Fio from '@/assets/characters/fio.svg';
import Pasta from '@/assets/characters/pasta.svg';
import Fluor from '@/assets/characters/fluor.svg';
import Revelador from '@/assets/characters/revelador.svg';

const contentConfig = {
  chefinho: { title: 'Chefinho', CharacterSvg: Chefinho, pageName: 'chefinho' as const },
  escova: { title: 'Escova', CharacterSvg: Escova1, pageName: 'escova' as const },
  'fio-dental': { title: 'Fio Dental', CharacterSvg: Fio, pageName: 'fio-dental' as const },
  pasta: { title: 'Pasta', CharacterSvg: Pasta, pageName: 'pasta' as const },
  fluor: { title: 'Flúor', CharacterSvg: Fluor, pageName: 'fluor' as const },
  'revelador-de-placa': { title: 'Revelador de Placa', CharacterSvg: Revelador, pageName: 'revelador-de-placa' as const },
};

type ContentType = keyof typeof contentConfig;
const isValidContentType = (t: any): t is ContentType => t in contentConfig;
const DOT_SIZE = 16;

function SlideCard({ item }: { item: CarouselSlide }) {
  return (
    <ScrollView style={styles.slideScroll} contentContainerStyle={styles.slideScrollContent} showsVerticalScrollIndicator>
      {item.title ? <Text style={styles.slideTitle}>{item.title}</Text> : null}
      {item.image ? <Image source={item.image} style={styles.slideImage} resizeMode="contain" /> : null}
      {item.text?.map((p, i) => (
        <Text key={i} style={styles.slideText}>{p}</Text>
      ))}
      {item.quote ? <Text style={styles.slideQuote}>{item.quote}</Text> : null}
      {item.author ? <Text style={styles.slideAuthor}>{item.author}</Text> : null}
      {item.text1 ? <Text style={styles.slideText}>{item.text1}</Text> : null}
      {item.text2 ? <Text style={styles.slideText}>{item.text2}</Text> : null}
      {item.listTitle ? <Text style={styles.slideListTitle}>{item.listTitle}</Text> : null}
      {item.bulletPoints?.map((p, i) => (
        <Text key={i} style={styles.slideBullet}>• {p}</Text>
      ))}
      {item.beforeAfterImages ? (
        <View style={styles.beforeAfterContainer}>
          <Image source={item.beforeAfterImages.before} style={styles.beforeAfterImage} resizeMode="contain" />
          <Image source={item.beforeAfterImages.after} style={styles.beforeAfterImage} resizeMode="contain" />
        </View>
      ) : null}
      {item.images ? (
        <View style={styles.imageGallery}>
          {item.images.map((img, i) => (
            <Image key={i} source={img} style={styles.galleryImage} resizeMode="contain" />
          ))}
        </View>
      ) : null}
      {item.collageImages ? (
        <View style={styles.imageGallery}>
          {item.collageImages.map((img, i) => (
            <Image key={i} source={img} style={styles.galleryImage} resizeMode="contain" />
          ))}
        </View>
      ) : null}
      {item.imageGrid ? (
        <View style={styles.imageGridContainer}>
          {item.imageGrid.map((img, i) => (
            <Image key={i} source={img} style={styles.gridImage} resizeMode="cover" />
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

export default function EducationalContentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ contentType: string }>();
  const contentType = isValidContentType(params.contentType) ? params.contentType : 'chefinho';
  const config = contentConfig[contentType];
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const { height, width } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const topOffset = headerHeight + 8;
  const hydrate = useEducationalContentStore((s) => s.hydrate);
  const isHydrated = useEducationalContentStore((s) => s.isHydrated);
  const slides = useEducationalContentStore((s) => s.pages[config.pageName]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const onPagerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const w = e.nativeEvent.layoutMeasurement.width || 1;
    const idx = Math.round(e.nativeEvent.contentOffset.x / w);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  useFocusEffect(
    useCallback(() => {
      hydrate();
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: config.title,
        CharacterSvg: config.CharacterSvg,
        showNotificationIcon: true,
        showBackground: true,
      });
    }, [contentType, config])
  );

  if (!isHydrated) return <SafeAreaView style={styles.safeArea} />;

  const data = slides || [];
  const empty = data.length === 0;
  const fallbackCardWidth = Math.max(0, width - 24);
  const innerPadding = 32;
  const contentWidth = Math.max(1, (cardWidth || fallbackCardWidth) - innerPadding);

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
              <View style={[styles.slidePage, { width: contentWidth, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.emptyText}>Nenhum conteúdo encontrado.</Text>
              </View>
            ) : (
              data.map((item) => (
                <View key={item.id} style={[styles.slidePage, { width: contentWidth }]}>
                  <SlideCard item={item} />
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {!empty && (
          <View style={styles.paginationContainer}>
            <View style={styles.dotsRow}>
              {data.map((_, i) => (
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
              router.push({ pathname: '/(app)/edit-educacional/[contentType]', params: { contentType } }),
            variant: 'secondary',
          },
        ]}
      />
    </SafeAreaView>
  );
}
