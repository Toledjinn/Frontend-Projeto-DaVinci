import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ScrollView, useWindowDimensions, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { styles } from './PeriogramScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { formatUserName } from '@/utils/nameUtils';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';
import ScreenFooter from '@/components/common/ScreenFooter';
import ToothMeasurementCard from '@/components/features/ToothMeasurementCard';

import { useUsers } from '@/hooks/useUsers';
import { useAppointments } from '@/hooks/useAppointments';
import { useAuth } from '@/hooks/useAuth';
import { usePeriograms } from '@/data/periogramsStore';
import type { PeriogramData, SavedPeriogram } from '@/data/mockPeriograms';

const upperArchTeeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerArchTeeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
const columns = ['MV','V','DV','MP/ML','P/L','DP/DL','RE-V','RE-P/L','MO','FM','FV','FL','M-CER'];

const generateInitialState = (): PeriogramData => {
  const all = [...upperArchTeeth, ...lowerArchTeeth];
  const s: PeriogramData = {} as any;
  all.forEach(t => {
    (s as any)[t] = {};
    columns.forEach(c => ((s as any)[t][c] = ''));
  });
  return s;
};

const todayBR = () => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export default function PeriogramFormScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;

  const { patientId, appointmentId, periogramId } = useLocalSearchParams<{
    patientId: string;
    appointmentId?: string;
    periogramId?: string;
  }>();
  const router = useRouter();
  const setHeaderConfig = useUIStore(s => s.setHeaderConfig);

  const { list: users } = useUsers();
  const { list: appointments } = useAppointments();
  const { currentUser, canManagePeriogram } = useAuth();

  const { add, update, getById } = usePeriograms();

  const patient = useMemo(
    () => users.find(u => String(u.id) === String(patientId)),
    [users, patientId]
  );

  const appointment = useMemo(
    () => (appointmentId ? appointments.find(a => String(a.id) === String(appointmentId)) : undefined),
    [appointments, appointmentId]
  );
  const dentistFromAppointment = useMemo(
    () => (appointment ? users.find(u => String(u.id) === String(appointment.dentistId)) : undefined),
    [appointment, users]
  );

  const [existing, setExisting] = useState<SavedPeriogram | undefined>(undefined);
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!periogramId) {
        if (mounted) setExisting(undefined);
        return;
      }
      const inList = usePeriograms.getState().list.find(p => p.id === periogramId);
      if (mounted && inList) { setExisting(inList); return; }

      const fetched = await getById(periogramId);
      if (mounted) setExisting(fetched);
    })();
    return () => { mounted = false; };
  }, [periogramId, getById]);

  const [data, setData] = useState<PeriogramData>(generateInitialState());

  const [openTeeth, setOpenTeeth] = useState<number[]>([]);

  useEffect(() => {
    if (!existing?.data) return;
    setData(existing.data);

    const initiallyOpen = Object.keys(existing.data)
      .map(k => Number(k))
      .filter(tooth => {
        const map = (existing.data as any)[tooth] || {};
        return Object.values(map).some(v => String(v ?? '').trim() !== '');
      });

    setOpenTeeth(initiallyOpen);
  }, [existing?.data]);

  useFocusEffect(
    useCallback(() => {
      if (!patient) return;
      setHeaderConfig({
        layout: 'profile',
        showBackground: true,
        userName: `${existing ? 'Editar' : 'Novo'} Periograma de ${formatUserName(patient.name)}`,
        UserImageSvg: patient.image || UserPlaceholder,
        userPhotoUri: patient.photoUri ?? null,
        riskLevel: patient.riskLevel,
        showNotificationIcon: false,
      });
    }, [patient, existing, setHeaderConfig])
  );

  const toggleTooth = (tooth: number) => {
    setOpenTeeth(prev => (prev.includes(tooth) ? prev.filter(t => t !== tooth) : [...prev, tooth]));
  };

  const handleDataChange = (tooth: number, column: string, value: string) => {
    setData(prev => ({
      ...prev,
      [tooth]: {
        ...(prev as any)[tooth],
        [column]: value,
      },
    }));
    setOpenTeeth(prev => (prev.includes(tooth) ? prev : [...prev, tooth]));
  };

  const handleSave = async () => {
    if (!patient) return;

    if (existing) {
      const dentistName =
        canManagePeriogram && currentUser?.name ? currentUser.name : existing.dentistName;
      await update(existing.id, { data, dentistName });
      Alert.alert('Sucesso', 'Periograma atualizado com sucesso.');
      router.back();
      return;
    }

    const date = appointment?.date || todayBR();
    const dentistName =
      canManagePeriogram && currentUser?.name
        ? currentUser.name
        : dentistFromAppointment?.name || 'Não informado';

    await add({
      patientId: String(patient.id),
      date,
      dentistName,
      data,
    });

    Alert.alert('Sucesso', 'Periograma salvo com sucesso.');
    router.back();
  };

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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <Text style={styles.sectionTitle}>Arco Superior</Text>
        {upperArchTeeth.map(tooth => (
          <ToothMeasurementCard
            key={tooth}
            toothNumber={tooth}
            isOpen={openTeeth.includes(tooth)}
            onToggle={() => toggleTooth(tooth)}
            data={(data as any)[tooth] || {}}
            onDataChange={handleDataChange}
          />
        ))}

        <Text style={styles.sectionTitle}>Arco Inferior</Text>
        {lowerArchTeeth.map(tooth => (
          <ToothMeasurementCard
            key={tooth}
            toothNumber={tooth}
            isOpen={openTeeth.includes(tooth)}
            onToggle={() => toggleTooth(tooth)}
            data={(data as any)[tooth] || {}}
            onDataChange={handleDataChange}
          />
        ))}
      </ScrollView>

      <ScreenFooter
        buttons={[
          { title: 'Salvar', onPress: handleSave, variant: 'primary' },
          { title: 'Cancelar', onPress: () => router.back(), variant: 'secondary' },
        ]}
      />
    </SafeAreaView>
  );
}
