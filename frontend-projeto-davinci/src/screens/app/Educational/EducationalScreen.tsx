import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './EducationalScreen.styles';
import { useUIStore } from '@/state/uiStore';


import Chefinho from '@/assets/characters/chefinho.svg';
import Escova from '@/assets/characters/escova1.svg';
import Pasta from '@/assets/characters/pasta.svg';
import FioDental from '@/assets/characters/fio.svg';
import Fluor from '@/assets/characters/fluor.svg';
import Revelador from '@/assets/characters/revelador.svg';


const educationalItems = [
  { id: '1', title: 'Chefinho', SvgComponent: Chefinho, route: '/(app)/chefinho' },
  { id: '2', title: 'Escova', SvgComponent: Escova, route: '/(app)/escova' },
  { id: '3', title: 'Pasta', SvgComponent: Pasta, route: '/(app)/pasta' },
  { id: '4', title: 'Fio Dental', SvgComponent: FioDental, route: '/(app)/fio-dental'  },
  { id: '5', title: 'Flúor', SvgComponent: Fluor, route: '/(app)/fluor'  },
  { id: '6', title: 'Revelador de Placa', SvgComponent: Revelador, route: '/(app)/revelador-de-placa'   },
];

export default function EducationalScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29; 
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'DAVINCI EDUCACIONAL',
        CharacterSvg: Chefinho, 
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleItemPress = (item: (typeof educationalItems)[0]) => {

    if (item.route) {
      router.push(item.route as any);
    } else {
      console.log(`Item "${item.title}" clicado, mas não possui rota definida.`);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={styles.description}>
          Nós somos promotores da saúde, na verdade manejadores de
          conhecimentos, recursos e estratégias que visam a promoção da saúde, o
          controle das doenças, o tratamento adequado a manutenção de longo
          prazo e admiradores da estética do sorriso.
        </Text>

        
        <View style={styles.gridContainer}>
          {educationalItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => handleItemPress(item)}
            >
              <View style={styles.itemCircle}>
                <item.SvgComponent width="70%" height="70%" />
              </View>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
