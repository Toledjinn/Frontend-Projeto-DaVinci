import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, useWindowDimensions, Text, View, Alert, LayoutChangeEvent } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { styles } from './PrevencaoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import QuestionCard from '@/components/features/QuestionCard';

import DynamicInputList, { Item } from '@/components/features/DynamicInputList';
import { useUsers } from '@/hooks/useUsers';
import { UserWithPhoto } from '@/data/usersStore';

import { useDiagnostics } from '@/hooks/useDiagnostics';
import type { PreventionType } from '@/data/diagnosticsStore';

const preventionTitles: Record<PreventionType, string> = {
  primaria: 'Prevenção Primária',
  secundaria: 'Prevenção Secundária',
  terciaria: 'Prevenção Terciária',
  quaternaria: 'Prevenção Quaternária',
};

const hasAnyFilled = (items: Item[]) => (items || []).some((i) => (i.value || '').trim().length > 0);

export default function PrevencaoScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const bodyOffset = headerHeight + 8;

  const router = useRouter();
  const { patientId, type } = useLocalSearchParams<{ patientId: string; type: PreventionType }>();
  const preventionType = (type || 'primaria') as PreventionType;
  const title = preventionTitles[preventionType];

  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { list } = useUsers();
  const patient = useMemo<UserWithPhoto | undefined>(
    () => list.find((u) => String(u.id) === String(patientId)),
    [list, patientId]
  );

  const { getOrCreatePrevention, savePrevention } = useDiagnostics();

  const [items, setItems] = useState<Item[]>([{ id: Date.now(), value: '' }]);
  const [createdAt, setCreatedAt] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(true);

  const [footerHeight, setFooterHeight] = useState<number>(88);
  const onFooterLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setFooterHeight(h);
  };

  useEffect(() => {
    if (!patient) return;
    const saved = getOrCreatePrevention(String(patient.id), preventionType);
    const listItems = saved.items && saved.items.length > 0 ? saved.items : [{ id: Date.now(), value: '' }];
    setItems(listItems);
    setCreatedAt(saved.createdAt);
    setIsEditing(!hasAnyFilled(listItems));
  }, [patient, preventionType, getOrCreatePrevention]);

  useFocusEffect(
    useCallback(() => {
      if (!patient) return;
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        userName: `${title} de ${formatUserName(patient.name)}`,
        UserImageSvg: patient.image || UserPlaceholder,
        userPhotoUri: patient.photoUri ?? null,
        showNotificationIcon: false,
        riskLevel: patient.riskLevel,
      });
    }, [patient, title, setHeaderConfig])
  );

  const handleSave = () => {
    if (!patient) return;
    const cleaned = items.filter((i) => (i.value || '').trim().length > 0);
    savePrevention(String(patient.id), preventionType, {
      items: cleaned.length ? cleaned : [{ id: Date.now(), value: '' }],
      createdAt: createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
    Alert.alert('Sucesso', `${title} salva.`);
  };

  const toggleEdit = () => setIsEditing((p) => !p);

  if (!patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <ScrollView
          style={[styles.bodyScroll, { marginTop: bodyOffset }]}
          contentContainerStyle={[styles.bodyContent, { paddingBottom: footerHeight + 16 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <QuestionCard number={1} title="Diagnóstico" isEditing={isEditing} onEdit={toggleEdit}>
            <DynamicInputList
              disabled={!isEditing}
              title=""
              inputIcon="check-square"
              placeholder="Diagnóstico"
              addMoreText="Adicionar Item"
              initialItems={items}
              onChangeItems={setItems}
            />
          </QuestionCard>
        </ScrollView>

        <View onLayout={onFooterLayout}>
          <ScreenFooter
            buttons={[
              isEditing
                ? { title: 'Salvar', onPress: handleSave, variant: 'primary' }
                : { title: 'Editar', onPress: toggleEdit, variant: 'secondary' },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
