import { Fragment, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'
import { GalleryGrid } from '@/components/ui/gallery-grid';
import { GalleryItem } from './gallery-item';
import { useContentsInfinite } from '../queries';

export const InfiniteGallery = () => {
  const { ref, inView } = useInView();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useContentsInfinite(params.get('media') || null);

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <div>
      <div>
        <Link to={{ pathname }}>Todos</Link>
        <Link to={{ pathname, search: '?media=Photo' }}>Fotos</Link>
        <Link to={{ pathname, search: '?media=Video' }}>Vídeos</Link>
      </div>

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
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {/* TODO: better fetching status? */}
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
