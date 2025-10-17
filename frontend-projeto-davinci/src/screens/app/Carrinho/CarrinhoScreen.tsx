import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Alert,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import styles from './CarrinhoScreen.styles';
import { COLORS } from '@/constants/theme';
import { useUIStore } from '@/state/uiStore';
import { useLojaStore, CartItem } from '@/state/lojaStore';
import { usePedidosStore } from '@/state/pedidosStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import StyledButton from '@/components/common/StyledButton';

export default function CarrinhoScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.22;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const {
    cart,
    getCartTotal,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useLojaStore();

  const { addOrderFromCart } = usePedidosStore();

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'loja',
        showPageHeaderElements: true,
        pageTitle: 'Carrinho',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [totalCartItems])
  );

  const handleRemoveItem = (productId: string) => {
    Alert.alert('Remover Produto', 'Tem certeza que deseja remover este item do carrinho?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          removeFromCart(productId);
          Alert.alert('Item removido!');
        },
      },
    ]);
  };

  const handleIncrement = (productId: string) => incrementQuantity(productId);
  const handleDecrement = (productId: string) => decrementQuantity(productId);

  const handleLeftQty = (item: CartItem) => {
    if (item.quantity <= 1) {
      handleRemoveItem(item.id);
    } else {
      handleDecrement(item.id);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione produtos para finalizar a compra.');
      return;
    }

    try {
      const snapshot = cart.map((it) => ({
        id: it.id,
        name: it.name,
        quantity: it.quantity,
        price: it.price,
        image: it.image,
      }));

      const order = addOrderFromCart(snapshot, {
        customerName: 'Cliente',
      });

      if (typeof clearCart === 'function') clearCart();
      else snapshot.forEach((it) => removeFromCart(it.id));

      Alert.alert(
        'Compra Finalizada',
        `Pedido #${order.id} criado com sucesso!\nTotal: R$ ${order.totalValue
          .toFixed(2)
          .replace('.', ',')}`,
        [{ text: 'OK', onPress: () => router.push('/(app)/pedidos') }]
      );
    } catch (e: any) {
      Alert.alert('Erro ao finalizar', e?.message || 'Tente novamente.');
    }
  };

  const formatBRL = (n: number) => n.toFixed(2).replace('.', ',');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.pageBody, { paddingTop: headerHeight }]}>
        <View style={styles.card}>
          {cart.length === 0 ? (
            <View style={styles.emptyStateWrap}>
              <Feather name="shopping-cart" size={80} color={COLORS.gray_400} />
              <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
            </View>
          ) : (
            <>
              <ScrollView
                style={styles.cardScroll}
                contentContainerStyle={styles.cardScrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.titleText}>Produtos</Text>
                </View>

                {cart.map((item, index) => {
                  const isMultiple = cart.length > 1;
                  const isLast = index === cart.length - 1;

                  return (
                    <View key={item.id}>
                      <View
                        style={[
                          styles.productRow,
                          isMultiple && !isLast && styles.productItemList,
                        ]}
                      >
                        <Image source={item.image} style={styles.productImage} />

                        <View style={styles.productInfo}>
                          <Text style={styles.productName} numberOfLines={1}>
                            {item.name}
                          </Text>
                          {!!item.description && (
                            <Text style={styles.productDetails} numberOfLines={2}>
                              {item.description}
                            </Text>
                          )}
                        </View>

                        <View style={styles.rightCol}>
                          <Text style={styles.productTotal}>
                            R$ {formatBRL(item.price * item.quantity)}
                          </Text>

                          <View style={styles.qtyContainer}>
                            <TouchableOpacity
                              onPress={() => handleLeftQty(item)}
                              style={[
                                styles.quantityButtonL,
                                item.quantity <= 1 && { backgroundColor: COLORS.pendente },
                              ]}
                              accessibilityRole="button"
                              accessibilityLabel={
                                item.quantity <= 1 ? 'Remover item' : 'Diminuir quantidade'
                              }
                            >
                              <Feather
                                name={item.quantity <= 1 ? 'trash-2' : 'minus'}
                                size={18}
                                color={COLORS.secondary}
                              />
                            </TouchableOpacity>

                            <Text style={styles.itemQuantityText}>{item.quantity}</Text>

                            <TouchableOpacity
                              onPress={() => handleIncrement(item.id)}
                              style={styles.quantityButtonR}
                              accessibilityRole="button"
                              accessibilityLabel="Aumentar quantidade"
                            >
                              <Feather name="plus" size={18} color={COLORS.white} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              <View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Valor Total</Text>
                  <Text style={styles.summaryValue}>R$ {formatBRL(getCartTotal())}</Text>
                </View>

                <View>
                  <StyledButton
                    title="Finalizar Compra"
                    onPress={handleCheckout}
                    variant="secondary"
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
