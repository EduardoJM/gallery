import { useSuspenseQuery } from '@tanstack/react-query';
import { getContentById } from '../services';

export const useContentById = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['content-by-id', id],
    queryFn: async () => getContentById(id),
  });
};
