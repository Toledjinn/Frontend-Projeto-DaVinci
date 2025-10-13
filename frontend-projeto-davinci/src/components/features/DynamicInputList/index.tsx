import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledInput from '@/components/common/StyledInput';
import { COLORS } from '@/constants/theme';

export type Item = { id: number; value: string };

type Props = {
  title: string; 
  inputIcon: React.ComponentProps<typeof Feather>['name'];
  placeholder: string;
  addMoreText: string;
  initialItems?: Item[];
  onChangeItems?: (items: Item[]) => void;
  disabled?: boolean; 
};

const disableProps = (isEditing: boolean) => ({
  editable: isEditing,
  disabled: !isEditing,
});

export default function DynamicInputList({
  title,
  inputIcon,
  placeholder,
  addMoreText,
  initialItems,
  onChangeItems,
  disabled = false,
}: Props) {
  const [items, setItems] = useState<Item[]>(
    initialItems && initialItems.length > 0 ? initialItems : [{ id: Date.now(), value: '' }]
  );

  useEffect(() => {
    const next = initialItems && initialItems.length > 0 ? initialItems : [{ id: Date.now(), value: '' }];
    setItems(next);
  }, [initialItems]);

  useEffect(() => {
    onChangeItems?.(items);
  }, [items, onChangeItems]);

  const handleItemChange = (text: string, id: number) => {
    setItems((curr) => curr.map((it) => (it.id === id ? { ...it, value: text } : it)));
  };

  const addItemInput = () => {
    setItems((curr) => [...curr, { id: Date.now(), value: '' }]);
  };

  const removeItemInput = (id: number) => {
    setItems((curr) => {
      if (curr.length > 1) return curr.filter((it) => it.id !== id);
      return [{ id: Date.now(), value: '' }];
    });
  };

  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}

      {items.map((item, index) => (
        <View key={item.id} style={styles.inputRow}>
          <View style={{ flex: 1 }}>
            <StyledInput
              label=""
              iconName={inputIcon}
              placeholder={`${placeholder} ${index + 1}`}
              value={item.value}
              onChangeText={(text) => handleItemChange(text, item.id)}
              {...disableProps(!disabled)} 
            />
          </View>

          {!disabled && (items.length > 1 || (items.length === 1 && item.value !== '')) && (
            <TouchableOpacity onPress={() => removeItemInput(item.id)} style={styles.removeButton}>
              <Feather name="x-circle" size={24} color={COLORS.red} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {!disabled && (
        <TouchableOpacity onPress={addItemInput} style={styles.addButton}>
          <Feather name="plus" size={20} color={COLORS.secondary} />
          <Text style={styles.addButtonText}>{addMoreText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
