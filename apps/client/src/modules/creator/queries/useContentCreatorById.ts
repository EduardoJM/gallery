import { useSuspenseQuery } from '@tanstack/react-query';
import { getContentCreatorById } from '../services';

export const useContentCreatorById = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['creator-by-id', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      try {
        const creator = await getContentCreatorById(id)
        return creator;
      } catch {
        return null;
      }
    },
  });
};
