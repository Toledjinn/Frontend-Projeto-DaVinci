import {
  useDiagnosticsStore,
  ORAL_HEALTH_INITIAL,
  type OralHealthForm,
  GENERAL_HEALTH_INITIAL,
  type GeneralHealthForm,
  PREVENTION_INITIAL,
  type PreventionData,
  type PreventionType,
  APPOINTMENT_DIAG_INITIAL,
  type AppointmentDiagnostics,
} from '@/data/diagnosticsStore';

type UseDiagnosticsReturn = {
  ORAL_HEALTH_INITIAL: OralHealthForm;
  getOrCreateOralHealth: (patientId: string) => OralHealthForm;
  saveOralHealth: (patientId: string, form: OralHealthForm) => void;
  updateOralHealth: (patientId: string, patch: Partial<OralHealthForm>) => void;
  clearOralHealth: (patientId: string) => void;

  GENERAL_HEALTH_INITIAL: GeneralHealthForm;
  getOrCreateGeneralHealth: (patientId: string) => GeneralHealthForm;
  saveGeneralHealth: (patientId: string, form: GeneralHealthForm) => void;
  updateGeneralHealth: (patientId: string, patch: Partial<GeneralHealthForm>) => void;
  clearGeneralHealth: (patientId: string) => void;

  PREVENTION_INITIAL: PreventionData;
  getOrCreatePrevention: (patientId: string, type: PreventionType) => PreventionData;
  savePrevention: (patientId: string, type: PreventionType, data: PreventionData) => void;
  updatePrevention: (patientId: string, type: PreventionType, patch: Partial<PreventionData>) => void;
  clearPrevention: (patientId: string, type: PreventionType) => void;

  APPOINTMENT_DIAG_INITIAL: AppointmentDiagnostics;
  getOrCreateAppointmentDiagnostics: (appointmentId: string, patientId: string) => AppointmentDiagnostics;
  saveAppointmentDiagnostics: (appointmentId: string, data: AppointmentDiagnostics) => void;
  updateAppointmentDiagnostics: (appointmentId: string, patch: Partial<AppointmentDiagnostics>) => void;
  clearAppointmentDiagnostics: (appointmentId: string) => void;
};

export function useDiagnostics(): UseDiagnosticsReturn {
  const store = useDiagnosticsStore();

  return {
    ORAL_HEALTH_INITIAL,
    getOrCreateOralHealth: store.getOrCreateOralHealth,
    saveOralHealth: store.saveOralHealth,
    updateOralHealth: store.updateOralHealth,
    clearOralHealth: store.clearOralHealth,

    GENERAL_HEALTH_INITIAL,
    getOrCreateGeneralHealth: store.getOrCreateGeneralHealth,
    saveGeneralHealth: store.saveGeneralHealth,
    updateGeneralHealth: store.updateGeneralHealth,
    clearGeneralHealth: store.clearGeneralHealth,

    PREVENTION_INITIAL,
    getOrCreatePrevention: store.getOrCreatePrevention,
    savePrevention: store.savePrevention,
    updatePrevention: store.updatePrevention,
    clearPrevention: store.clearPrevention,

    APPOINTMENT_DIAG_INITIAL,
    getOrCreateAppointmentDiagnostics: store.getOrCreateAppointmentDiagnostics,
    saveAppointmentDiagnostics: store.saveAppointmentDiagnostics,
    updateAppointmentDiagnostics: store.updateAppointmentDiagnostics,
    clearAppointmentDiagnostics: store.clearAppointmentDiagnostics,
  };
}
