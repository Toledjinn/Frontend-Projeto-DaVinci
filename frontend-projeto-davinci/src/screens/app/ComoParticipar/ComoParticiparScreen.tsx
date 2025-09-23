import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview'; 
import { styles } from './ComoParticiparScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useSocialStore } from '@/state/socialStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

export default function ComoParticiparScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const contentBlocks = useSocialStore((state) => state.pages.comoParticipar);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'COMO PARTICIPAR?',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleEditPress = () => {
    router.push({ pathname: '/(app)/editar-conteudo-simples', params: { page: 'comoParticipar' } });
  };

  const convertToEmbedUrl = (url?: string) => {
    if (!url) return '';
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        {contentBlocks && contentBlocks.map((block) => {
          if (block.type === 'text') {
            return <Text key={block.id} style={styles.paragraph}>{block.content}</Text>;
          }
          if (block.type === 'image' && block.image) {
            return <Image key={block.id} source={block.image} style={styles.image} />;
          }
          if (block.type === 'video' && block.videoUrl) {
            const embedUrl = convertToEmbedUrl(block.videoUrl);
            return (
              <View key={block.id} style={styles.videoContainer}>
                <WebView
                  style={styles.video}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: embedUrl }}
                />
              </View>
            );
          }
          return null;
        })}
      </ScrollView>

      {(userType === 'admin' || userType === 'dentista') && (
        <ScreenFooter
          primaryButtonTitle="Editar Conteúdo"
          onPrimaryButtonPress={handleEditPress}
        />
      )}
    </SafeAreaProvider>
  );
}
