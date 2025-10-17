import React, { useEffect, useMemo, useRef, useState } from 'react';
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

const inputStateProps = (enabled: boolean) => ({
  editable: enabled,
  disabled: !enabled,
});

function isSameList(a: Item[] = [], b: Item[] = []) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].value !== b[i].value) return false;
  }
  return true;
}

export default function DynamicInputList({
  title,
  inputIcon,
  placeholder,
  addMoreText,
  initialItems,
  onChangeItems,
  disabled = false,
}: Props) {
  const defaultItem = useMemo<Item>(() => ({ id: Date.now(), value: '' }), []);
  const [items, setItems] = useState<Item[]>(
    initialItems && initialItems.length > 0 ? initialItems : [defaultItem]
  );

  const skipEmitRef = useRef(false);

  useEffect(() => {
    if (!initialItems) return;
    if (!isSameList(initialItems, items)) {
      skipEmitRef.current = true;
      setItems(initialItems.length > 0 ? initialItems : [defaultItem]);
    }
  }, [initialItems]);

  useEffect(() => {
    if (skipEmitRef.current) {
      skipEmitRef.current = false;
      return;
    }
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
              {...inputStateProps(!disabled)}
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
