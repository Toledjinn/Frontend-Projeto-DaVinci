// src/screens/app/EditEducationalContent/EditEducationalContentScreen.tsx

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './EditEducationalContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useEducationalContentStore, CarouselSlide } from '@/state/educationalContentStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import StyledInput from '@/components/common/StyledInput';
import ScreenFooter from '@/components/common/ScreenFooter';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

type PageName = 'chefinho' | 'escova' | 'pasta' | 'fioDental' | 'fluor' | 'revelador';

export default function EditEducationalContentScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { page } = useLocalSearchParams<{ page: PageName }>();
  
  const { pages, updatePage } = useEducationalContentStore();

  const [editedSlides, setEditedSlides] = useState<CarouselSlide[]>([]);

  useEffect(() => {
    if (page) {
      setEditedSlides(pages[page]);
    }
  }, [page, pages]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `EDITAR ${page?.toUpperCase()}`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [page])
  );

  const handleTextChange = (text: string, index: number, field: keyof CarouselSlide) => {
    const newSlides = [...editedSlides];
    newSlides[index] = { ...newSlides[index], [field]: text };
    setEditedSlides(newSlides);
  };
  
  const handleArrayTextChange = (text: string, slideIndex: number, paragraphIndex: number, field: 'text' | 'bulletPoints') => {
    const newSlides = [...editedSlides];
    const newArray = [...(newSlides[slideIndex][field] || [])];
    newArray[paragraphIndex] = text;
    newSlides[slideIndex] = { ...newSlides[slideIndex], [field]: newArray };
    setEditedSlides(newSlides);
  };

  const handleImageChange = async (index: number, imageField: 'image' | 'before' | 'after' = 'image') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const newSlides = [...editedSlides];
      const uri = { uri: result.assets[0].uri };
      if (imageField === 'image') {
        newSlides[index] = { ...newSlides[index], image: uri };
      } else if (imageField === 'before') {
        newSlides[index].beforeAfterImages!.before = uri;
      } else if (imageField === 'after') {
        newSlides[index].beforeAfterImages!.after = uri;
      }
      setEditedSlides(newSlides);
    }
  };

  const handleSaveChanges = () => {
    if (page) {
      updatePage(page, editedSlides);
      Alert.alert('Sucesso', 'Conteúdo atualizado!');
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 20 }]}
      >
        {editedSlides.map((slide, index) => (
          <View key={slide.id} style={styles.slideEditor}>
            <Text style={styles.slideHeader}>Slide {index + 1}</Text>
            
            {slide.title !== undefined && (
              <StyledInput label="Título" iconName="type" value={slide.title} onChangeText={(text) => handleTextChange(text, index, 'title')} />
            )}
            
            {slide.quote !== undefined && (
              <View style={{marginTop: 16}}>
                <Text style={styles.fieldLabel}>Citação</Text>
                <View style={[styles.manualInputContainer, {height: 200}]}>
                  <Feather name="message-square" size={24} color={COLORS.gray_400} style={{ marginTop: 2 }}/>
                  <TextInput value={slide.quote} onChangeText={(text) => handleTextChange(text, index, 'quote')} multiline style={styles.manualInput} />
                </View>
              </View>
            )}
            {slide.author !== undefined && (
              <StyledInput label="Autor" iconName="user" value={slide.author} onChangeText={(text) => handleTextChange(text, index, 'author')} />
            )}

            {slide.text1 !== undefined && (
              <View style={{marginTop: 16}}>
                <Text style={styles.fieldLabel}>Parágrafo 1</Text>
                <View style={[styles.manualInputContainer, {height: 150}]}>
                  <Feather name="file-text" size={24} color={COLORS.gray_400} style={{ marginTop: 2 }}/>
                  <TextInput value={slide.text1} onChangeText={(text) => handleTextChange(text, index, 'text1')} multiline style={styles.manualInput} />
                </View>
              </View>
            )}
            {slide.text2 !== undefined && (
              <View style={{marginTop: 16}}>
                <Text style={styles.fieldLabel}>Parágrafo 2</Text>
                <View style={[styles.manualInputContainer, {height: 100}]}>
                  <Feather name="file-text" size={24} color={COLORS.gray_400} style={{ marginTop: 2 }}/>
                  <TextInput value={slide.text2} onChangeText={(text) => handleTextChange(text, index, 'text2')} multiline style={styles.manualInput} />
                </View>
              </View>
            )}

            {slide.text?.map((paragraph, pIndex) => (
              <View key={pIndex} style={{marginTop: 16}}>
                <Text style={styles.fieldLabel}>Parágrafo {pIndex + 1}</Text>
                <View style={styles.manualInputContainer}>
                  <TextInput value={paragraph} onChangeText={(text) => handleArrayTextChange(text, index, pIndex, 'text')} multiline style={styles.manualInput} />
                </View>
              </View>
            ))}

            {slide.listTitle !== undefined && (
              <StyledInput label="Título da Lista" iconName="list" value={slide.listTitle} onChangeText={(text) => handleTextChange(text, index, 'listTitle')} />
            )}
            {slide.bulletPoints?.map((point, pIndex) => (
              <View key={pIndex} style={{marginTop: 16}}>
                <Text style={styles.fieldLabel}>Tópico {pIndex + 1}</Text>
                <View style={styles.manualInputContainer}>
                  <TextInput value={point} onChangeText={(text) => handleArrayTextChange(text, index, pIndex, 'bulletPoints')} multiline style={styles.manualInput} />
                </View>
              </View>
            ))}
             {slide.images ? (
              <View>
                <Text style={styles.fieldLabel}>Imagens da Grelha</Text>
                <View style={styles.imageGridEditor}>
                  {slide.images.map((img, imgIndex) => (
                    <TouchableOpacity key={imgIndex} style={styles.gridImageContainer} onPress={() => handleImageChange(index, 'grid', imgIndex)}>
                      <Image source={img} style={styles.gridImage} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : slide.collageImages ? (
              <View>
                <Text style={styles.fieldLabel}>Imagens da Colagem</Text>
                <View style={styles.imageRow}>
                  <TouchableOpacity style={{width: '60%'}} onPress={() => handleImageChange(index, 'collage', 0)}>
                     <Image source={slide.collageImages[0]} style={styles.thumbnail} />
                  </TouchableOpacity>
                  <View style={styles.collageSideContainer}>
                    <TouchableOpacity onPress={() => handleImageChange(index, 'collage', 1)}>
                      <Image source={slide.collageImages[1]} style={styles.collageSideImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleImageChange(index, 'collage', 2)}>
                      <Image source={slide.collageImages[2]} style={styles.collageSideImage} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : slide.beforeAfterImages ? (
              <View style={styles.imageRow}>
                <View style={styles.imageContainer}>
                  <Text style={styles.fieldLabel}>Antes</Text>
                  <TouchableOpacity onPress={() => handleImageChange(index, 'before')}>
                    <Image source={slide.beforeAfterImages.before} style={styles.thumbnail} />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                  <Text style={styles.fieldLabel}>Depois</Text>
                  <TouchableOpacity onPress={() => handleImageChange(index, 'after')}>
                    <Image source={slide.beforeAfterImages.after} style={styles.thumbnail} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : slide.imageGrid ? (
              <View>
                <Text style={styles.fieldLabel}>Imagens da Grelha</Text>
                <View style={styles.imageGridEditor}>
                  {slide.imageGrid.map((img, imgIndex) => (
                    <TouchableOpacity key={imgIndex} style={styles.gridImageContainer} onPress={() => handleImageChange(index, 'imageGrid', imgIndex)}>
                      <Image source={img} style={styles.gridImage} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : slide.image && (
              <>
                <Text style={styles.fieldLabel}>Imagem</Text>
                <TouchableOpacity onPress={() => handleImageChange(index, 'image')}>
                  <Image source={slide.image} style={styles.thumbnail} />
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}
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
