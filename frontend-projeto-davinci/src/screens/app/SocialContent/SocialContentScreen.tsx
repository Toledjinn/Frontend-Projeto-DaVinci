import React, { useCallback } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

import { styles } from './SocialContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import {
  useSocialStore,
  SocialContent,
  PageName,
  ContentBlock,
  DepoimentoItem,
} from '@/state/socialStore';

import ScreenFooter from '@/components/common/ScreenFooter';

import Chefinho from '@/assets/characters/chefinho.svg';
import Escova2 from '@/assets/characters/escova2.svg';
import Escova3 from '@/assets/characters/escova3.svg';
import Escova4 from '@/assets/characters/escova4.svg';

const socialContentConfig: Record<PageName, { title: string; CharacterSvg: React.FC<any> }> = {
  oQueE: { title: 'O que é?', CharacterSvg: Escova4 },
  comoParticipar: { title: 'Como Participar?', CharacterSvg: Escova2 },
  depoimentos: { title: 'Depoimentos', CharacterSvg: Escova3 },
};

const isValidPageName = (page: any): page is PageName => page in socialContentConfig;

const convertToEmbedUrl = (url?: string | null) => {
  if (!url) return '';
  const m = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return m && m[1] ? `https://www.youtube.com/embed/${m[1]}` : url;
};

const isSimplePage = (p: PageName) => p === 'oQueE' || p === 'comoParticipar';

export default function SocialContentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ pageName: string }>();

  const pageName = isValidPageName(params.pageName) ? params.pageName : 'oQueE';
  const config = socialContentConfig[pageName];

  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const hydrate = useSocialStore((s) => s.hydrate);
  const isHydrated = useSocialStore((s) => s.isHydrated);
  const contentBlocks = useSocialStore((s) => s.pages[pageName]);

  const { height } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const bodyOffset = headerHeight + 8;
  const userType = 'admin';

  useFocusEffect(
    useCallback(() => {
      hydrate();
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: config.title,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
        showBackground: true,
      });
    }, [pageName, config])
  );

  const renderContentBlock = (block: SocialContent, index?: number) => {
    if (block.type === 'depoimento') {
      const depo = block as DepoimentoItem;
      const embedUrl = convertToEmbedUrl(depo.videoUrl);
      return (
        <View key={depo.id} style={styles.card}>
          {embedUrl ? (
            <View style={styles.videoContainer}>
              <WebView style={styles.video} javaScriptEnabled source={{ uri: embedUrl }} />
            </View>
          ) : null}
          <Text style={styles.depoimentoText}>{`"${depo.text}"`}</Text>
          <Text style={styles.author}>— {depo.author}</Text>
        </View>
      );
    }

    const cb = block as ContentBlock;

    if (cb.type === 'text') {
      return (
        <View key={cb.id ?? `t_${index}`} style={{ marginBottom: 12 }}>
          <Text style={styles.paragraph}>{cb.content}</Text>
        </View>
      );
    }

    if (cb.type === 'image' && cb.image) {
      return <Image key={cb.id ?? `i_${index}`} source={cb.image} style={styles.image} resizeMode="contain" />;
    }

    if (cb.type === 'video' && cb.videoUrl) {
      const embedUrl = convertToEmbedUrl(cb.videoUrl);
      return (
        <View key={cb.id ?? `v_${index}`} style={styles.videoContainer}>
          <WebView style={styles.video} javaScriptEnabled source={{ uri: embedUrl }} />
        </View>
      );
    }

    return null;
  };

  if (!isHydrated) return <SafeAreaView style={styles.safeArea} />;

  const handleEditPress = () =>
    router.push({ pathname: '/(app)/edit-social/[pageName]', params: { pageName } });

  if (isSimplePage(pageName)) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.pageBody, styles.pageBodySidePadding, { paddingTop: bodyOffset }]}>
          <View style={styles.card}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingVertical: 16 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {contentBlocks.map((b, i) => renderContentBlock(b, i))}
            </ScrollView>
          </View>
        </View>

        {userType === 'admin' && (
          <ScreenFooter buttons={[{ title: 'Editar Seção', onPress: handleEditPress, variant: 'secondary' }]} />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[{ paddingTop: bodyOffset, paddingHorizontal: 12 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {contentBlocks.map((b, i) => renderContentBlock(b, i))}
      </ScrollView>

      {userType === 'admin' && (
        <ScreenFooter buttons={[{ title: 'Editar Seção', onPress: handleEditPress, variant: 'secondary' }]} />
      )}
    </SafeAreaView>
  );
}
