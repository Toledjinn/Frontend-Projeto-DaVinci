import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledInput from '@/components/common/StyledInput';
import { COLORS } from '@/constants/theme';

type Item = { id: number; value: string };

type DynamicInputListProps = {
  title: string;
  inputIcon: React.ComponentProps<typeof Feather>['name'];
  placeholder: string;
  addMoreText: string;
  initialItems?: Item[];
};

export default function DynamicInputList({ title, inputIcon, placeholder, addMoreText, initialItems }: DynamicInputListProps) {
  const [items, setItems] = useState<Item[]>(initialItems && initialItems.length > 0 ? initialItems : [{ id: Date.now(), value: '' }]);

  useEffect(() => {
    setItems(initialItems && initialItems.length > 0 ? initialItems : [{ id: Date.now(), value: '' }]);
  }, [initialItems]);

  const handleItemChange = (text: string, id: number) => {
    setItems(currentItems =>
      currentItems.map(item => (item.id === id ? { ...item, value: text } : item))
    );
  };

  const addItemInput = () => {
    setItems([...items, { id: Date.now(), value: '' }]);
  };

  const removeItemInput = (id: number) => {
    if (items.length > 1) {
      setItems(currentItems => currentItems.filter(item => item.id !== id));
    } else {
      setItems([{ id: Date.now(), value: '' }]);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item, index) => (
        <View key={item.id} style={styles.inputRow}>
          <View style={{ flex: 1 }}>
            <StyledInput
              label=""
              iconName={inputIcon}
              placeholder={`${placeholder} ${index + 1}`}
              value={item.value}
              onChangeText={(text) => handleItemChange(text, item.id)}
            />
          </View>
          {(items.length > 1 || (items.length === 1 && item.value !== '')) && (
            <TouchableOpacity onPress={() => removeItemInput(item.id)} style={styles.removeButton}>
              <Feather name="x-circle" size={24} color={COLORS.red} />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={addItemInput} style={styles.addButton}>
        <Feather name="plus" size={20} color={COLORS.secondary} />
        <Text style={styles.addButtonText}>{addMoreText}</Text>
      </TouchableOpacity>
    </View>
  );
}