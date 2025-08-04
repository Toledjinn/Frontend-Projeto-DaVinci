import React, { useState } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getImagePickerHeaderStyles } from './styles';
import { COLORS } from '@/constants/theme';

type ImagePickerHeaderProps = {
  title: string;
};

export default function ImagePickerHeader({ title }: ImagePickerHeaderProps) {
  const { width, height } = useWindowDimensions();
  const styles = getImagePickerHeaderStyles(width, height);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const verifyCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa conceder permissão para usar a câmera.');
      return false;
    }
    return true;
  };

  const verifyGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa conceder permissão para acessar a galeria.');
      return false;
    }
    return true;
  };

  const takePhotoHandler = async () => {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const chooseFromGalleryHandler = async () => {
    const hasPermission = await verifyGalleryPermission();
    if (!hasPermission) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePress = () => {
    Alert.alert(
      'Selecionar Imagem',
      'Escolha uma opção',
      [
        { text: 'Tirar Foto', onPress: takePhotoHandler },
        { text: 'Escolher da Galeria', onPress: chooseFromGalleryHandler },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity onPress={handlePress} style={styles.touchableWrapper} activeOpacity={0.8}>
        <View style={styles.backgroundCircle}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.cameraIconWrapper}>
              <Feather name="camera" size={width * 0.1} color={COLORS.secondary} />
            </View>
          )}
        </View>
        
        {!imageUri && (
            <View style={styles.plusIconWrapper}>
                <Feather name="plus" size={width * 0.05} color={COLORS.white} />
            </View>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

