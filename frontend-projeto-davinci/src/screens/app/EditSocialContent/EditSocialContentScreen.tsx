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
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from './EditSocialContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useSocialStore, PageName, ContentBlock, DepoimentoItem } from '@/state/socialStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';
import Chefinho from '@/assets/characters/chefinho.svg';

const editContentConfig: Record<PageName, { title: string }> = {
  oQueE: { title: 'O que é?' },
  comoParticipar: { title: 'Como Participar' },
  depoimentos: { title: 'Depoimentos' },
};

const isValidPageName = (name: any): name is PageName => {
  return name in editContentConfig;
};

export default function EditSocialContentScreen() {
  const router = useRouter();
  const { pageName } = useLocalSearchParams<{ pageName?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const page = isValidPageName(pageName) ? pageName : 'oQueE';
  const config = editContentConfig[page];

  const { pages, updatePage, addBlock, removeBlock } = useSocialStore();
  const pageContent = pages[page];

  const [editableContent, setEditableContent] = useState<(ContentBlock | DepoimentoItem)[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (pageContent) {
      const content = JSON.parse(JSON.stringify(pageContent));
      setEditableContent(content);
      if (content.length > 0) {
        setExpandedId(content[0].id);
      }
    }
  }, [pageContent]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar "${config.title}"`,
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [page, config])
  );

  const handleItemChange = (id: string, field: string, value: any) => {
    setEditableContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleImageChange = async (id: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária.');
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

  const handleRemoveItem = (id: string) => {
    Alert.alert('Remover Item', 'Tem certeza que deseja remover este item?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => removeBlock(page, id) },
    ]);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((currentId) => (currentId === id ? null : id));
  };

  const renderEditor = (item: ContentBlock | DepoimentoItem) => {
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
              <Image source={item.image} style={styles.imagePreview} />
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
              value={item.videoUrl}
              onChangeText={(text) => handleItemChange(item.id, 'videoUrl', text)}
              placeholder="Cole o link do YouTube aqui"
              style={styles.textInput}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {editableContent.map((item, index) => (
          <View key={item.id} style={styles.editorCard}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                  {page === 'depoimentos' ? `Depoimento ${index + 1}` : `Bloco ${index + 1}`}
                </Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
                    <Feather name="trash-2" size={20} color={COLORS.red} />
                  </TouchableOpacity>
                  <Feather name={expandedId === item.id ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.secondary} />
                </View>
              </View>
            </TouchableOpacity>
            {expandedId === item.id && (
              <View style={styles.cardContent}>
                {renderEditor(item)}
              </View>
            )}
          </View>
        ))}
        <View style={styles.addButtonsContainer}>
          {page === 'depoimentos' ? (
            <TouchableOpacity style={styles.addButton} onPress={() => addBlock(page, 'depoimento')}>
              <Feather name="plus" size={16} color={COLORS.secondary} />
              <Text style={styles.addButtonText}>Adicionar Depoimento</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.addButton} onPress={() => addBlock(page, 'text')}>
                <Feather name="plus" size={16} color={COLORS.secondary} />
                <Text style={styles.addButtonText}>Adicionar Texto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={() => addBlock(page, 'image')}>
                <Feather name="image" size={16} color={COLORS.secondary} />
                <Text style={styles.addButtonText}>Adicionar Imagem</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={() => addBlock(page, 'video')}>
                <Feather name="video" size={16} color={COLORS.secondary} />
                <Text style={styles.addButtonText}>Adicionar Vídeo</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      <ScreenFooter
        buttons={[
          { title: "Salvar", onPress: handleSaveChanges, variant: 'primary' },
          { title: "Cancelar", onPress: () => router.back(), variant: 'secondary' },
        ]}
      />
    </SafeAreaView>
  );
}

