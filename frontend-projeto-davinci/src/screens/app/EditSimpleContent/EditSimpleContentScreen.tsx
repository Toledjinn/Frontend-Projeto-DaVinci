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
import { styles } from './EditSimpleContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useSocialStore, ContentBlock } from '@/state/socialStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';

type PageName = 'oQueE' | 'comoParticipar';

export default function EditSimpleContentScreen() {
  const router = useRouter();
  const { page } = useLocalSearchParams<{ page: PageName }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { pages, updateBlock, addBlock, removeBlock } = useSocialStore();
  const pageContent = pages[page!];

  const [editableBlocks, setEditableBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    if (pageContent) {
      setEditableBlocks(JSON.parse(JSON.stringify(pageContent)));
    }
  }, [pageContent]);

  const pageTitles = {
    oQueE: 'O QUE É?',
    comoParticipar: 'COMO PARTICIPAR?',
  }

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: `EDITAR "${pageTitles[page!]}"`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [page])
  );

  const handleBlockChange = (index: number, newContent: string) => {
    const newBlocks = [...editableBlocks];
    newBlocks[index].content = newContent;
    setEditableBlocks(newBlocks);
  };

  const handleImageChange = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      const newBlocks = [...editableBlocks];
      newBlocks[index].image = { uri: result.assets[0].uri };
      setEditableBlocks(newBlocks);
    }
  };

  const handleSaveChanges = () => {
    editableBlocks.forEach((block) => {
      updateBlock(page!, block.id, block);
    });
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  const handleAddBlock = (type: 'text' | 'image') => {
    addBlock(page!, type);
  };

  const handleRemoveBlock = (blockId: string) => {
    removeBlock(page!, blockId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {editableBlocks.map((block, index) => (
          <View key={block.id} style={styles.blockContainer}>
            <TouchableOpacity onPress={() => handleRemoveBlock(block.id)} style={styles.removeButton}>
              <Feather name="x-circle" size={24} color={COLORS.red} />
            </TouchableOpacity>
            
            {block.type === 'text' && (
              <View style={styles.manualInputContainer}>
                <Text style={styles.label}>Parágrafo {index + 1}</Text>
                <View style={styles.manualTextInputWrapper}>
                  <TextInput
                    value={block.content}
                    onChangeText={(text) => handleBlockChange(index, text)}
                    multiline
                    style={styles.manualTextInput}
                  />
                </View>
              </View>
            )}

            {block.type === 'image' && block.image && (
              <View>
                <Text style={styles.label}>Imagem {index + 1}</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
                  <Image source={block.image} style={styles.imagePreview} />
                  <View style={styles.imageOverlay}>
                    <Feather name="edit-2" size={24} color={COLORS.white} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <View style={styles.addButtonsContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddBlock('text')}>
                <Feather name="plus" size={16} color={COLORS.secondary} />
                <Text style={styles.addButtonText}>Adicionar Texto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddBlock('image')}>
                <Feather name="image" size={16} color={COLORS.secondary} />
                <Text style={styles.addButtonText}>Adicionar Imagem</Text>
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
