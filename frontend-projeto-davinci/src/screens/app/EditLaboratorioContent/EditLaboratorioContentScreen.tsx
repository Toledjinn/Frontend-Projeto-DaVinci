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

import { styles } from './EditLaboratorioContent.styles';
import { useUIStore } from '@/state/uiStore';
import { useLaboratorioStore, PageName, CarouselSlide } from '@/state/laboratorioStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';
import Chefinho from '@/assets/characters/chefinho.svg';

const isValidPageName = (name: any): name is PageName =>
  ['nossaFilosofia', 'trabalhos', 'parceiros'].includes(name);

const makeSlide = (layout: 'image' | 'video'): CarouselSlide => {
  const id = `slide_${Date.now()}`;
  return layout === 'image'
    ? { id, title: '', text: '', image: { uri: '' } as any }
    : { id, title: '', text: '', videoUrl: '' };
};

export default function EditLaboratorioContentScreen() {
  const router = useRouter();
  const { pageName } = useLocalSearchParams<{ pageName?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const topOffset = headerHeight + 8;

  const page: PageName = isValidPageName(pageName) ? pageName! : 'nossaFilosofia';

  const { pages, updatePage, hydrate, isHydrated } = useLaboratorioStore();
  const pageContent = pages[page];

  const [editableSlides, setEditableSlides] = useState<CarouselSlide[]>([]);

  useFocusEffect(
    useCallback(() => {
      hydrate();
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar "${pageContent.title}"`,
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [page, pageContent.title, hydrate, setHeaderConfig])
  );

  useEffect(() => {
    if (!isHydrated) return;
    const slides = JSON.parse(JSON.stringify(pageContent.slides)) as CarouselSlide[];
    setEditableSlides(slides);
  }, [isHydrated, pageContent.slides]);

  const handleItemChange = (id: string, field: keyof CarouselSlide, value: any) => {
    setEditableSlides((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const openMediaChooser = (onPick: (uri: string) => void) => {
    Alert.alert('Selecionar Imagem', 'Escolha uma opção', [
      {
        text: 'Tirar Foto',
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Conceda acesso à câmera e à galeria.');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
          if (!result.canceled && result.assets?.[0]?.uri) onPick(result.assets[0].uri);
        },
      },
      {
        text: 'Escolher da Galeria',
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Conceda acesso à galeria.');
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
          if (!result.canceled && result.assets?.[0]?.uri) onPick(result.assets[0].uri);
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleImageChange = async (id: string) => {
    openMediaChooser((uri) => handleItemChange(id, 'image', { uri } as any));
  };

  const addImageSlide = () => {
    openMediaChooser((uri) => {
      setEditableSlides((prev) => [
        ...prev,
        { id: `slide_${Date.now()}`, title: '', text: '', image: { uri } as any },
      ]);
    });
  };

  const addVideoSlide = () => {
    setEditableSlides((prev) => [...prev, makeSlide('video')]);
  };

  const removeLocalSlide = (id: string) => {
    setEditableSlides((prev) => {
      if (prev.length <= 1) {
        Alert.alert('Atenção', 'Não é possível remover o último slide.');
        return prev;
      }
      return prev.filter((s) => s.id !== id);
    });
  };

  const handleSaveChanges = async () => {
    await updatePage(page, editableSlides);
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  if (!isHydrated) return <SafeAreaView style={styles.safeArea} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.pageBody, styles.pageBodySidePadding, { paddingTop: topOffset }]}>
        <View className="editorCard" style={styles.editorCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{pageContent.title}</Text>
          </View>
          <ScrollView
            style={styles.editorScroll}
            contentContainerStyle={styles.editorScrollContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {editableSlides.map((slide, index) => (
              <View key={slide.id} style={styles.itemBox}>
                <View style={styles.itemBoxHeader}>
                  <Text style={styles.cardTitle}>Slide {index + 1}</Text>
                  <TouchableOpacity style={styles.removeIconTap} onPress={() => removeLocalSlide(slide.id)}>
                    <Feather name="trash-2" size={18} color={COLORS.red} />
                  </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.label}>Título</Text>
                  <TextInput
                    value={slide.title}
                    onChangeText={(text) => handleItemChange(slide.id, 'title', text)}
                    style={styles.textInput}
                  />
                </View>

                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.label}>Texto</Text>
                  <TextInput
                    value={slide.text}
                    onChangeText={(text) => handleItemChange(slide.id, 'text', text)}
                    multiline
                    style={[styles.textInput, { height: 120 }]}
                  />
                </View>

                {'image' in slide && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={styles.label}>Imagem</Text>
                    <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(slide.id)}>
                      {(slide.image as any)?.uri ? (
                        <Image source={slide.image as any} style={styles.imagePreview} />
                      ) : (
                        <View
                          style={[
                            styles.imagePreview,
                            { justifyContent: 'center', alignItems: 'center' },
                          ]}
                        >
                          <Feather name="image" size={24} color={COLORS.gray_400} />
                          <Text style={[styles.label, { marginTop: 8 }]}>Selecionar imagem</Text>
                        </View>
                      )}
                      <View style={styles.imageOverlay}>
                        <Feather name="edit-2" size={24} color={COLORS.white} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {'videoUrl' in slide && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={styles.label}>URL do Vídeo (YouTube)</Text>
                    <TextInput
                      value={slide.videoUrl || ''}
                      onChangeText={(text) => handleItemChange(slide.id, 'videoUrl', text)}
                      placeholder="Cole o link do YouTube aqui"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={styles.textInput}
                    />
                  </View>
                )}
              </View>
            ))}

            <View style={styles.addButtonsContainer}>
              <View style={styles.addRow}>
                <TouchableOpacity style={styles.addButton} onPress={addImageSlide}>
                  <Feather name="image" size={16} color={COLORS.secondary} />
                  <Text style={styles.addButtonText}>Adicionar Slide de Imagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={addVideoSlide}>
                  <Feather name="video" size={16} color={COLORS.secondary} />
                  <Text style={styles.addButtonText}>Adicionar Slide de Vídeo</Text>
                </TouchableOpacity>
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
