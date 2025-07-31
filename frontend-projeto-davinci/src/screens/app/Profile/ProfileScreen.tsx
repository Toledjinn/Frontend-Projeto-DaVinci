import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { styles } from './ProfileScreen.styles';
import { useUIStore } from '@/state/uiStore';
import FotoPerfil from '@/assets/images/FotoPerfil.svg'; 

const MOCK_PROFILE_DATA = [
  { id: '1', label: 'Gênero', value: 'Masculino' },
  { id: '2', label: 'Data de Nascimento', value: '05/04/1961' },
  { id: '3', label: 'Estado Civil', value: 'Solteiro' },
  { id: '4', label: 'CPF', value: '217.497.441-04' },
  { id: '5', label: 'CRO', value: '0000 - DF' },
  { id: '6', label: 'Especialidades', value: 'Periodontia / Prótese' },
  { id: '7', label: 'Telefone', value: '(61) 98201 - 0910' },
  { id: '8', label: 'E-mail', value: 'rafael.f.resende@iesb.edu.br' },
  { id: '9', label: 'CEP', value: '70711-903' },
  { id: '10', label: 'Endereço', value: 'SCN, Asa Norte Quadra 01 Bloco E' },
  { id: '11', label: 'Número / Complemento', value: '-' },
  { id: '12', label: 'Cidade / Estado', value: 'Brasília / DF' },
  { id: '13', label: 'Nacionalidade', value: 'Brasileira' },
];

export default function ProfileScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.27;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: true,
        userName: 'José Maria Gratone', 
        UserImageSvg: FotoPerfil,   
      });
    }, [])
  );

  const renderItem = ({ item }: { item: typeof MOCK_PROFILE_DATA[0] }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{item.label}</Text>
      <Text style={styles.itemValue}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_PROFILE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingTop: headerHeight + 9 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

