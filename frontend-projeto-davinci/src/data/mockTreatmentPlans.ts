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
  createdAt: string;
  updatedAt: string;
};

const MOCK_TREATMENT_PLANS: TreatmentPlan[] = [
  
];

export const getPlanForPatient = (patientId: string): TreatmentPlan | undefined => {
  return MOCK_TREATMENT_PLANS.find((p) => p.patientId === patientId);
};

export const saveTreatmentPlanForPatient = (
  patientId: string,
  items: {
    id: number | string;
    dentistId: string | null;
    specialty: string | null;
    observations: string;
  }[],
) => {
  const newSteps: TreatmentPlanStep[] = items.map((it) => ({
    id: String(it.id),
    dentistId: it.dentistId ?? '',
    specialty: it.specialty ?? '',
    observations: it.observations ?? '',
    status: 'pendente',
  }));

  const existingPlan = getPlanForPatient(patientId);

  if (existingPlan) {
    existingPlan.steps = newSteps;
    existingPlan.updatedAt = new Date().toISOString();
  } else {
    MOCK_TREATMENT_PLANS.push({
      patientId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      steps: newSteps,
    });
  }
};

export const updateTreatmentPlanStep = (
  patientId: string,
  stepId: string,
  updates: Partial<Pick<TreatmentPlanStep, 'status' | 'appointmentId'>>,
) => {
  const plan = getPlanForPatient(patientId);
  if (!plan) return;

  const step = plan.steps.find((s) => s.id === stepId);
  if (!step) return;

  Object.assign(step, updates);
  plan.updatedAt = new Date().toISOString();
};

export const getAllTreatmentPlans = (): TreatmentPlan[] => {
  return MOCK_TREATMENT_PLANS;
};
