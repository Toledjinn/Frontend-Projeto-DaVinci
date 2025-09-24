import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Alert,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import styles from './CarrinhoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLojaStore, CartItem } from '@/state/lojaStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

export default function CarrinhoScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { cart, getCartTotal, removeFromCart, incrementQuantity, decrementQuantity } = useLojaStore();
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'loja',
        showPageHeaderElements: true,
        pageTitle: 'Carrinho',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
        notificationBadge: totalCartItems,
      });
    }, [totalCartItems])
  );

  const handleRemoveItem = (productId: string) => {
    Alert.alert(
      'Remover Produto',
      'Tem certeza que deseja remover este item do carrinho?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            removeFromCart(productId);
            Alert.alert('Item removido!');
          },
        },
      ]
    );
  };

  const handleIncrement = (productId: string) => {
    incrementQuantity(productId);
  };

  const handleDecrement = (productId: string) => {
    decrementQuantity(productId);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione produtos para finalizar a compra.');
      return;
    }
    Alert.alert('Compra Finalizada', 'Sua compra foi realizada com sucesso!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: height * 0.29 }]}
      >
        {cart.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Feather name="shopping-cart" size={80} color={COLORS.gray_400} />
            <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          <>
            {cart.map((item: CartItem) => (
              <View key={item.id} style={styles.cartItemCard}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</Text>
                  
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleDecrement(item.id)} style={[styles.quantityButton, styles.decrementButton]}>
                      <Feather name="minus" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.itemQuantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncrement(item.id)} style={[styles.quantityButton, styles.incrementButton]}>
                      <Feather name="plus" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>

                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Feather name="trash-2" size={24} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.summaryContainer}>
              <Text style={styles.totalText}>Valor Total</Text>
              <Text style={styles.totalValue}>R$ {getCartTotal().toFixed(2).replace('.', ',')}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}