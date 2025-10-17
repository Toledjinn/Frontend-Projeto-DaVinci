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

import { styles } from './EditEducationalContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import {
  useEducationalContentStore,
  CarouselSlide,
  PageName,
} from '@/state/educationalContentStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import { COLORS } from '@/constants/theme';

import Chefinho from '@/assets/characters/chefinho.svg';
import Escova from '@/assets/characters/escova1.svg';
import Pasta from '@/assets/characters/pasta.svg';
import FioDental from '@/assets/characters/fio.svg';
import Fluor from '@/assets/characters/fluor.svg';
import Revelador from '@/assets/characters/revelador.svg';

const editContentConfig: Record<PageName, { title: string; CharacterSvg: React.FC<any> }> = {
  chefinho: { title: 'Chefinho', CharacterSvg: Chefinho },
  escova: { title: 'Escova', CharacterSvg: Escova },
  pasta: { title: 'Pasta', CharacterSvg: Pasta },
  'fio-dental': { title: 'Fio Dental', CharacterSvg: FioDental },
  fluor: { title: 'Flúor', CharacterSvg: Fluor },
  'revelador-de-placa': { title: 'Revelador de Placa', CharacterSvg: Revelador },
};

const isValidPageName = (name: any): name is PageName => name in editContentConfig;

const makeSlide = (type: 'text' | 'video' | 'image' | 'quote' | 'list'): CarouselSlide => {
  const id = `slide_${Date.now()}`;

  switch (type) {
    case 'text':
      return { id, title: '', text: [''] };

    case 'video':
      return { id, title: '', text: [''], videoUrl: '' };

    case 'image':
      return { id, title: '', text: [''], image: { uri: '' } as any };

    case 'quote':
      return { id, quote: '', author: '' };

    case 'list':
      return { id, listTitle: '', bulletPoints: [] };

    default:
      return { id, title: '', text: [''] };
  }
};

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
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
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
              style={[styles.manualTextInput, { height: 160 }]}
            />
          </View>
        </View>
        <StyledInput
          label="Autor"
          iconName="user"
          value={slide.author || ''}
          onChangeText={(text) => handleSlideChange(index, 'author', text)}
        />

        {slide.image !== undefined && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
              {((slide.image as any)?.uri || '').length > 0 ? (
                <Image source={slide.image} style={styles.imagePreview} />
              ) : (
                <View style={[styles.imagePreview, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Feather name="image" size={24} color={COLORS.gray_400} />
                </View>
              )}
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
              style={[styles.manualTextInput, { height: 160 }]}
            />
          </View>
        </View>
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
              style={[styles.manualTextInput, { height: 140 }]}
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
              style={[styles.manualTextInput, { height: 120 }]}
            />
          </View>
        </View>

        {slide.image !== undefined && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
              {((slide.image as any)?.uri || '').length > 0 ? (
                <Image source={slide.image} style={styles.imagePreview} />
              ) : (
                <View style={[styles.imagePreview, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Feather name="image" size={24} color={COLORS.gray_400} />
                </View>
              )}
              <View style={styles.imageOverlay}>
                <Feather name="edit-2" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  } else if (slide.images) {
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
        <Text style={[styles.label, { marginTop: 12 }]}>Imagens (toque para trocar)</Text>
        <View style={styles.gridContainerEditor}>
          {slide.images.map((img, imgIndex) => (
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
  } else if (slide.beforeAfterImages) {
    return (
      <>
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
        <Text style={[styles.label, { marginTop: 12 }]}>Imagens Antes/Depois</Text>
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

        {slide.image !== undefined && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={() => handleImageChange(index)}>
              {((slide.image as any)?.uri || '').length > 0 ? (
                <Image source={slide.image} style={styles.imagePreview} />
              ) : (
                <View style={[styles.imagePreview, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Feather name="image" size={24} color={COLORS.gray_400} />
                </View>
              )}
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
  const { contentType } = useLocalSearchParams<{ contentType?: string }>();
  const page: PageName = isValidPageName(contentType) ? (contentType as PageName) : 'chefinho';
  const { title, CharacterSvg } = editContentConfig[page];

  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const topOffset = headerHeight + 8;

  const { pages, updatePage, hydrate, isHydrated } = useEducationalContentStore();

  const [editableSlides, setEditableSlides] = useState<CarouselSlide[]>([]);

  useFocusEffect(
    useCallback(() => {
      hydrate();
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar ${title}`,
        CharacterSvg,
        showNotificationIcon: false,
        visible: true,
      });
    }, [page, title, CharacterSvg, hydrate, setHeaderConfig])
  );

  useEffect(() => {
    if (!isHydrated) return;
    const current = pages[page] ?? [];
    setEditableSlides(JSON.parse(JSON.stringify(current)));
  }, [isHydrated, page, pages]);

  const handleSlideChange = (index: number, field: keyof CarouselSlide, value: any) => {
    setEditableSlides((prev) => {
      const next = [...prev];
      (next[index] as any)[field] = value;
      return next;
    });
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
          if (!result.canceled && result.assets?.[0]?.uri) {
            onPick(result.assets[0].uri);
          }
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
          if (!result.canceled && result.assets?.[0]?.uri) {
            onPick(result.assets[0].uri);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleImageChange = async (
    index: number,
    field: 'image' | 'before' | 'after' = 'image',
    imageIndex?: number
  ): Promise<void> => {
    return new Promise<void>((resolve) => {
      openMediaChooser((uri) => {
        setEditableSlides((prev) => {
          const next = [...prev];
          const current = { ...next[index] };
          if (!current) return prev;

          if (current.beforeAfterImages && (field === 'before' || field === 'after')) {
            current.beforeAfterImages = { ...current.beforeAfterImages, [field]: { uri } as any };
          } else if ((current as any).imageGrid && imageIndex !== undefined) {
            const grid = [ ...(current as any).imageGrid ];
            grid[imageIndex] = { uri } as any;
            (current as any).imageGrid = grid;
          } else if (current.images && imageIndex !== undefined) {
            const imgs = [ ...current.images ];
            imgs[imageIndex] = { uri } as any;
            current.images = imgs;
          } else {
            (current as any)[field] = { uri };
          }

          next[index] = current as CarouselSlide;
          return next;
        });
        resolve();
      });
    });
  };

  const addNewImageSlide = () => {
    openMediaChooser((uri) => {
      setEditableSlides((prev) => [
        ...prev,
        { id: `slide_${Date.now()}`, title: '', text: [''], image: { uri } as any },
      ]);
    });
  };

  const addNewSlide = (type: 'text' | 'video' | 'image' | 'quote' | 'list') => {
    setEditableSlides((prev) => [...prev, makeSlide(type)]);
  };

  const removeLocalSlide = (slideId: string) => {
    setEditableSlides((prev) => {
      if (prev.length <= 1) {
        Alert.alert('Atenção', 'Não é possível remover o último slide.');
        return prev;
      }
      return prev.filter((s) => s.id !== slideId);
    });
  };

  const handleSaveChanges = async () => {
    await updatePage(page, editableSlides);
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  if (!isHydrated) {
    return <SafeAreaView style={styles.safeArea} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.pageBody, styles.pageBodySidePadding, { paddingTop: topOffset }]}>
        <View style={styles.editorCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Editar {title}</Text>
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
                  <TouchableOpacity
                    style={styles.removeIconTap}
                    onPress={() => removeLocalSlide(slide.id)}
                  >
                    <Feather name="trash-2" size={18} color={COLORS.red} />
                  </TouchableOpacity>
                </View>

                <SlideContentEditor
                  slide={slide}
                  index={index}
                  handleSlideChange={handleSlideChange}
                  handleImageChange={handleImageChange}
                />
              </View>
            ))}

            <View style={styles.addButtonsContainer}>
              <Text style={styles.label}>Adicionar novo slide</Text>
              <View style={styles.addRow}>
                <TouchableOpacity style={styles.addButton} onPress={() => addNewSlide('text')}>
                  <Feather name="type" size={16} color={COLORS.secondary} />
                  <Text style={styles.addButtonText}>Texto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={() => addNewSlide('video')}>
                  <Feather name="video" size={16} color={COLORS.secondary} />
                  <Text style={styles.addButtonText}>Vídeo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={addNewImageSlide}>
                  <Feather name="image" size={16} color={COLORS.secondary} />
                  <Text style={styles.addButtonText}>Imagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={() => addNewSlide('quote')}>
                  <Feather name="message-square" size={16} color={COLORS.secondary} />
                  <Text style={styles.addButtonText}>Citação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={() => addNewSlide('list')}>
                  <Feather name="list" size={16} color={COLORS.secondary} />
                  <Text style={styles.addButtonText}>Lista</Text>
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
