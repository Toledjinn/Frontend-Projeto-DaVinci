export type PeriogramData = {
  [key: number]: { [key: string]: string };
};

export type SavedPeriogram = {
  id: string;
  patientId: string;
  date: string; 
  dentistName: string; 
  data: PeriogramData;
};

const MOCK_SAVED_PERIOGRAMS: SavedPeriogram[] = [
  {
    id: 'perio1',
    patientId: 'patient-2',
    date: '01/03/2025',
    dentistName: 'Dr. Carlos Dias',
    data: {
      '16': { MV: '4', V: '3', DV: '4', 'MP/ML': '3', 'P/L': '2' },
      '25': { MV: '2', V: '2', DV: '3' },
      '46': { MV: '5', V: '4', DV: '5', MO: '1' },
    },
  },
  {
    id: 'perio2',
    patientId: 'patient-2', 
    date: '15/06/2025',
    dentistName: 'Dr. Carlos Dias',
    data: {
      '16': { MV: '3', V: '2', DV: '3', 'MP/ML': '2', 'P/L': '2' },
      '25': { MV: '2', V: '2', DV: '2' },
      '46': { MV: '4', V: '3', DV: '4', MO: '1' },
    },
  },
];

export const getPeriogramsForPatient = (patientId: string): SavedPeriogram[] => {
  return MOCK_SAVED_PERIOGRAMS
    .filter(p => p.patientId === patientId)
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime()); 
};

export const getPeriogramById = (id: string): SavedPeriogram | undefined => {
  return MOCK_SAVED_PERIOGRAMS.find(p => p.id === id);
}