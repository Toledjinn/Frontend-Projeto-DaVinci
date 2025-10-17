import { create } from 'zustand';
import {
  addPeriogram,
  updatePeriogram,
  getPeriogramsForPatient,
  getPeriogramById,
  deletePeriogram,
  resetPeriograms,
  SavedPeriogram,
  PeriogramData,
} from '@/data/mockPeriograms';

type PeriogramStore = {
  list: SavedPeriogram[];
  loading: boolean;

  setList: (periograms: SavedPeriogram[]) => void;
  fetchForPatient: (patientId: string) => Promise<void>;
  getById: (id: string) => Promise<SavedPeriogram | undefined>;
  add: (input: Omit<SavedPeriogram, 'id'>) => Promise<SavedPeriogram>;
  update: (id: string, patch: Partial<{ data: PeriogramData; dentistName: string }>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  resetAll: () => Promise<void>;
};

export const usePeriograms = create<PeriogramStore>((set, get) => ({
  list: [],
  loading: false,

  setList: (periograms) => set({ list: periograms }),

  fetchForPatient: async (patientId) => {
    set({ loading: true });
    const periograms = await getPeriogramsForPatient(patientId);
    set({ list: periograms, loading: false });
  },

  getById: async (id) => {
    return await getPeriogramById(id);
  },

  add: async (input) => {
    const saved = await addPeriogram(input);
    const { list } = get();
    set({ list: [saved, ...list] });
    return saved;
  },

  update: async (id, patch) => {
    const updated = await updatePeriogram(id, patch);
    if (updated) {
      set({
        list: get().list.map((p) => (p.id === id ? updated : p)),
      });
    }
  },

  remove: async (id) => {
    await deletePeriogram(id);
    set({
      list: get().list.filter((p) => p.id !== id),
    });
  },

  resetAll: async () => {
    await resetPeriograms();
    set({ list: [] });
  },
}));
