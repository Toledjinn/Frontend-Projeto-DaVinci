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
import { styles } from './EditLaboratorioContent.styles';
import { useUIStore } from '@/state/uiStore';
import { useLaboratorioStore, PageName, CarouselSlide } from '@/state/laboratorioStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';
import Chefinho from '@/assets/characters/chefinho.svg';

const isValidPageName = (name: any): name is PageName => {
  return ['produtos', 'trabalhos', 'parceiros'].includes(name);
};

export default function EditLaboratorioContentScreen() {
  const router = useRouter();
  const { pageName } = useLocalSearchParams<{ pageName?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const page = isValidPageName(pageName) ? pageName : 'produtos';

  const { pages, updateSlide, addSlide, removeSlide } = useLaboratorioStore();
  const pageContent = pages[page];

  const [editableSlides, setEditableSlides] = useState<CarouselSlide[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (pageContent?.slides) {
      const slides = JSON.parse(JSON.stringify(pageContent.slides));
      setEditableSlides(slides);
      if (slides.length > 0) {
        setExpandedId(slides[0].id);
      }
    }
  }, [pageContent]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar "${pageContent.title}"`,
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [page, pageContent.title])
  );

  const handleItemChange = (id: string, field: keyof CarouselSlide, value: any) => {
    setEditableSlides((prev) =>
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
    editableSlides.forEach((slide) => {
        updateSlide(page, slide.id, slide);
    });
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert('Remover Slide', 'Tem certeza que deseja remover este slide?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => removeSlide(page, id) },
    ]);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((currentId) => (currentId === id ? null : id));
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {editableSlides.map((slide, index) => (
          <View key={slide.id} style={styles.editorCard}>
            <TouchableOpacity onPress={() => toggleExpand(slide.id)}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{`Slide ${index + 1}: ${slide.title}`}</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(slide.id)}>
                    <Feather name="trash-2" size={20} color={COLORS.red} />
                  </TouchableOpacity>
                  <Feather name={expandedId === slide.id ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.secondary} />
                </View>
              </View>
            </TouchableOpacity>
            {expandedId === slide.id && (
              <View style={styles.cardContent}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        value={slide.title}
                        onChangeText={(text) => handleItemChange(slide.id, 'title', text)}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Texto</Text>
                    <TextInput
                        value={slide.text}
                        onChangeText={(text) => handleItemChange(slide.id, 'text', text)}
                        multiline
                        style={[styles.textInput, { height: 120 }]}
                    />
                </View>
                {slide.image && (
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Imagem</Text>
                        <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(slide.id)}>
                            <Image source={slide.image} style={styles.imagePreview} />
                            <View style={styles.imageOverlay}>
                                <Feather name="edit-2" size={24} color={COLORS.white} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {slide.videoUrl !== undefined && (
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>URL do Vídeo (Opcional)</Text>
                        <TextInput
                            value={slide.videoUrl}
                            onChangeText={(text) => handleItemChange(slide.id, 'videoUrl', text)}
                            placeholder="Cole o link do YouTube aqui"
                            style={styles.textInput}
                        />
                    </View>
                )}
              </View>
            )}
          </View>
        ))}
        <View style={styles.addButtonsContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => addSlide(page, 'image')}>
                <Feather name="image" size={16} color={COLORS.secondary} />
                <Text style={styles.addButtonText}>Adicionar Slide de Imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => addSlide(page, 'video')}>
                <Feather name="video" size={16} color={COLORS.secondary} />
                <Text style={styles.addButtonText}>Adicionar Slide de Vídeo</Text>
            </TouchableOpacity>
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
