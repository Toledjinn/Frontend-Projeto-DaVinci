import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, useWindowDimensions, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const MOCK_PATIENTS = getUsers('patient');
const MOCK_DENTISTS = getUsers('dentist');

export default function ScheduleAppointmentScreen() {
    const { height } = useWindowDimensions();
    const headerHeight = height * 0.216;
    const router = useRouter();
    const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
    
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

    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(params.patientId || null);
    const [selectedDentistId, setSelectedDentistId] = useState<string | null>(params.dentistId || null);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [observations, setObservations] = useState('');

    useEffect(() => {
        if (isRescheduleMode || isReproposeMode) {
            setSelectedPatientId(params.patientId || null);
            setSelectedDentistId(params.dentistId || null);
            setSelectedSpecialty(params.specialty || null);
            setObservations(params.observations || '');

            if (isRescheduleMode && params.date) {
                const [day, month, year] = params.date.split('/');
                const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                setSelectedDate(dateObject);
            }
            if (isRescheduleMode && params.time) {
                const [hours, minutes] = params.time.split(':');
                const timeObject = new Date();
                timeObject.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                setSelectedTime(timeObject);
            }
        }
    }, [
        params.mode, 
        params.patientId, 
        params.dentistId, 
        params.specialty, 
        params.date, 
        params.time, 
        params.observations
    ]);


    const specialtyItems: PickerItem[] = ALL_SPECIALTIES.map(s => ({ label: s, value: s }));

    useFocusEffect(
        useCallback(() => {
            const getTitle = () => {
                if (isRescheduleMode) return 'Reagendar Consulta';
                if (isReproposeMode) return 'Sugerir nova data/horário';
                return 'Agendar Consulta';
            };

            setHeaderConfig({
                layout: 'page',
                showPageHeaderElements: true,
                pageTitle: getTitle(),
                CharacterSvg: Chefinho,
                showNotificationIcon: true,
            });
        }, [isRescheduleMode, isReproposeMode])
    );

    const handleCancel = () => {
        router.back();
    };

    const handleSchedule = () => {
        if (!selectedPatientId || !selectedDentistId || !selectedSpecialty || !selectedDate || !selectedTime) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const actionText = isRescheduleMode ? 'reagendada' : (isReproposeMode ? 'sugestão enviada' : 'agendada');
        
        console.log(`Ação: ${actionText}`);
        alert(`Consulta ${actionText} com sucesso! (Simulação)`);
        
        router.back();
    };
    
    const primaryButtonTitle = () => {
        if (isRescheduleMode) return "Reagendar";
        if (isReproposeMode) return "Sugerir";
        return "Agendar";
    };

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
                            items={MOCK_PATIENTS}
                            selectedValue={selectedPatientId}
                            onValueChange={setSelectedPatientId}
                            placeholder="Selecionar paciente"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <StyledUserPicker
                            label="Dentista"
                            iconName="user-check"
                            items={MOCK_DENTISTS}
                            selectedValue={selectedDentistId}
                            onValueChange={setSelectedDentistId}
                            placeholder="Selecionar dentista"
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
                    buttons={[
                    {
                        title: primaryButtonTitle(),
                        onPress: handleSchedule,
                        variant: 'primary',  
                    },
                    {
                        title: "Cancelar",
                        onPress: () => router.back(),
                        variant: 'secondary',  
                    }
                    ]}
                />
            </View>
        </SafeAreaView>
    );
}