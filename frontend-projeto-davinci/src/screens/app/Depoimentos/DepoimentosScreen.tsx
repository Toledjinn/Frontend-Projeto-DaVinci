import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { styles } from './DepoimentosScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useDepoimentosStore } from '@/state/depoimentosStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

export default function DepoimentosScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const depoimentos = useDepoimentosStore((state) => state.depoimentos);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'DEPOIMENTOS',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const convertToEmbedUrl = (url?: string | null) => {
    if (!url) return null;
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const handleEditPress = () => {
    router.push('/(app)/editar-conteudo-depoimentos'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        {depoimentos.map((depoimento) => (
          <View key={depoimento.id} style={styles.card}>
            {depoimento.videoUrl && (
              <View style={styles.videoContainer}>
                <WebView
                  style={styles.video}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: convertToEmbedUrl(depoimento.videoUrl)! }}
                />
              </View>
            )}
            <Text style={styles.text}>{`"${depoimento.text}"`}</Text>
            <Text style={styles.author}>- {depoimento.author}</Text>
          </View>
        ))}
      </ScrollView>

      {(userType === 'admin') && (
        <ScreenFooter
          primaryButtonTitle="Editar Depoimentos"
          onPrimaryButtonPress={handleEditPress}
        />
      )}
    </SafeAreaView>
  );
}

