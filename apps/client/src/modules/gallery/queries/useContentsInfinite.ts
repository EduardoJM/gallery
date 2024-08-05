import { InfiniteData, QueryKey, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { PaginatedContents } from '../types';
import { getContentsPaginated } from '../services';

export const useContentsInfinite = () => {
  return useSuspenseInfiniteQuery<
    PaginatedContents,
    unknown,
    InfiniteData<PaginatedContents, unknown>,
    QueryKey,
    number
  >({
    queryKey: ['contents'],
    queryFn: async ({ pageParam }) => getContentsPaginated(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page === lastPage.meta.pages) {
        return null;
      }
      return lastPage.meta.page + 1;
    },
  })
};
