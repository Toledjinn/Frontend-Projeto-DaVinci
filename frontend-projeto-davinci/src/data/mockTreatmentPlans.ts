export type TreatmentPlanStep = {
  id: string;
  dentistId: string;
  specialty: string;
  procedures: string[];
  observations: string;
  status: 'pendente' | 'agendada' | 'realizada';
  appointmentId?: string; 
};

export type TreatmentPlan = {
  patientId: string;
  steps: TreatmentPlanStep[];
};

const MOCK_PLANS: TreatmentPlan[] = [
  {
    patientId: 'patient-1', 
    steps: [
      {
        id: 'step1',
        dentistId: 'dentist-3', 
        specialty: 'Endodontia',
        procedures: ['canal'],
        observations: 'Finalizar tratamento de canal do dente 16.',
        status: 'realizada',
        appointmentId: 'appt-6',
      },
      {
        id: 'step2',
        dentistId: 'dentist-4',
        specialty: 'Implantodontia',
        procedures: ['implante_cirurgia'],
        observations: 'Instalação de implante no local do dente 25.',
        status: 'agendada',
        appointmentId: 'appt-10',
      },
      {
        id: 'step3',
        dentistId: 'dentist-1',
        specialty: 'Prótese',
        procedures: ['protese_avaliacao'],
        observations: 'Coroa sobre implante do dente 25.',
        status: 'pendente', 
      },
      {
        id: 'step4',
        dentistId: 'dentist-1', 
        specialty: 'Prótese',
        procedures: ['protese_avaliacao'],
        observations: 'Prótese final sobre o dente 16.',
        status: 'pendente', 
      },
    ],
  },
];

export const getPlanForPatient = (patientId: string): TreatmentPlan | undefined => {
  return MOCK_PLANS.find(p => p.patientId === patientId);
};