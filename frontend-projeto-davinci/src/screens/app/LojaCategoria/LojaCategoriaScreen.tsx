import React, { useCallback } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import styles from './LojaCategoriaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLojaStore } from '@/state/lojaStore';
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

export default function LojaCategoriaScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { getProductsByCategory, cart } = useLojaStore();
  const products = getProductsByCategory(category as any);
  const totalCartItems = cart.reduce((t, i) => t + i.quantity, 0);

  const handleProductPress = (productId: string) => {
    router.push({ pathname: '/(app)/detalhes-produto', params: { id: productId } });
  };

  useFocusEffect(
    useCallback(() => {
      const CharacterSvg =
        (category && CATEGORY_ICON_MAP[category]) || (Chefinho as React.FC<SvgProps>);

      setHeaderConfig({
        visible: true,
        layout: 'loja',                   
        showPageHeaderElements: true,      
        pageTitle: (category?.toUpperCase() || 'PRODUTOS') as string,
        CharacterSvg,                      
        showNotificationIcon: false,      
        pageHeaderBadgeVariant: 'store',   
      });
    }, [category, totalCartItems, setHeaderConfig])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: height * 0.216 }]}
        showsVerticalScrollIndicator={false}
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
