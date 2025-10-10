import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, useWindowDimensions, TextInput, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './ScheduleAppointmentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import Chefinho from '@/assets/characters/chefinho.svg';
import StyledPicker, { PickerItem } from '@/components/common/StyledPicker';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import StyledTimePicker from '@/components/common/StyledTimePicker';
import StyledUserPicker from '@/components/common/StyledUserPicker';
import { COLORS } from '@/constants/theme';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';
import { useUsers } from '@/hooks/useUsers';
import { useAppointments } from '@/hooks/useAppointments';
import type { Appointment } from '@/data/appointmentsStore';

export default function ScheduleAppointmentScreen() {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { list: users } = useUsers();
  const { save, update, getById } = useAppointments();

  const params = useLocalSearchParams<{
    mode?: 'reschedule' | 'repropose';
    appointmentId?: string;
    patientId?: string;
    dentistId?: string;
    specialty?: string;
    date?: string;
    time?: string;
    observations?: string;
  }>();

  const isRescheduleMode = params.mode === 'reschedule';
  const isReproposeMode = params.mode === 'repropose';
  const isEditing = !!params.appointmentId;

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(params.patientId || null);
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(params.dentistId || null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(params.specialty || null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [observations, setObservations] = useState(params.observations || '');

  const patients = users
  .filter((u) => u.type === 'patient')
  .map((u) => ({ id: u.id, name: u.name, image: u.image ?? null }));

const dentists = users
  .filter((u) => u.type === 'dentist')
  .map((u) => ({ id: u.id, name: u.name, image: u.image ?? null }));

  useFocusEffect(
    useCallback(() => {
      const getTitle = () => {
        if (isRescheduleMode) return 'Reagendar Consulta';
        if (isReproposeMode) return 'Sugerir nova data/horário';
        return isEditing ? 'Editar Consulta' : 'Agendar Consulta';
      };

      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: getTitle(),
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [isRescheduleMode, isReproposeMode, isEditing])
  );

  useEffect(() => {
    if (isEditing && params.appointmentId) {
      const existing = getById(params.appointmentId);
      if (existing) {
        setSelectedPatientId(existing.patientId);
        setSelectedDentistId(existing.dentistId);
        setSelectedSpecialty(existing.specialty);
        setObservations(existing.observations || '');
        const [d, m, y] = existing.date.split('/');
        setSelectedDate(new Date(+y, +m - 1, +d));
        const [h, min] = existing.time.split(':');
        const t = new Date();
        t.setHours(+h, +min);
        setSelectedTime(t);
      }
    }
  }, [isEditing, params.appointmentId]);

  const handleSave = async () => {
    if (!selectedPatientId || !selectedDentistId || !selectedSpecialty || !selectedDate || !selectedTime) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dateStr = selectedDate.toLocaleDateString('pt-BR');
    const timeStr = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const payload: Appointment = {
      id: params.appointmentId || Date.now().toString(),
      patientId: selectedPatientId,
      dentistId: selectedDentistId,
      specialty: selectedSpecialty,
      date: dateStr,
      time: timeStr,
      observations,
      status: 'agendada',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await save(payload);
      Alert.alert('Sucesso', 'Consulta salva com sucesso!');
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível salvar a consulta.');
    }
  };

  const primaryButtonTitle = () =>
    isRescheduleMode ? 'Reagendar' : isReproposeMode ? 'Sugerir' : isEditing ? 'Salvar' : 'Agendar';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContentContainer, { paddingTop: headerHeight }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputWrapper}>
            <StyledUserPicker
              label="Paciente"
              iconName="user"
              items={patients}
              selectedValue={selectedPatientId}
              onValueChange={setSelectedPatientId}
              placeholder="Selecionar paciente"
            />
          </View>

          <View style={styles.inputWrapper}>
            <StyledUserPicker
              label="Dentista"
              iconName="user-check"
              items={dentists}
              selectedValue={selectedDentistId}
              onValueChange={setSelectedDentistId}
              placeholder="Selecionar dentista"
            />
          </View>

          <View style={styles.inputWrapper}>
            <StyledPicker
              label="Especialidade"
              iconName="star"
              items={ALL_SPECIALTIES.map((s) => ({ label: s, value: s }))}
              selectedValue={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
              placeholder="Selecione a especialidade"
            />
          </View>

          <View style={styles.inputWrapper}>
            <StyledDatePicker label="Data" value={selectedDate} onChange={setSelectedDate} />
          </View>

          <View style={styles.inputWrapper}>
            <StyledTimePicker label="Horário" value={selectedTime} onChange={setSelectedTime} />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Observações</Text>
            <View style={styles.manualInputContainer}>
              <Feather name="file-text" size={24} color={COLORS.gray_400} style={{ marginTop: 8 }} />
              <TextInput
                value={observations}
                onChangeText={setObservations}
                placeholder="Observações..."
                placeholderTextColor={COLORS.gray_400}
                multiline
                style={styles.manualInput}
              />
            </View>
          </View>
        </ScrollView>

        <ScreenFooter
          buttons={[
            { title: 'Cancelar', onPress: () => router.back(), variant: 'secondary' },
            { title: primaryButtonTitle(), onPress: handleSave, variant: 'primary' },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
