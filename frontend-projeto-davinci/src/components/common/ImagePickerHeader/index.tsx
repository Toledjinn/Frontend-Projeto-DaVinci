import React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getImagePickerHeaderStyles } from './styles';
import { COLORS } from '@/constants/theme';

type ImagePickerHeaderProps = {
  title: string;
};

export default function ImagePickerHeader({ title }: ImagePickerHeaderProps) {
  const { width, height } = useWindowDimensions();
  const styles = getImagePickerHeaderStyles(width, height);

  const handlePress = () => {
    console.log('Botão de imagem pressionado!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.touchableWrapper} activeOpacity={0.8}>
        <View style={styles.backgroundCircle}>
          <View style={styles.cameraIconWrapper}>
            <Feather name="camera" size={width * 0.1} color={COLORS.secondary} />
          </View>
          <View style={styles.plusIconWrapper}>
            <Feather name="plus" size={width * 0.05} color={COLORS.white} />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
