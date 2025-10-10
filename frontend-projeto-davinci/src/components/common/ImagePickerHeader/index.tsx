import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  Image,
  type AlertButton,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getImagePickerHeaderStyles } from './styles';
import { COLORS } from '@/constants/theme';
import { useUIStore } from '@/state/uiStore';

type ImagePickerHeaderProps = { title: string };

export default function ImagePickerHeader({ title }: ImagePickerHeaderProps) {
  const { width, height } = useWindowDimensions();
  const styles = getImagePickerHeaderStyles(width, height);

  const headerConfig = useUIStore((s) => s.headerConfig);
  const setRegisterPhotoUri = useUIStore((s) => s.setRegisterPhotoUri);

  const initialPhoto = headerConfig.userPhotoUri ?? null;
  const [imageUri, setImageUri] = useState<string | null>(initialPhoto);

  useEffect(() => {
    setImageUri(initialPhoto);
  }, [initialPhoto]);

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
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setRegisterPhotoUri(uri);
    }
  };

  const chooseFromGalleryHandler = async () => {
    const hasPermission = await verifyGalleryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setRegisterPhotoUri(uri);
    }
  };

  const handlePress = () => {
    const buttons: AlertButton[] = [
      { text: 'Tirar Foto', onPress: takePhotoHandler },
      { text: 'Escolher da Galeria', onPress: chooseFromGalleryHandler },
    ];

    if (imageUri) {
      buttons.push({
        text: 'Remover foto',
        style: 'destructive',
        onPress: () => {
          setImageUri(null);
          setRegisterPhotoUri(null);
        },
      });
    }

    buttons.push({ text: 'Cancelar', style: 'cancel' });

    Alert.alert(
      imageUri ? 'Alterar foto' : 'Selecionar Imagem',
      imageUri ? 'Escolha uma opção para alterar sua foto' : 'Escolha uma opção',
      buttons,
      { cancelable: true }
    );
  };

  const hasPhoto = !!imageUri;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity onPress={handlePress} style={styles.touchableWrapper} activeOpacity={0.85}>
        <View style={styles.backgroundCircle}>
          {hasPhoto ? (
            <Image source={{ uri: imageUri! }} style={styles.image} />
          ) : (
            <View style={styles.cameraIconWrapper}>
              <Feather name="camera" size={width * 0.16} color={COLORS.secondary} />
            </View>
          )}
        </View>

        {!hasPhoto ? (
          <View style={styles.plusIconWrapper}>
            <Feather name="plus" size={width * 0.08} color={COLORS.white} />
          </View>
        ) : (
          <View style={styles.editIconWrapper}>
            <Feather name="edit-2" size={width * 0.06} color={COLORS.white} />
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
