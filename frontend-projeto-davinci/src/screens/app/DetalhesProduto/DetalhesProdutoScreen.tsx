import React, { useCallback, useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    useWindowDimensions,
    Image,
    TouchableOpacity,
    Alert,
    NativeSyntheticEvent,
    NativeScrollEvent,
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
    const { height, width } = useWindowDimensions();
    const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

    const { getProductById, addWithQuantity, cart } = useLojaStore();
    const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

    const product = useMemo(() => getProductById(id!), [id, getProductById]);
    const [quantity, setQuantity] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);

    const headerHeight = height * 0.192;

    const images = product?.image ? [product.image, product.image] : [];

    useFocusEffect(
        useCallback(() => {
            setHeaderConfig({
                visible: true,
                layout: 'page',
                showPageHeaderElements: true,
                pageTitle: product?.name,
                CharacterSvg: Chefinho,
            });
        }, [product, totalCartItems])
    );

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setActiveIndex(index);
    };

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
                contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 25 }]}
            >
                <View style={styles.galleryContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScroll}
                        scrollEventThrottle={16}
                    >
                        {images.map((img, index) => (
                            <Image key={index} source={img} style={[styles.productImage, { width: width }]} />
                        ))}
                    </ScrollView>
                    <View style={styles.paginationContainer}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.dot, activeIndex === index ? styles.activeDot : {}]}
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.specsContainer}>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Marca</Text>
                            <Text style={styles.specValue}>{product.brand}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.descriptionTitle}>Sobre este item</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.topFooterRow}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
                            <Feather name="minus" size={20} color={COLORS.secondary} />
                        </TouchableOpacity>
                        <Text style={styles.itemQuantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
                            <Feather name="plus" size={20} color={COLORS.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Preço</Text>
                        <Text style={styles.footerPrice}>
                            R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}