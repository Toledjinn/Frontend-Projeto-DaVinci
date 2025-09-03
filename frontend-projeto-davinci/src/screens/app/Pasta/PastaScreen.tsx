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
import { styles } from './PastaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore } from '@/state/educationalContentStore';
import Pasta from '@/assets/characters/pasta.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import Chefinho from '@/assets/characters/chefinho.svg';
import Escova from '@/assets/characters/escova1.svg';
import FioDental from '@/assets/characters/fio.svg';
import Revelador from '@/assets/characters/revelador.svg';

const userType = 'admin';

export default function PastaScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const carouselItems = useEducationalContentStore((state) => state.pages.pasta);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Pasta de Dente',
        CharacterSvg: Pasta,
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
    router.push({ pathname: '/(app)/editar-conteudo-educacional', params: { page: 'pasta' } });
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
                {item.collageImages ? (
                  <>
                    {item.text1 && <Text style={styles.paragraph}>{item.text1}</Text>}
                    <View style={styles.collageContainer}>
                      <Image source={item.collageImages[0]} style={styles.collageMainImage} />
                      <View style={styles.collageSideContainer}>
                        <Image source={item.collageImages[1]} style={styles.collageSideImage} />
                        <Image source={item.collageImages[2]} style={styles.collageSideImage} />
                      </View>
                    </View>
                    {item.text2 && <Text style={styles.paragraph}>{item.text2}</Text>}
                  </>
                ) : 
                item.images ? (
                  <>
                    {item.title && <Text style={styles.title}>{item.title}</Text>}
                    {item.text && <Text style={styles.paragraph}>{item.text.join('\n')}</Text>}
                    <View style={styles.imageGrid}>
                      <View style={styles.imageGridRowTop}>
                        <Image source={item.images[0]} style={styles.gridImageSide} />
                        <Image source={item.images[1]} style={styles.gridImageSide} />
                      </View>
                      <Image source={item.images[2]} style={styles.gridImageBottom} />
                    </View>
                  </>
                ) : 
                item.quote ? (
                  <>
                    {item.image && <Image source={item.image} style={styles.image} />}
                    <Text style={styles.quote}>{item.quote}</Text>
                    {item.author && <Text style={styles.author}>{item.author}</Text>}
                  </>
                ) : 
                item.text1 ? (
                  <>
                    <Text style={styles.text1}>{item.text1}</Text>
                    {item.text2 && <Text style={styles.text2}>{item.text2}</Text>}
                    {item.image && <Image source={item.image} style={styles.newImage} />}
                  </>
                ) : 
                item.listTitle ? (
                  <>
                    {item.id.startsWith('chefinho') && (
                        <View style={styles.iconRow}>
                            <Chefinho width={30} height={30} style={styles.smallIcon} />
                            <Escova width={30} height={30} style={styles.smallIcon} />
                            <Pasta width={30} height={30} style={styles.smallIcon} />
                            <FioDental width={30} height={30} style={styles.smallIcon} />
                            <Revelador width={30} height={30} style={styles.smallIcon} />
                        </View>
                    )}
                    <Text style={styles.listTitle}>{item.listTitle}</Text>
                    {item.bulletPoints?.map((point, index) => (
                      <View key={index} style={styles.bulletPointContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}
                  </>
                ) : 
                item.beforeAfterImages ? (
                  <>
                    {item.text?.map((p, i) => <Text key={i} style={styles.paragraph}>{p}</Text>)}
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
                ) : 
                item.imageGrid ? (
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
                ) : (
                  <>
                    {item.title && <Text style={styles.title}>{item.title}</Text>}
                    {item.text?.map((p, i) => <Text key={i} style={styles.paragraph}>{p}</Text>)}
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

