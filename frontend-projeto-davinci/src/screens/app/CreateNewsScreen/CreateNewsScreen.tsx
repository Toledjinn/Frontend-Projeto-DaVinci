
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  useWindowDimensions,
  TextInput, // Importar o TextInput
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from './CreateNewsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useNewsStore } from '@/state/newsStore';
import { NewsItemProps } from '@/components/features/NewsListItem';
import Chefinho from '@/assets/characters/chefinho.svg';
import StyledInput from '@/components/common/StyledInput';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';

export default function CreateNewsScreen() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const addNews = useNewsStore((state) => state.addNews);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'CRIAR NOVIDADE',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa conceder permissão para aceder à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePublish = () => {
    if (!title || !content || !imageUri) {
      Alert.alert('Campos em falta', 'Por favor, preencha o título, o conteúdo e selecione uma imagem.');
      return;
    }
    
    const newNewsItem: NewsItemProps = {
      id: Date.now().toString(),
      title: title,
      snippet: content.substring(0, 100) + '...',
      content: content,
      date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: { uri: imageUri },
    };

    addNews(newNewsItem);

    Alert.alert('Sucesso!', 'Notícia publicada.');
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Imagem de Destaque</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <>
              <Feather name="image" size={40} color={COLORS.gray_400} />
              <Text style={styles.imagePickerText}>Toque para selecionar uma imagem</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ marginBottom: 16 }}>
          <StyledInput
            label="Título"
            iconName="type"
            value={title}
            onChangeText={setTitle}
            placeholder="Título da notícia"
          />
        </View>

        {}
        <Text style={styles.label}>Conteúdo</Text>
        <View style={[styles.manualInputContainer, { height: 300 }]}>
          <Feather name="file-text" size={24} color={COLORS.gray_400} style={{ marginTop: 2 }}/>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Escreva o conteúdo da notícia aqui..."
            placeholderTextColor={COLORS.gray_400}
            multiline
            style={styles.manualInput}
          />
        </View>
      </ScrollView>

      <ScreenFooter
        secondaryButtonTitle="Cancelar"
        onSecondaryButtonPress={() => router.back()}
        primaryButtonTitle="Publicar"
        onPrimaryButtonPress={handlePublish}
      />
    </SafeAreaView>
  );
}
