import { InfiniteData, QueryKey, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { PaginatedContentCreators } from '../types';
import { getContentCreatorsPaginated } from '../services';

export const useContentCreatorsInfinite = () => {
  return useSuspenseInfiniteQuery<
    PaginatedContentCreators,
    unknown,
    InfiniteData<PaginatedContentCreators, unknown>,
    QueryKey,
    number
  >({
    queryKey: ['creators'],
    queryFn: async ({ pageParam }) => getContentCreatorsPaginated(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page === lastPage.meta.pages) {
        return null;
      }
      return lastPage.meta.page + 1;
    },
  })
};
