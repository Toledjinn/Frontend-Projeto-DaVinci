import React, { useState, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, Modal, FlatList, SafeAreaView,
  useWindowDimensions, TextInput, Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';
import { getStyledUserPickerStyles } from './styles';
import { COLORS } from '@/constants/theme';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

export interface UserPickerItem {
  id: string;
  name: string;
  image: React.FC<SvgProps> | null;
  allergies?: string[];
}

interface StyledUserPickerProps {
  label: string;
  iconName: React.ComponentProps<typeof Feather>['name'];
  items: UserPickerItem[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function StyledUserPicker({
  label,
  iconName,
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Selecione',
}: StyledUserPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { height, width } = useWindowDimensions();
  const styles = getStyledUserPickerStyles(height, width);

  const selectedUser = useMemo(() => {
    return items.find((item) => item.id === selectedValue);
  }, [items, selectedValue]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const handleSelect = (item: UserPickerItem) => {
    onValueChange(item.id);
    setSearchQuery('');
    setModalVisible(false);
  };

  const UserImage = selectedUser?.image || UserPlaceholder;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.inputContainer}
      >
        {selectedUser ? (
          <View style={styles.selectedValueContainer}>
            <View style={styles.userImage}>
              <UserImage width="100%" height="100%" />
            </View>
            <Text style={styles.valueText} numberOfLines={1}>{selectedUser.name}</Text>
            {selectedUser.allergies && selectedUser.allergies.length > 0 && (
                <Feather name="alert-triangle" size={20} color={COLORS.red} style={styles.allergyIcon} />
            )}
          </View>
        ) : (
          <>
            <Feather name={iconName} size={24} color={COLORS.gray_400} style={styles.icon} />
            <Text style={styles.placeholder}>{placeholder}</Text>
          </>
        )}
        <Feather name="chevron-down" size={24} color={COLORS.gray_400} style={styles.chevronIcon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.searchBarContainer}>
                <Feather name="search" size={20} color={COLORS.gray_400} />
                <TextInput
                    placeholder="Pesquisar paciente..."
                    placeholderTextColor={COLORS.gray_400}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchInput}
                />
            </View>
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const ItemImage = item.image || UserPlaceholder;
                return (
                    <TouchableOpacity
                      style={styles.userItemButton}
                      onPress={() => handleSelect(item)}
                    >
                      <View style={styles.userImage}>
                        <ItemImage width="100%" height="100%" />
                      </View>
                      <Text style={styles.userItemText}>{item.name}</Text>
                    </TouchableOpacity>
                )
              }}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}