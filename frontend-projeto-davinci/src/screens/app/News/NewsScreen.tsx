import React, { useCallback } from 'react';
import {
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './NewsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useNewsStore } from '@/state/newsStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import NewsListItem, { NewsItemProps } from '@/components/features/NewsListItem';
import { COLORS } from '@/constants/theme';

const userType = 'admin';

export default function NewsScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.192;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const news = useNewsStore((state) => state.news);

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
    }, [])
  );

  const handleNewsPress = (item: NewsItemProps) => {
    router.push(`/(app)/novidades/${item.id}`);
  };

  const handleAddPress = () => {
    router.push('/(app)/criar-novidade');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsListItem item={item} onPress={() => handleNewsPress(item)} />
        )}
        style={styles.list}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
      />

      {(userType === 'admin' || userType === 'dentista') && (
        <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
          <Feather name="plus" size={30} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
