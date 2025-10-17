import React, { useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';

import { styles } from './NewsDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useNewsStore } from '@/state/newsStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const hydrate = useNewsStore((s) => s.hydrate);
  const isHydrated = useNewsStore((s) => s.isHydrated);

  const newsItem = useNewsStore(
    useCallback((s) => (id ? s.getNewsById(id) : undefined), [id])
  );

  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.30;

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Novidade',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [setHeaderConfig])
  );

  useEffect(() => {
    if (!isHydrated) hydrate();
  }, [isHydrated, hydrate]);

  const handleEditPress = () => {
    if (!id) return;
    router.push({ pathname: '/editar-novidades', params: { id } });
  };

  const convertToEmbedUrl = (url?: string) => {
    if (!url) return '';
    const m = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return m && m[1] ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.scrollView, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (!newsItem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.title}>Notícia não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.pageBody,
          styles.pageBodySidePadding,
          { paddingTop: headerHeight },
        ]}
      >
        <View style={styles.card}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 16 }}
            showsVerticalScrollIndicator
          >
            <Text style={styles.title}>{newsItem.title}</Text>
            <Text style={styles.date}>{newsItem.date}</Text>

            <View style={styles.divider} />

            {newsItem.image && <Image source={newsItem.image} style={styles.image} />}

            {newsItem.videoUrl && (
              <View style={styles.videoContainer}>
                <WebView
                  style={styles.video}
                  javaScriptEnabled
                  domStorageEnabled
                  source={{ uri: convertToEmbedUrl(newsItem.videoUrl) }}
                />
              </View>
            )}

            {!!newsItem.content && <Text style={styles.content}>{newsItem.content}</Text>}
          </ScrollView>
        </View>
      </View>

      {userType === 'admin' && (
        <ScreenFooter
          buttons={[
            { title: 'Editar Novidade', onPress: handleEditPress, variant: 'secondary' },
          ]}
        />
      )}
    </SafeAreaView>
  );
}
