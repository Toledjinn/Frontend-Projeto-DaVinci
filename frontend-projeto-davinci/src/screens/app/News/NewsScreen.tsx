import React, { useCallback, useEffect } from 'react';
import { FlatList, useWindowDimensions, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './NewsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useNewsStore } from '@/state/newsStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import NewsListItem from '@/components/features/NewsListItem';
import ScreenFooter from '@/components/common/ScreenFooter';

const userType = 'admin';

export default function NewsScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.20;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const hydrate = useNewsStore((s) => s.hydrate);
  const isHydrated = useNewsStore((s) => s.isHydrated);
  const news = useNewsStore((s) => s.news);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,

        pageTitle: 'Novidades',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [setHeaderConfig])
  );

  useEffect(() => {
    if (!isHydrated) hydrate();
  }, [isHydrated, hydrate]);

  const handleNewsPress = (id: string) => {
    router.push(`/(app)/novidades/${id}`);
  };

  const handleAddPress = () => {
    router.push('/(app)/criar-novidade');
  };

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.list, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsListItem id={item.id} onPress={handleNewsPress} />
        )}
        style={styles.list}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
      />

      {(userType === 'admin' || userType === 'dentista') && (
        <ScreenFooter
          buttons={[
            {
              title: 'Adicionar Novidade',
              onPress: handleAddPress,
              variant: 'secondary',
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}
