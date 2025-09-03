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
import { styles } from './EditEducationalContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore, CarouselSlide } from '@/state/educationalContentStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import AddSlideModal from '@/components/features/AddSlideModal';
import { COLORS } from '@/constants/theme';

type PageName = 'chefinho' | 'escova' | 'pasta' | 'fioDental' | 'fluor' | 'revelador';

const SlideContentEditor = ({ slide, index, handleSlideChange, handleImageChange }: { slide: CarouselSlide, index: number, handleSlideChange: Function, handleImageChange: Function }) => {
  if (slide.collageImages !== undefined) {
    return (
       <>
        {slide.text1 !== undefined && <View style={styles.manualInputContainer}><Text style={styles.label}>Texto Superior</Text><View style={styles.manualTextInputWrapper}><TextInput value={slide.text1 || ''} onChangeText={(text) => handleSlideChange(index, 'text1', text)} multiline style={[styles.manualTextInput, {height: 100}]} /></View></View>}
        <Text style={styles.label}>Imagens da Colagem</Text>
        <View style={styles.collageContainerEditor}>
          <TouchableOpacity style={styles.collageMainImageContainer} onPress={() => handleImageChange(index, 'image', 0)}>
              <Image source={slide.collageImages[0]} style={styles.imagePreview} />
              <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
          </TouchableOpacity>
          <View style={styles.collageSideContainerEditor}>
            <TouchableOpacity style={styles.collageSideImageContainer} onPress={() => handleImageChange(index, 'image', 1)}>
              <Image source={slide.collageImages[1]} style={styles.imagePreview} />
              <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.collageSideImageContainer} onPress={() => handleImageChange(index, 'image', 2)}>
              <Image source={slide.collageImages[2]} style={styles.imagePreview} />
              <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
            </TouchableOpacity>
          </View>
        </View>
        {slide.text2 !== undefined && <View style={styles.manualInputContainer}><Text style={styles.label}>Texto Inferior</Text><View style={styles.manualTextInputWrapper}><TextInput value={slide.text2 || ''} onChangeText={(text) => handleSlideChange(index, 'text2', text)} multiline style={[styles.manualTextInput, {height: 100}]} /></View></View>}
      </>
    );
  }
  
  else if (slide.quote !== undefined) {
    return (
      <>
        <View style={styles.manualInputContainer}>
          <Text style={styles.label}>Citação</Text>
          <View style={styles.manualTextInputWrapper}>
            <TextInput
              value={slide.quote || ''}
              onChangeText={(text) => handleSlideChange(index, 'quote', text)}
              multiline
              style={[styles.manualTextInput, { height: 200 }]}
            />
          </View>
        </View>
        <StyledInput
          label="Autor"
          iconName="user"
          value={slide.author || ''}
          onChangeText={(text) => handleSlideChange(index, 'author', text)}
        />
        {slide.image && (
          <View>
            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
              <Image source={slide.image} style={styles.imagePreview} />
              <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
  
  else if (slide.text1 !== undefined) {
    return (
       <>
        <View style={styles.manualInputContainer}>
          <Text style={styles.label}>Texto 1</Text>
          <View style={styles.manualTextInputWrapper}>
            <TextInput
              value={slide.text1 || ''}
              onChangeText={(text) => handleSlideChange(index, 'text1', text)}
              multiline
              style={[styles.manualTextInput, { height: 150 }]}
            />
          </View>
        </View>
        <View style={styles.manualInputContainer}>
          <Text style={styles.label}>Texto 2</Text>
          <View style={styles.manualTextInputWrapper}>
            <TextInput
              value={slide.text2 || ''}
              onChangeText={(text) => handleSlideChange(index, 'text2', text)}
              multiline
              style={[styles.manualTextInput, { height: 100 }]}
            />
          </View>
        </View>
        {slide.image && (
          <View>
            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
              <Image source={slide.image} style={styles.imagePreview} />
              <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }

  else if (slide.listTitle !== undefined) {
    return (
      <>
        <StyledInput
          label="Título da Lista"
          iconName="list"
          value={slide.listTitle || ''}
          onChangeText={(text) => handleSlideChange(index, 'listTitle', text)}
        />
        <View style={styles.manualInputContainer}>
          <Text style={styles.label}>Tópicos da Lista (um por linha)</Text>
          <View style={styles.manualTextInputWrapper}>
            <TextInput
              value={slide.bulletPoints?.join('\n') || ''}
              onChangeText={(text) => handleSlideChange(index, 'bulletPoints', text.split('\n'))}
              multiline
              style={[styles.manualTextInput, { height: 200 }]}
            />
          </View>
        </View>
      </>
    );
  }

  else if (slide.beforeAfterImages) {
    return (
      <>
        {slide.text && (
            <View style={styles.manualInputContainer}>
            <Text style={styles.label}>Texto</Text>
            <View style={styles.manualTextInputWrapper}>
                <TextInput
                value={slide.text.join('\n') || ''}
                onChangeText={(text) => handleSlideChange(index, 'text', text.split('\n'))}
                multiline
                style={styles.manualTextInput}
                />
            </View>
            </View>
        )}
        <Text style={styles.label}>Imagens Antes/Depois</Text>
        <View style={styles.imageRowEditor}>
          <TouchableOpacity style={styles.imageContainerEditor} onPress={() => handleImageChange(index, 'before')}>
            <Image source={slide.beforeAfterImages.before} style={styles.imagePreview} />
            <Text style={styles.imageLabelEditor}>Antes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageContainerEditor} onPress={() => handleImageChange(index, 'after')}>
            <Image source={slide.beforeAfterImages.after} style={styles.imagePreview} />
            <Text style={styles.imageLabelEditor}>Depois</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  else if (slide.images) {
    return (
        <>
            {slide.title && <StyledInput label="Título" iconName="type" value={slide.title || ''} onChangeText={(text) => handleSlideChange(index, 'title', text)} />}
            {slide.text && <View style={styles.manualInputContainer}><Text style={styles.label}>Texto</Text><View style={styles.manualTextInputWrapper}><TextInput value={slide.text.join('\n') || ''} onChangeText={(text) => handleSlideChange(index, 'text', text.split('\n'))} multiline style={styles.manualTextInput} /></View></View>}
            <Text style={styles.label}>Imagens da Grelha</Text>
            <View style={styles.imageGridEditor}>
            {slide.images.map((img, imgIndex) => (
                <TouchableOpacity key={imgIndex} style={styles.gridImageContainer} onPress={() => handleImageChange(index, 'image', imgIndex)}>
                <Image source={img} style={styles.imagePreview} />
                <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
                </TouchableOpacity>
            ))}
            </View>
        </>
    );
  }

  else if (slide.imageGrid) {
    return (
      <>
        <Text style={styles.label}>Grelha de Imagens</Text>
        <View style={styles.gridContainerEditor}>
          {slide.imageGrid.map((img, imgIndex) => (
            <TouchableOpacity key={imgIndex} style={styles.gridImageContainerEditor} onPress={() => handleImageChange(index, 'image', imgIndex)}>
              <Image source={img} style={styles.imagePreview} />
              <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  }
  else {
    return (
      <>
        {slide.title !== undefined && (
            <StyledInput
              label="Título"
              iconName="type"
              value={slide.title || ''}
              onChangeText={(text) => handleSlideChange(index, 'title', text)}
            />
        )}
        {slide.text !== undefined && (
            <View style={styles.manualInputContainer}>
            <Text style={styles.label}>Texto</Text>
            <View style={styles.manualTextInputWrapper}>
                <TextInput
                value={slide.text.join('\n') || ''}
                onChangeText={(text) => handleSlideChange(index, 'text', text.split('\n'))}
                multiline
                style={styles.manualTextInput}
                />
            </View>
            </View>
        )}
        {slide.image && (
            <View>
              <Text style={styles.label}>Imagem</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
                  <Image source={slide.image} style={styles.imagePreview} />
                  <View style={styles.imageOverlay}><Feather name="edit-2" size={24} color={COLORS.white} /></View>
              </TouchableOpacity>
            </View>
        )}
      </>
    );
  }
};


export default function EditEducationalContentScreen() {
  const router = useRouter();
  const { page } = useLocalSearchParams<{ page: PageName }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const pageContent = useEducationalContentStore((state) => state.pages[page!]);
  const updatePage = useEducationalContentStore((state) => state.updatePage);
  const addSlide = useEducationalContentStore((state) => state.addSlide);
  const removeSlide = useEducationalContentStore((state) => state.removeSlide);

  const [editableSlides, setEditableSlides] = useState<CarouselSlide[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedSlideId, setExpandedSlideId] = useState<string | null>(null);

  useEffect(() => {
    if (pageContent) {
      const slides = JSON.parse(JSON.stringify(pageContent));
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
        pageTitle: `EDITAR ${page?.toUpperCase() || ''}`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [page])
  );

  const handleToggleSlide = (slideId: string) => {
    setExpandedSlideId(currentId => currentId === slideId ? null : slideId);
  };

  const handleSlideChange = (index: number, field: keyof CarouselSlide, value: any) => {
    const newSlides = [...editableSlides];
    (newSlides[index] as any)[field] = value;
    setEditableSlides(newSlides);
  };

  const handleImageChange = async (index: number, field: 'image' | 'before' | 'after' = 'image', imageIndex?: number) => {
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
      const slideToUpdate = newSlides[index];

      if (slideToUpdate.beforeAfterImages && (field === 'before' || field === 'after')) {
        slideToUpdate.beforeAfterImages[field] = { uri: result.assets[0].uri };
      } else if (slideToUpdate.imageGrid && imageIndex !== undefined) {
        slideToUpdate.imageGrid[imageIndex] = { uri: result.assets[0].uri };
      } else if (slideToUpdate.images && imageIndex !== undefined) {
        slideToUpdate.images[imageIndex] = { uri: result.assets[0].uri };
      } else if (slideToUpdate.collageImages && imageIndex !== undefined) {
        slideToUpdate.collageImages[imageIndex] = { uri: result.assets[0].uri };
      }
       else {
        (slideToUpdate as any)[field] = { uri: result.assets[0].uri };
      }
      setEditableSlides(newSlides);
    }
  };

  const handleSaveChanges = () => {
    updatePage(page!, editableSlides);
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };
  
  const handleAddSlide = () => {
    setIsModalVisible(true);
  };
  
  const handleLayoutSelect = (layoutKey: string) => {
    addSlide(page!, layoutKey);
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

  if (!editableSlides || editableSlides.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Carregando conteúdo...</Text>
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
                <SlideContentEditor 
                  slide={slide}
                  index={index}
                  handleSlideChange={handleSlideChange}
                  handleImageChange={handleImageChange}
                />
              </View>
            )}
          </View>
        ))}
        
        <TouchableOpacity style={styles.addSlideButton} onPress={handleAddSlide}>
          <Feather name="plus-circle" size={22} color={COLORS.secondary} />
          <Text style={styles.addSlideButtonText}>Adicionar Novo Slide</Text>
        </TouchableOpacity>

      </ScrollView>

      <AddSlideModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectLayout={handleLayoutSelect}
      />

      <ScreenFooter
        secondaryButtonTitle="Cancelar"
        onSecondaryButtonPress={() => router.back()}
        primaryButtonTitle="Salvar"
        onPrimaryButtonPress={handleSaveChanges}
      />
    </SafeAreaView>
  );
}

