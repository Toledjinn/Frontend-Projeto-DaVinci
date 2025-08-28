import React, { useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './NewsDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useNewsStore } from '@/state/newsStore';
import Chefinho from '@/assets/characters/chefinho.svg';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const newsList = useNewsStore((state) => state.news);
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;

  const newsItem = useMemo(() => {
    return newsList.find((item) => item.id === id);
  }, [id, newsList]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'NOVIDADE',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

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
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
      >
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.date}>{newsItem.date}</Text>
        <Image source={newsItem.image} style={styles.image} />
        <Text style={styles.content}>{newsItem.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
