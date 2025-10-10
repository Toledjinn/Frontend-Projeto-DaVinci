import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Appointment } from '@/data/appointmentsStore';
import { getAllAppointments as getMockAppointments } from '@/data/mockAppointments';

function normalizeMockAppointment(mock: any): Appointment {
  return {
    id: mock.id,
    patientId: mock.patientId,
    dentistId: mock.dentistId || '',
    specialty: mock.specialty || '',
    date: mock.date,
    time: mock.time,
    status: mock.status,
    observations: mock.observations || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

const STORAGE_KEY = '@davinci_appointments';

export function useAppointments() {
  const [list, setList] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFromStorage = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const parsed: Appointment[] = JSON.parse(json);
        setList(parsed);
      } else {
        const mock = getMockAppointments().map(normalizeMockAppointment);
        setList(mock);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mock));
      }
    } catch (err) {
      console.error('Erro ao carregar consultas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadFromStorage();
  }, [loadFromStorage]);

  const save = useCallback(
    async (appointment: Appointment) => {
      try {
        const updated = [...list, appointment];
        setList(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Erro ao salvar consulta:', err);
      }
    },
    [list]
  );

  const update = useCallback(
    async (id: string, partial: Partial<Appointment>) => {
      try {
        const updated = list.map((a) => (a.id === id ? { ...a, ...partial } : a));
        setList(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Erro ao atualizar consulta:', err);
      }
    },
    [list]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        const updated = list.filter((a) => a.id !== id);
        setList(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Erro ao remover consulta:', err);
      }
    },
    [list]
  );

  const getById = useCallback(
    (id: string) => list.find((a) => a.id === id),
    [list]
  );

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return {
    list,
    loading,
    save,
    update,
    remove,
    getById,
    refresh,
  };
}
