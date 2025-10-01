import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

type QuestionCardProps = {
  number?: number;
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  isEditing?: boolean;
};

export default function QuestionCard({ number, title, children, onEdit, isEditing }: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {number && (
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{number}</Text>
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        {onEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Feather name={isEditing ? "save" : "edit-2"} size={22} color={COLORS.secondary} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </View>
  );
}