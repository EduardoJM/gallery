import { useSuspenseQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '../services';
import api from '@/lib/axios';

export const useAuthenticatedUser = () => {
  return useSuspenseQuery({
    queryKey: ['authenticated-user'],
    queryFn: async () => {
      const token = localStorage.getItem('@GALLERY:TOKEN');
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      try {
        const user = await getAuthenticatedUser();
        return user;
      } catch {
        api.defaults.headers.common["Authorization"] = undefined;
        localStorage.removeItem('@GALLERY:TOKEN');
        localStorage.removeItem('@GALLERY:MEDIATOKEN');
        return null;
      }
    },
  });
};
