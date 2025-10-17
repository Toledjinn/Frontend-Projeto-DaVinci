import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FlatList,
  useWindowDimensions,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { styles, periStyles } from './SpecialtyDiagnosticsScreen.styles';
import { useUIStore } from '@/state/uiStore';

import { useUsers } from '@/hooks/useUsers';
import { useAppointments } from '@/hooks/useAppointments';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { usePeriograms } from '@/data/periogramsStore';

import type { UserWithPhoto } from '@/data/usersStore';
import type { SavedPeriogram } from '@/data/mockPeriograms';

import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import StyledButton from '@/components/common/StyledButton';
import { COLORS, FONTS } from '@/constants/theme';

function slugify(s: string) {
  return String(s).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
function parseDDMMYYYY(d: string | undefined) {
  if (!d) return null;
  const [dd, mm, yyyy] = d.split('/').map((n) => parseInt(n, 10));
  if (!dd || !mm || !yyyy) return null;
  return new Date(yyyy, mm - 1, dd);
}

type MediaItem = { id: string; uri: string; type: 'image' | 'xray' };

type RecordForList = {
  appointmentId: string;
  date: string;
  time: string;
  specialty: string;
  dentistName: string;
  requestedExams: { id: number; value: string }[];
  procedures: { id: number; description: string }[];
  images: MediaItem[];
  xrays: MediaItem[];
  treatmentPlanId?: string;
  periogramId?: string;
  riskAssessment?: 'Baixo' | 'Médio' | 'Alto' | null;
};

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
          const textStyle = isNaN(numericValue) ? periStyles.textNormal : numericValue > 3 ? periStyles.textAlert : periStyles.textNormal;
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
  const hasUpperData = upperArchTeeth.some((t) => periogram.data[t] && Object.values(periogram.data[t]).some((v) => String(v).trim() !== ''));
  const hasLowerData = lowerArchTeeth.some((t) => periogram.data[t] && Object.values(periogram.data[t]).some((v) => String(v).trim() !== ''));
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

export default function SpecialtyDiagnosticsScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.21;
  const bodyOffset = headerHeight + 8;
  const bodyHeight = height - bodyOffset - 16;

  const router = useRouter();
  const { patientId, specialty } = useLocalSearchParams<{ patientId: string; specialty: string }>();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);

  const { list: users } = useUsers();
  const { list: allAppointments, refresh } = useAppointments();
  const { getOrCreateAppointmentDiagnostics } = useDiagnostics();
  const { list: periograms, fetchForPatient } = usePeriograms();

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (patientId) fetchForPatient(String(patientId));
    }, [patientId, fetchForPatient])
  );

  const patient = useMemo<UserWithPhoto | undefined>(
    () => users.find((u) => String(u.id) === String(patientId) && u.type === 'patient') as UserWithPhoto | undefined,
    [users, patientId]
  );

  useFocusEffect(
    useCallback(() => {
      if (!patient) return;
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        userName: specialty,
        UserImageSvg: patient.image || UserPlaceholder,
        userPhotoUri: patient.photoUri ?? null,
        riskLevel: patient.riskLevel,
        showNotificationIcon: false,
        showDeleteIcon: false,
      });
    }, [patient, specialty, setHeaderConfig])
  );

  const isSingleStatic = useMemo(() => {
    const s = slugify(String(specialty));
    return s === 'primeira consulta' || s === 'segunda consulta';
  }, [specialty]);

  const filteredAppointments = useMemo(() => {
    const wanted = slugify(String(specialty));
    return allAppointments
      .filter((a) => String(a.patientId) === String(patientId) && slugify(a.specialty) === wanted && a.status === 'realizada')
      .sort((a, b) => {
        try {
          const [da, ma, ya] = a.date.split('/').map((n) => parseInt(n, 10));
          const [db, mb, yb] = b.date.split('/').map((n) => parseInt(n, 10));
        return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
        } catch {
          return (b.date || '').localeCompare(a.date || '');
        }
      });
  }, [allAppointments, patientId, specialty]);

  const records: RecordForList[] = useMemo(() => {
    return filteredAppointments.map((appt) => {
      const diag = getOrCreateAppointmentDiagnostics(appt.id, String(appt.patientId)) as any;
      const media: MediaItem[] = Array.isArray(diag?.media) ? diag.media : [];
      const images = media.filter((m) => m.type === 'image');
      const xrays = media.filter((m) => m.type === 'xray');
      const dentist = users.find((u) => String(u.id) === String(appt.dentistId));
      return {
        appointmentId: String(appt.id),
        date: appt.date,
        time: appt.time || '-',
        specialty: appt.specialty,
        dentistName: dentist?.name || 'Não informado',
        requestedExams: Array.isArray(diag?.requestedExams) ? diag.requestedExams : [],
        procedures: Array.isArray(diag?.procedures) ? diag.procedures : [],
        images,
        xrays,
        treatmentPlanId: diag?.treatmentPlanId ?? diag?.treatmentPlan?.id ?? undefined,
        periogramId: diag?.periogramId ?? diag?.periogramaId ?? diag?.periogram?.id ?? undefined,
        riskAssessment: diag?.riskAssessment ?? diag?.riskLevel ?? null,
      };
    });
  }, [filteredAppointments, getOrCreateAppointmentDiagnostics, users]);

  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const toggleOpen = useCallback(
    (id: string) => {
      if (isSingleStatic) return;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [isSingleStatic]
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  }, [refresh]);

  if (!patient) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.contentContainer, { paddingTop: bodyOffset, minHeight: bodyHeight }]}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const Exams = ({ items }: { items: { id: number; value: string }[] }) =>
    items?.filter((e) => e.value?.trim()).length ? (
      <>
        <Text style={styles.sectionHeaderTitle}>Exames solicitados</Text>
        <View style={styles.sectionHeaderDivider} />
        {items
          .filter((e) => e.value?.trim())
          .map((e) => (
            <View key={e.id} style={styles.listItemRow}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.listText}>{e.value}</Text>
            </View>
          ))}
      </>
    ) : null;

  const ProceduresBlock = ({ items }: { items: { id: number; description: string }[] }) =>
    items?.filter((p) => p.description?.trim()).length ? (
      <>
        <Text style={styles.sectionHeaderTitle}>Procedimentos realizados</Text>
        <View style={styles.sectionHeaderDivider} />
        {items
          .filter((p) => p.description?.trim())
          .map((p) => (
            <View key={p.id} style={styles.listItemRow}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.listText}>{p.description}</Text>
            </View>
          ))}
      </>
    ) : null;

  const MediaBlock = ({ imgs, rxs }: { imgs: MediaItem[]; rxs: MediaItem[] }) =>
    imgs.length || rxs.length ? (
      <>
        {imgs.length ? (
          <>
            <Text style={styles.sectionHeaderTitle}>Imagens</Text>
            <View style={styles.sectionHeaderDivider} />
            <ScrollView horizontal style={styles.mediaRow} showsHorizontalScrollIndicator={false}>
              {imgs.map((img) => (
                <Image key={img.id} source={{ uri: img.uri }} style={styles.mediaThumb} />
              ))}
            </ScrollView>
          </>
        ) : null}
        {rxs.length ? (
          <>
            <Text style={styles.sectionHeaderTitle}>Raios-X</Text>
            <View style={styles.sectionHeaderDivider} />
            <ScrollView horizontal style={styles.mediaRow} showsHorizontalScrollIndicator={false}>
              {rxs.map((rx) => (
                <Image key={rx.id} source={{ uri: rx.uri }} style={styles.mediaThumb} />
              ))}
            </ScrollView>
          </>
        ) : null}
      </>
    ) : null;

  const MetaSection = (rec: RecordForList) => (
    <>
      <View style={styles.metaRowCentered}>
        <View style={[styles.metaColCentered, styles.metaColDivider]}>
          <Text style={styles.metaTitleCentered}>Data</Text>
          <View style={styles.metaTitleDivider} />
          <Text style={styles.metaValueCentered}>{rec.date || '-'}</Text>
        </View>
        <View style={styles.metaColCentered}>
          <Text style={styles.metaTitleCentered}>Horário</Text>
          <View style={styles.metaTitleDivider} />
          <Text style={styles.metaValueCentered}>{rec.time || '-'}</Text>
        </View>
      </View>
      <Text style={styles.sectionHeaderTitle}>Dentista</Text>
      <View style={styles.sectionHeaderDivider} />
      <Text style={styles.metaValueCentered}>{rec.dentistName || 'Não informado'}</Text>
    </>
  );

  const Report = (rec: RecordForList) => (
    <>
      <Text style={styles.reportTitle}>Relatório do Atendimento</Text>
      {MetaSection(rec)}
    </>
  );

  const getPeriogramForRecord = useCallback(
    (rec: RecordForList): SavedPeriogram | null => {
      if (!periograms?.length) return null;
      if (rec.periogramId) {
        const byId = periograms.find((p) => String(p.id) === String(rec.periogramId));
        if (byId) return byId;
      }
      const apptDate = parseDDMMYYYY(rec.date);
      if (rec.date) {
        const exact = periograms.find((p) => p.date === rec.date);
        if (exact) return exact;
      }
      if (apptDate) {
        const withParsed = periograms
          .map((p) => ({ p, d: parseDDMMYYYY(p.date) }))
          .filter((x) => x.d != null && (x.d as Date).getTime() <= apptDate.getTime())
          .sort((a, b) => (b.d as Date).getTime() - (a.d as Date).getTime());
        if (withParsed.length) return withParsed[0].p;
      }
      const fallback = [...periograms].sort((a, b) => {
        const da = parseDDMMYYYY(a.date)?.getTime() ?? 0;
        const db = parseDDMMYYYY(b.date)?.getTime() ?? 0;
        return db - da;
      })[0];
      return fallback ?? null;
    },
    [periograms]
  );

  const renderReportBySpecialty = (rec: RecordForList) => {
    if (rec.specialty === 'Primeira Consulta') {
      return (
        <>
          {Report(rec)}
          <Text style={styles.sectionHeaderTitle}>Fichas Preenchidas</Text>
          <View style={styles.sectionHeaderDivider} />
          <View style={styles.actionRow}>
            <StyledButton title="Saúde Geral" variant="secondary" onPress={() => router.push({ pathname: '/(app)/saude-geral', params: { patientId } })} style={{ flex: 1 }} />
            <StyledButton title="Saúde Bucal" variant="secondary" onPress={() => router.push({ pathname: '/(app)/saude-bucal', params: { patientId } })} style={{ flex: 1 }} />
          </View>
          <Exams items={rec.requestedExams} />
          <MediaBlock imgs={rec.images} rxs={rec.xrays} />
        </>
      );
    }
    if (rec.specialty === 'Segunda Consulta') {
      return (
        <>
          {Report(rec)}
          <Text style={styles.sectionHeaderTitle}>Fichas Preenchidas</Text>
          <View style={styles.sectionHeaderDivider} />
          <StyledButton title="Plano de Tratamento" variant="primary" onPress={() => router.push({ pathname: '/(app)/plano-de-tratamento', params: { patientId } })} style={{ marginTop: 8 }} />
          <MediaBlock imgs={rec.images} rxs={rec.xrays} />
        </>
      );
    }
    if (rec.specialty === 'Periodontia') {
      const pg = getPeriogramForRecord(rec);
      return (
        <>
          {Report(rec)}
          <Text style={styles.sectionHeaderTitle}>Fichas Preenchidas</Text>
          <View style={styles.sectionHeaderDivider} />
          {pg ? (
            <PeriogramInline periogram={pg} />
          ) : (
            <Text style={{ ...FONTS.body9, color: COLORS.gray_400, textAlign: 'center', marginTop: 12 }}>
              Nenhum periograma encontrado para este paciente.
            </Text>
          )}
          <ProceduresBlock items={rec.procedures} />
          <MediaBlock imgs={rec.images} rxs={rec.xrays} />
        </>
      );
    }
    return (
      <>
        {Report(rec)}
        <ProceduresBlock items={rec.procedures} />
        <MediaBlock imgs={rec.images} rxs={rec.xrays} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.appointmentId}
        contentContainerStyle={[styles.contentContainer, { paddingTop: bodyOffset, minHeight: bodyHeight }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item, index }) => {
          const forceOpen = isSingleStatic;
          const isOpen = forceOpen || openIds.has(item.appointmentId);
          const isSingle = records.length === 1;
          const cardStyle = isSingle ? [styles.card, { minHeight: bodyHeight - 12 }] : styles.card;
          return (
            <View style={cardStyle}>
              {isSingleStatic ? (
                <View style={styles.cardHeaderTouchable}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.leftRightWrap}>
                      <Text style={styles.cardTitle}>{item.date}</Text>
                      <Text style={styles.cardSubtitle}>{item.specialty}</Text>
                    </View>
                  </View>
                  <View style={styles.headerDivider} />
                </View>
              ) : (
                <Pressable onPress={() => toggleOpen(item.appointmentId)} style={styles.cardHeaderTouchable} android_ripple={{ color: 'rgba(0,0,0,0.06)' }}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.leftRightWrap}>
                      <Text style={styles.cardTitle}>{item.date}</Text>
                      <Text style={styles.cardSubtitle}>{item.specialty}</Text>
                    </View>
                    <View style={styles.chevronWrap}>
                      <Feather name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#6B7280" />
                    </View>
                  </View>
                  <View style={styles.headerDivider} />
                </Pressable>
              )}
              {isOpen && <View style={styles.cardBody}>{renderReportBySpecialty(item)}</View>}
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum diagnóstico encontrado para esta especialidade.</Text>}
      />
    </SafeAreaView>
  );
}
