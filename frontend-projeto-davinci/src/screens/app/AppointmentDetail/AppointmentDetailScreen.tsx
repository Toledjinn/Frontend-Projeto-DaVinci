import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  useWindowDimensions,
  Text,
  View,
  Alert,
  Image,
  Modal,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import type { ViewToken } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { styles, periStyles } from './AppointmentDetailScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import AllergyWarning from '@/components/features/AllergyWarning';
import ProfileDataItem from '@/components/features/ProfileDataItem';
import StyledButton from '@/components/common/StyledButton';
import { COLORS, FONTS } from '@/constants/theme';
import { formatUserName } from '@/utils/nameUtils';

import { useAppointments } from '@/hooks/useAppointments';
import { useUsers } from '@/hooks/useUsers';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { usePeriograms } from '@/data/periogramsStore';
import type { Appointment } from '@/data/appointmentsStore';
import type { SavedPeriogram } from '@/data/mockPeriograms';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

type MediaItem = { id: string; uri: string; type: 'image' | 'xray' };

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const upperArchTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerArchTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const columns = ['MV', 'V', 'DV', 'MP/ML', 'P/L', 'DP/DL', 'RE-V', 'RE-P/L', 'MO', 'FM', 'FV', 'FL', 'M-CER'];

function ToothDetailInline({ toothNumber, data }: { toothNumber: number; data: any }) {
  const filledColumns = columns.filter((col) => data?.[col]);
  if (filledColumns.length === 0) return null;

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={periStyles.toothTitle}>Dente {toothNumber}</Text>
      <View style={periStyles.grid}>
        {filledColumns.map((col) => {
          const value = data[col];
          const numericValue = parseFloat(value);
          const textStyle = isNaN(numericValue)
            ? periStyles.textNormal
            : numericValue > 3
            ? periStyles.textAlert
            : periStyles.textNormal;

          return (
            <View key={col} style={periStyles.cellContainer}>
              <View style={periStyles.labelContainer}>
                <Text style={periStyles.labelText}>{col}</Text>
              </View>
              <View style={periStyles.valueContainer}>
                <Text style={[periStyles.valueText, textStyle]}>{value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function PeriogramInline({ periogram }: { periogram: SavedPeriogram }) {
  const hasUpperData = upperArchTeeth.some(
    (t) => periogram.data[t] && Object.values(periogram.data[t]).some((v) => String(v).trim() !== '')
  );
  const hasLowerData = lowerArchTeeth.some(
    (t) => periogram.data[t] && Object.values(periogram.data[t]).some((v) => String(v).trim() !== '')
  );

  if (!hasUpperData && !hasLowerData) return null;

  return (
    <View style={{ marginTop: 8 }}>
      {hasUpperData && (
        <>
          <Text style={periStyles.sectionTitle}>Arco Superior</Text>
          {upperArchTeeth.map((tooth) => (
            <ToothDetailInline key={tooth} toothNumber={tooth} data={periogram.data[tooth] || {}} />
          ))}
        </>
      )}

      {hasLowerData && (
        <>
          <Text style={periStyles.sectionTitle}>Arco Inferior</Text>
          {lowerArchTeeth.map((tooth) => (
            <ToothDetailInline key={tooth} toothNumber={tooth} data={periogram.data[tooth] || {}} />
          ))}
        </>
      )}
    </View>
  );
}

export default function AppointmentDetailScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.30;
  const { appointmentId, mode } = useLocalSearchParams<{ appointmentId: string; mode?: string }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const { list: appointments, update } = useAppointments();
  const { list: users } = useUsers();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<any | null>(null);
  const [dentist, setDentist] = useState<any | null>(null);

  const { getOrCreateAppointmentDiagnostics } = useDiagnostics();
  const [requestedExams, setRequestedExams] = useState<{ id: number; value: string }[]>([]);
  const [procedures, setProcedures] = useState<{ id: number; description: string }[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const { list: periogramsList, fetchForPatient } = usePeriograms();
  const [latestPeriogram, setLatestPeriogram] = useState<SavedPeriogram | null>(null);

  const isReviewMode = mode === 'review';

  const images = useMemo(() => media.filter((m) => m.type === 'image'), [media]);
  const xrays = useMemo(() => media.filter((m) => m.type === 'xray'), [media]);

  useEffect(() => {
    if (!appointmentId) return;
    const found = appointments.find((a) => a.id === appointmentId);
    setAppointment(found || null);

    if (found) {
      const p = users.find((u) => u.id === found.patientId);
      const d = users.find((u) => u.id === found.dentistId);
      setPatient(p || null);
      setDentist(d || null);
    } else {
      setPatient(null);
      setDentist(null);
    }
  }, [appointmentId, appointments, users]);

  useFocusEffect(
    useCallback(() => {
      if (patient) {
        const firstName = formatUserName(patient.name);
        setHeaderConfig({
          layout: 'profile',
          showBackground: true,
          userName: isReviewMode ? `Revisar Solicitação` : `Consulta de ${firstName}`,
          userPhotoUri: patient.photoUri ?? null,
          UserImageSvg: patient.image || UserPlaceholder,
          riskLevel: patient.riskLevel,
          showNotificationIcon: false,
        });
      }
    }, [patient, isReviewMode, setHeaderConfig])
  );

  useEffect(() => {
    if (!appointment || !patient) return;
    const diag = getOrCreateAppointmentDiagnostics(appointment.id, String(patient.id));
    setRequestedExams(diag.requestedExams || []);
    setProcedures(diag.procedures || []);
    setMedia((diag.media || []) as MediaItem[]);
  }, [appointment, patient, getOrCreateAppointmentDiagnostics]);

  useEffect(() => {
    if (patient?.id) {
      fetchForPatient(String(patient.id));
    }
  }, [patient?.id, fetchForPatient]);

  useEffect(() => {
    if (!periogramsList?.length) {
      setLatestPeriogram(null);
      return;
    }
    try {
      const sorted = [...periogramsList].sort((a, b) => {
        const [da, ma, ya] = a.date.split('/').map((n) => parseInt(n, 10));
        const [db, mb, yb] = b.date.split('/').map((n) => parseInt(n, 10));
        return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
      });
      setLatestPeriogram(sorted[0]);
    } catch {
      setLatestPeriogram(periogramsList[0]);
    }
  }, [periogramsList]);

  const isRealizada = appointment?.status === 'realizada';
  const hasAllergies = !!patient?.allergies?.length;

  const handleCancelAppointment = () => {
    if (!appointment) return;
    Alert.alert(
      'Confirmar cancelamento',
      'Tem certeza que deseja cancelar esta consulta?',
      [
        { text: 'Voltar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: async () => {
            await update(appointment.id, { status: 'cancelada' });
            Alert.alert('Consulta cancelada.');
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    if (!appointment || !patient) return;
    router.push({
      pathname: '/(app)/schedule-appointment',
      params: {
        mode: 'reschedule',
        appointmentId: appointment.id,
        patientId: patient.id,
        dentistId: appointment.dentistId,
        specialty: appointment.specialty,
        date: appointment.date,
        time: appointment.time,
        observations: appointment.observations || '',
      },
    });
  };

  const statusInfo: Record<
    NonNullable<Appointment>['status'],
    { text: string; color: string; icon: keyof typeof Feather.glyphMap }
  > = {
    agendada: { text: 'Agendada', color: COLORS.primary, icon: 'calendar' },
    realizada: { text: 'Realizada', color: COLORS.green, icon: 'check-circle' },
    cancelada: { text: 'Cancelada', color: COLORS.red, icon: 'x-circle' },
    pendente: { text: 'Pendente', color: COLORS.gray_400, icon: 'alert-circle' },
  };

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
    (info: { viewableItems: ViewToken[] }) => {
      if (info.viewableItems?.length && info.viewableItems[0].index != null) {
        setViewerIndex(info.viewableItems[0].index!);
      }
    }
  ).current;

  const getItemLayout = useCallback(
    (_: ArrayLike<MediaItem> | null | undefined, index: number) => ({
      length: SCREEN_W,
      offset: SCREEN_W * index,
      index,
    }),
    []
  );
  const ReportBlocks = () => {
    if (!appointment || !patient) return null;

    const MetaSection = () => (
      <>
        <View style={styles.metaRowCentered}>
          <View style={[styles.metaColCentered, styles.metaColDivider]}>
            <Text style={styles.metaTitleCentered}>Data</Text>
            <View style={styles.metaTitleDivider} />
            <Text style={styles.metaValueCentered}>{appointment.date || '-'}</Text>
          </View>

          <View style={styles.metaColCentered}>
            <Text style={styles.metaTitleCentered}>Horário</Text>
            <View style={styles.metaTitleDivider} />
            <Text style={styles.metaValueCentered}>{appointment.time || '-'}</Text>
          </View>
        </View>

        <Text style={styles.sectionHeaderTitle}>Dentista</Text>
        <View style={styles.sectionHeaderDivider} />
        <Text style={styles.metaValueCentered}>{dentist?.name || 'Não informado'}</Text>
      </>
    );

    const Exams = () =>
      requestedExams?.filter((e) => e.value?.trim()).length ? (
        <>
          <Text style={styles.sectionHeaderTitle}>Exames solicitados</Text>
          <View style={styles.sectionHeaderDivider} />
          {requestedExams
            .filter((e) => e.value?.trim())
            .map((e) => (
              <View key={e.id} style={styles.listItemRow}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.listText}>{e.value}</Text>
              </View>
            ))}
        </>
      ) : null;

    const ProceduresBlock = () =>
      procedures?.filter((p) => p.description?.trim()).length ? (
        <>
          <Text style={styles.sectionHeaderTitle}>Procedimentos realizados</Text>
          <View style={styles.sectionHeaderDivider} />
          {procedures
            .filter((p) => p.description?.trim())
            .map((p) => (
              <View key={p.id} style={styles.listItemRow}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.listText}>{p.description}</Text>
              </View>
            ))}
        </>
      ) : null;

    const MediaBlock = () =>
      images.length || xrays.length ? (
        <>
          {images.length ? (
            <>
              <Text style={styles.sectionHeaderTitle}>Imagens</Text>
              <View style={styles.sectionHeaderDivider} />
              <ScrollView horizontal style={styles.mediaRow} showsHorizontalScrollIndicator={false}>
                {images.map((img, idx) => (
                  <Pressable key={img.id} onPress={() => openViewer(images, idx)}>
                    <Image source={{ uri: img.uri }} style={styles.mediaThumb} />
                  </Pressable>
                ))}
              </ScrollView>
            </>
          ) : null}
          {xrays.length ? (
            <>
              <Text style={styles.sectionHeaderTitle}>Raios-X</Text>
              <View style={styles.sectionHeaderDivider} />
              <ScrollView horizontal style={styles.mediaRow} showsHorizontalScrollIndicator={false}>
                {xrays.map((rx, idx) => (
                  <Pressable key={rx.id} onPress={() => openViewer(xrays, idx)}>
                    <Image source={{ uri: rx.uri }} style={styles.mediaThumb} />
                  </Pressable>
                ))}
              </ScrollView>
            </>
          ) : null}
        </>
      ) : null;

    switch (appointment.specialty) {
      case 'Primeira Consulta':
        return (
          <>
            <MetaSection />
            <Text style={styles.sectionHeaderTitle}>Fichas Preenchidas</Text>
            <View style={styles.sectionHeaderDivider} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <StyledButton
                title="Saúde Geral"
                variant="secondary"
                onPress={() =>
                  router.push({ pathname: '/(app)/saude-geral', params: { patientId: patient.id } })
                }
                style={{ flex: 1, marginRight: 8 }}
              />
              <StyledButton
                title="Saúde Bucal"
                variant="secondary"
                onPress={() =>
                  router.push({ pathname: '/(app)/saude-bucal', params: { patientId: patient.id } })
                }
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
            <Exams />
            <MediaBlock />
          </>
        );

      case 'Segunda Consulta':
        return (
          <>
            <MetaSection />
            <Text style={styles.sectionHeaderTitle}>Fichas Preenchidas</Text>
            <View style={styles.sectionHeaderDivider} />
            <StyledButton
              title="Plano de Tratamento"
              variant="primary"
              onPress={() =>
                router.push({ pathname: '/(app)/plano-de-tratamento', params: { patientId: patient.id } })
              }
              style={{ marginTop: 8 }}
            />
            <MediaBlock />
          </>
        );

      case 'Periodontia':
        return (
          <>
            <MetaSection />
            <Text style={styles.sectionHeaderTitle}>Fichas Preenchidas</Text>
            <View style={styles.sectionHeaderDivider} />
            {latestPeriogram ? (
              <PeriogramInline periogram={latestPeriogram} />
            ) : (
              <Text style={{ ...FONTS.body9, color: COLORS.gray_400, textAlign: 'center', marginTop: 12 }}>
                Nenhum periograma encontrado para este paciente.
              </Text>
            )}

            <ProceduresBlock />
            <MediaBlock />
          </>
        );

      default:
        return (
          <>
            <MetaSection />
            <StyledButton
              title="Diagnósticos"
              variant="primary"
              onPress={() =>
                router.push({ pathname: '/(app)/diagnostico', params: { patientId: patient.id } })
              }
              style={{ marginTop: 8 }}
            />
            <ProceduresBlock />
            <MediaBlock />
          </>
        );
    }
  };

  const RenderAppointmentDetails = () => {
    if (!appointment || !patient) return null;

    const currentStatus = statusInfo[appointment.status];
    const appointmentDetails = [
      { id: 'paciente', label: 'Paciente', value: patient.name },
      { id: 'dentista', label: 'Dentista', value: dentist?.name || 'Não informado' },
      {
        id: 'status',
        label: 'Status',
        value: (
          <View style={styles.statusContainer}>
            <Feather name={currentStatus.icon} size={14} color={currentStatus.color} />
            <Text style={[styles.statusText, { color: currentStatus.color }]}>{currentStatus.text}</Text>
          </View>
        ),
      },
      { id: 'especialidade', label: 'Especialidade', value: appointment.specialty },
      { id: 'data', label: 'Data', value: appointment.date },
      { id: 'hora', label: 'Horário', value: appointment.time },
      { id: 'obs', label: 'Observações', value: appointment.observations || 'Nenhuma' },
    ];

    return (
      <>
        {hasAllergies && <AllergyWarning allergies={patient.allergies} />}
        {appointmentDetails.map((detail) => (
          <ProfileDataItem key={detail.id} label={detail.label} value={detail.value} />
        ))}
      </>
    );
  };

  const isLoading = !appointment || !patient;

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.centered}>
          <Text>Carregando consulta...</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
          >
            {isRealizada ? (
              <View style={styles.reportContainer}>
                <Text style={styles.reportTitle}>Relatório do Atendimento</Text>
                <ReportBlocks />
              </View>
            ) : (
              <>
                <RenderAppointmentDetails />
              </>
            )}
          </ScrollView>
          {appointment!.status !== 'realizada' &&
            appointment!.status !== 'cancelada' &&
            appointment!.status !== 'pendente' && (
              <View style={styles.actionButtonContainer}>
                <StyledButton
                  title="Iniciar Atendimento"
                  variant="secondary"
                  onPress={() =>
                    router.push({
                      pathname: '/(app)/consultation',
                      params: { appointmentId: appointment!.id },
                    })
                  }
                />
              </View>
            )}
          {appointment!.status !== 'realizada' && (
            <ScreenFooter
              buttons={[
                {
                  title: 'Cancelar',
                  onPress: handleCancelAppointment,
                  variant: 'secondary',
                },
                {
                  title: 'Reagendar',
                  onPress: handleReschedule,
                  variant: 'primary',
                },
              ]}
            />
          )}
        </>
      )}
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
              <View style={[{ width: SCREEN_W, height: SCREEN_H }, styles.viewerSlideBox]}>
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
