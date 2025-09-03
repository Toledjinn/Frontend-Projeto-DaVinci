import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, useWindowDimensions, TextInput, Text } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './ScheduleAppointmentScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import Chefinho from '@/assets/characters/chefinho.svg';
import StyledPicker, { PickerItem } from '@/components/common/StyledPicker';
import StyledMultiSelect from '@/components/common/StyledMultiSelect';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import StyledTimePicker from '@/components/common/StyledTimePicker';
import { getUsers } from '@/data/mockUsers';
import { COLORS } from '@/constants/theme';
import StyledUserPicker from '@/components/common/StyledUserPicker';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';
import { ALL_PROCEDURES } from '@/data/mockProcedures';

const MOCK_PATIENTS = getUsers('patient');
const MOCK_DENTISTS = getUsers('dentist');

export default function ScheduleAppointmentScreen() {
    const { height } = useWindowDimensions();
    const headerHeight = height * 0.29;
    const router = useRouter();
    const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
    
    const params = useLocalSearchParams<{
        mode?: 'reschedule';
        appointmentId?: string;
        patientId?: string;
        dentistId?: string;
        specialty?: string;
        procedures?: string;
        date?: string;
        time?: string;
        observations?: string;
    }>();

    const isRescheduleMode = params.mode === 'reschedule';

    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [observations, setObservations] = useState('');

    useEffect(() => {
        if (isRescheduleMode) {
            setSelectedPatientId(params.patientId || null);
            setSelectedDentistId(params.dentistId || null);
            setSelectedSpecialty(params.specialty || null);
            setSelectedProcedures(params.procedures ? JSON.parse(params.procedures) : []);
            setObservations(params.observations || '');

            if (params.date) {
                const [day, month, year] = params.date.split('/');
                const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                setSelectedDate(dateObject);
            }
            if (params.time) {
                const [hours, minutes] = params.time.split(':');
                const timeObject = new Date();
                timeObject.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                setSelectedTime(timeObject);
            }
        } else {
            setSelectedPatientId(params.patientId || null);
            setSelectedDentistId(params.dentistId || null);
        }
    }, [params.appointmentId]);


    const specialtyItems: PickerItem[] = ALL_SPECIALTIES.map(s => ({ label: s, value: s }));

    useFocusEffect(
        useCallback(() => {
            setHeaderConfig({
                layout: 'page',
                showPageHeaderElements: true,
                pageTitle: isRescheduleMode ? 'Reagendar Consulta' : 'Agendar Consulta',
                CharacterSvg: Chefinho,
                showNotificationIcon: true,
            });
        }, [isRescheduleMode])
    );

    const handleCancel = () => {
        router.back();
    };

    const handleSchedule = () => {
        if (!selectedPatientId || !selectedDentistId || !selectedSpecialty || !selectedDate || !selectedTime) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (isRescheduleMode) {
            console.log('Reagendando consulta:', params.appointmentId);
            alert('Consulta reagendada com sucesso! (Simulação)');
        } else {
            console.log('Agendando nova consulta');
            alert('Consulta agendada com sucesso! (Simulação)');
        }
        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.outerContainer}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.scrollContentContainer, { paddingTop: headerHeight + 20 }]}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.inputWrapper}>
                        <StyledUserPicker
                            label="Paciente"
                            iconName="user"
                            items={MOCK_PATIENTS}
                            selectedValue={selectedPatientId}
                            onValueChange={setSelectedPatientId}
                            placeholder="Pesquisar e selecionar paciente"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <StyledUserPicker
                            label="Dentista"
                            iconName="user-check"
                            items={MOCK_DENTISTS}
                            selectedValue={selectedDentistId}
                            onValueChange={setSelectedDentistId}
                            placeholder="Pesquisar e selecionar dentista"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <StyledPicker
                            label="Especialidade"
                            iconName="star"
                            items={specialtyItems}
                            selectedValue={selectedSpecialty}
                            onValueChange={setSelectedSpecialty}
                            placeholder="Selecione a especialidade"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <StyledMultiSelect
                            label="Procedimentos"
                            iconName="clipboard"
                            items={ALL_PROCEDURES}
                            selectedItems={selectedProcedures}
                            onSelectionChange={setSelectedProcedures}
                            placeholder="Selecione os procedimentos"
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
                            <Feather name="file-text" size={24} color={COLORS.gray_400} style={{ marginTop: 2 }}/>
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
                    secondaryButtonTitle="Cancelar"
                    onSecondaryButtonPress={handleCancel}
                    primaryButtonTitle={isRescheduleMode ? "Reagendar" : "Agendar"}
                    onPrimaryButtonPress={handleSchedule}
                />
            </View>
        </SafeAreaView>
    );
}