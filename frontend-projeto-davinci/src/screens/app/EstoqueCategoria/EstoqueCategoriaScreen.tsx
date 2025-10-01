import React, { useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import styles from './EstoqueCategoriaScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEstoqueStore, CategoryName, ProductStatus } from '@/state/estoqueStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';

const userType = 'admin';

const categoryIcons: Record<CategoryName, React.ComponentType<any>> = {
  'Escovas': ToothbrushIcon,
  'Pastas de Dente': ToothpasteIcon,
  'Fio Dental': DentalFlossIcon,
  'Flúor': FluorIcon,
  'Revelador de Placa': ReveladorIcon,
  'Enxaguante Bucal': EnxaguanteIcon,
};

const fitIconForHeader = (
  Svg: React.ComponentType<any>,
  scalePct = 0.70 
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

const ICON_SCALE: Partial<Record<CategoryName, number>> = {
  'Escovas': 0.72,
  'Pastas de Dente': 0.70,
  'Fio Dental': 0.70,
  'Flúor': 0.68,
  'Revelador de Placa': 0.70,
  'Enxaguante Bucal': 0.70,
};

const getStatusColor = (status: ProductStatus) => {
  switch (status) {
    case 'Em estoque':
      return COLORS.green;
    case 'Poucas unidades':
      return '#FFC107';
    case 'Em falta':
      return COLORS.red;
    default:
      return COLORS.gray_400;
  }
};

export default function EstoqueCategoriaScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: CategoryName }>();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.216;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const allProducts = useEstoqueStore((state) => state.categories[category!]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    if (!searchQuery) return allProducts;
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProducts, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      const BaseIcon =
        category && categoryIcons[category] ? categoryIcons[category] : Chefinho;

      const CharacterSvg =
        category && ICON_SCALE[category]
          ? fitIconForHeader(BaseIcon, ICON_SCALE[category]!)
          : fitIconForHeader(BaseIcon, 0.70);

      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: category,
        CharacterSvg,
        showNotificationIcon: true,
      });
    }, [category, setHeaderConfig])
  );

  const handleEditPress = (productId: string) => {
    router.push({
      pathname: '/(app)/editar-estoque-produto',
      params: { category, productId },
    });
  };

  const handleAddPress = () => {
    router.push({
      pathname: '/(app)/editar-estoque-produto',
      params: { category },
    });
  };

  if (!allProducts) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredMessage}>
          <Text>Categoria não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <View style={styles.searchBar}>
          <Feather name="list" size={20} color={COLORS.gray_400} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Digite a marca ou modelo d${category === 'Escovas' ? 'a' : 'o'} ${category?.slice(0, -1).toLowerCase()}`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Feather name="search" size={20} color={COLORS.gray_400} />
        </View>

        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => handleEditPress(product.id)}
          >
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Preço</Text>
                <Text style={styles.price}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <Text style={[styles.status, { color: getStatusColor(product.status) }]}>
                  {product.status}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Quantidade</Text>
                <Text style={styles.quantity}>{product.quantity}</Text>
              </View>
            </View>
            <View style={styles.chevronContainer}>
              <Feather name="chevron-right" size={24} color={COLORS.gray_400} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {userType === 'admin' && (
        <ScreenFooter
          buttons={[
            {
              title: "Adicionar Produto",
              onPress: handleAddPress,
              variant: 'secondary',  
            }
          ]}
        />
      )}
    </SafeAreaView>
  );
}