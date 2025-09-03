import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

const LAYOUT_OPTIONS = [
  { key: 'default', label: 'Título, Texto e Imagem' },
  { key: 'quote', label: 'Citação com Imagem' },
  { key: 'text_duo', label: 'Dois Blocos de Texto com Imagem' },
  { key: 'list', label: 'Lista de Tópicos' },
  { key: 'before_after', label: 'Imagens "Antes e Depois"' },
  { key: 'image_grid', label: 'Grelha de Imagens (Fio Dental)' },
  { key: 'image_grid_pasta', label: 'Grelha de Imagens (Pasta)' },
  { key: 'collage', label: 'Colagem de Imagens (Pasta)' },
];

type AddSlideModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectLayout: (layoutKey: string) => void;
};

export default function AddSlideModal({ visible, onClose, onSelectLayout }: AddSlideModalProps) {
  const renderItem = ({ item }: { item: typeof LAYOUT_OPTIONS[0] }) => (
    <TouchableOpacity style={styles.optionButton} onPress={() => onSelectLayout(item.key)}>
      <Text style={styles.optionText}>{item.label}</Text>
      <Feather name="chevron-right" size={20} color={COLORS.gray_400} />
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar Novo Slide</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={LAYOUT_OPTIONS}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
}
