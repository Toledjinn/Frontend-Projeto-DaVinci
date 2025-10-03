import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import styles from './LojaScreen.styles'; 
import { useUIStore } from '@/state/uiStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import { SafeAreaView } from 'react-native-safe-area-context';  
import ToothbrushIcon from '@/assets/icons/toothbrush.svg';
import ToothpasteIcon from '@/assets/icons/toothpaste.svg';
import DentalFlossIcon from '@/assets/icons/dental-floss.svg';
import FluorIcon from '@/assets/icons/mouthwash1.svg';
import ReveladorIcon from '@/assets/icons/dropper.svg';
import EnxaguanteIcon from '@/assets/icons/mouthwash2.svg';

const categories = [
  { id: '1', title: 'Escovas', SvgComponent: ToothbrushIcon },
  { id: '2', title: 'Pastas de Dente', SvgComponent: ToothpasteIcon },
  { id: '3', title: 'Fio Dental', SvgComponent: DentalFlossIcon },
  { id: '4', title: 'Flúor', SvgComponent: FluorIcon },
  { id: '5', title: 'Revelador de Placa', SvgComponent: ReveladorIcon },
  { id: '6', title: 'Enxaguante Bucal', SvgComponent: EnxaguanteIcon },
];

export default function LojaScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.360;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Loja',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [])
  );

  const handleCategoryPress = (category: (typeof categories)[0]) => {
    router.push({ pathname: '/(app)/loja-categoria', params: { category: category.title } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <View style={styles.gridContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={styles.itemCircle}>
                <category.SvgComponent width="60%" height="60%" />
              </View>
              <Text style={styles.itemText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}