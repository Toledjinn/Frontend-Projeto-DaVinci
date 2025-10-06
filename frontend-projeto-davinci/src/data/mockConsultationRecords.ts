import { ImageSourcePropType } from "react-native";

export type ConsultationRecord = {
  appointmentId: string;
  patientId: string;
  specialty: string;
  date: string;

  examRequests?: { id: number, value: string }[];
  riskAssessment?: 'Baixo' | 'Médio' | 'Alto' | null;
  treatmentPlanId?: string;
  preventionData?: any;
  periogramId?: string;
  proceduresPerformed?: { procedure: string; description: string }[];
  
  images?: ImageSourcePropType[];
  xrays?: ImageSourcePropType[];
};

const MOCK_RECORDS: ConsultationRecord[] = [
  {
    appointmentId: 'appt-7',
    patientId: 'patient-1', 
    specialty: 'Primeira Consulta',
    date: '10/06/2025',
    examRequests: [
      { id: 1, value: 'Radiografia panorâmica' },
      { id: 2, value: 'Tomografia do dente 16' },
    ],
    riskAssessment: 'Médio',
    images: [require('@/assets/images/placeholder.png')],
  },
  {
    appointmentId: 'appt-1',
    patientId: 'patient-2', 
    specialty: 'Periodontia',
    date: '21/05/2025',
    periogramId: 'perio1',
    proceduresPerformed: [
      { procedure: 'Limpeza', description: 'Profilaxia completa realizada.'},
      { procedure: 'Aplicação de Flúor', description: 'Aplicação de flúor em gel.'}
    ],
    images: [],
    xrays: [],
  },
  {
    appointmentId: 'appt-14',
    patientId: 'patient-1',
    specialty: 'Clínica Geral',
    date: '15/06/2025',
    proceduresPerformed: [
        { procedure: 'Restauração Dentária', description: 'Restauração realizada no dente 36.'}
    ],
    images: [],
    xrays: [require('@/assets/images/placeholder.png')],
  }
];

export const getRecordsForPatientBySpecialty = (patientId: string, specialty: string): ConsultationRecord[] => {
  return MOCK_RECORDS
    .filter(r => r.patientId === patientId && r.specialty === specialty)
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime());
};

export const getRecordForAppointment = (appointmentId: string): ConsultationRecord | null => {
  return MOCK_RECORDS.find(r => r.appointmentId === appointmentId) ?? null;
};