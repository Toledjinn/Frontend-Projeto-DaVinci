import React, { useCallback } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './EducationalContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore, CarouselSlide, PageName } from '@/state/educationalContentStore';

import ScreenFooter from '@/components/common/ScreenFooter';

import Chefinho from '@/assets/characters/chefinho.svg';
import Escova1 from '@/assets/characters/escova1.svg';
import Fio from '@/assets/characters/fio.svg';
import Pasta from '@/assets/characters/pasta.svg';
import Fluor from '@/assets/characters/fluor.svg';
import Revelador from '@/assets/characters/revelador.svg';

const contentConfig = {
  chefinho: {
    title: 'Chefinho',
    CharacterSvg: Chefinho,
    pageName: 'chefinho' as const,
  },
  escova: {
    title: 'Escova',
    CharacterSvg: Escova1,
    pageName: 'escova' as const,
  },
  'fio-dental': {
    title: 'Fio Dental',
    CharacterSvg: Fio,
    pageName: 'fio-dental' as const,
  },
  pasta: {
    title: 'Pasta',
    CharacterSvg: Pasta,
    pageName: 'pasta' as const,
  },
  fluor: {
    title: 'Flúor',
    CharacterSvg: Fluor,
    pageName: 'fluor' as const,
  },
  'revelador-de-placa': {
    title: 'Revelador de Placa',
    CharacterSvg: Revelador,
    pageName: 'revelador-de-placa' as const,
  },
};

type ContentType = keyof typeof contentConfig;

const isValidContentType = (type: any): type is ContentType => {
  return type in contentConfig;
};

const SlideItem = ({ item, width }: { item: CarouselSlide, width: number }) => {
  return (
    <ScrollView style={[styles.slideContainer, { width }]} contentContainerStyle={styles.slideContentContainer}>
      <View style={styles.slideCard}>
        {item.title && <Text style={styles.slideTitle}>{item.title}</Text>}
        {item.image && <Image source={item.image} style={styles.slideImage} resizeMode="contain" />}
        {item.text?.map((p, i) => <Text key={i} style={styles.slideText}>{p}</Text>)}
        {item.quote && <Text style={styles.slideQuote}>{item.quote}</Text>}
        {item.author && <Text style={styles.slideAuthor}>{item.author}</Text>}
        {item.text1 && <Text style={styles.slideText}>{item.text1}</Text>}
        {item.text2 && <Text style={styles.slideText}>{item.text2}</Text>}
        {item.listTitle && <Text style={styles.slideListTitle}>{item.listTitle}</Text>}
        {item.bulletPoints?.map((p, i) => <Text key={i} style={styles.slideBullet}>• {p}</Text>)}
        {item.beforeAfterImages && (
          <View style={styles.beforeAfterContainer}>
            <Image source={item.beforeAfterImages.before} style={styles.beforeAfterImage} resizeMode="contain" />
            <Image source={item.beforeAfterImages.after} style={styles.beforeAfterImage} resizeMode="contain" />
          </View>
        )}
        {item.images && (
          <View style={styles.imageGallery}>
            {item.images.map((img, i) => <Image key={i} source={img} style={styles.galleryImage} resizeMode="contain" />)}
          </View>
        )}
         {item.collageImages && (
          <View style={styles.imageGallery}>
            {item.collageImages.map((img, i) => <Image key={i} source={img} style={styles.galleryImage} resizeMode="contain" />)}
          </View>
        )}
         {item.imageGrid && (
          <View style={styles.imageGridContainer}>
            {item.imageGrid.map((img, i) => <Image key={i} source={img} style={styles.gridImage} resizeMode="contain" />)}
          </View>
        )}
      </View>
    </ScrollView>
  );
};


export default function EducationalContentScreen() {
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const params = useLocalSearchParams<{ contentType: string }>();
  const contentType = isValidContentType(params.contentType) ? params.contentType : 'chefinho';

  const config = contentConfig[contentType];
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const slides = useEducationalContentStore((state) => state.pages[config.pageName]);

  const headerHeight = height * 0.29;

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: config.title,
        CharacterSvg: config.CharacterSvg,
        showNotificationIcon: true,
      });
    }, [contentType, config])
  );

  const handleEditContent = () => {
    router.push({
      pathname: '/(app)/edit-educacional/[contentType]',
      params: { contentType: contentType },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.contentContainer, { paddingTop: headerHeight }]}>
        <FlatList
          data={slides || []}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <SlideItem item={item} width={width} />}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum conteúdo encontrado.</Text>}
        />
      </View>
      <ScreenFooter
        buttons={[
          {
            title: "Editar Conteúdo",
            onPress: handleEditContent,
            variant: 'secondary',
          },
        ]}
      />
    </SafeAreaView>
  );
}

