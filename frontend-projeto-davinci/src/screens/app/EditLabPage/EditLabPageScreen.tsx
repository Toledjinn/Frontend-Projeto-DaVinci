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
  const updateSlide = useLaboratorioStore((state) => state.updateSlide);
  const addSlide = useLaboratorioStore((state) => state.addSlide);
  const removeSlide = useLaboratorioStore((state) => state.removeSlide);
  
  const [editableSlides, setEditableSlides] = useState<CarouselSlide[]>([]);

  useEffect(() => {
    if (pageContent) {
      setEditableSlides(JSON.parse(JSON.stringify(pageContent.slides)));
    }
  }, [pageContent]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `EDITAR ${pageContent?.title.toUpperCase() || ''}`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [pageContent])
  );

  const handleSlideChange = (index: number, field: keyof CarouselSlide, value: string) => {
    const newSlides = [...editableSlides];
    (newSlides[index] as any)[field] = value;
    setEditableSlides(newSlides);
  };

  const handleImageChange = async (index: number) => {
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
      const newSlides = [...editableSlides];
      newSlides[index].image = { uri: result.assets[0].uri };
      setEditableSlides(newSlides);
    }
  };

  const handleSaveChanges = () => {
    editableSlides.forEach((slide) => {
      updateSlide(page!, slide.id, slide);
    });
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  const handleAddSlide = () => {
    addSlide(page!);
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
            <View style={styles.slideHeader}>
              <Text style={styles.slideTitle}>Slide {index + 1}</Text>
              <TouchableOpacity style={styles.removeSlideButton} onPress={() => handleRemoveSlide(slide.id)}>
                 <Feather name="trash-2" size={20} color={COLORS.red} />
              </TouchableOpacity>
            </View>

            <StyledInput
              label="Título"
              iconName="type"
              value={slide.title}
              onChangeText={(text) => handleSlideChange(index, 'title', text)}
            />
            
            <View style={styles.manualInputContainer}>
              <Text style={styles.label}>Texto</Text>
              <View style={styles.manualTextInputWrapper}>
                <TextInput
                  value={slide.text}
                  onChangeText={(text) => handleSlideChange(index, 'text', text)}
                  multiline
                  style={styles.manualTextInput}
                />
              </View>
            </View>

            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
              <Image source={slide.image} style={styles.imagePreview} />
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addSlideButton} onPress={handleAddSlide}>
          <Feather name="plus-circle" size={22} color={COLORS.secondary} />
          <Text style={styles.addSlideButtonText}>Adicionar Novo Slide</Text>
        </TouchableOpacity>
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

