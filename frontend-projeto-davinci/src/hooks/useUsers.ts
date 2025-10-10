import { useEffect, useMemo } from 'react';
import { useUsersStore, ensureUsersLoaded, type UsersState, type UserWithPhoto } from '@/data/usersStore';

export function useUsers() {
  const loaded = useUsersStore((s: UsersState) => s.loaded);
  const items  = useUsersStore((s: UsersState) => s.items);
  const upsert = useUsersStore((s: UsersState) => s.upsert);
  const remove = useUsersStore((s: UsersState) => s.remove);

  useEffect(() => {
    if (!loaded) void ensureUsersLoaded();
  }, [loaded]);

  return useMemo(
    () => ({
      loaded,
      list: items,
      save: (user: UserWithPhoto) => upsert(user),
      deleteById: (id: UserWithPhoto['id']) => remove(id),
    }),
    [loaded, items, upsert, remove]
  );
}
