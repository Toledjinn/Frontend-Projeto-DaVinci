import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './EducationalScreen.styles';
import { useUIStore } from '@/state/uiStore';

import Chefinho from '@/assets/characters/chefinho.svg';
import Escova from '@/assets/characters/escova1.svg';
import Pasta from '@/assets/characters/pasta.svg';
import FioDental from '@/assets/characters/fio.svg';
import Fluor from '@/assets/characters/fluor.svg';
import Revelador from '@/assets/characters/revelador.svg';
import LogoBadge from '@/components/common/LogoBadge';
import { COLORS } from '@/constants/theme';

const educationalItems = [
  { id: '1', title: 'Chefinho', SvgComponent: Chefinho, contentType: 'chefinho' },
  { id: '2', title: 'Escova', SvgComponent: Escova, contentType: 'escova' },
  { id: '3', title: 'Pasta', SvgComponent: Pasta, contentType: 'pasta' },
  { id: '4', title: 'Fio Dental', SvgComponent: FioDental, contentType: 'fio-dental'  },
  { id: '5', title: 'Flúor', SvgComponent: Fluor, contentType: 'fluor'  },
  { id: '6', title: 'Revelador de Placa', SvgComponent: Revelador, contentType: 'revelador-de-placa' },
];

export default function EducationalScreen() {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const headerHeight = height * 0.296;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'DaVinci Educacional',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleItemPress = (item: (typeof educationalItems)[0]) => {
    router.push({
      pathname: '/(app)/educacional/[contentType]',
      params: { contentType: item.contentType },
    });
  };

  const badgeSize = useMemo(() => {
    const ideal = width * 0.20; 
    return Math.round(Math.min(88, Math.max(72, ideal)));
  }, [width]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.description}>
            Nós somos promotores da saúde, na verdade manejadores de conhecimentos,
            recursos e estratégias que visam a promoção da saúde, o controle das doenças,
            o tratamento adequado a manutenção de longo prazo e admiradores da estética do sorriso.
          </Text>

          <View style={styles.gridContainer}>
            {educationalItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.8}
              >
                <LogoBadge
                  CharacterSvg={item.SvgComponent}
                  diameter={badgeSize}
                  borderWidth={3}
                  backgroundColor={COLORS.primary}
                  borderColor={COLORS.gray_400} 
                  style={styles.badgeShadow}
                  inset={0}
                  contentPercent={80} 
                />
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
