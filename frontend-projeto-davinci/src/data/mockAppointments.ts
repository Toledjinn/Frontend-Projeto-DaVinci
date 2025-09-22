export type Appointment = {
  id: string;
  patientId: string;
  date: string;
  time: string;
  status: 'realizada' | 'agendada' | 'cancelada' | 'pendente'; 
  dentist: string;
  procedures: string[];
  specialty: string;
  observations?: string;
};

const ALL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-21', patientId: 'patient-4', date: '15/09/2025', time: '10:00', status: 'pendente',
    dentist: 'Juliana Santos', procedures: ['Clareamento Dental'], specialty: 'Clínica Geral',
    observations: 'Paciente solicita agendamento para a próxima semana.'
  },
  {
    id: 'appt-22', patientId: 'patient-6', date: '20/09/2025', time: '16:30', status: 'pendente',
    dentist: 'Carlos Dias', procedures: ['Consulta de Rotina'], specialty: 'Primeira consulta',
  },
  {
    id: 'appt-1', patientId: 'patient-2', date: '21/05/2025', time: '14:00', status: 'realizada',
    dentist: 'José Maria Gratone', procedures: ['Limpeza', 'Aplicação de Flúor'], specialty: 'Periodontia',
    observations: 'Paciente relatou sensibilidade no dente 24. Aplicado verniz.'
  },
  {
    id: 'appt-2', patientId: 'patient-2', date: '15/09/2025', time: '10:30', status: 'agendada',
    dentist: 'José Maria Gratone', procedures: ['Avaliação para Prótese'], specialty: 'Prótese',
    observations: 'Moldagem para prótese superior.'
  },
  {
    id: 'appt-3', patientId: 'patient-1', date: '15/04/2025', time: '09:00', status: 'realizada',
    dentist: 'Ana Costa', procedures: ['Manutenção de Aparelho Ortodôntico'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-4', patientId: 'patient-1', date: '10/08/2025', time: '11:00', status: 'cancelada',
    dentist: 'Ana Costa', procedures: ['Manutenção de Aparelho Ortodôntico'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-5', patientId: 'patient-1', date: '25/08/2025', time: '11:00', status: 'agendada',
    dentist: 'Ana Costa', procedures: ['Manutenção de Aparelho Ortodôntico'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-6', patientId: 'patient-3', date: '01/03/2025', time: '16:00', status: 'realizada',
    dentist: 'Carlos Dias', procedures: ['Tratamento de Canal'], specialty: 'Endodontia',
    observations: 'Paciente com muita dor no dente 16. Tratamento de canal iniciado.'
  },
  {
    id: 'appt-7', patientId: 'patient-4', date: '10/06/2025', time: '09:00', status: 'realizada',
    dentist: 'Juliana Santos', procedures: ['Consulta de Rotina'], specialty: 'Clínica Geral',
  },
  {
    id: 'appt-8', patientId: 'patient-5', date: '22/07/2025', time: '15:30', status: 'agendada',
    dentist: 'Ana Costa', procedures: ['Manutenção de Aparelho Ortodôntico'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-9', patientId: 'patient-3', date: '05/07/2025', time: '17:00', status: 'realizada',
    dentist: 'Mariana Lima', procedures: ['Avaliação para Prótese'], specialty: 'Implantodontia',
  },
  {
    id: 'appt-10', patientId: 'patient-3', date: '12/10/2025', time: '08:00', status: 'agendada',
    dentist: 'Mariana Lima', procedures: ['Cirurgia de Implante Dentário'], specialty: 'Implantodontia',
    observations: 'Cirurgia para instalação de implante no dente 25. Medicação pré-operatória administrada.'
  },
  {
    id: 'appt-11', patientId: 'patient-6', date: '30/08/2025', time: '13:00', status: 'realizada',
    dentist: 'Maurício Shiguedomi Mochida', procedures: ['Aplicação de Botox', 'Preenchimento Labial'], specialty: 'Harmonização Facial',
  },
  {
    id: 'appt-12', patientId: 'patient-7', date: '20/08/2025', time: '14:00', status: 'agendada',
    dentist: 'Maurício Shiguedomi Mochida', procedures: ['Retoque de Harmonização Facial'], specialty: 'Harmonização Facial',
  },
  {
    id: 'appt-13', patientId: 'patient-5', date: '10/01/2025', time: '10:00', status: 'realizada',
    dentist: 'Pedro Alves', procedures: ['Consulta Odontopediátrica'], specialty: 'Odontopediatria',
  },
  {
    id: 'appt-14', patientId: 'patient-4', date: '15/06/2025', time: '09:30', status: 'realizada',
    dentist: 'Juliana Santos', procedures: ['Restauração Dentária'], specialty: 'Clínica Geral',
  },
  {
    id: 'appt-15', patientId: 'patient-5', date: '05/12/2025', time: '16:30', status: 'agendada',
    dentist: 'Pedro Alves', procedures: ['Aplicação de Selante'], specialty: 'Odontopediatria',
  },
  {
    id: 'appt-16', patientId: 'patient-2', date: '18/11/2024', time: '11:00', status: 'realizada',
    dentist: 'José Maria Gratone', procedures: ['Raspagem Periodontal'], specialty: 'Periodontia',
  },
  {
    id: 'appt-17', patientId: 'patient-1', date: '05/02/2025', time: '08:30', status: 'realizada',
    dentist: 'Ana Costa', procedures: ['Instalação do Aparelho'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-18', patientId: 'patient-3', date: '20/12/2024', time: '14:00', status: 'realizada',
    dentist: 'Juliana Santos', procedures: ['Extração de Siso'], specialty: 'Clínica Geral',
  },
  {
    id: 'appt-19', patientId: 'patient-6', date: '03/01/2025', time: '11:30', status: 'realizada',
    dentist: 'Juliana Santos', procedures: ['Clareamento Dental'], specialty: 'Clínica Geral',
  },
  {
    id: 'appt-20', patientId: 'patient-7', date: '08/08/2024', time: '15:00', status: 'realizada',
    dentist: 'Pedro Alves', procedures: ['Profilaxia'], specialty: 'Odontopediatria',
    observations: 'Paciente se comportou bem.'
  },
];

export const getAppointmentById = (id: string): Appointment | undefined => {
  return ALL_APPOINTMENTS.find(appt => appt.id === id);
};

export const getAllAppointments = (): Appointment[] => {
  return [...ALL_APPOINTMENTS].sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime());
};

export const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
  return ALL_APPOINTMENTS.filter(appt => appt.patientId === patientId)
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime());
};

export const getAppointmentsByDentistName = (dentistName: string): Appointment[] => {
  return ALL_APPOINTMENTS.filter(appt => appt.dentist.includes(dentistName))
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime());
};

export const getPendingAppointments = (): Appointment[] => {
  return ALL_APPOINTMENTS.filter(appt => appt.status === 'pendente')
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime());
};