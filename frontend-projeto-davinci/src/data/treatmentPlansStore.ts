import AsyncStorage from '@react-native-async-storage/async-storage';

export type TreatmentPlanStep = {
  id: string;
  dentistId: string;
  specialty: string;
  observations: string;
  status: 'pendente' | 'agendada' | 'realizada';
  appointmentId?: string;
};

export type TreatmentPlan = {
  patientId: string;
  steps: TreatmentPlanStep[];
};

const STORAGE_KEY = '@treatmentPlansDB_v1';

type DB = Record<string, TreatmentPlan>; 

async function readDB(): Promise<DB> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DB) : {};
  } catch (err) {
    console.error('Erro ao ler TreatmentPlans DB', err);
    return {};
  }
}

async function writeDB(db: DB) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error('Erro ao salvar TreatmentPlans DB', err);
  }
}


export async function getPlanForPatient(patientId: string): Promise<TreatmentPlan> {
  const db = await readDB();
  return db[patientId] ?? { patientId, steps: [] };
}

export async function setPlanForPatient(patientId: string, steps: TreatmentPlanStep[]) {
  const db = await readDB();
  db[patientId] = { patientId, steps };
  await writeDB(db);
}

export async function upsertPlanSteps(patientId: string, incoming: TreatmentPlanStep[]) {
  const db = await readDB();
  const current = db[patientId]?.steps ?? [];
  const byId = new Map<string, TreatmentPlanStep>(current.map((s) => [s.id, s]));
  for (const step of incoming) {
    byId.set(step.id, step);
  }
  db[patientId] = { patientId, steps: Array.from(byId.values()) };
  await writeDB(db);
}

export async function updateStepStatus(
  patientId: string,
  stepId: string,
  status: TreatmentPlanStep['status'],
  appointmentId?: string
) {
  const db = await readDB();
  const plan = db[patientId] ?? { patientId, steps: [] };
  plan.steps = plan.steps.map((s) =>
    s.id === stepId ? { ...s, status, appointmentId } : s
  );
  db[patientId] = plan;
  await writeDB(db);
}

export async function markStepScheduled(
  patientId: string,
  stepId: string,
  appointmentId: string
) {
  await updateStepStatus(patientId, stepId, 'agendada', appointmentId);
}


export type PlanItemFromForm = {
  id: number; 
  dentistId: string | null;
  specialty: string | null;
  observations: string;
};

export function toStepsFromForm(items: PlanItemFromForm[]): TreatmentPlanStep[] {
  return (items ?? [])
    .filter((it) => it.dentistId && it.specialty)
    .map((it) => ({
      id: `step-${it.id}`,
      dentistId: it.dentistId!,
      specialty: it.specialty!,
      observations: it.observations ?? '',
      status: 'pendente' as const,
    }));
}
