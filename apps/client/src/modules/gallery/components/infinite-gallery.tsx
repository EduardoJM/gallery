import { Fragment } from 'react';
import { GalleryGrid } from '@/components/ui/gallery-grid';
import { GalleryItem } from './gallery-item';
import { useContentsInfinite } from '../queries';

export const InfiniteGallery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useContentsInfinite();

  return (
    <div>
      <GalleryGrid>
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((content) => (
              <GalleryItem key={content.id} content={content} />
            ))}
          </Fragment>
        ))}
      </GalleryGrid>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
}
