import React, { useCallback } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Alert } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import styles from './LojaCategoriaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLojaStore, ProductItem } from '@/state/lojaStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';
import ProductListItem from '@/components/features/ProductListItem';

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<any>> = {
  Escovas: ToothbrushIcon,
  'Pastas de Dente': ToothpasteIcon,
  'Fio Dental': DentalFlossIcon,
  Flúor: FluorIcon,
  'Revelador de Placa': ReveladorIcon,
  'Enxaguante Bucal': EnxaguanteIcon,
};

const ICON_SCALE: Partial<Record<string, number>> = {
  Escovas: 0.74,
  'Pastas de Dente': 0.72,
  'Fio Dental': 0.72,
  Flúor: 0.7,
  'Revelador de Placa': 0.72,
  'Enxaguante Bucal': 0.72,
};

const fitIconForHeader = (Svg: React.ComponentType<any>, scalePct = 0.72) => {
  const pct = `${Math.round(scalePct * 100)}%`;
  const Fitted = () => (
    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Svg width={pct} height={pct} preserveAspectRatio="xMidYMid meet" />
    </View>
  );
  return Fitted;
};

export default function LojaCategoriaScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { getProductsByCategory, addWithQuantity, cart } = useLojaStore();
  const products = getProductsByCategory(category as any);
  const totalCartItems = cart.reduce((t, i) => t + i.quantity, 0);

  const handleProductPress = (productId: string) => {
    router.push({ pathname: '/(app)/detalhes-produto', params: { id: productId } });
  };

  useFocusEffect(
    useCallback(() => {
      const BaseIcon = category ? CATEGORY_ICON_MAP[category] : undefined;
      const CharacterSvg = BaseIcon ? fitIconForHeader(BaseIcon, ICON_SCALE[category as string] ?? 0.72) : Chefinho;

      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: (category?.toUpperCase() || 'PRODUTOS') as string,
        CharacterSvg,
        showNotificationIcon: false,
      });
    }, [category, totalCartItems, setHeaderConfig])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: height * 0.216 }]}
      >
        {products.length === 0 ? (
          <View style={styles.noProductsContainer}>
            <Text style={styles.noProductsText}>Nenhum produto encontrado nesta categoria.</Text>
          </View>
        ) : (
          products.map((product) => (
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
