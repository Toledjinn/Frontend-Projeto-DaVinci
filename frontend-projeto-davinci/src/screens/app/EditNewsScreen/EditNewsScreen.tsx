import React, { useState, useEffect, useCallback } from 'react';
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
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from './EditNewsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useNewsStore, NewsItem } from '@/state/newsStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';

export default function EditNewsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { getNewsById, updateNews } = useNewsStore();
  const originalNewsItem = getNewsById(id!);

  const [editableNews, setEditableNews] = useState<Partial<NewsItem>>({});

  useEffect(() => {
    if (originalNewsItem) {
      setEditableNews(JSON.parse(JSON.stringify(originalNewsItem)));
    }
  }, [originalNewsItem]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'EDITAR NOTÍCIA',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleInputChange = (field: keyof NewsItem, value: string) => {
    setEditableNews((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária para acessar a galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      handleInputChange('image', result.assets[0].uri);
    }
  };

  const handleSaveChanges = () => {
    if (!id) return;
    updateNews(id, editableNews);
    Alert.alert('Sucesso!', 'A notícia foi atualizada.');
    router.back();
  };

  if (!editableNews.id) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text>Carregando notícia...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            value={editableNews.title}
            onChangeText={(text) => handleInputChange('title', text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Conteúdo</Text>
          <TextInput
            value={editableNews.content}
            onChangeText={(text) => handleInputChange('content', text)}
            multiline
            style={[styles.textInput, { minHeight: 150 }]}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>URL do Vídeo (YouTube)</Text>
          <TextInput
            value={editableNews.videoUrl}
            onChangeText={(text) => handleInputChange('videoUrl', text)}
            placeholder="Cole o link do YouTube aqui"
            style={styles.textInput}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Imagem de Capa</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImageChange}>
            <Image source={editableNews.image} style={styles.imagePreview} />
            <View style={styles.imageOverlay}>
              <Feather name="edit-2" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ScreenFooter
        secondaryButtonTitle="Cancelar"
        onSecondaryButtonPress={() => router.back()}
        primaryButtonTitle="Salvar Alterações"
        onPrimaryButtonPress={handleSaveChanges}
      />
    </SafeAreaView>
  );
}
