import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToStorage } from '@/data/storage';
import { makeEntityStore, type EntityState } from '@/state/makeEntityStore';
import { UserProfile, getUsers } from '@/data/mockUsers';

export type UserWithPhoto = UserProfile & { photoUri?: string | null };
export type UsersState = EntityState<UserWithPhoto>;

export const USERS_STORAGE_KEY = 'mock:users';
export const SEED_FLAG_KEY = 'seed:users:v1';

export const useUsersStore = makeEntityStore<UserWithPhoto>('users');

export async function ensureUsersLoaded() {
  const dentists = (getUsers('dentist') ?? []) as UserWithPhoto[];
  const admins   = (getUsers('admin') ?? [])   as UserWithPhoto[];
  const patients = (getUsers('patient') ?? []) as UserWithPhoto[];

  const seed: UserWithPhoto[] = [...dentists, ...admins, ...patients].map((u) => ({
    ...u,
    photoUri: (u as any).photoUri ?? null,
  }));

  await useUsersStore.getState().load(seed);
}

export async function seedUsersFromLegacyMock() {
  const dentists = (getUsers('dentist') ?? []) as UserWithPhoto[];
  const admins   = (getUsers('admin') ?? [])   as UserWithPhoto[];
  const patients = (getUsers('patient') ?? []) as UserWithPhoto[];

  const merged: UserWithPhoto[] = [...dentists, ...admins, ...patients].map((u) => ({
    ...u,
    photoUri: (u as any).photoUri ?? null,
  }));

  useUsersStore.getState().setAll(merged);
  await saveToStorage(USERS_STORAGE_KEY, merged);
}

export async function seedUsersFromLegacyMockOnce() {
  const [flag, existing] = await Promise.all([
    AsyncStorage.getItem(SEED_FLAG_KEY),
    AsyncStorage.getItem(USERS_STORAGE_KEY),
  ]);

  const hasExisting =
    !!existing && Array.isArray(JSON.parse(existing)) && JSON.parse(existing).length > 0;

  if (flag || hasExisting) return;

  await seedUsersFromLegacyMock();
  await AsyncStorage.setItem(SEED_FLAG_KEY, '1');
}
