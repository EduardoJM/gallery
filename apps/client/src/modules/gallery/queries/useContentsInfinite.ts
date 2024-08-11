import { InfiniteData, QueryKey, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PaginatedContents } from '../types';
import { getContentsPaginated } from '../services';

export const useContentsInfinite = () => {
  const { creator } = useParams();

  return useSuspenseInfiniteQuery<
    PaginatedContents,
    unknown,
    InfiniteData<PaginatedContents, unknown>,
    QueryKey,
    number
  >({
    queryKey: ['contents', creator || null],
    queryFn: async ({ pageParam }) => getContentsPaginated(pageParam, creator || null),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page === lastPage.meta.pages) {
        return null;
      }
      return lastPage.meta.page + 1;
    },
  })
};
