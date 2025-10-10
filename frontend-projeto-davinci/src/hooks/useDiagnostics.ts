import { useCallback } from 'react';
import { useDiagnosticsStore, ORAL_HEALTH_INITIAL, type OralHealthForm } from '@/data/diagnosticsStore';

export function useDiagnostics() {
  const oralHealthByPatientId = useDiagnosticsStore((s) => s.oralHealthByPatientId);
  const _getOrCreate = useDiagnosticsStore((s) => s.getOrCreateOralHealth);
  const _save = useDiagnosticsStore((s) => s.saveOralHealth);
  const _update = useDiagnosticsStore((s) => s.updateOralHealth);

  const getOrCreateOralHealth = useCallback(
    (patientId: string): OralHealthForm => {
      if (!patientId) return ORAL_HEALTH_INITIAL;
      return oralHealthByPatientId[patientId] ?? _getOrCreate(patientId);
    },
    [oralHealthByPatientId, _getOrCreate]
  );

  const saveOralHealth = useCallback(
    (patientId: string, form: OralHealthForm) => {
      if (!patientId) return;
      _save(patientId, form);
    },
    [_save]
  );

  const updateOralHealth = useCallback(
    (patientId: string, patch: Partial<OralHealthForm>) => {
      if (!patientId) return;
      _update(patientId, patch);
    },
    [_update]
  );

  return {
    ORAL_HEALTH_INITIAL,
    getOrCreateOralHealth,
    saveOralHealth,
    updateOralHealth,
  };
}
