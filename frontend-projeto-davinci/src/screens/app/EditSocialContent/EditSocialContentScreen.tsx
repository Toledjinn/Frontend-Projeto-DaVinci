import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import { styles } from './EditSocialContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import {
  useSocialStore,
  PageName,
  ContentBlock,
  DepoimentoItem,
  SocialContent,
} from '@/state/socialStore';

import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';
import Chefinho from '@/assets/characters/chefinho.svg';

const editContentConfig: Record<PageName, { title: string }> = {
  oQueE: { title: 'O que é?' },
  comoParticipar: { title: 'Como Participar' },
  depoimentos: { title: 'Depoimentos' },
};

const isValidPageName = (name: any): name is PageName => name in editContentConfig;

export default function EditSocialContentScreen() {
  const router = useRouter();
  const { pageName } = useLocalSearchParams<{ pageName?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { height } = useWindowDimensions();
  const headerHeight = height * 0.22;

  const page: PageName = isValidPageName(pageName) ? pageName! : 'oQueE';
  const config = editContentConfig[page];

  const { pages, updatePage, hydrate, isHydrated } = useSocialStore();

  const [editableContent, setEditableContent] = useState<SocialContent[]>([]);

  useFocusEffect(
    useCallback(() => {
      hydrate();
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar "${config.title}"`,
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [page, config])
  );

  useEffect(() => {
    if (!isHydrated) return;
    const pageContent = pages[page];
    if (pageContent) {
      const content = JSON.parse(JSON.stringify(pageContent)) as SocialContent[];
      setEditableContent(content);
    }
  }, [isHydrated, page, pages]);

  const makeNewBlock = (type: 'text' | 'image' | 'video' | 'depoimento'): SocialContent => {
    const id = `${type}_${Date.now()}`;
    if (type === 'depoimento') {
      return {
        id,
        type: 'depoimento',
        author: 'Novo Autor',
        text: 'Novo depoimento...',
        videoUrl: '',
      } as DepoimentoItem;
    }
    if (type === 'text') {
      return {
        id,
        type: 'text',
        content: 'Novo parágrafo...',
      } as ContentBlock;
    }
    if (type === 'image') {
      return {
        id,
        type: 'image',
      } as ContentBlock;
    }
    return {
      id,
      type: 'video',
      videoUrl: '',
    } as ContentBlock;
  };

  const addBlockLocal = (type: 'text' | 'image' | 'video' | 'depoimento') => {
    setEditableContent((prev) => [...prev, makeNewBlock(type)]);
  };

  const removeBlockLocal = (id: string) => {
    setEditableContent((prev) => prev.filter((b) => b.id !== id));
  };

  const handleItemChange = (id: string, field: string, value: any) => {
    setEditableContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleImageChange = async (id: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso às suas fotos para selecionar a imagem.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.[0]?.uri) return;
    handleItemChange(id, 'image', { uri: result.assets[0].uri });
  };

  const handleSaveChanges = () => {
    updatePage(page, editableContent);
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const renderEditorFor = (item: ContentBlock | DepoimentoItem) => {
    if ('author' in item) {
      return (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Autor</Text>
            <TextInput
              value={item.author}
              onChangeText={(text) => handleItemChange(item.id, 'author', text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Texto do Depoimento</Text>
            <TextInput
              value={item.text}
              onChangeText={(text) => handleItemChange(item.id, 'text', text)}
              multiline
              style={[styles.textInput, { height: 120 }]}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL do Vídeo (Opcional)</Text>
            <TextInput
              value={item.videoUrl || ''}
              onChangeText={(text) => handleItemChange(item.id, 'videoUrl', text)}
              placeholder="Cole o link do YouTube aqui"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </>
      );
    }

    switch (item.type) {
      case 'text':
        return (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Parágrafo</Text>
            <TextInput
              value={item.content}
              onChangeText={(text) => handleItemChange(item.id, 'content', text)}
              multiline
              style={[styles.textInput, { height: 150 }]}
            />
          </View>
        );
      case 'image':
        return (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(item.id)}>
              {(item as ContentBlock).image ? (
                <Image source={(item as ContentBlock).image as any} style={styles.imagePreview} />
              ) : (
                <View style={[styles.imagePreview, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Feather name="image" size={24} color={COLORS.gray_400} />
                  <Text style={[styles.label, { marginTop: 8 }]}>Selecionar imagem</Text>
                </View>
              )}
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'video':
        return (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL do Vídeo</Text>
            <TextInput
              value={(item as ContentBlock).videoUrl}
              onChangeText={(text) => handleItemChange(item.id, 'videoUrl', text)}
              placeholder="Cole o link do YouTube aqui"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        );
      default:
        return null;
    }
  };

  if (!isHydrated) return <SafeAreaView style={styles.safeArea} />;

  const isDepoimentos = page === 'depoimentos';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.pageBody, styles.pageBodySidePadding, { paddingTop: headerHeight }]}>
        <View style={styles.editorCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{config.title}</Text>
          </View>

          <ScrollView
            style={styles.editorScroll}
            contentContainerStyle={styles.editorScrollContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <View style={styles.cardContent}>
              {editableContent.length === 0 && (
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Nenhum conteúdo ainda. {isDepoimentos ? 'Adicione um depoimento.' : 'Adicione texto, imagem ou vídeo.'}
                </Text>
              )}

              {editableContent.map((item, index) => (
                <View key={item.id} style={styles.itemBox}>
                  <View style={styles.itemBoxHeader}>
                    <Text style={styles.cardTitle}>
                      {isDepoimentos
                        ? `Depoimento ${index + 1}`
                        : item.type === 'text'
                        ? `Texto ${index + 1}`
                        : item.type === 'image'
                        ? `Imagem ${index + 1}`
                        : item.type === 'video'
                        ? `Vídeo ${index + 1}`
                        : `Item ${index + 1}`}
                    </Text>

                    <TouchableOpacity onPress={() => removeBlockLocal(item.id)}>
                      <Feather name="trash-2" size={18} color={COLORS.red} />
                    </TouchableOpacity>
                  </View>

                  {renderEditorFor(item)}
                </View>
              ))}

              <View style={styles.addButtonsContainer}>
                {isDepoimentos ? (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addBlockLocal('depoimento')}
                  >
                    <Feather name="plus" size={16} color={COLORS.secondary} />
                    <Text style={styles.addButtonText}>Adicionar Depoimento</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity style={styles.addButton} onPress={() => addBlockLocal('text')}>
                      <Feather name="plus" size={16} color={COLORS.secondary} />
                      <Text style={styles.addButtonText}>Adicionar Texto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton} onPress={() => addBlockLocal('image')}>
                      <Feather name="image" size={16} color={COLORS.secondary} />
                      <Text style={styles.addButtonText}>Adicionar Imagem</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton} onPress={() => addBlockLocal('video')}>
                      <Feather name="video" size={16} color={COLORS.secondary} />
                      <Text style={styles.addButtonText}>Adicionar Vídeo</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <ScreenFooter
        buttons={[
          { title: 'Cancelar', onPress: handleCancel, variant: 'secondary' },
          { title: 'Salvar', onPress: handleSaveChanges, variant: 'primary' },
        ]}
      />
    </SafeAreaView>
  );
}
