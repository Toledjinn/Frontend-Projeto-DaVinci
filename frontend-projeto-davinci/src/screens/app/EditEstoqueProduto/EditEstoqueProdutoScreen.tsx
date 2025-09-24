import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
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
  const { category, productId } = useLocalSearchParams<{ category: CategoryName, productId?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { categories, addProduct, updateProduct } = useEstoqueStore();
  
  const isEditMode = !!productId;

  const productToEdit = useMemo(() => 
    isEditMode ? categories[category!]?.find(p => p.id === productId) : null
  , [categories, category, productId, isEditMode]);

  const [formData, setFormData] = useState<Omit<ProductItem, 'id' | 'image'> & { imageUri: string | null }>({
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

    if (quantity > 10) {
      newStatus = 'Em estoque';
    } else if (quantity > 0) {
      newStatus = 'Poucas unidades';
    }
    
    if (formData.status !== newStatus) {
      setFormData(prev => ({ ...prev, status: newStatus }));
    }
  }, [formData.quantity]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: isEditMode ? 'EDITAR PRODUTO' : 'CADASTRAR PRODUTO',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [isEditMode])
  );
  
  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária.');
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
    if (!formData.name || !formData.imageUri) {
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
      image: { uri: formData.imageUri },
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
        secondaryButtonTitle="Cancelar"
        onSecondaryButtonPress={() => router.back()}
        primaryButtonTitle="Salvar"
        onPrimaryButtonPress={handleSaveChanges}
      />
    </SafeAreaView>
  );
}

