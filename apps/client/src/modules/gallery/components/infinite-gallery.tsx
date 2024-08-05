import { Fragment } from 'react';
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
      <div className='grid grid-cols-5 gap-4'>
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((content) => (
              <GalleryItem key={content.id} content={content} />
            ))}
          </Fragment>
        ))}
      </div>
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
