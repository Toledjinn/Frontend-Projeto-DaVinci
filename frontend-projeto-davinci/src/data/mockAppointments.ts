export type AppointmentStatus = 'realizada' | 'agendada' | 'cancelada' | 'pendente';

export type Appointment = {
  id: string;
  patientId: string;
  date: string;
  time: string;
  status: AppointmentStatus; 
  dentist: string;
  procedures: string[];
  specialty: string;
  observations?: string;
};

const ALL_APPOINTMENTS: Appointment[] = [

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

export const updateAppointmentStatus = (
  appointmentId: string,
  newStatus: 'realizada' | 'agendada' | 'cancelada' | 'pendente'
): boolean => {
  const appointmentIndex = ALL_APPOINTMENTS.findIndex(appt => appt.id === appointmentId);
  if (appointmentIndex > -1) {
    ALL_APPOINTMENTS[appointmentIndex].status = newStatus;
    console.log(`Status do agendamento ${appointmentId} atualizado para ${newStatus}`);
    return true;
  }
  return false;
};

export const APPOINTMENT_STATUSES = [
  { label: 'Agendada', value: 'agendada' },
  { label: 'Realizada', value: 'realizada' },
  { label: 'Cancelada', value: 'cancelada' },
];
