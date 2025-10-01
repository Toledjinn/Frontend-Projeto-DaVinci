import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Image, Alert, FlatList } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import styles from './CarrinhoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLojaStore } from '@/state/lojaStore';
import { COLORS } from '@/constants/theme';
import StyledButton from '@/components/common/StyledButton';
import Chefinho from '@/assets/characters/chefinho.svg';

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
                    },
                },
            ]
        );
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            Alert.alert('Carrinho Vazio', 'Adicione produtos para finalizar a compra.');
            return;
        }
        router.push('/(app)/home'); 
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemCard}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <View>
                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.itemPriceUnit}>
                        {`R$ ${item.price.toFixed(2).replace('.', ',')} cada`}
                    </Text>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => decrementQuantity(item.id)}
                        style={styles.quantityButton}
                    >
                        <Feather name="minus" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <Text style={styles.itemQuantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => incrementQuantity(item.id)}
                        style={styles.quantityButton}
                    >
                        <Feather name="plus" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemSubtotalContainer}>
                <Text style={styles.itemSubtotal}>
                    {`R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`}
                </Text>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                >
                    <Feather name="trash-2" size={20} color={COLORS.gray_400} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {cart.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Feather name="shopping-cart" size={80} color={COLORS.gray_400} />
                    <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
                    <StyledButton title="Ver produtos" onPress={() => router.push('/(app)/home')} variant="secondary" />
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.id}
                        style={styles.list}
                        contentContainerStyle={[styles.contentContainer, { paddingTop: height * 0.28 }]}
                    />
                    <View style={styles.footer}>
                        <View style={styles.summaryContainer}>
                            <Text style={styles.totalText}>Valor Total</Text>
                            <Text style={styles.totalValue}>R$ {getCartTotal().toFixed(2).replace('.', ',')}</Text>
                        </View>
                        <StyledButton 
                            title="Finalizar Compra" 
                            onPress={handleCheckout} 
                            variant="secondary" 
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}