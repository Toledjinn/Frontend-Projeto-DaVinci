import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppointmentStatus = 'realizada' | 'agendada' | 'cancelada' | 'pendente';

export type Appointment = {
  id: string;
  patientId: string;
  dentistId: string;
  specialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  observations?: string;
  createdAt: string;
  updatedAt: string;
};

export const APPOINTMENT_STATUSES = [
  { label: 'Agendada', value: 'agendada' },
  { label: 'Realizada', value: 'realizada' },
  { label: 'Cancelada', value: 'cancelada' },
  { label: 'Pendente', value: 'pendente' },
];

const STORAGE_KEY = '@davinci_appointments';

export async function loadAppointments(): Promise<Appointment[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar consultas:', error);
    return [];
  }
}

export async function saveAppointments(list: Appointment[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (error) {
    console.error('Erro ao salvar consultas:', error);
  }
}
