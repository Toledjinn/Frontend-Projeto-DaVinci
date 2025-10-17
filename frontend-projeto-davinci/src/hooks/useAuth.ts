import { useMemo } from 'react';
import { useUsers } from '@/hooks/useUsers';

const MOCK_LOGGED_USER_ID = 'admin-1'; 

export function useAuth() {
  const { list: users } = useUsers();

  const currentUser = useMemo(() => {
    return users.find(u => String(u.id) === String(MOCK_LOGGED_USER_ID));
  }, [users]);

  const isAdmin = currentUser?.type === 'admin';
  const isPerioDentist =
    currentUser?.type === 'dentist' &&
    Array.isArray(currentUser?.specialties) &&
    currentUser!.specialties!.includes('Periodontia');

  const canManagePeriogram = !!(isAdmin || isPerioDentist);

  return {
    currentUser,
    isAdmin,
    isPerioDentist,
    canManagePeriogram,
  };
}
