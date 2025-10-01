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
import { useLocalSearchParams, useRouter, useFocusEffect, useSegments } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from './EditEducationalContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore, CarouselSlide } from '@/state/educationalContentStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import AddSlideModal from '@/components/features/AddSlideModal';
import { COLORS } from '@/constants/theme';

import Chefinho from '@/assets/characters/chefinho.svg';
import Escova from '@/assets/characters/escova1.svg';
import Pasta from '@/assets/characters/pasta.svg';
import FioDental from '@/assets/characters/fio.svg';
import Fluor from '@/assets/characters/fluor.svg';
import Revelador from '@/assets/characters/revelador.svg';

type PageName = 'chefinho' | 'escova' | 'pasta' | 'fio' | 'fluor' | 'revelador';

const fitIconForHeader = (
  Svg: React.ComponentType<any>,
  scalePct = 0.90 
) => {
  const pct = `${Math.round(scalePct * 100)}%`;
  const Fitted = () => (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Svg width={pct} height={pct} preserveAspectRatio="xMidYMid meet" />
    </View>
  );
  return Fitted;
};

const CHARACTER_MAP: Record<PageName, React.ComponentType<any>> = {
  chefinho: Chefinho,
  escova: Escova,
  pasta: Pasta,
  fio: FioDental,
  fluor: Fluor,
  revelador: Revelador,
};

const TITLE_MAP: Record<PageName, string> = {
  chefinho: 'Chefinho',
  escova: 'Escova',
  pasta: 'Pasta',
  fio: 'Fio Dental',
  fluor: 'Flúor',
  revelador: 'Revelador de Placa',
};

function resolvePageName(paramPage?: string, segments?: string[]): PageName {
  if (paramPage) {
    const p = paramPage.toLowerCase();
    if (p in CHARACTER_MAP) return p as PageName;
  }
  const last = (segments?.[segments.length - 1] || '').toLowerCase();
  if (last.includes('chefinho')) return 'chefinho';
  if (last.includes('escova')) return 'escova';
  if (last.includes('pasta')) return 'pasta';
  if (last.includes('fio')) return 'fio';
  if (last.includes('fluor') || last.includes('flúor')) return 'fluor';
  if (last.includes('revelador')) return 'revelador';
  return 'chefinho';
}

const SlideContentEditor = ({
  slide,
  index,
  handleSlideChange,
  handleImageChange,
}: {
  slide: CarouselSlide;
  index: number;
  handleSlideChange: (index: number, field: keyof CarouselSlide, value: any) => void;
  handleImageChange: (
    index: number,
    field?: 'image' | 'before' | 'after',
    imageIndex?: number
  ) => Promise<void>;
}) => {
  if (slide.videoUrl !== undefined) {
    return (
      <>
        <StyledInput
          label="Título do Vídeo"
          iconName="type"
          value={slide.title || ''}
          onChangeText={(text) => handleSlideChange(index, 'title', text)}
        />
        <View style={styles.manualInputContainer}>
          <Text style={styles.label}>Descrição</Text>
          <View style={styles.manualTextInputWrapper}>
            <TextInput
              value={slide.text?.join('\n') || ''}
              onChangeText={(text) => handleSlideChange(index, 'text', text.split('\n'))}
              multiline
              style={[styles.manualTextInput, { height: 100 }]}
            />
          </View>
        </View>
        <View style={styles.manualInputContainer}>
          <Text style={styles.label}>URL do Vídeo (YouTube)</Text>
          <View style={styles.manualTextInputWrapper}>
            <TextInput
              value={slide.videoUrl || ''}
              onChangeText={(text) => handleSlideChange(index, 'videoUrl', text)}
              placeholder="Cole o link do YouTube aqui"
              style={styles.manualTextInput}
            />
          </View>
        </View>
      </>
    );
  } else if (slide.collageImages !== undefined) {
    return (
      <>
        {slide.text1 !== undefined && (
          <View style={styles.manualInputContainer}>
            <Text style={styles.label}>Texto Superior</Text>
            <View style={styles.manualTextInputWrapper}>
              <TextInput
                value={slide.text1 || ''}
                onChangeText={(text) => handleSlideChange(index, 'text1', text)}
                multiline
                style={[styles.manualTextInput, { height: 100 }]}
              />
            </View>
          </View>
        )}

        <Text style={styles.label}>Imagens da Colagem</Text>
        <View style={styles.collageContainerEditor}>
          <TouchableOpacity
            style={styles.collageMainImageContainer}
            onPress={() => handleImageChange(index, 'image', 0)}
          >
            <Image source={slide.collageImages[0]} style={styles.imagePreview} />
            <View style={styles.imageOverlay}>
              <Feather name="edit-2" size={24} color={COLORS.white} />
            </View>
          </TouchableOpacity>
          <View style={styles.collageSideContainerEditor}>
            <TouchableOpacity
              style={styles.collageSideImageContainer}
              onPress={() => handleImageChange(index, 'image', 1)}
            >
              <Image source={slide.collageImages[1]} style={styles.imagePreview} />
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.collageSideImageContainer}
              onPress={() => handleImageChange(index, 'image', 2)}
            >
              <Image source={slide.collageImages[2]} style={styles.imagePreview} />
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {slide.text2 !== undefined && (
          <View style={styles.manualInputContainer}>
            <Text style={styles.label}>Texto Inferior</Text>
            <View style={styles.manualTextInputWrapper}>
              <TextInput
                value={slide.text2 || ''}
                onChangeText={(text) => handleSlideChange(index, 'text2', text)}
                multiline
                style={[styles.manualTextInput, { height: 100 }]}
              />
            </View>
          </View>
        )}
      </>
    );
  } else if (slide.quote !== undefined) {
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
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  } else if (slide.text1 !== undefined) {
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
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  } else if (slide.listTitle !== undefined) {
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
  } else if (slide.beforeAfterImages) {
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
          <TouchableOpacity
            style={styles.imageContainerEditor}
            onPress={() => handleImageChange(index, 'before')}
          >
            <Image source={slide.beforeAfterImages.before} style={styles.imagePreview} />
            <Text style={styles.imageLabelEditor}>Antes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageContainerEditor}
            onPress={() => handleImageChange(index, 'after')}
          >
            <Image source={slide.beforeAfterImages.after} style={styles.imagePreview} />
            <Text style={styles.imageLabelEditor}>Depois</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  } else if (slide.images) {
    return (
      <>
        {slide.title && (
          <StyledInput
            label="Título"
            iconName="type"
            value={slide.title || ''}
            onChangeText={(text) => handleSlideChange(index, 'title', text)}
          />
        )}
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
        <Text style={styles.label}>Imagens da Grelha</Text>
        <View style={styles.imageGridEditor}>
          {slide.images.map((img, imgIndex) => (
            <TouchableOpacity
              key={imgIndex}
              style={styles.gridImageContainer}
              onPress={() => handleImageChange(index, 'image', imgIndex)}
            >
              <Image source={img} style={styles.imagePreview} />
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  } else if (slide.imageGrid) {
    return (
      <>
        <Text style={styles.label}>Grelha de Imagens</Text>
        <View style={styles.gridContainerEditor}>
          {slide.imageGrid.map((img, imgIndex) => (
            <TouchableOpacity
              key={imgIndex}
              style={styles.gridImageContainerEditor}
              onPress={() => handleImageChange(index, 'image', imgIndex)}
            >
              <Image source={img} style={styles.imagePreview} />
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  } else {
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
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
};

export default function EditEducationalContentScreen() {
  const router = useRouter();
  const segments = useSegments();
  const { page: pageParam } = useLocalSearchParams<{ page?: string }>();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const page = resolvePageName(pageParam, segments);

  const pageContent = useEducationalContentStore((state) => state.pages[page]);
  const updatePage = useEducationalContentStore((state) => state.updatePage);
  const addSlide = useEducationalContentStore((state) => state.addSlide);
  const removeSlide = useEducationalContentStore((state) => state.removeSlide);

  const [editableSlides, setEditableSlides] = useState<CarouselSlide[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedSlideId, setExpandedSlideId] = useState<string | null>(null);

  useEffect(() => {
    if (pageContent) {
      const slides = JSON.parse(JSON.stringify(pageContent)) as CarouselSlide[];
      setEditableSlides(slides);
      if (slides.length > 0) setExpandedSlideId(slides[0].id);
    }
  }, [pageContent]);

  useFocusEffect(
    useCallback(() => {
      const BaseIcon = CHARACTER_MAP[page] ?? Chefinho;
      const CharacterSvg = fitIconForHeader(BaseIcon, 0.90);

      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar ${TITLE_MAP[page] ?? page}`,
        CharacterSvg,
        showNotificationIcon: true,
        visible: true,
      });

      return () => {
        setHeaderConfig((prev) => ({ ...prev, showPageHeaderElements: false }));
      };
    }, [page, setHeaderConfig])
  );

  const handleToggleSlide = (slideId: string) => {
    setExpandedSlideId((currentId) => (currentId === slideId ? null : slideId));
  };

  const handleSlideChange = (index: number, field: keyof CarouselSlide, value: any) => {
    setEditableSlides((prev) => {
      const next = [...prev];
      (next[index] as any)[field] = value;
      return next;
    });
  };

  const handleImageChange = async (
    index: number,
    field: 'image' | 'before' | 'after' = 'image',
    imageIndex?: number
  ) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Conceda acesso à galeria para selecionar a imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (result.canceled) return;

    const uri = result.assets?.[0]?.uri;
    if (!uri) return;

    setEditableSlides((prev) => {
      const next = [...prev];
      const current = next[index];
      if (!current) return prev;

      const updated: CarouselSlide = { ...current };

      if (updated.beforeAfterImages && (field === 'before' || field === 'after')) {
        updated.beforeAfterImages = { ...updated.beforeAfterImages, [field]: { uri } };
      } else if (updated.imageGrid && imageIndex !== undefined) {
        const grid = [...updated.imageGrid];
        grid[imageIndex] = { uri };
        updated.imageGrid = grid;
      } else if (updated.images && imageIndex !== undefined) {
        const imgs = [...updated.images];
        imgs[imageIndex] = { uri };
        updated.images = imgs;
      } else if (updated.collageImages && imageIndex !== undefined) {
        const collage = [...updated.collageImages];
        collage[imageIndex] = { uri };
        updated.collageImages = collage;
      } else {
        (updated as any)[field] = { uri };
      }

      next[index] = updated;
      return next;
    });
  };

  const handleSaveChanges = () => {
    updatePage(page, editableSlides);
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  const handleAddSlide = () => setIsModalVisible(true);

  const handleLayoutSelect = (layoutKey: string) => {
    addSlide(page, layoutKey);
    setIsModalVisible(false);
  };

  const handleRemoveSlide = (slideId: string) => {
    Alert.alert('Remover Slide', 'Tem certeza que deseja remover este slide?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removeSlide(page, slideId) },
    ]);
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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {editableSlides.map((slide, index) => (
          <View key={slide.id} style={styles.slideEditor}>
            <TouchableOpacity onPress={() => handleToggleSlide(slide.id)}>
              <View style={styles.slideHeader}>
                <Text style={styles.slideTitle}>Slide {index + 1}</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity
                    style={styles.removeSlideButton}
                    onPress={() => handleRemoveSlide(slide.id)}
                  >
                    <Feather name="trash-2" size={20} color={COLORS.red} />
                  </TouchableOpacity>
                  <Feather
                    name={expandedSlideId === slide.id ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={COLORS.secondary}
                  />
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
