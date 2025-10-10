import AsyncStorage from '@react-native-async-storage/async-storage';

export async function debugDumpUsers() {
  const raw = await AsyncStorage.getItem('mock:users');
  if (!raw) { console.log('mock:users vazio'); return; }
  const arr = JSON.parse(raw);
  console.log('mock:users count=', arr.length);
  console.log(arr.slice(0, 5).map((u: any) => ({ id: u.id, name: u.name, photoUri: u.photoUri })));
}
