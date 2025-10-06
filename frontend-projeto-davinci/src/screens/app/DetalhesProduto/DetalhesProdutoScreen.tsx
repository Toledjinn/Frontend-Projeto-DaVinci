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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import Chefinho from '@/assets/characters/chefinho.svg';
import StyledButton from '@/components/common/StyledButton';
import ScreenFooter from '@/components/common/ScreenFooter';
import { SvgProps } from 'react-native-svg';
import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';

type CategoryName =
  | 'Escovas'
  | 'Pastas de Dente'
  | 'Fio Dental'
  | 'Flúor'
  | 'Revelador de Placa'
  | 'Enxaguante Bucal';

const CATEGORY_ICON_MAP: Record<CategoryName, React.FC<SvgProps>> = {
  'Escovas': ToothbrushIcon,
  'Pastas de Dente': ToothpasteIcon,
  'Fio Dental': DentalFlossIcon,
  'Flúor': FluorIcon,
  'Revelador de Placa': ReveladorIcon,
  'Enxaguante Bucal': EnxaguanteIcon,
};

export default function DetalhesProdutoScreen() {
  const router = useRouter();
  const { id, category } = useLocalSearchParams<{ id: string; category?: string }>();  const { height } = useWindowDimensions();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { getProductById, addWithQuantity, cart } = useLojaStore();
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const product = useMemo(() => getProductById(id!), [id, getProductById]);

  const [quantity, setQuantity] = useState(1);

  const headerHeight = height * 0.29;

  useFocusEffect(
    useCallback(() => {
      const categoryFromRoute = category as CategoryName | undefined;
      const categoryFromProduct = (product as any)?.category as CategoryName | undefined;

      const CharacterSvg =
        (categoryFromRoute && CATEGORY_ICON_MAP[categoryFromRoute]) ||
        (categoryFromProduct && CATEGORY_ICON_MAP[categoryFromProduct]) ||
        Chefinho;

      setHeaderConfig({
        visible: true,
        layout: 'loja',
        showPageHeaderElements: true,
        pageTitle: product?.name || 'Produto',
        CharacterSvg,
        showNotificationIcon: false,
        pageHeaderBadgeVariant: 'store',
      });
    }, [product?.name, category])
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

  const formatBRL = (n: number) => n.toFixed(2).replace('.', ',');

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return product.price * quantity;
  }, [product, quantity]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image source={product.image} style={styles.productImage} resizeMode="cover" />
          {product.description ? (
            <View>
              <Text style={styles.sectionTitle}>Descrição</Text>
              <Text style={styles.sectionContent}>{product.description}</Text>
            </View>
          ) : null}
          {product.brand ? (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Marca: </Text>
              <Text style={styles.detailValue}>{product.brand}</Text>
            </View>
          ) : null}
          <View style={styles.priceFooterRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={[styles.quantityButton, styles.decrementButton]}
                accessibilityLabel="Diminuir quantidade"
              >
                <Feather name="minus" size={20} color={COLORS.white} />
              </TouchableOpacity>

              <Text style={styles.itemQuantityText}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={[styles.quantityButton, styles.incrementButton]}
                accessibilityLabel="Aumentar quantidade"
              >
                <Feather name="plus" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            <StyledButton style={styles.addButtonCompact} title={`R$ ${(product.price * quantity).toFixed(2).replace('.', ',')}  Adicionar`} onPress={handleAddToCart} variant='secondary'/> 
          </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}
