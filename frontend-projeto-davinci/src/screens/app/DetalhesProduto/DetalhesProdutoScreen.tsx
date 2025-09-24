import React, { useCallback, useMemo, useState } from 'react'; 
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
import styles from './DetalhesProdutoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLojaStore } from '@/state/lojaStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalhesProdutoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { getProductById, addWithQuantity, cart } = useLojaStore();
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const product = useMemo(() => getProductById(id!), [id, getProductById]);

  const [quantity, setQuantity] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'loja',
        showPageHeaderElements: true,
        pageTitle: product?.name,
        CharacterSvg: Chefinho,
        });
    }, [product, totalCartItems])
  );

  const handleAddToCart = () => {
    if (product) {
      addWithQuantity(product, quantity); 
      Alert.alert('Sucesso!', `${quantity} ${product.name} foi adicionado(s) ao carrinho.`);
      router.push('/(app)/carrinho');
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Produto não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: height * 0.29 }]}
      >
        <View style={styles.productDetailsContainer}>
          <Image source={product.image} style={styles.productImage} />
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={[styles.quantityButton, styles.decrementButton]}>
              <Feather name="minus" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.itemQuantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={[styles.quantityButton, styles.incrementButton]}>
              <Feather name="plus" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Feather name="plus-circle" size={24} color={COLORS.white} />
            <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}