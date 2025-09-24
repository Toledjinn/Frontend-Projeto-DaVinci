import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import styles from './LojaCategoriaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLojaStore, ProductItem } from '@/state/lojaStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import { COLORS } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<any>> = {
  'Escovas': ToothbrushIcon,
  'Pastas de Dente': ToothpasteIcon,
  'Fio Dental': DentalFlossIcon,
  'Flúor': FluorIcon,
  'Revelador de Placa': ReveladorIcon,
  'Enxaguante Bucal': EnxaguanteIcon,
};

const ICON_SCALE: Partial<Record<string, number>> = {
  'Escovas': 0.74,
  'Pastas de Dente': 0.72,
  'Fio Dental': 0.72,
  'Flúor': 0.70,
  'Revelador de Placa': 0.72,
  'Enxaguante Bucal': 0.72,
};

const fitIconForHeader = (
  Svg: React.ComponentType<any>,
  scalePct = 0.72
) => {
  const pct = `${Math.round(scalePct * 100)}%`;
  const Fitted = () => (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Svg width={pct} height={pct} preserveAspectRatio="xMidYMid meet" />
    </View>
  );
  return Fitted;
};

interface ProductCardProps {
  product: ProductItem;
  handleProductPress: (productId: string) => void;
  handleAddToCart: (product: ProductItem, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleProductPress, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <View key={product.id} style={styles.productCard}>
      <TouchableOpacity onPress={() => handleProductPress(product.id)} style={styles.productDetailsTouchable}>
        <Image source={product.image} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.controlsContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => setQuantity(Math.max(1, quantity - 1))} 
            style={[styles.quantityButton, styles.decrementButton]}
          >
            <Feather name="minus" size={16} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.itemQuantityText}>{quantity}</Text>
          <TouchableOpacity 
            onPress={() => setQuantity(quantity + 1)} 
            style={[styles.quantityButton, styles.incrementButton]}
          >
            <Feather name="plus" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(product, quantity)}
        >
          <Feather name="plus-circle" size={24} color={COLORS.black} />
          <Text style={styles.addToCartText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function LojaCategoriaScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  
  const { getProductsByCategory, addWithQuantity, cart } = useLojaStore();
  const products = getProductsByCategory(category as any);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCartPress = () => {
    router.push('/(app)/carrinho');
  };

  useFocusEffect(
    useCallback(() => {
      const BaseIcon = category ? CATEGORY_ICON_MAP[category] : undefined;
      const CharacterSvg = BaseIcon
        ? fitIconForHeader(BaseIcon, ICON_SCALE[category as string] ?? 0.72)
        : Chefinho;

      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: category?.toUpperCase() || 'PRODUTOS',
        CharacterSvg,          
        showNotificationIcon: false,
      });
    }, [category, totalCartItems, setHeaderConfig])
  );

  const handleProductPress = (productId: string) => {
    router.push({ pathname: '/(app)/detalhes-produto', params: { id: productId } });
  };

  const handleAddToCart = (product: ProductItem, quantity: number) => {
    addWithQuantity(product, quantity);
    Alert.alert('Sucesso!', `${quantity} ${product.name} foi adicionado(s) ao carrinho.`);
  };

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
            <ProductCard 
              key={product.id}
              product={product}
              handleProductPress={handleProductPress}
              handleAddToCart={handleAddToCart}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
