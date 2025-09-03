import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  useWindowDimensions, 
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from './CreateNewsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import { useNewsStore } from '@/state/newsStore';
import { useNotificationStore } from '@/state/notificationStore';
import { FONTS, COLORS } from '@/constants/theme';

export default function CreateNewsScreen() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const addNews = useNewsStore((state) => state.addNews);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { height } = useWindowDimensions(); 
  const headerHeight = height * 0.29; 

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
    
    const newNewsItem = {
      title,
      content,
      image: { uri: imageUri },
    };

    const createdNews = addNews(newNewsItem);

    addNotification({
      text: <>Nova Dica! <Text style={{fontFamily: FONTS.body4.fontFamily}}>{title}</Text> foi publicada. Clique para ler!</>,
      type: 'news',
      linkId: createdNews.id,
    });
    
    Alert.alert('Sucesso!', 'Notícia publicada e notificação enviada (simulação).');
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
        keyboardShouldPersistTaps="handled"
      >
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

        <View style={styles.formContainer}>
          <StyledInput
            label="Título"
            iconName="type"
            value={title}
            onChangeText={setTitle}
            placeholder="Título da notícia"
          />

          <View style={styles.manualInputContainer}>
            <Text style={styles.label}>Conteúdo</Text>
            <View style={styles.manualTextInputWrapper}>
              <Feather name="file-text" size={24} color={COLORS.gray_400} style={{ marginTop: 2 }}/>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Escreva o conteúdo da notícia aqui..."
                multiline
                style={styles.manualTextInput}
              />
            </View>
          </View>
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