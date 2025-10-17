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
  
];

export const getRecordsForPatientBySpecialty = (patientId: string, specialty: string): ConsultationRecord[] => {
  return MOCK_RECORDS
    .filter(r => r.patientId === patientId && r.specialty === specialty)
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime());
};

export const getRecordForAppointment = (appointmentId: string): ConsultationRecord | null => {
  return MOCK_RECORDS.find(r => r.appointmentId === appointmentId) ?? null;
};