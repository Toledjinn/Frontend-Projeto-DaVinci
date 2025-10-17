import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  SectionList,
  View,
  Text,
  Image,
  useWindowDimensions,
  Modal,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import type { ViewToken } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import { styles } from './MediaGalleryScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { useUsers } from '@/hooks/useUsers';
import { useAppointments } from '@/hooks/useAppointments';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import type { UserWithPhoto } from '@/data/usersStore';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import { formatUserName } from '@/utils/nameUtils';

type MediaItem = {
  id: string;
  uri: string;
  type: 'image' | 'xray';
};

type Section = {
  title: string;      
  subtitle: string;    
  media: MediaItem[];  
  data: Array<{ key: string }>; 
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function MediaGalleryScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.28;

  const { patientId, kind } =
    useLocalSearchParams<{ patientId: string; kind: 'image' | 'xray' }>();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { list: users } = useUsers();
  const { list: appointments } = useAppointments();
  const { getOrCreateAppointmentDiagnostics } = useDiagnostics();

  const patient = useMemo<UserWithPhoto | undefined>(
    () =>
      users.find(
        (u) => String(u.id) === String(patientId) && u.type === 'patient'
      ) as UserWithPhoto | undefined,
    [users, patientId]
  );

  useFocusEffect(
    useCallback(() => {
      if (!patient) return;
      const noun = kind === 'xray' ? 'Raio-X' : 'Imagens';
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        showNotificationIcon: false,
        userName: `${noun} de ${formatUserName(patient.name)}`,
        UserImageSvg: patient.image || UserPlaceholder,
        userPhotoUri: patient.photoUri ?? null,
        riskLevel: patient.riskLevel,
        showDeleteIcon: false,
      });
    }, [patient, kind, setHeaderConfig])
  );

  const [tick, setTick] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setTick((t) => t + 1);
    }, [])
  );

  const sections: Section[] = useMemo(() => {
    if (!patientId) return [];
    const appts = appointments
      .filter((a) => String(a.patientId) === String(patientId))
      .sort((a, b) => {
        try {
          const [da, ma, ya] = a.date.split('/').map((n) => parseInt(n, 10));
          const [db, mb, yb] = b.date.split('/').map((n) => parseInt(n, 10));
          return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
        } catch {
          return (b.date || '').localeCompare(a.date || '');
        }
      });

    const wants = kind === 'xray' ? 'xray' : 'image';

    const built = appts.map<Section | null>((appt) => {
      const diag = getOrCreateAppointmentDiagnostics(appt.id, String(appt.patientId));
      const media = (diag.media || []).filter((m) => m.type === wants) as MediaItem[];
      if (!media.length) return null;
      return {
        title: appt.date,
        subtitle: appt.specialty,
        media,
        data: [{ key: String(appt.id) }], 
      };
    });

    return built.filter((s): s is Section => Boolean(s));
  }, [appointments, patientId, getOrCreateAppointmentDiagnostics, kind, tick]);

  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerItems, setViewerItems] = useState<MediaItem[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const flatRef = useRef<FlatList<MediaItem>>(null);

  const openViewer = useCallback((items: MediaItem[], startIndex: number) => {
    setViewerItems(items);
    setViewerIndex(Math.max(0, Math.min(startIndex, items.length - 1)));
    setViewerVisible(true);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerVisible(false);
    setViewerItems([]);
    setViewerIndex(0);
  }, []);

  useEffect(() => {
    if (!viewerVisible || !flatRef.current) return;
    const t = setTimeout(() => {
      flatRef.current?.scrollToIndex({ index: viewerIndex, animated: false });
    }, 16); 
    return () => clearTimeout(t);
  }, [viewerVisible, viewerIndex]);

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (info.viewableItems?.length && info.viewableItems[0].index != null) {
        setViewerIndex(info.viewableItems[0].index!);
      }
    }
  ).current;

  const getItemLayout = useCallback(
    (_data: ArrayLike<MediaItem> | null | undefined, index: number) => ({
      length: SCREEN_W,
      offset: SCREEN_W * index,
      index,
    }),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.key}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        stickySectionHeadersEnabled={false}
        renderItem={({ section }) => (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>

            <View style={styles.sectionBody}>
              {section.media.map((m, idx) => (
                <Pressable
                  key={m.id}
                  onPress={() => openViewer(section.media, idx)}
                  android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
                >
                  <Image source={{ uri: m.uri }} style={styles.mediaThumb} />
                </Pressable>
              ))}
            </View>
          </View>
        )}
        renderSectionHeader={undefined}
        renderSectionFooter={undefined}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {kind === 'xray' ? 'Nenhum raio-x encontrado.' : 'Nenhuma imagem encontrada.'}
            </Text>
            <Text style={styles.emptySubtext}>
              Finalize um atendimento com {kind === 'xray' ? 'raio-x' : 'imagens'} para vê-los aqui.
            </Text>
          </View>
        }
      />

      <Modal
        visible={viewerVisible}
        onRequestClose={closeViewer}
        animationType="fade"
        transparent
        statusBarTranslucent
      >
        <View style={styles.viewerBackdrop}>
          <View style={styles.viewerHeader}>
            <View />
            <Pressable onPress={closeViewer} style={styles.viewerCloseBtn}>
              <Text style={styles.viewerCloseText}>Fechar</Text>
            </Pressable>
          </View>

          <FlatList
            ref={flatRef}
            style={styles.viewerPager}
            data={viewerItems}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            getItemLayout={getItemLayout}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
            removeClippedSubviews={false} 
            renderItem={({ item }) => (
              <View
                style={[
                  styles.viewerSlideBox,
                  { width: SCREEN_W, height: SCREEN_H },
                ]}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={[styles.viewerImg, { width: SCREEN_W, height: SCREEN_H }]}
                />
              </View>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
