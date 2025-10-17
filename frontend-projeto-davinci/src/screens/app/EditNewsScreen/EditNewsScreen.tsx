import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

import { styles } from './EditNewsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useNewsStore, NewsItem } from '@/state/newsStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import { COLORS } from '@/constants/theme';
import Chefinho from '@/assets/characters/chefinho.svg';

type Draft = {
  title?: string;
  content?: string;
  image?: any;      
  videoUrl?: string;
};

export default function EditOrCreateNewsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const topOffset = headerHeight + 8;

  const hydrate = useNewsStore((s) => s.hydrate);
  const isHydrated = useNewsStore((s) => s.isHydrated);
  const getNewsById = useNewsStore((s) => s.getNewsById);
  const addNews = useNewsStore((s) => s.addNews);
  const updateNews = useNewsStore((s) => s.updateNews);

  useEffect(() => {
    if (!isHydrated) hydrate();
  }, [isHydrated, hydrate]);

  const original = useMemo(() => (id ? getNewsById(id) : undefined), [id, getNewsById]);
  const isEdit = !!original;

  const [draft, setDraft] = useState<Draft>({});
  const [hasTitle, setHasTitle] = useState<boolean>(!!original?.title);
  const [hasImage, setHasImage] = useState<boolean>(!!original?.image);
  const [hasContent, setHasContent] = useState<boolean>(!!original?.content);
  const [hasVideo, setHasVideo] = useState<boolean>(!!original?.videoUrl);

  useEffect(() => {
    if (isEdit && original) {
      setDraft({
        title: original.title,
        content: original.content,
        image: original.image,
        videoUrl: original.videoUrl ?? '',
      });
      setHasTitle(!!original.title);
      setHasImage(!!original.image);
      setHasContent(!!original.content);
      setHasVideo(!!original.videoUrl);
    } else {
      setDraft({ title: '', content: '', image: undefined, videoUrl: '' });
      setHasTitle(false);
      setHasImage(false);
      setHasContent(false);
      setHasVideo(false);
    }
  }, [isEdit, original]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: isEdit ? 'Editar Novidade' : 'Criar Novidade',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [isEdit, setHeaderConfig])
  );

  const handleChange = <K extends keyof Draft>(field: K, value: Draft[K]) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
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

  const handlePickCover = () => {
    openMediaChooser((uri) => {
      handleChange('image', { uri });
      setHasImage(true);
    });
  };

  const addImageField = () => {
    openMediaChooser((uri) => {
      handleChange('image', { uri });
      setHasImage(true);
    });
  };

  const validateAndPersist = async () => {
    const titleOk = hasTitle && !!draft.title?.trim();
    const hasAnyOther =
      (hasImage && !!draft.image) ||
      (hasContent && !!draft.content?.trim()) ||
      (hasVideo && !!(draft.videoUrl ?? '').trim());

    if (!titleOk || !hasAnyOther) {
      Alert.alert(
        'Campos obrigatórios',
        'Informe um Título e pelo menos mais um item: Imagem, Conteúdo ou Vídeo.'
      );
      return;
    }

    const normalizedVideo = hasVideo ? (draft.videoUrl ?? '').trim() || undefined : undefined;

    if (isEdit && id) {
      const partial: Partial<NewsItem> = {
        title: draft.title!.trim(),
        content: hasContent ? (draft.content ?? '').trim() : undefined,
        image: hasImage ? draft.image : undefined,
        videoUrl: normalizedVideo,
      };
      await updateNews(id, partial);
      Alert.alert('Sucesso!', 'Novidade atualizada.');
      router.back();
      return;
    }

    const created = await addNews({
      title: draft.title!.trim(),
      content: hasContent ? (draft.content ?? '').trim() : '',
      image: hasImage ? draft.image! : undefined,
      videoUrl: normalizedVideo,
    });

    Alert.alert('Sucesso!', 'Novidade publicada.');
    router.replace({ pathname: '/(app)/novidades/[id]', params: { id: created.id } });
  };

  if (!isHydrated) {
    return <SafeAreaView style={styles.safeArea} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.pageBody, styles.pageBodySidePadding, { paddingTop: topOffset }]}>
        <View style={styles.editorCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{isEdit ? 'Editar Novidade' : 'Criar Novidade'}</Text>
          </View>

          <ScrollView
            style={styles.editorScroll}
            contentContainerStyle={styles.editorScrollContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {hasTitle && (
              <View style={styles.itemBox}>
                <View style={styles.itemBoxHeader}>
                  <Text style={styles.label}>Título</Text>
                  <TouchableOpacity
                    style={styles.removeIconTap}
                    onPress={() => {
                      setHasTitle(false);
                      handleChange('title', '');
                    }}
                  >
                    <Feather name="trash-2" size={18} color={COLORS.red} />
                  </TouchableOpacity>
                </View>

                <StyledInput
                  label=""
                  iconName="type"
                  value={draft.title ?? ''}
                  onChangeText={(t) => handleChange('title', t)}
                  placeholder="Digite o título da novidade"
                />
              </View>
            )}

            {hasImage && (
              <View style={styles.itemBox}>
                <View style={styles.itemBoxHeader}>
                  <Text style={styles.label}>Imagem de capa</Text>
                  <TouchableOpacity
                    style={styles.removeIconTap}
                    onPress={() => {
                      setHasImage(false);
                      handleChange('image', undefined as any);
                    }}
                  >
                    <Feather name="trash-2" size={18} color={COLORS.red} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.imagePicker} onPress={handlePickCover}>
                  {draft.image ? (
                    <Image source={draft.image} style={styles.imagePreview} />
                  ) : (
                    <View style={[styles.imagePreview, { justifyContent: 'center', alignItems: 'center' }]}>
                      <Feather name="image" size={24} color={COLORS.gray_400} />
                      <Text style={styles.imagePickerText}>Selecionar imagem</Text>
                    </View>
                  )}
                  <View style={styles.imageOverlay}>
                    <Feather name="edit-2" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {hasContent && (
              <View style={styles.itemBox}>
                <View style={styles.itemBoxHeader}>
                  <Text style={styles.label}>Conteúdo</Text>
                  <TouchableOpacity
                    style={styles.removeIconTap}
                    onPress={() => {
                      setHasContent(false);
                      handleChange('content', '');
                    }}
                  >
                    <Feather name="trash-2" size={18} color={COLORS.red} />
                  </TouchableOpacity>
                </View>

                <View style={styles.manualTextInputWrapper}>
                  <TextInput
                    value={draft.content ?? ''}
                    onChangeText={(t) => handleChange('content', t)}
                    placeholder="Escreva o conteúdo da novidade aqui..."
                    multiline
                    style={[styles.manualTextInput, { height: 180 }]}
                  />
                </View>
              </View>
            )}

            {hasVideo && (
              <View style={styles.itemBox}>
                <View style={styles.itemBoxHeader}>
                  <Text style={styles.label}>URL do Vídeo (YouTube)</Text>
                  <TouchableOpacity
                    style={styles.removeIconTap}
                    onPress={() => {
                      setHasVideo(false);
                      handleChange('videoUrl', '');
                    }}
                  >
                    <Feather name="trash-2" size={18} color={COLORS.red} />
                  </TouchableOpacity>
                </View>

                <View style={styles.manualTextInputWrapper}>
                  <TextInput
                    value={draft.videoUrl ?? ''}
                    onChangeText={(t) => handleChange('videoUrl', t)}
                    placeholder="Cole o link aqui"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.manualTextInput}
                  />
                </View>
              </View>
            )}

            <View style={styles.addButtonsContainer}>
              <Text style={styles.label}>Adicionar campos</Text>
              <View style={styles.addRow}>
                {!hasTitle && (
                  <TouchableOpacity style={styles.addButton} onPress={() => setHasTitle(true)}>
                    <Feather name="type" size={16} color={COLORS.secondary} />
                    <Text style={styles.addButtonText}>Título</Text>
                  </TouchableOpacity>
                )}
                {!hasImage && (
                  <TouchableOpacity style={styles.addButton} onPress={addImageField}>
                    <Feather name="image" size={16} color={COLORS.secondary} />
                    <Text style={styles.addButtonText}>Imagem</Text>
                  </TouchableOpacity>
                )}
                {!hasContent && (
                  <TouchableOpacity style={styles.addButton} onPress={() => setHasContent(true)}>
                    <Feather name="file-text" size={16} color={COLORS.secondary} />
                    <Text style={styles.addButtonText}>Conteúdo</Text>
                  </TouchableOpacity>
                )}
                {!hasVideo && (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      setHasVideo(true);
                      if (draft.videoUrl === undefined) handleChange('videoUrl', '');
                    }}
                  >
                    <Feather name="video" size={16} color={COLORS.secondary} />
                    <Text style={styles.addButtonText}>Vídeo</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <ScreenFooter
        buttons={[
          { title: 'Cancelar', onPress: () => router.back(), variant: 'secondary' },
          { title: isEdit ? 'Salvar' : 'Publicar', onPress: validateAndPersist, variant: 'primary' },
        ]}
      />
    </SafeAreaView>
  );
}
