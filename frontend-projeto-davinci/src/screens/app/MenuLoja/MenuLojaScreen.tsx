import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import styles from './MenuLojaScreen.styles';
import { useUIStore } from '@/state/uiStore';

import Chefinho from '@/assets/characters/chefinho.svg';

import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';

import LogoBadge from '@/components/common/LogoBadge';
import { badge } from '@/ui/badgePresets';

type Mode = 'loja' | 'estoque';

type Props = {
  mode: Mode;
};

const categories = [
  { id: '1', title: 'Escovas', SvgComponent: ToothbrushIcon },
  { id: '2', title: 'Pastas de Dente', SvgComponent: ToothpasteIcon },
  { id: '3', title: 'Fio Dental', SvgComponent: DentalFlossIcon },
  { id: '4', title: 'Flúor', SvgComponent: FluorIcon },
  { id: '5', title: 'Revelador de Placa', SvgComponent: ReveladorIcon },
  { id: '6', title: 'Enxaguante Bucal', SvgComponent: EnxaguanteIcon },
] as const;

export default function MenuLojaScreen({ mode }: Props) {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.34;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const config = useMemo(() => {
    if (mode === 'estoque') {
      return {
        layout: 'page' as const,
        title: 'Estoque',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
        categoryRouteBase: '/(app)/estoque-categoria' as const,
      };
    }
    return {
      layout: 'loja' as const,
      title: 'Loja',
      CharacterSvg: Chefinho, 
      showNotificationIcon: false,
      categoryRouteBase: '/(app)/loja-categoria' as const,
    };
  }, [mode]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: config.layout,
        showPageHeaderElements: true,
        pageTitle: config.title,
        CharacterSvg: config.CharacterSvg,
        showNotificationIcon: config.showNotificationIcon,
      });
    }, [config, setHeaderConfig]),
  );

  const handleCategoryPress = (category: (typeof categories)[number]) => {
    router.push({
      pathname: config.categoryRouteBase,
      params: { category: category.title },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <View style={styles.gridContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={category.title}
            >
              <LogoBadge {...badge.storeButton(category.SvgComponent)} />
              <Text style={styles.itemText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
