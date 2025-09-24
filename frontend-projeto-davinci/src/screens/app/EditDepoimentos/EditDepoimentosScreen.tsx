import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './EditDepoimentosScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useDepoimentosStore, DepoimentoItem } from '@/state/depoimentosStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import { COLORS } from '@/constants/theme';

export default function EditDepoimentosScreen() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { depoimentos, updateDepoimento, addDepoimento, removeDepoimento } = useDepoimentosStore();
  
  const [editableDepoimentos, setEditableDepoimentos] = useState<DepoimentoItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const clonedDepoimentos = JSON.parse(JSON.stringify(depoimentos));
    setEditableDepoimentos(clonedDepoimentos);
    if (clonedDepoimentos.length > 0) {
      setExpandedId(clonedDepoimentos[0].id);
    }
  }, [depoimentos]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: `Editar Depoimentos`,
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleItemChange = (id: string, field: keyof DepoimentoItem, value: string) => {
    const newItems = editableDepoimentos.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setEditableDepoimentos(newItems);
  };

  const handleSaveChanges = () => {
    editableDepoimentos.forEach((item) => {
      updateDepoimento(item.id, item);
    });
    Alert.alert('Sucesso!', 'As alterações foram salvas.');
    router.back();
  };

  const handleAddItem = () => {
    addDepoimento({
      author: 'Novo Autor',
      text: 'Escreva o novo depoimento aqui.',
      videoUrl: '',
    });
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      "Remover Depoimento",
      "Tem a certeza de que deseja remover este depoimento?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => removeDepoimento(id) }
      ]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(currentId => (currentId === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {editableDepoimentos.map((item) => (
          <View key={item.id} style={styles.editorCard}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.author}</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
                     <Feather name="trash-2" size={20} color={COLORS.red} />
                  </TouchableOpacity>
                  <Feather name={expandedId === item.id ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.secondary} />
                </View>
              </View>
            </TouchableOpacity>

            {expandedId === item.id && (
              <View style={styles.cardContent}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Autor</Text>
                  <TextInput
                    value={item.author}
                    onChangeText={(text) => handleItemChange(item.id, 'author', text)}
                    style={styles.textInput}
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Texto do Depoimento</Text>
                  <TextInput
                    value={item.text}
                    onChangeText={(text) => handleItemChange(item.id, 'text', text)}
                    multiline
                    style={[styles.textInput, { height: 120 }]}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>URL do Vídeo (YouTube)</Text>
                  <TextInput
                    value={item.videoUrl || ''}
                    onChangeText={(text) => handleItemChange(item.id, 'videoUrl', text)}
                    placeholder="Cole o link do YouTube aqui (opcional)"
                    style={styles.textInput}
                  />
                </View>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Feather name="plus-circle" size={22} color={COLORS.secondary} />
          <Text style={styles.addButtonText}>Adicionar Novo Depoimento</Text>
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
