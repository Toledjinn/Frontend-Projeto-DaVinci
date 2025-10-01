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
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from './EditLabPageScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useLaboratorioStore, CarouselSlide } from '@/state/laboratorioStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import { COLORS } from '@/constants/theme';

type PageName = 'produtos' | 'trabalhos' | 'parceiros';

export default function EditLabPageScreen() {
  const router = useRouter();
  const { page } = useLocalSearchParams<{ page: PageName }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const pageContent = useLaboratorioStore((state) => state.pages[page!]);
  const { updateSlide, addSlide, removeSlide } = useLaboratorioStore();
  
  const [editableSlides, setEditableSlides] = useState<CarouselSlide[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedSlideId, setExpandedSlideId] = useState<string | null>(null);

  useEffect(() => {
    if (pageContent) {
      const slides = JSON.parse(JSON.stringify(pageContent.slides));
      setEditableSlides(slides);
      if (slides.length > 0) {
        setExpandedSlideId(slides[0].id);
      }
    }
  }, [pageContent]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar ${pageContent?.title}`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [pageContent])
  );
  const handleToggleSlide = (slideId: string) => {
    setExpandedSlideId(currentId => currentId === slideId ? null : slideId);
  };

  const handleSlideChange = (index: number, field: keyof CarouselSlide, value: string) => {
    const newSlides = [...editableSlides];
    (newSlides[index] as any)[field] = value;
    setEditableSlides(newSlides);
  };

  const handleImageChange = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (!uri) return;

      setEditableSlides(prev => {
        const next = [...prev];
        const slide = next[index];
        if (!slide) return prev;
        next[index] = { ...slide, image: { uri } };
        return next;
      });
    }
  };

  const handleSaveChanges = () => {
    editableSlides.forEach((slide) => {
      updateSlide(page!, slide.id, slide);
    });
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  const handleLayoutSelect = (layout: 'image' | 'video') => {
    addSlide(page!, layout);
    setIsModalVisible(false);
  };

  const handleRemoveSlide = (slideId: string) => {
    Alert.alert(
      "Remover Slide",
      "Tem certeza que deseja remover este slide?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => removeSlide(page!, slideId) }
      ]
    );
  };

  if (!pageContent) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Página não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {editableSlides.map((slide, index) => (
          <View key={slide.id} style={styles.slideEditor}>
            <TouchableOpacity onPress={() => handleToggleSlide(slide.id)}>
              <View style={styles.slideHeader}>
                <Text style={styles.slideTitle}>Slide {index + 1}</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.removeSlideButton} onPress={() => handleRemoveSlide(slide.id)}>
                    <Feather name="trash-2" size={20} color={COLORS.red} />
                  </TouchableOpacity>
                  <Feather name={expandedSlideId === slide.id ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.secondary} />
                </View>
              </View>
            </TouchableOpacity>
            {expandedSlideId === slide.id && (
              <View style={styles.slideContent}>
                <View style={styles.blockContainer}>
                  <StyledInput
                    label="Título"
                    iconName="type"
                    value={slide.title}
                    onChangeText={(text) => handleSlideChange(index, 'title', text)}
                  />
                </View>
                
                <View style={styles.blockContainer}>
                  <Text style={styles.label}>Texto</Text>
                  <TextInput
                    value={slide.text}
                    onChangeText={(text) => handleSlideChange(index, 'text', text)}
                    multiline
                    style={[styles.textInput, { minHeight: 120 }]}
                  />
                </View>

                {slide.image !== undefined && (
                  <View style={styles.blockContainer}>
                    <Text style={styles.label}>Imagem</Text>
                    <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
                      <Image source={slide.image} style={styles.imagePreview} />
                      <View style={styles.imageOverlay}>
                        <Feather name="edit-2" size={24} color={COLORS.white} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {slide.videoUrl !== undefined && (
                  <View style={styles.blockContainer}>
                    <Text style={styles.label}>URL do Vídeo (YouTube)</Text>
                    <TextInput
                      value={slide.videoUrl || ''}
                      onChangeText={(text) => handleSlideChange(index, 'videoUrl', text)}
                      placeholder="Cole o link aqui (opcional)"
                      style={styles.textInput}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addSlideButton} onPress={() => setIsModalVisible(true)}>
          <Feather name="plus-circle" size={22} color={COLORS.secondary} />
          <Text style={styles.addSlideButtonText}>Adicionar Novo Slide</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolha o tipo de slide</Text>
            
            <TouchableOpacity style={styles.modalOptionButton} onPress={() => handleLayoutSelect('image')}>
              <Feather name="image" size={20} color={COLORS.secondary} />
              <Text style={styles.modalOptionText}>Slide com Imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOptionButton} onPress={() => handleLayoutSelect('video')}>
              <Feather name="video" size={20} color={COLORS.secondary} />
              <Text style={styles.modalOptionText}>Slide com Vídeo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScreenFooter
        buttons={[
          {
            title: "Salvar",
            onPress: handleSaveChanges,
            variant: 'primary',  
          },
          {
            title: "Cancelar",
            onPress: () => router.back(),
            variant: 'secondary',  
          }
        ]}
      />
    </SafeAreaView>
  );
}

