import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './EditLabPageScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLaboratorioStore, LabCarouselItem } from '@/state/laboratorioStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import StyledInput from '@/components/common/StyledInput';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';

export default function EditLabPageScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { page } = useLocalSearchParams<{ page: 'produtos' | 'trabalhos' | 'parceiros' }>();
  
  const { produtos, trabalhos, parceiros, updatePageContent } = useLaboratorioStore();

  const [editedItems, setEditedItems] = useState<LabCarouselItem[]>([]);

  const originalItems = useMemo(() => {
    switch (page) {
      case 'produtos': return produtos;
      case 'trabalhos': return trabalhos;
      case 'parceiros': return parceiros;
      default: return [];
    }
  }, [page, produtos, trabalhos, parceiros]);

  useEffect(() => {
    setEditedItems(originalItems);
  }, [originalItems]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `EDITAR ${page?.toUpperCase()}`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [page])
  );

  const handleTextChange = (text: string, index: number, field: 'title' | 'text') => {
    const newItems = [...editedItems];
    newItems[index] = { ...newItems[index], [field]: text };
    setEditedItems(newItems);
  };

  const handleImageChange = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'É preciso permitir o acesso à galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      const newItems = [...editedItems];
      newItems[index] = { ...newItems[index], image: { uri: result.assets[0].uri } };
      setEditedItems(newItems);
    }
  };

  const handleSaveChanges = () => {
    if (page) {
      updatePageContent(page, editedItems);
      Alert.alert('Sucesso', 'Conteúdo atualizado!');
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
      >
        {editedItems.map((item, index) => (
          <View key={item.id} style={styles.slideEditor}>
            <Text style={styles.slideHeader}>Slide {index + 1}</Text>
            
            <View style={{ marginBottom: 16 }}>
              <StyledInput
                label="Título"
                iconName="type"
                value={item.title}
                onChangeText={(text) => handleTextChange(text, index, 'title')}
              />
            </View>
            
            <Text style={styles.fieldLabel}>Texto</Text>
            <View style={styles.manualInputContainer}>
              <Feather name="file-text" size={24} color={COLORS.gray_400} style={{ marginTop: 2 }}/>
              <TextInput
                value={item.text}
                onChangeText={(text) => handleTextChange(text, index, 'text')}
                placeholder="Escreva o texto do slide aqui..."
                placeholderTextColor={COLORS.gray_400}
                multiline
                style={styles.manualInput}
              />
            </View>

            <Text style={styles.fieldLabel}>Imagem</Text>
            <TouchableOpacity onPress={() => handleImageChange(index)}>
              <Image source={item.image} style={styles.thumbnail} />
            </TouchableOpacity>
          </View>
        ))}
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
