import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import styles from './EditEstoqueProdutoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEstoqueStore, CategoryName, ProductItem, ProductStatus } from '@/state/estoqueStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';

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

const CATEGORY_ICON_MAP: Record<CategoryName, React.ComponentType<any>> = {
  'Escovas': ToothbrushIcon,
  'Pastas de Dente': ToothpasteIcon,
  'Fio Dental': DentalFlossIcon,
  'Flúor': FluorIcon,
  'Revelador de Placa': ReveladorIcon,
  'Enxaguante Bucal': EnxaguanteIcon,
};

const ICON_SCALE: Partial<Record<CategoryName, number>> = {
  'Escovas': 0.74,
  'Pastas de Dente': 0.72,
  'Fio Dental': 0.72,
  'Flúor': 0.70,
  'Revelador de Placa': 0.72,
  'Enxaguante Bucal': 0.72,
};

export default function EditEstoqueProdutoScreen() {
  const router = useRouter();
  const { category, productId } = useLocalSearchParams<{ category: CategoryName; productId?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { categories, addProduct, updateProduct } = useEstoqueStore();
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
      const BaseIcon = category ? CATEGORY_ICON_MAP[category] : undefined;
      const CharacterSvg = BaseIcon
        ? fitIconForHeader(BaseIcon, ICON_SCALE[category as CategoryName] ?? 0.72)
        : Chefinho;

      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: isEditMode
          ? ('Editar Produto')
          : 'Cadastrar Produto',
        CharacterSvg,
        showNotificationIcon: true,
        visible: true,
      });
    }, [category, isEditMode, productToEdit?.name, setHeaderConfig])
  );

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária.', 'Conceda acesso à galeria para selecionar a imagem.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      handleInputChange('imageUri', result.assets[0].uri);
    }
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
      image: formData.imageUri ? { uri: formData.imageUri } : (productToEdit?.image as any),
    };

    if (isEditMode) {
      updateProduct(category!, productId!, productData);
    } else {
      addProduct(category!, productData);
    }

    Alert.alert('Sucesso!', `Produto ${isEditMode ? 'atualizado' : 'cadastrado'} com sucesso.`);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
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

      <ScreenFooter
        buttons={[
          {
            title: "Salvar",
            onPress: handleSaveChanges,
            variant: 'primary',  
          },
          {
            title: "Cancelar",
            onPress: () => router.back(),
            variant: 'secondary',  
          }
        ]}
      />
    </SafeAreaView>
  );
}
