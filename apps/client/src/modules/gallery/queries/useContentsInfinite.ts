import { InfiniteData, QueryKey, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PaginatedContents } from '../types';
import { getContentsPaginated } from '../services';

export const useContentsInfinite = (
  mediaType: string | null = null,
  tags: string | null = null,
) => {
  const { creator } = useParams();

  return useSuspenseInfiniteQuery<
    PaginatedContents,
    unknown,
    InfiniteData<PaginatedContents, unknown>,
    QueryKey,
    number
  >({
    queryKey: ['contents', creator || null, mediaType, tags],
    queryFn: async ({ pageParam }) => {
      return getContentsPaginated(pageParam, creator || null, mediaType, tags);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.pages) {
        return null;
      }
      if (lastPage.meta.page === lastPage.meta.pages) {
        return null;
      }
      return lastPage.meta.page + 1;
    },
  })
};
