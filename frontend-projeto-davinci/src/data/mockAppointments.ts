export type Appointment = {
  id: string;
  patientId: string;
  date: string;
  time: string;
  status: 'realizada' | 'agendada' | 'cancelada';
  dentist: string;
  procedures: string[];
  specialty: string;
};

const ALL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-1', patientId: 'patient-1', date: '21/05/2025', time: '14:00', status: 'realizada',
    dentist: 'Dr. José Maria Gratone', procedures: ['Limpeza', 'Aplicação de Flúor'], specialty: 'Periodontia',
  },
  {
    id: 'appt-2', patientId: 'patient-1', date: '15/09/2025', time: '10:30', status: 'agendada',
    dentist: 'Dr. José Maria Gratone', procedures: ['Avaliação para Prótese'], specialty: 'Prótese',
  },
  {
    id: 'appt-7', patientId: 'patient-1', date: '10/01/2025', time: '09:00', status: 'realizada',
    dentist: 'Dra. Juliana Santos', procedures: ['Consulta de Rotina'], specialty: 'Clínica Geral',
  },
  {
    id: 'appt-16', patientId: 'patient-1', date: '18/11/2024', time: '11:00', status: 'realizada',
    dentist: 'Dr. José Maria Gratone', procedures: ['Raspagem Periodontal'], specialty: 'Periodontia',
  },

  {
    id: 'appt-3', patientId: 'patient-2', date: '15/04/2025', time: '09:00', status: 'realizada',
    dentist: 'Dra. Ana Costa', procedures: ['Manutenção de Aparelho Ortodôntico'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-4', patientId: 'patient-2', date: '10/08/2025', time: '11:00', status: 'cancelada',
    dentist: 'Dra. Ana Costa', procedures: ['Manutenção de Aparelho Ortodôntico'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-5', patientId: 'patient-2', date: '25/08/2025', time: '11:00', status: 'agendada',
    dentist: 'Dra. Ana Costa', procedures: ['Manutenção de Aparelho Ortodôntico'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-8', patientId: 'patient-2', date: '20/11/2025', time: '15:30', status: 'agendada',
    dentist: 'Dra. Ana Costa', procedures: ['Ajuste Final do Aparelho'], specialty: 'Ortodontia',
  },
  {
    id: 'appt-17', patientId: 'patient-2', date: '05/02/2025', time: '08:30', status: 'realizada',
    dentist: 'Dra. Ana Costa', procedures: ['Instalação do Aparelho'], specialty: 'Ortodontia',
  },

  {
    id: 'appt-6', patientId: 'patient-3', date: '01/03/2025', time: '16:00', status: 'realizada',
    dentist: 'Dr. Carlos Dias', procedures: ['Tratamento de Canal'], specialty: 'Endodontia',
  },
  {
    id: 'appt-9', patientId: 'patient-3', date: '05/07/2025', time: '17:00', status: 'realizada',
    dentist: 'Dra. Mariana Lima', procedures: ['Avaliação de Implante'], specialty: 'Implantodontia',
  },
  {
    id: 'appt-10', patientId: 'patient-3', date: '12/10/2025', time: '08:00', status: 'agendada',
    dentist: 'Dra. Mariana Lima', procedures: ['Cirurgia de Implante Dentário'], specialty: 'Implantodontia',
  },
  {
    id: 'appt-18', patientId: 'patient-3', date: '20/12/2024', time: '14:00', status: 'realizada',
    dentist: 'Dra. Juliana Santos', procedures: ['Extração de Siso'], specialty: 'Clínica Geral',
  },

  {
    id: 'appt-11', patientId: 'patient-4', date: '18/02/2025', time: '13:00', status: 'realizada',
    dentist: 'Dr. Maurício Shiguedomi Mochida', procedures: ['Aplicação de Botox', 'Preenchimento Labial'], specialty: 'Harmonização Facial',
  },
  {
    id: 'appt-12', patientId: 'patient-4', date: '20/08/2025', time: '14:00', status: 'agendada',
    dentist: 'Dr. Maurício Shiguedomi Mochida', procedures: ['Retoque de Harmonização Facial'], specialty: 'Harmonização Facial',
  },
  {
    id: 'appt-19', patientId: 'patient-4', date: '03/01/2025', time: '11:30', status: 'realizada',
    dentist: 'Dra. Juliana Santos', procedures: ['Clareamento Dental'], specialty: 'Clínica Geral',
  },

  {
    id: 'appt-13', patientId: 'patient-5', date: '10/01/2025', time: '10:00', status: 'realizada',
    dentist: 'Dr. Pedro Alves', procedures: ['Consulta Odontopediátrica'], specialty: 'Odontopediatria',
  },
  {
    id: 'appt-14', patientId: 'patient-5', date: '15/06/2025', time: '09:30', status: 'realizada',
    dentist: 'Dra. Juliana Santos', procedures: ['Restauração Dentária'], specialty: 'Clínica Geral',
  },
  {
    id: 'appt-15', patientId: 'patient-5', date: '05/12/2025', time: '16:30', status: 'agendada',
    dentist: 'Dr. Pedro Alves', procedures: ['Aplicação de Selante'], specialty: 'Odontopediatria',
  },
  {
    id: 'appt-20', patientId: 'patient-5', date: '08/08/2024', time: '15:00', status: 'realizada',
    dentist: 'Dr. Pedro Alves', procedures: ['Profilaxia Infantil'], specialty: 'Odontopediatria',
  },
];

export const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
  return ALL_APPOINTMENTS.filter(appt => appt.patientId === patientId)
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime());
};
