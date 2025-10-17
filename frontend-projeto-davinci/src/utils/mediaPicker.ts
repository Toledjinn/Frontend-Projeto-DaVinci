import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export function openMediaChooser(onPick: (uri: string) => void) {
  Alert.alert('Selecionar Imagem', 'Escolha uma opção', [
    {
      text: 'Tirar Foto',
      onPress: async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão necessária', 'Conceda acesso à câmera e à galeria.');
          return;
        }
        const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
        if (!result.canceled && result.assets?.[0]?.uri) onPick(result.assets[0].uri);
      },
    },
    {
      text: 'Escolher da Galeria',
      onPress: async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão necessária', 'Conceda acesso à galeria.');
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
        if (!result.canceled && result.assets?.[0]?.uri) onPick(result.assets[0].uri);
      },
    },
    { text: 'Cancelar', style: 'cancel' },
  ]);
}
