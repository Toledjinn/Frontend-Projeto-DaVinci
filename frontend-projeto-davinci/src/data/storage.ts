import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadFromStorage<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveToStorage<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
