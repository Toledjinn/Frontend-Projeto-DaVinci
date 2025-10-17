import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import styles from './LojaCategoriaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEstoqueStore, CategoryName } from '@/state/estoqueStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import Chefinho from '@/assets/characters/chefinho.svg';
import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';
import ProductListItem from '@/components/features/ProductListItem';

const CATEGORY_ICON_MAP: Record<string, React.FC<SvgProps>> = {
  Escovas: ToothbrushIcon,
  'Pastas de Dente': ToothpasteIcon,
  'Fio Dental': DentalFlossIcon,
  Flúor: FluorIcon,
  'Revelador de Placa': ReveladorIcon,
  'Enxaguante Bucal': EnxaguanteIcon,
};

const isValidCategory = (c: any): c is CategoryName =>
  ['Escovas', 'Pastas de Dente', 'Fio Dental', 'Flúor', 'Revelador de Placa', 'Enxaguante Bucal'].includes(c);

export default function LojaCategoriaScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.22;

  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const hydrate = useEstoqueStore((s) => s.hydrate);
  const isHydrated = useEstoqueStore((s) => s.isHydrated);

  const products = useEstoqueStore((s) =>
    isValidCategory(category) ? s.categories[category] : []
  );

  useFocusEffect(
    useCallback(() => {
      const CharacterSvg =
        (category && CATEGORY_ICON_MAP[category]) || (Chefinho as React.FC<SvgProps>);

      setHeaderConfig({
        visible: true,
        layout: 'loja',
        showPageHeaderElements: true,
        pageTitle: (category?.toUpperCase() || 'LOJA') as string,
        CharacterSvg,
        showNotificationIcon: false,
        pageHeaderBadgeVariant: 'store',
      });

      if (!isHydrated) hydrate();
    }, [category, isHydrated, hydrate, setHeaderConfig])
  );

  const validCategory = isValidCategory(category);
  const list = useMemo(() => (validCategory ? products : []), [validCategory, products]);

  const handleProductPress = (productId: string) => {
    if (!validCategory) return;
    router.push({
      pathname: '/(app)/detalhes-produto',
      params: { id: productId, category },
    });
  };

  if (!isHydrated) return <SafeAreaView style={styles.safeArea} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
      >
        {!validCategory || list.length === 0 ? (
          <View style={styles.noProductsContainer}>
            <Text style={styles.noProductsText}>
              {validCategory ? 'Nenhum produto encontrado nesta categoria.' : 'Categoria inválida.'}
            </Text>
          </View>
        ) : (
          list.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              onPress={handleProductPress}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
