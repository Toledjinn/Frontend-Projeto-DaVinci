import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

type SearchAndFilterBarProps = {
  value: string;
  placeholder: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
};

export default function SearchAndFilterBar({
  value,
  placeholder,
  onSearchChange,
  onFilterPress,
}: SearchAndFilterBarProps) {
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity onPress={onFilterPress}>
        <Feather name="filter" size={20} color={COLORS.gray_400} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onSearchChange}
      />
      <Feather name="search" size={20} color={COLORS.gray_400} />
    </View>
  );
}
