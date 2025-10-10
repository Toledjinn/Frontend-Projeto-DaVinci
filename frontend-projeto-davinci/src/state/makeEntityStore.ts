import { create } from 'zustand';
import { loadFromStorage, saveToStorage } from '@/data/storage';

type Id = string | number;
export type EntityWithId = { id: Id; [k: string]: any };

export type EntityState<T extends EntityWithId> = {
  items: T[];
  loaded: boolean;
  setAll: (items: T[]) => void;
  upsert: (item: T) => void;
  remove: (id: T['id']) => void;
  load: (seed?: T[]) => Promise<void>;
};

export function makeEntityStore<T extends EntityWithId>(resourceKey: string) {
  const storageKey = `mock:${resourceKey}`;

  return create<EntityState<T>>((set, get) => ({
    items: [],
    loaded: false,

    setAll: (items) => set({ items }),

    upsert: (item) => {
      const items = get().items.slice();
      const idx = items.findIndex((i) => i.id === item.id);
      if (idx >= 0) items[idx] = { ...items[idx], ...item };
      else items.unshift(item);
      set({ items });
      void saveToStorage(storageKey, items);
    },

    remove: (id) => {
      const items = get().items.filter((i) => i.id !== id);
      set({ items });
      void saveToStorage(storageKey, items);
    },

    load: async (seed) => {
      const current = await loadFromStorage<T[]>(storageKey, seed ?? []);
      set({ items: current, loaded: true });
      if (seed && (!current || current.length === 0)) {
        await saveToStorage(storageKey, seed);
      }
    },
  }));
}
