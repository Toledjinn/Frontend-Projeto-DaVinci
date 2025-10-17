import AsyncStorage from '@react-native-async-storage/async-storage';

export type PeriogramData = {
  [key: number]: { [key: string]: string };
};

export type SavedPeriogram = {
  id: string;
  patientId: string;
  date: string;       
  dentistName: string; 
  data: PeriogramData;
};

const PERIOGRAMS_KEY = '@app/periograms_v1';

const genId = () => `perio_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

async function loadAll(): Promise<SavedPeriogram[]> {
  try {
    const raw = await AsyncStorage.getItem(PERIOGRAMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveAll(items: SavedPeriogram[]): Promise<void> {
  await AsyncStorage.setItem(PERIOGRAMS_KEY, JSON.stringify(items));
}

export async function getPeriogramsForPatient(patientId: string): Promise<SavedPeriogram[]> {
  const all = await loadAll();
  return all
    .filter((p) => String(p.patientId) === String(patientId))
    .sort((a, b) => {
      const da = a.date.split('/').reverse().join('-');
      const db = b.date.split('/').reverse().join('-');
      return new Date(db).getTime() - new Date(da).getTime();
    });
}

export async function getPeriogramById(id: string): Promise<SavedPeriogram | undefined> {
  const all = await loadAll();
  return all.find((p) => p.id === id);
}

export async function addPeriogram(input: Omit<SavedPeriogram, 'id'>): Promise<SavedPeriogram> {
  const all = await loadAll();
  const item: SavedPeriogram = { ...input, id: genId() };
  const next = [item, ...all];
  await saveAll(next);
  return item;
}

export async function updatePeriogram(
  id: string,
  patch: Partial<Pick<SavedPeriogram, 'data' | 'dentistName' | 'date'>>
): Promise<SavedPeriogram | undefined> {
  const all = await loadAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const updated: SavedPeriogram = { ...all[idx], ...patch };
  all[idx] = updated;
  await saveAll(all);
  return updated;
}

export async function deletePeriogram(id: string): Promise<void> {
  const all = await loadAll();
  await saveAll(all.filter((p) => p.id !== id));
}

export async function resetPeriograms(): Promise<void> {
  await saveAll([]);
}
