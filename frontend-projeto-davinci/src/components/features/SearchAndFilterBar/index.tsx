import React from 'react';
import { View, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getSearchAndFilterBarStyles } from './styles';
import { COLORS } from '@/constants/theme';

type SearchAndFilterBarProps = {
  searchPlaceholder: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
};

export default function SearchAndFilterBar({
  searchPlaceholder,
  onSearchChange,
  onFilterPress,
}: SearchAndFilterBarProps) {
  const { height } = useWindowDimensions();
  const styles = getSearchAndFilterBarStyles(height);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Feather name="list" size={24} color={COLORS.gray_400} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={searchPlaceholder}
            placeholderTextColor={COLORS.gray_400}
            style={styles.searchInput}
            onChangeText={onSearchChange}
          />
        </View>
        <Feather name="search" size={20} color={COLORS.gray_400} style={styles.searchIcon} />
      </View>
    </View>
  );
}