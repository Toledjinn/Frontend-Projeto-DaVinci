import React, { useCallback } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { styles } from './SocialContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useSocialStore, SocialContent, PageName, ContentBlock, DepoimentoItem } from '@/state/socialStore';

import ScreenFooter from '@/components/common/ScreenFooter';

import Chefinho from '@/assets/characters/chefinho.svg';
import Escova2 from '@/assets/characters/escova2.svg';
import Escova3 from '@/assets/characters/escova3.svg';
import Escova4 from '@/assets/characters/escova4.svg';

const socialContentConfig = {
  oQueE: {
    title: 'O que é?',
    CharacterSvg: Escova4,
  },
  comoParticipar: {
    title: 'Como Participar?',
    CharacterSvg: Escova2,
  },
  depoimentos: {
    title: 'Depoimentos',
    CharacterSvg: Escova3,
  },
};

const isValidPageName = (page: any): page is PageName => {
  return page in socialContentConfig;
};

const convertToEmbedUrl = (url?: string | null) => {
    if (!url) return '';
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return (videoIdMatch && videoIdMatch[1]) ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
};


export default function SocialContentScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const params = useLocalSearchParams<{ pageName: string }>();
  
  const pageName = isValidPageName(params.pageName) ? params.pageName : 'oQueE';
  const config = socialContentConfig[pageName];

  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const contentBlocks = useSocialStore((state) => state.pages[pageName]);
  
  const headerHeight = height * 0.224;
  const userType = 'admin'; 

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: config.title,
        CharacterSvg: Chefinho, 
        showNotificationIcon: true,
      });
    }, [pageName, config])
  );

  const handleEditPress = () => {
    router.push({
      pathname: '/(app)/edit-social/[pageName]',
      params: { pageName: pageName }, 
    });
  };

  const renderContentBlock = (block: SocialContent) => {
    if (block.type === 'depoimento') {
      const depoimento = block as DepoimentoItem;
      const embedUrl = convertToEmbedUrl(depoimento.videoUrl);
      return (
        <View key={depoimento.id} style={styles.card}>
          {embedUrl && (
            <View style={styles.videoContainer}>
              <WebView
                style={styles.video}
                javaScriptEnabled={true}
                source={{ uri: embedUrl }}
              />
            </View>
          )}
          <Text style={styles.depoimentoText}>{`"${depoimento.text}"`}</Text>
          <Text style={styles.author}>- {depoimento.author}</Text>
        </View>
      );
    }

    const contentBlock = block as ContentBlock;
    if (contentBlock.type === 'text') {
      return <Text key={contentBlock.id} style={styles.paragraph}>{contentBlock.content}</Text>;
    }
    if (contentBlock.type === 'image' && contentBlock.image) {
      return <Image key={contentBlock.id} source={contentBlock.image} style={styles.image} resizeMode="contain" />;
    }
    if (contentBlock.type === 'video' && contentBlock.videoUrl) {
      const embedUrl = convertToEmbedUrl(contentBlock.videoUrl);
      return (
        <View key={contentBlock.id} style={styles.videoContainer}>
          <WebView
            style={styles.video}
            javaScriptEnabled={true}
            source={{ uri: embedUrl }}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        {contentBlocks.map(renderContentBlock)}
      </ScrollView>

      {userType === 'admin' && (
        <ScreenFooter
          buttons={[
            {
              title: `Editar "${config.title}"`,
              onPress: handleEditPress,
              variant: 'secondary',
            }
          ]}
        />
      )}
    </SafeAreaView>
  );
}
