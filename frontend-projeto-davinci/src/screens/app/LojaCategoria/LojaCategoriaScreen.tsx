import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
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

const ProductCard = ({ product, handleProductPress, handleAddToCart }) => {
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
      setHeaderConfig({
        visible: true,
        layout: 'loja',
        showPageHeaderElements: true,
        pageTitle: category?.toUpperCase() || 'PRODUTOS',
        CharacterSvg: Chefinho,
        notificationBadge: totalCartItems,
        onNotificationPress: handleCartPress,
      });
    }, [category, totalCartItems])
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
        contentContainerStyle={[styles.contentContainer, { paddingTop: height * 0.29 }]}
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