import React, { useCallback, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Alert,
  View,
  Text,
  TextInput,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './EditSimpleContentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useSocialStore } from '@/state/socialStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';

export default function EditSimpleContentScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { page } = useLocalSearchParams<{ page: 'oQueE' | 'comoParticipar' }>();

  const { oQueE, comoParticipar, updateSocialPage } = useSocialStore();

  const [editedParagraphs, setEditedParagraphs] = useState<string[]>([]);

  useEffect(() => {
    if (page === 'oQueE') {
      setEditedParagraphs(oQueE.paragraphs);
    } else if (page === 'comoParticipar') {
      setEditedParagraphs(comoParticipar.paragraphs);
    }
  }, [page, oQueE, comoParticipar]);

  useFocusEffect(
    useCallback(() => {
      const pageTitle = page === 'oQueE' ? 'O QUE É?' : 'COMO PARTICIPAR?';
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `EDITAR ${pageTitle}`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [page])
  );

  const handleTextChange = (text: string, index: number) => {
    const newParagraphs = [...editedParagraphs];
    newParagraphs[index] = text;
    setEditedParagraphs(newParagraphs);
  };

  const handleSaveChanges = () => {
    if (page) {
      updateSocialPage(page, editedParagraphs);
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
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Editar Parágrafos</Text>
          {editedParagraphs.map((paragraph, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <Text style={styles.fieldLabel}>Parágrafo {index + 1}</Text>
              <View style={styles.manualInputContainer}>
                <TextInput
                  value={paragraph}
                  onChangeText={(text) => handleTextChange(text, index)}
                  placeholder={`Escreva o parágrafo ${index + 1} aqui...`}
                  placeholderTextColor={COLORS.gray_400}
                  multiline
                  style={styles.manualInput}
                />
              </View>
            </View>
          ))}
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
