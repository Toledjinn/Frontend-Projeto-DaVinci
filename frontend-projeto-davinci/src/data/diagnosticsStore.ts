import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type YesNo = 'sim' | 'não' | null;

type Q1 = { haQuantoTempo: string; motivo: string };
type Q2 = { data: string | null; qual: string };
type Q3 = { quantidade: string | null; porQuantoTempo: string };
type Q4 = { selected: string[] };
type Q5 = { value: YesNo; selected: string[]; outros: string };
type Q6 = { value: YesNo; frequencia: string };
type Q7 = { value: YesNo; onde: string };
type Q8 = { value: YesNo; qual: string };
type Q9 = { value: 'Fácil' | 'Difícil' | 'Um pouco difícil' | null; motivo: string };
type Q10 = { value: YesNo; frequencia: string };
type Q11 = { value: YesNo; qual: string; frequencia: string };
type Q12 = { value: YesNo; quantidade: 'Pouco' | 'Moderado' | 'Muito' | null };
type Q13 = { quantidade: '0' | '1-3' | '4-7' | '8+' | null };
type Q14 = { value: YesNo; quantidade: '1-3' | '4-7' | '8+' | null };
type Q15 = { value: YesNo; motivo: string };
type Q16 = { value: YesNo };
type Q17 = { value: YesNo; qual: string };
type Q18 = { value: YesNo };
type Q19 = { value: YesNo };
type Q20 = { value: YesNo; onde: string };
type Q21 = { nivel: 'Pouco' | 'Médio' | 'Muito' | null };
type Q22 = { value: YesNo; qual: string };
type Q23 = { value: YesNo };
type Q24 = { value: YesNo; oQueMudar: string };
type Q25 = { nivel: 'Sim' | 'Mais ou menos' | 'Pouco tempo' | null };
type Q26 = { value: YesNo; qual: string };

export type OralHealthForm = {
  q1: Q1; q2: Q2; q3: Q3; q4: Q4; q5: Q5; q6: Q6; q7: Q7; q8: Q8; q9: Q9;
  q10: Q10; q11: Q11; q12: Q12; q13: Q13; q14: Q14; q15: Q15; q16: Q16; q17: Q17;
  q18: Q18; q19: Q19; q20: Q20; q21: Q21; q22: Q22; q23: Q23; q24: Q24; q25: Q25; q26: Q26;
  examesSolicitados: { id: number; value: string }[];
  observacoes: string;
  avaliacaoRisco: { nivel: 'baixo' | 'moderado' | 'alto' | null };
  createdAt?: string;
  updatedAt?: string;
};

export const ORAL_HEALTH_INITIAL: OralHealthForm = {
  q1: { haQuantoTempo: '', motivo: '' },
  q2: { data: null, qual: '' },
  q3: { quantidade: null, porQuantoTempo: '' },
  q4: { selected: [] },
  q5: { value: null, selected: [], outros: '' },
  q6: { value: null, frequencia: '' },
  q7: { value: null, onde: '' },
  q8: { value: null, qual: '' },
  q9: { value: null, motivo: '' },
  q10: { value: null, frequencia: '' },
  q11: { value: null, qual: '', frequencia: '' },
  q12: { value: null, quantidade: null },
  q13: { quantidade: null },
  q14: { value: null, quantidade: null },
  q15: { value: null, motivo: '' },
  q16: { value: null },
  q17: { value: null, qual: '' },
  q18: { value: null },
  q19: { value: null },
  q20: { value: null, onde: '' },
  q21: { nivel: null },
  q22: { value: null, qual: '' },
  q23: { value: null },
  q24: { value: null, oQueMudar: '' },
  q25: { nivel: null },
  q26: { value: null, qual: '' },
  examesSolicitados: [{ id: Date.now(), value: '' }],
  observacoes: '',
  avaliacaoRisco: { nivel: null },
};

export type GeneralHealthForm = any;
export const GENERAL_HEALTH_INITIAL: GeneralHealthForm = {} as any;

export type PreventionType = 'primaria' | 'secundaria' | 'terciaria' | 'quaternaria';
export type PreventionItem = { id: number; value: string };
export type PreventionData = {
  items: PreventionItem[];
  createdAt?: string;
  updatedAt?: string;
};
export const PREVENTION_INITIAL: PreventionData = {
  items: [{ id: Date.now(), value: '' }],
};

export type MediaType = 'image' | 'xray';
export type MediaItem = { id: string; uri: string; type: MediaType };

export type ProcedureEntry = { id: number; description: string };

export type PlanItem = {
  id: number;
  dentistId: string | null;
  specialty: string | null;
  observations: string;
};

export type AppointmentDiagnostics = {
  appointmentId: string;
  patientId: string;

  requestedExams?: { id: number; value: string }[]; 
  riskLevel?: 'baixo' | 'moderado' | 'alto' | null; 
  riskAssessment?: 'Baixo' | 'Médio' | 'Alto' | null; 

  procedures?: ProcedureEntry[];    
  treatmentPlan?: PlanItem[];        
  media?: MediaItem[];             

  createdAt?: string;
  updatedAt?: string;
};

export const APPOINTMENT_DIAG_INITIAL: AppointmentDiagnostics = {
  appointmentId: '',
  patientId: '',
  requestedExams: [{ id: Date.now(), value: '' }],
  riskLevel: null,
  riskAssessment: null, 
  procedures: [],
  treatmentPlan: [],
  media: [],
};

type DiagnosticsState = {
  oralHealthByPatientId: Record<string, OralHealthForm>;
  getOrCreateOralHealth: (patientId: string) => OralHealthForm;
  saveOralHealth: (patientId: string, form: OralHealthForm) => void;
  updateOralHealth: (patientId: string, patch: Partial<OralHealthForm>) => void;
  clearOralHealth: (patientId: string) => void;

  generalHealthByPatientId: Record<string, GeneralHealthForm>;
  getOrCreateGeneralHealth: (patientId: string) => GeneralHealthForm;
  saveGeneralHealth: (patientId: string, form: GeneralHealthForm) => void;
  updateGeneralHealth: (patientId: string, patch: Partial<GeneralHealthForm>) => void;
  clearGeneralHealth: (patientId: string) => void;

  preventionByPatientId: Record<string, Partial<Record<PreventionType, PreventionData>>>;
  getOrCreatePrevention: (patientId: string, type: PreventionType) => PreventionData;
  savePrevention: (patientId: string, type: PreventionType, data: PreventionData) => void;
  updatePrevention: (patientId: string, type: PreventionType, patch: Partial<PreventionData>) => void;
  clearPrevention: (patientId: string, type: PreventionType) => void;

  appointmentDiagnosticsById: Record<string, AppointmentDiagnostics>;
  getOrCreateAppointmentDiagnostics: (appointmentId: string, patientId: string) => AppointmentDiagnostics;
  saveAppointmentDiagnostics: (appointmentId: string, data: AppointmentDiagnostics) => void;
  updateAppointmentDiagnostics: (appointmentId: string, patch: Partial<AppointmentDiagnostics>) => void;
  clearAppointmentDiagnostics: (appointmentId: string) => void;
};

export const useDiagnosticsStore = create<DiagnosticsState>()(
  persist(
    (set, get) => ({
      oralHealthByPatientId: {},
      getOrCreateOralHealth: (patientId) => {
        const map = get().oralHealthByPatientId;
        const existing = map[patientId];
        if (existing) return existing;

        const fresh: OralHealthForm = JSON.parse(JSON.stringify(ORAL_HEALTH_INITIAL));
        const now = new Date().toISOString();
        fresh.createdAt = now;
        fresh.updatedAt = now;

        set((state) => ({
          oralHealthByPatientId: { ...state.oralHealthByPatientId, [patientId]: fresh },
        }));
        return fresh;
      },
      saveOralHealth: (patientId, form) => {
        const now = new Date().toISOString();
        set((state) => ({
          oralHealthByPatientId: {
            ...state.oralHealthByPatientId,
            [patientId]: { ...form, createdAt: form.createdAt ?? now, updatedAt: now },
          },
        }));
      },
      updateOralHealth: (patientId, patch) => {
        const current = get().oralHealthByPatientId[patientId] ?? ORAL_HEALTH_INITIAL;
        const now = new Date().toISOString();
        set((state) => ({
          oralHealthByPatientId: {
            ...state.oralHealthByPatientId,
            [patientId]: { ...current, ...patch, createdAt: current.createdAt ?? now, updatedAt: now },
          },
        }));
      },
      clearOralHealth: (patientId) => {
        set((state) => {
          const { [patientId]: _, ...rest } = state.oralHealthByPatientId;
          return { oralHealthByPatientId: rest };
        });
      },

      generalHealthByPatientId: {},
      getOrCreateGeneralHealth: (patientId) => {
        const map = get().generalHealthByPatientId;
        const existing = map[patientId];
        if (existing) return existing;

        const fresh: GeneralHealthForm = JSON.parse(JSON.stringify(GENERAL_HEALTH_INITIAL));
        const now = new Date().toISOString();
        (fresh as any).createdAt = now;
        (fresh as any).updatedAt = now;

        set((state) => ({
          generalHealthByPatientId: { ...state.generalHealthByPatientId, [patientId]: fresh },
        }));
        return fresh;
      },
      saveGeneralHealth: (patientId, form) => {
        const now = new Date().toISOString();
        set((state) => ({
          generalHealthByPatientId: {
            ...state.generalHealthByPatientId,
            [patientId]: { ...form, createdAt: (form as any).createdAt ?? now, updatedAt: now },
          },
        }));
      },
      updateGeneralHealth: (patientId, patch) => {
        const current = get().generalHealthByPatientId[patientId] ?? GENERAL_HEALTH_INITIAL;
        const now = new Date().toISOString();
        set((state) => ({
          generalHealthByPatientId: {
            ...state.generalHealthByPatientId,
            [patientId]: { ...current, ...patch, createdAt: (current as any).createdAt ?? now, updatedAt: now },
          },
        }));
      },
      clearGeneralHealth: (patientId) => {
        set((state) => {
          const { [patientId]: _, ...rest } = state.generalHealthByPatientId;
          return { generalHealthByPatientId: rest };
        });
      },

      preventionByPatientId: {},
      getOrCreatePrevention: (patientId, type) => {
        const map = get().preventionByPatientId;
        const existing = map[patientId]?.[type];
        if (existing) return existing;

        const fresh: PreventionData = JSON.parse(JSON.stringify(PREVENTION_INITIAL));
        const now = new Date().toISOString();
        fresh.createdAt = now;
        fresh.updatedAt = now;

        set((state) => ({
          preventionByPatientId: {
            ...state.preventionByPatientId,
            [patientId]: { ...(state.preventionByPatientId[patientId] || {}), [type]: fresh },
          },
        }));
        return fresh;
      },
      savePrevention: (patientId, type, data) => {
        const now = new Date().toISOString();
        set((state) => ({
          preventionByPatientId: {
            ...state.preventionByPatientId,
            [patientId]: {
              ...(state.preventionByPatientId[patientId] || {}),
              [type]: { ...data, createdAt: data.createdAt ?? now, updatedAt: now },
            },
          },
        }));
      },
      updatePrevention: (patientId, type, patch) => {
        const current = get().preventionByPatientId[patientId]?.[type] ?? PREVENTION_INITIAL;
        const now = new Date().toISOString();
        set((state) => ({
          preventionByPatientId: {
            ...state.preventionByPatientId,
            [patientId]: {
              ...(state.preventionByPatientId[patientId] || {}),
              [type]: { ...current, ...patch, createdAt: current.createdAt ?? now, updatedAt: now },
            },
          },
        }));
      },
      clearPrevention: (patientId, type) => {
        set((state) => {
          const patientMap = { ...(state.preventionByPatientId[patientId] || {}) };
          delete patientMap[type];
          return {
            preventionByPatientId: {
              ...state.preventionByPatientId,
              [patientId]: patientMap,
            },
          };
        });
      },

      appointmentDiagnosticsById: {},
      getOrCreateAppointmentDiagnostics: (appointmentId, patientId) => {
        const map = get().appointmentDiagnosticsById;
        const existing = map[appointmentId];
        if (existing) return existing;

        const fresh: AppointmentDiagnostics = {
          ...JSON.parse(JSON.stringify(APPOINTMENT_DIAG_INITIAL)),
          appointmentId,
          patientId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          appointmentDiagnosticsById: {
            ...state.appointmentDiagnosticsById,
            [appointmentId]: fresh,
          },
        }));
        return fresh;
      },
      saveAppointmentDiagnostics: (appointmentId, data) => {
        const now = new Date().toISOString();
        const current =
          get().appointmentDiagnosticsById[appointmentId] ??
          {
            ...APPOINTMENT_DIAG_INITIAL,
            appointmentId,
            patientId: data.patientId,
            createdAt: now,
          };

        const next: AppointmentDiagnostics = {
          ...current,
          ...data,                 
          createdAt: current.createdAt ?? data.createdAt ?? now,
          updatedAt: now,
        };

        set((state) => ({
          appointmentDiagnosticsById: {
            ...state.appointmentDiagnosticsById,
            [appointmentId]: next,
          },
        }));
      },
      updateAppointmentDiagnostics: (appointmentId, patch) => {
        const current = get().appointmentDiagnosticsById[appointmentId] ??
          { ...APPOINTMENT_DIAG_INITIAL, appointmentId, patientId: '' };
        const now = new Date().toISOString();
        set((state) => ({
          appointmentDiagnosticsById: {
            ...state.appointmentDiagnosticsById,
            [appointmentId]: { ...current, ...patch, updatedAt: now, createdAt: current.createdAt ?? now },
          },
        }));
      },
      clearAppointmentDiagnostics: (appointmentId) => {
        set((state) => {
          const { [appointmentId]: _, ...rest } = state.appointmentDiagnosticsById;
          return { appointmentDiagnosticsById: rest };
        });
      },
    }),
    {
      name: 'diagnostics-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 3,
    }
  )
);
