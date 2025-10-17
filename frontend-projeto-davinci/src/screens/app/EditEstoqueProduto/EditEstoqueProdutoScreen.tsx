import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import styles from './EditEstoqueProdutoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import {
  useEstoqueStore,
  CategoryName,
  ProductItem,
  ProductStatus,
} from '@/state/estoqueStore';
import { COLORS } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import Chefinho from '@/assets/characters/chefinho.svg';
import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';
import { openMediaChooser } from '@/utils/mediaPicker';

const CATEGORY_ICON_MAP: Record<CategoryName, React.FC<SvgProps>> = {
  Escovas: ToothbrushIcon,
  'Pastas de Dente': ToothpasteIcon,
  'Fio Dental': DentalFlossIcon,
  Flúor: FluorIcon,
  'Revelador de Placa': ReveladorIcon,
  'Enxaguante Bucal': EnxaguanteIcon,
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

export default function EditEstoqueProdutoScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.30;
  const { category, productId } =
    useLocalSearchParams<{ category: CategoryName; productId?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { categories, addProduct, updateProduct, isHydrated, hydrate } = useEstoqueStore();

  const isEditMode = !!productId;

  const productToEdit = useMemo(
    () => (isEditMode ? categories[category!]?.find((p) => p.id === productId) : null),
    [categories, category, productId, isEditMode]
  );

  const [formData, setFormData] = useState<
    Omit<ProductItem, 'id' | 'image'> & { imageUri: string | null }
  >({
    name: '',
    brand: '',
    description: '',
    price: 0,
    quantity: 0,
    status: 'Em falta',
    imageUri: null,
  });

  useEffect(() => {
    if (!isHydrated) hydrate();
  }, [isHydrated, hydrate]);

  useEffect(() => {
    if (isEditMode && productToEdit) {
      setFormData({
        name: productToEdit.name,
        brand: productToEdit.brand || '',
        description: productToEdit.description || '',
        price: productToEdit.price,
        quantity: productToEdit.quantity,
        status: productToEdit.status,
        imageUri: (productToEdit.image as any)?.uri || null,
      });
    }
  }, [productToEdit, isEditMode]);

  useEffect(() => {
    const quantity = Number(formData.quantity) || 0;
    let newStatus: ProductStatus = 'Em falta';
    if (quantity > 10) newStatus = 'Em estoque';
    else if (quantity > 0) newStatus = 'Poucas unidades';
    if (formData.status !== newStatus) {
      setFormData((prev) => ({ ...prev, status: newStatus }));
    }
  }, [formData.quantity]);

  useFocusEffect(
    useCallback(() => {
      const CharacterSvg =
        (category && CATEGORY_ICON_MAP[category]) || (Chefinho as React.FC<SvgProps>);

      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: isEditMode ? 'Editar Produto' : 'Cadastrar Produto',
        CharacterSvg,
        showNotificationIcon: false,
        pageHeaderBadgeVariant: 'store',
        visible: true,
      });
    }, [category, isEditMode, setHeaderConfig])
  );

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePick = () => {
    openMediaChooser((uri) => handleInputChange('imageUri', uri));
  };

  const handleSaveChanges = () => {
    if (!formData.name || !(formData.imageUri || productToEdit?.image)) {
      Alert.alert('Campos em falta', 'O nome e a imagem do produto são obrigatórios.');
      return;
    }

    const productData = {
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      price: Number(formData.price) || 0,
      quantity: Number(formData.quantity) || 0,
      status: formData.status,
      image: formData.imageUri
        ? ({ uri: formData.imageUri } as any)
        : (productToEdit?.image as any),
    };

    if (isEditMode) {
      updateProduct(category!, productId!, productData);
    } else {
      addProduct(category!, productData);
    }

    Alert.alert('Sucesso!', `Produto ${isEditMode ? 'atualizado' : 'cadastrado'} com sucesso.`);
    router.back();
  };

  if (!isHydrated) return <SafeAreaView style={styles.safeArea} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.pageBody,
          styles.pageBodySidePadding,
          { paddingTop: headerHeight },
        ]}
      >
        <View style={styles.editorCard}>
          <ScrollView
            style={styles.editorScroll}
            contentContainerStyle={styles.editorScrollContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
              {formData.imageUri ? (
                <Image source={{ uri: formData.imageUri }} style={styles.imagePreview} />
              ) : productToEdit?.image ? (
                <Image source={productToEdit.image as any} style={styles.imagePreview} />
              ) : (
                <Feather name="image" size={40} color={COLORS.gray_400} />
              )}
            </TouchableOpacity>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome do Produto</Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                style={styles.textInput}
                placeholder="Ex: Escova Colgate Pro"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Marca</Text>
              <TextInput
                value={formData.brand}
                onChangeText={(text) => handleInputChange('brand', text)}
                style={styles.textInput}
                placeholder="Ex: Colgate"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
                style={[styles.textInput, { height: 100 }]}
                placeholder="Descreva o produto aqui..."
                multiline
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preço (R$)</Text>
              <TextInput
                value={String(formData.price)}
                onChangeText={(text) => handleInputChange('price', text)}
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="Ex: 19.99"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantidade em Estoque</Text>
              <TextInput
                value={String(formData.quantity)}
                onChangeText={(text) => handleInputChange('quantity', text)}
                style={styles.textInput}
                keyboardType="number-pad"
                placeholder="Ex: 50"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.statusDisplay}>
                <Text style={[styles.statusText, { color: getStatusColor(formData.status) }]}>
                  {formData.status}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <ScreenFooter
        buttons={[
          { title: 'Cancelar', onPress: () => router.back(), variant: 'secondary' },
          { title: 'Salvar', onPress: handleSaveChanges, variant: 'primary' },
        ]}
      />
    </SafeAreaView>
  );
}
