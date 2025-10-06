import React, { useCallback, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  useWindowDimensions,
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
  const newsList = useNewsStore((state) => state.news);
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.266;

  const newsItem = useMemo(
    () => newsList.find((item) => item.id === id),
    [id, newsList]
  );

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Novidade',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleEditPress = () => {
    if (!id) return;
    router.push({ pathname: '/editar-novidades', params: { id } });
  };

  const convertToEmbedUrl = (url?: string) => {
    if (!url) return '';
    const m = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return m && m[1] ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: headerHeight + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{newsItem.title}</Text>
          <Text style={styles.date}>{newsItem.date}</Text>

          <View style={styles.divider} />

          {newsItem.image && (
            <Image source={newsItem.image} style={styles.image} />
          )}

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

          <Text style={styles.content}>{newsItem.content}</Text>
        </View>
      </ScrollView>

      {userType === 'admin' && (
        <ScreenFooter
          buttons={[
            {
              title: 'Editar Novidade',
              onPress: handleEditPress,
              variant: 'secondary',
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}
